const functions = require("firebase-functions");
const {
    db,
    middleware,
    projectId
} = require('../../process/admin');
const axios = require('axios').default;

exports.updateProduct = functions.https.onRequest(async (req, res) => {
    try {
        const product = req.body.product || {};
        if (typeof product !== 'object') {
            res.status(400).send({
                message: "Data must be an object type."
            });
            return;
        }
        if (!Object.keys(product).length) {
            res.status(400).send({
                message: "Data can not be empty."
            });
            return;
        }
        if (!product.sku) {
            res.status(400).send({
                message: "SKU code value must be present"
            });
            return;
        }
        if (typeof product.data !== 'object') {
            res.status(400).send({
                message: "Parameter Data must be an object type."
            });
            return;
        }
        if (!product.data || !Object.keys('data').length) {
            res.status(400).send({
                message: "Parameter Data can not be empty."
            });
            return;
        }

        const dbProducts = [];
        const productRef = await db.collection('products').where('totalSku', 'in', [product.sku]).get();
        productRef.forEach(doc => {
            if (doc && doc.id && doc.data()) {
                dbProducts.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
        });
        if (!dbProducts.length) {
            res.status(400).send({
                message: `No products found with sku: ${product.sku}`
            });
            return;
        }
        for (const dbProduct of dbProducts) {
            let skuFound = false;
            if (dbProduct.isPriceList) {
                const variantIndex = dbProduct.priceList && dbProduct.priceList.length ? dbProduct.priceList.findIndex(pl => pl.sku === product.sku) : -1;
                if (variantIndex !== -1) {
                    skuFound = true;
                    if ('price' in product.data) {
                        dbProduct.priceList[variantIndex].discountedPrice = product.data.price;
                    }
                    if ('mrp' in product.data) {
                        dbProduct.priceList[variantIndex].price = product.data.mrp;
                    }
                    if ('quantity' in product.data) {
                        dbProduct.priceList[variantIndex].totalQuantity = product.data.quantity.toString();
                    }
                }
            }
            if ((!skuFound || !dbProduct.isPriceList) && dbProduct.productCode === product.sku) {
                skuFound = true;
                if ('price' in product.data) {
                    dbProduct.discountedPrice = product.data.price;
                }
                if ('mrp' in product.data) {
                    dbProduct.prodPrice = product.data.mrp;
                }
                if ('quantity' in product.data) {
                    dbProduct.productQty = product.data.quantity.toString();
                }
            }
            await db.collection('products').doc(dbProduct.id).update(dbProduct);
        }
        res.status(200).send({message: 'Product updated successfully!'});
        return;
    } catch (error) {
        res.status(400).send(error);
        return;
    }

});

exports.onUpdateProduct = functions.firestore.document('products/{productId}').onUpdate(async (change, context) => {
    const after = change.after.data(),
    before = change.before.data();
    if (after.productQty !== before.productQty) {
        const sku = 'attributes' in after && after.attributes.oms_product_id ? after.attributes.oms_product_id : null;
        if(sku) {
            try {
                const apiBody = {
                    projectId,
                    integrationCode: 'omsguru',
                    data: {
                        sku,
                        quantity: +after.productQty,
                    }
                }
                axios.post(`${middleware.apiUrl}/inventoryManagement-updateStock`, apiBody)
                    .then(function (response) {
                        return 'stock updated';
                    })
                    .catch(function (error) {
                        return 'error in stock update';
                    });
            } catch (error) {
                return 'error in stock update';
            }
        } else {
            return 'no sku available';
        } 
    } else {
        return 'update not required';
    }
});

exports.getProductStock = functions.https.onRequest(async (req, res) => {
    try {
        const skuCode = req.body.skuCode;
        const avlStock = req.body.in_stock;
        if ((!skuCode && !skuCode.length) || (!avlStock && !avlStock.length)) {
            res.status(400).send({
                message: "SKU code / available stock missing!!!",
                status: false
            });
            return;
        }
        let qty = [];
        for (let i = 0; i < skuCode.length; i++) {
            const productDoc = await db.collection('products').where('productCode', '==', skuCode[i]).get();
            if (productDoc.empty) {
                console.log('No matching documents.');
                res.status(400).send({
                    message: "Product with this sku code not found",
                    status: false
                });
                return;
            }
            const products = [];
            productDoc.forEach(async doc => {
                if(doc && doc.id && doc.data()) {
                    products.push(doc.id);
                }
            })
            if(products.length) {
                for (const productId of products) {
                    const updateProductDoc = await db.collection('products').doc(productId).update({ productQty: avlStock[i].toString() })
                    if (updateProductDoc) {
                        const finalProductDoc = await db.collection('products').doc(productId).get()
                        console.log('final product doc : ', finalProductDoc.data().productQty);
                        qty.push(+finalProductDoc.data().productQty)
                        // res.status(200).send({
                        //     quantity: finalProductDoc.data().productQty ? +finalProductDoc.data().productQty : 0,
                        //     status: true
                        // })
                    }
                }
            }
        }
        console.log('inventory qty : ', qty);
        res.status(200).send({
            quantity: qty,
            status: true
        })
    } catch (error) {
        res.status(400).send({
            message: "Something went wrong !!!",
            status: false
        });
        return;
    }
})

exports.getProductsCatalogue = functions.https.onRequest(async (req, res) => {
    try {
    const product = req.body || {};
    if (!product) {
      res.status(400).send({
        message: "No order received !!!",
        status: false
      });
      return;
    }
    if (!product.page_size || !product.page_number) {
      res.status(400).send({
        message: "All values must be present",
        status: false
      });
      return;
    }
    let prodArr = [];
    let prodDoc 
    if (product.status) {
        if (product.status == 'active') {
            prodDoc = await db.collection('products').where('status', '==', true).limit(product.page_number * product.page_size).get();
        } else if (product.status == 'inactive') {
            prodDoc = await db.collection('products').where('status', '==', false).limit(product.page_number * product.page_size).get();
        } 
    } else {
        prodDoc = await db.collection('products').limit(product.page_number * product.page_size).get();
    }
    if (prodDoc.empty) {
        res.status(400).send({
            message: "Product(s) not found",
            status: false
        });
        return;
    } 
    let index = 0;
    prodDoc.forEach(doc => {
        console.log('products : ' + doc.data().prodName);
        prodArr.push({
            ...doc.data(),
            id: doc.id,
            category: ''
        })
    })
    console.log('prodArr len : ', prodArr.length);
    for (let i = 0; i < prodArr.length; i++) {
        console.log('here for 1');
        if (!prodArr[i].categories || !prodArr[i].categories.length) {
            console.log('here for 2');
            prodArr[i].category += 'NA';
        } else {
            const catDocRef = await db.collection('categories').doc(prodArr[i].categories.toString()).get();
            console.log('here for 3');
            if (catDocRef.data() && catDocRef.data().name) {
                console.log('here for 4');
                prodArr[i].category += catDocRef.data().name;
            } else {
                console.log('here for 5');
                prodArr[i].category += 'NA';
            }
        }
    }
    let pages = paginate(prodArr, product.page_size)
    res.status(200).send(
        {
            pages: pages[product.page_number - 1],
            status: true
        }
    )
    } catch (error) {
        res.status(400).send({
            message: "Something went wrong !!!",
            status: false
        });
        return;
    }
})

function paginate (arr, size) {
    return arr.reduce((acc, val, i) => {
      let idx = Math.floor(i / size)
      let page = acc[idx] || (acc[idx] = [])
      page.push(val)
  
      return acc
    }, [])
}