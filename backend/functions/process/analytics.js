const functions = require("firebase-functions");
const {
    db, referralLinkInfo,timeZone
} = require('./admin');
var moment = require('moment-timezone');

function getDateString(timestampDate){
    let date = moment(timestampDate.toDate()).tz(timeZone).format('ddd MMM DD YYYY');
    return date;
}

async function salesReport(orders, orderStatus) {
    for (const order of orders) {
        //let date = new Date(order.data().createdAt.toDate()).toDateString();
        let date = getDateString(order.data().createdAt);
        let docData = await db.collection('analytics').doc('sales').collection('data').doc(date).get();
        if (docData && docData.data()) {
            let updatedSalesData = docData.data();
            if (orderStatus === 'Returned') {
                updatedSalesData.sales -= order.data().totalAmountToPaid ? order.data().totalAmountToPaid : 0;
                updatedSalesData.orders -= 1;
            } else {
                updatedSalesData.sales += order.data().totalAmountToPaid ? order.data().totalAmountToPaid : 0;
                updatedSalesData.orders += 1;
            }
            for (let product of order.data().products) {
                const productDoc = await db.collection('products').doc(product.productId).get();
                let productDetails = productDoc.data();
                if (productDoc && productDoc.data()) {
                    if (productDetails.hasOwnProperty('priceList') && productDetails.priceList.length > 0) {
                        for (const element of productDetails.priceList) {
                            if (product.hasOwnProperty('pack')) {
                                if (element.weight === product.pack.weight) {
                                    if (element.hasOwnProperty('purchasePrice') && element.purchasePrice) {
                                        if (orderStatus === 'Returned') {
                                            updatedSalesData.profit -= parseFloat(((product.price - product.gstObj.total - element.purchasePrice) * product.quantity).toFixed(2));
                                        } else {
                                            updatedSalesData.profit += parseFloat(((product.price - product.gstObj.total - element.purchasePrice) * product.quantity).toFixed(2));
                                        }
                                    } else {
                                        updatedSalesData.profit = updatedSalesData.profit + 0;
                                    }
                                }
                            }
                        }
                    } else {
                        if (productDetails.purchasePrice) {
                            if (orderStatus === 'Returned') {
                                updatedSalesData.profit -= parseFloat(((product.price - product.gstObj.total - productDetails.purchasePrice) * product.quantity).toFixed(2));
                            } else {
                                updatedSalesData.profit += parseFloat(((product.price - product.gstObj.total - productDetails.purchasePrice) * product.quantity).toFixed(2));
                            }
                        } else {
                            updatedSalesData.profit += 0;
                        }
                    }
                }
            }
            await db.collection('analytics').doc('sales').collection('data').doc(date).update(updatedSalesData);
        } else {
            let obj = {};
            obj.date = order.data().createdAt.toDate();
            obj.sales = order.data().totalAmountToPaid ? order.data().totalAmountToPaid : 0;
            obj.profit = 0;
            obj.orders = 1;
            for (let product of order.data().products) {
                const productDoc = await db.collection('products').doc(product.productId).get();
                let productDetails = productDoc.data();
                if (productDoc && productDoc.data()) {
                    if (productDetails.hasOwnProperty('priceList') && productDetails.priceList.length > 0) {
                        for (const element of productDetails.priceList) {
                            if (product.hasOwnProperty('pack')) {
                                if (element.weight === product.pack.weight) {
                                    if (element.hasOwnProperty('purchasePrice') && element.purchasePrice) {
                                        obj.profit += parseFloat(((product.price - product.gstObj.total - element.purchasePrice) * product.quantity).toFixed(2));
                                    } else {
                                        obj.profit = obj.profit + 0;
                                    }
                                }
                            }
                        }
                    } else {
                        obj.profit += parseFloat(((product.price - product.gstObj.total - productDetails.purchasePrice) * product.quantity).toFixed(2));
                    }
                }
            }
            await db.collection('analytics').doc('sales').collection('data').doc(date).set(obj);
        }
    }
}

async function categoryReport(orders, orderStatus) {
    for (const order of orders) {
        //let date = new Date(order.data().createdAt.toDate()).toDateString();
        let date = getDateString(order.data().createdAt);
        let orderProducts = order.data().products;
        for (let orderProduct of orderProducts) {
            let productDataSnapshot = await db.collection('products').doc(orderProduct.productId).get();
            let productData = productDataSnapshot.data();
            if (productDataSnapshot && productDataSnapshot.data()) {
                for (let categoryId of productData.categories) {
                    let docData = await db.collection('analytics').doc('category').collection('data').doc(date).collection('list').doc(categoryId).get();
                    if (docData && docData.data()) {
                        let categoryDetails = docData.data();
                        if (orderStatus === 'Returned') {
                            categoryDetails.items -= orderProduct.quantity;
                            categoryDetails.sales -= orderProduct.quantity * orderProduct.price ? orderProduct.quantity * orderProduct.price : 0;
                        } else {
                            categoryDetails.items += orderProduct.quantity;
                            categoryDetails.sales += orderProduct.quantity * orderProduct.price ? orderProduct.quantity * orderProduct.price : 0;
                        }
    
                        await db.collection('analytics').doc('category').collection('data').doc(date).collection('list').doc(categoryId).update(categoryDetails);
                    } else {
                        let categoryDataSnapshot = await db.collection('categories').doc(categoryId).get();
                        if (categoryDataSnapshot && categoryDataSnapshot.data()) {
                            let category = {
                                categoryId: categoryId,
                                items: orderProduct.quantity,
                                sales: orderProduct.quantity * orderProduct.price ? orderProduct.quantity * orderProduct.price : 0,
                                categoryName: categoryDataSnapshot.data().name
                            };
                            await db.collection('analytics').doc('category').collection('data').doc(date).collection('list').doc(categoryId).set(category);
                            await db.collection('analytics').doc('category').collection('data').doc(date).set({
                                date: order.data().createdAt.toDate()
                            });
                        }
                    }
                   
                }
            }
        }
    }
}



////////////////////////////////////////////////////////
async function brandReport(orders, orderStatus) {
    for (const order of orders) {
        //let date = new Date(order.data().createdAt.toDate()).toDateString();
        let date = getDateString(order.data().createdAt);
        let orderProducts = order.data().products;
        for (let orderProduct of orderProducts) {
            let productDataSnapshot = await db.collection('products').doc(orderProduct.productId).get();
            let productData = productDataSnapshot.data();
            if (productDataSnapshot && productDataSnapshot.data()) {
                if (productData.hasOwnProperty('brands')) {
                    if (productData.brands.length > 0) {
                        for (let brandId of productData.brands) {
                            let docData = await db.collection('analytics').doc('brands').collection('data').doc(date).collection('list').doc(brandId).get();
                            if (docData && docData.data()) {
                                let brandDetails = docData.data();
                                if (orderStatus === 'Returned') {
                                    brandDetails.items -= orderProduct.quantity;
                                    brandDetails.sales -= orderProduct.quantity * orderProduct.price ? orderProduct.quantity * orderProduct.price : 0;
                                } else {
                                    brandDetails.items += orderProduct.quantity;
                                    brandDetails.sales += orderProduct.quantity * orderProduct.price ? orderProduct.quantity * orderProduct.price : 0;
                                }

                                await db.collection('analytics').doc('brands').collection('data').doc(date).collection('list').doc(brandId).update(brandDetails);
                            } else {
                                let brandDataSnapshot = await db.collection('brands').doc(brandId).get();
                                if (brandDataSnapshot && brandDataSnapshot.data()) {
                                    let brand = {
                                        brandId: brandId,
                                        items: orderProduct.quantity,
                                        sales: orderProduct.quantity * orderProduct.price ? orderProduct.quantity * orderProduct.price : 0,
                                        brandName: brandDataSnapshot.data().name
                                    };
                                    await db.collection('analytics').doc('brands').collection('data').doc(date).collection('list').doc(brandId).set(brand);
                                    await db.collection('analytics').doc('brands').collection('data').doc(date).set({
                                        date: order.data().createdAt.toDate()
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
       
    }
}


////////////////////////////////////////////////////////
async function serviceReport(serviceRequests) {
    for (const serviceRequest of serviceRequests) {
        //let date = new Date(serviceRequest.data().responseAt.toDate()).toDateString();
        let date = getDateString(serviceRequest.data().responseAt);
        let docData = await db.collection('analytics').doc('services').collection('data').doc(date).collection('list').doc(serviceRequest.data().serviceId).get();
        if (docData && docData.data()) {
            let serviceDetails = docData.data();
            serviceDetails.requests += 1;
            serviceDetails.completed += serviceRequest.data().status == 'Completed' ? 1 : 0;

            await db.collection('analytics').doc('services').collection('data').doc(date).collection('list').doc(serviceRequest.data().serviceId).update(serviceDetails);

           
        } else {
            //console.log('no doc');
            let services = {
                serviceId: serviceRequest.data().serviceId,
                requests: 1,
                completed: serviceRequest.data().status == 'Completed' ? 1 : 0,
                serviceName: serviceRequest.data().serviceName
            };
            await db.collection('analytics').doc('services').collection('data').doc(date).collection('list').doc(serviceRequest.data().serviceId).set(services);
            await db.collection('analytics').doc('services').collection('data').doc(date).set({
                date: serviceRequest.data().responseAt.toDate()
            });
        }
    }
}

async function userReport(orders, orderStatus) {
    for (const doc of orders) {
        //let date = new Date(doc.data().createdAt.toDate()).toDateString();
        let date = getDateString(doc.data().createdAt);
        let docData = await db.collection('analytics').doc('users').collection('data').doc(date).collection('list').doc(doc.data().userId).get();
        if (docData && docData.data()) {
            let userDetails = docData.data();
            if (orderStatus === 'Returned') {
                userDetails.orders -= 1;
                userDetails.sales -= doc.data().totalAmountToPaid ? doc.data().totalAmountToPaid : 0;
            } else {
                userDetails.orders += 1;
                userDetails.sales += doc.data().totalAmountToPaid ? doc.data().totalAmountToPaid : 0;
            }
            await db.collection('analytics').doc('users').collection('data').doc(date).collection('list').doc(doc.data().userId).update(userDetails);
        } else {
            let users = {
                userId: doc.data().userId,
                orders: 1,
                sales: doc.data().totalAmountToPaid ? doc.data().totalAmountToPaid : 0,
                name: doc.data().userName
            };
            await db.collection('analytics').doc('users').collection('data').doc(date).collection('list').doc(doc.data().userId).set(users);
            await db.collection('analytics').doc('users').collection('data').doc(date).set({
                date: doc.data().createdAt.toDate()
            });
        }
    }
}



async function areaReport(orders, orderStatus) {
    for (const order of orders) {
        if (order.data().address) {
            //let date = new Date(order.data().createdAt.toDate()).toDateString();
            let date = getDateString(order.data().createdAt);
            let docData = await db.collection('analytics').doc('area').collection('data').doc(date).collection('list').doc(order.data().address.pincode).get();
            if (docData && docData.data()) {
                let areaDetails = docData.data();
                if (orderStatus === 'Returned') {
                    areaDetails.orders -= 1;
                    areaDetails.sales -= order.data().totalAmountToPaid ? order.data().totalAmountToPaid : 0;  
                } else {
                    areaDetails.orders += 1;
                    areaDetails.sales += order.data().totalAmountToPaid ? order.data().totalAmountToPaid : 0;  
                }
                await db.collection('analytics').doc('area').collection('data').doc(date).collection('list').doc(order.data().address.pincode).update(areaDetails);
            } else {
                let area = {
                    pincode: order.data().address.pincode,
                    city: order.data().address.city,
                    state: order.data().address.state,
                    orders: 1,
                    sales: order.data().totalAmountToPaid ? order.data().totalAmountToPaid : 0
                };
                await db.collection('analytics').doc('area').collection('data').doc(date).collection('list').doc(order.data().address.pincode).set(area);
                await db.collection('analytics').doc('area').collection('data').doc(date).set({
                    date: order.data().createdAt.toDate()
                });
            }
        }
    }
}



async function productReport(orders, orderStatus) {
    for (const order of orders) {
        //let date = new Date(order.data().createdAt.toDate()).toDateString();
        let date = getDateString(order.data().createdAt);
        let orderProducts = order.data().products;
        for (let orderProduct of orderProducts) {
            let docData = await db.collection('analytics').doc('products').collection('data').doc(date).collection('list').doc(orderProduct.productId).get();
            if (docData && docData.data()) {
                let productDetails = docData.data();
                if (orderStatus === 'Returned') {
                    productDetails.items -= orderProduct.quantity;
                    productDetails.sales -= orderProduct.price * orderProduct.quantity ? orderProduct.price * orderProduct.quantity : 0;
                    if (orderProduct.gstObj) {
                        if (orderProduct.gstObj.igst == 0) {
                            productDetails.gstObj.cgst -= parseFloat((orderProduct.gstObj.total/2).toFixed(2));
                            productDetails.gstObj.sgst -= parseFloat((orderProduct.gstObj.total/2).toFixed(2));
                        } else {
                            productDetails.gstObj.igst -= parseFloat((orderProduct.gstObj.total).toFixed(2));
                        }
                        productDetails.gstObj.total -= orderProduct.gstObj.total;
                    }
                } else {
                    productDetails.items += orderProduct.quantity;
                    productDetails.sales += orderProduct.price * orderProduct.quantity ? orderProduct.price * orderProduct.quantity : 0;
                    if (orderProduct.gstObj) {
                        if (orderProduct.gstObj.igst == 0) {
                            productDetails.gstObj.cgst += parseFloat((orderProduct.gstObj.total/2).toFixed(2));
                            productDetails.gstObj.sgst += parseFloat((orderProduct.gstObj.total/2).toFixed(2));
                        } else {
                            productDetails.gstObj.igst += parseFloat((orderProduct.gstObj.total).toFixed(2));
                        }
                        productDetails.gstObj.total += orderProduct.gstObj.total;
                    }
                }

                await db.collection('analytics').doc('products').collection('data').doc(date).collection('list').doc(orderProduct.productId).update(productDetails);
            } else {
                let product = {
                    productId: orderProduct.productId,
                    productName: orderProduct.name,
                    items: orderProduct.quantity ? orderProduct.quantity : 0,
                    sales: orderProduct.price * orderProduct.quantity ? orderProduct.price * orderProduct.quantity : 0,
                }
                if (orderProduct.gstObj) {
                    if (orderProduct.gstObj.igst == 0) {
                        product['gstObj'] = {
                            cgst: parseFloat((orderProduct.gstObj.total/2).toFixed(2)),
                            sgst: parseFloat((orderProduct.gstObj.total/2).toFixed(2)),
                            igst: 0,
                            total: orderProduct.gstObj.total,
                            value: orderProduct.gstObj.value
                        }
                    } else {
                        product['gstObj'] = {
                            cgst: 0,
                            sgst: 0,
                            igst: parseFloat((orderProduct.gstObj.total).toFixed(2)),
                            total: orderProduct.gstObj.total,
                            value: orderProduct.gstObj.value
                        }
                    }
                } else {
                    product['gstObj'] = {
                        cgst: 0,
                        sgst: 0,
                        igst: 0,
                        total: 0,
                        value: 0,
                    }
                }
                await db.collection('analytics').doc('products').collection('data').doc(date).collection('list').doc(orderProduct.productId).set(product);
                await db.collection('analytics').doc('products').collection('data').doc(date).set({
                    date: order.data().createdAt.toDate(),
                });
            }
        }
    }
}


// Vendor Report
async function vendorReport(orders, orderStatus) {
    for (const order of orders) {
        //let date = new Date(order.data().createdAt.toDate()).toDateString();
        let date = getDateString(order.data().createdAt);
        const orderDoc = order.data();
        let vendors = orderDoc.vendors;
        if (vendors && vendors.length>0) {
            for (let vendor of vendors) {
                let docData = await db.collection('analytics').doc('vendors').collection('data').doc(date).collection('list').doc(vendor.id).get();
                if (docData && docData.data()) {
                    let vendorDoc = docData.data();
                    if (orderStatus === 'Returned') {
                        for (const vendorOrderProduct of vendor.products) {
                            const vendorProdIndex = vendorDoc.products.findIndex(product => product.id === vendorOrderProduct.id);
                            if (vendorProdIndex !== -1) {
                                const prodData = await db.collection('products').doc(vendorOrderProduct.id).get();
                                let commission = 0;
                                if (prodData && prodData.data()) {
                                    // Here commission is coming in % from prodData
                                    if(prodData.data().commission){
                                        commission = (prodData.data().commission * 0.01) * prodData.data().discountedPrice;
                                    }
                                }
                                if(vendorOrderProduct.hasOwnProperty('pack') && vendorOrderProduct.pack && (vendorOrderProduct.pack.variantType === 'pieces')) {
                                    vendorDoc.products[vendorProdIndex].sales -= vendorOrderProduct.pack.price * vendorOrderProduct.quantity ? vendorOrderProduct.pack.price * vendorOrderProduct.quantity : 0;
                                  } else {
                                    vendorDoc.products[vendorProdIndex].sales -= vendorOrderProduct.price * vendorOrderProduct.quantity ? vendorOrderProduct.price * vendorOrderProduct.quantity : 0;
                                }
                                vendorDoc.products[vendorProdIndex].quantity -= vendorOrderProduct.quantity;
                                vendorDoc.products[vendorProdIndex].commission -= vendorOrderProduct.quantity * commission;
                            }
                        }
                    } else {
                        for (const vendorOrderProduct of vendor.products) {
                            const vendorProdIndex = vendorDoc.products.findIndex(product => product.id === vendorOrderProduct.id);
                            const prodData = await db.collection('products').doc(vendorOrderProduct.id).get();
                            let commission = 0;
                            if (prodData && prodData.data()) {
                                // Here commission is coming in % from prodData
                                if(prodData.data().commission){
                                    if (vendorOrderProduct.pack && vendorOrderProduct.pack.weight) {
                                        const weight = parseInt(vendorOrderProduct.pack.weight);
                                        commission = (prodData.data().commission * 0.01) * prodData.data().discountedPrice * weight;
                                    } else{
                                        commission = (prodData.data().commission * 0.01) * prodData.data().discountedPrice;
                                    }
                                }
                                // commission = (prodData.data().commission * 0.01) ? (prodData.data().commission * 0.01) : 0;
                            }
                            if (vendorProdIndex !== -1) {
                                vendorDoc.products[vendorProdIndex].quantity += vendorOrderProduct.quantity;
                                if(vendorOrderProduct.hasOwnProperty('pack') && vendorOrderProduct.pack && (vendorOrderProduct.pack.variantType === 'pieces')) {
                                    vendorDoc.products[vendorProdIndex].sales += vendorOrderProduct.pack.price * vendorOrderProduct.quantity ? vendorOrderProduct.pack.price * vendorOrderProduct.quantity : 0;
                                    // price = product.pack.price;
                                  } else {
                                    vendorDoc.products[vendorProdIndex].sales += vendorOrderProduct.price * vendorOrderProduct.quantity ? vendorOrderProduct.price * vendorOrderProduct.quantity : 0;
                                    // price = product.price;
                                }
                                vendorDoc.products[vendorProdIndex].commission += vendorOrderProduct.quantity * commission;
                            } else{
                                let sales;
                                if(vendorOrderProduct.hasOwnProperty('pack') && vendorOrderProduct.pack && (vendorOrderProduct.pack.variantType === 'pieces')) {
                                    sales = vendorOrderProduct.pack.price * vendorOrderProduct.quantity ? vendorOrderProduct.pack.price * vendorOrderProduct.quantity : 0;
                                  } else {
                                    sales = vendorOrderProduct.price * vendorOrderProduct.quantity ? vendorOrderProduct.price * vendorOrderProduct.quantity : 0;
                                }
                                vendorDoc.products.push({
                                    id: vendorOrderProduct.id,
                                    name: vendorOrderProduct.name,
                                    quantity: vendorOrderProduct.quantity,
                                    sales: sales,
                                    commission: vendorOrderProduct.quantity * commission
                                })
                            }
                        }
                    }
                    await db.collection('analytics').doc('vendors').collection('data').doc(date).collection('list').doc(vendor.id).update(vendorDoc);
                } else {
                    // if (vendor.vendor.regionId) {
                        // const region = await db.collection('features').doc('multiRegion').collection('regions').doc(vendor.vendor.regionId).get();
                        const user = await db.collection('users').doc(vendor.id).get();
                        let vendorDocObj = {
                            id: vendor.id,
                            name: user.data().name,
                            // region: region.data().name ? region.data().name : 'NA',
                            // regionId: vendor.vendor.regionId,
                            products: []
                        };
                        for (const vendorOrderProduct of vendor.products) {
                            const prodData = await db.collection('products').doc(vendorOrderProduct.id).get();
                            let commission = 0;
                            if (prodData && prodData.data()) {
                                // Here commission is coming in % from prodData
                                if(prodData.data().commission){ 
                                    if (vendorOrderProduct.pack && vendorOrderProduct.pack.weight) {
                                    const weight = parseInt(vendorOrderProduct.pack.weight);
                                    commission = (prodData.data().commission * 0.01) * prodData.data().discountedPrice * weight;
                                    } else{
                                        commission = (prodData.data().commission * 0.01) * prodData.data().discountedPrice;
                                    }
                                }
                                //commission = prodData.data().commission ? prodData.data().commission : 0;
                            }
                            let sales;
                            if(vendorOrderProduct.hasOwnProperty('pack') && vendorOrderProduct.pack && (vendorOrderProduct.pack.variantType === 'pieces')) {
                                sales = vendorOrderProduct.pack.price * vendorOrderProduct.quantity ? vendorOrderProduct.pack.price * vendorOrderProduct.quantity : 0;
                              } else {
                                sales = vendorOrderProduct.price * vendorOrderProduct.quantity ? vendorOrderProduct.price * vendorOrderProduct.quantity : 0;
                            }
                            vendorDocObj.products.push({
                                id: vendorOrderProduct.id,
                                name: vendorOrderProduct.name,
                                quantity: vendorOrderProduct.quantity ? vendorOrderProduct.quantity : 0,
                                sales: sales,
                                commission: (vendorOrderProduct.quantity ? vendorOrderProduct.quantity : 0) * commission
                            })
                        }
                        await db.collection('analytics').doc('vendors').collection('data').doc(date).collection('list').doc(vendor.id).set(vendorDocObj);
                        await db.collection('analytics').doc('vendors').collection('data').doc(date).set({
                            date: order.data().createdAt.toDate(),
                        });
                    // }
                    }
            }
        }
    }
}

exports.onUpdateOrder = functions.firestore
    .document('orders/{orderId}').onUpdate(async (change, context) => {
        const orderId = context.params.orderId;
        const orderDocBefore = change.before.data();
        const orderDeliveredSnapshot = change.after;
        const orderDocAfter = change.after.data();
        let order = [];
        order.push(orderDeliveredSnapshot);
        if (orderDocAfter.status === 'Delivered' && orderDocBefore.status != 'Delivered') {
            console.log('inside Delivered');
            await areaReport(order, 'Delivered');
            await userReport(order, 'Delivered');
            await brandReport(order, 'Delivered');
            await categoryReport(order, 'Delivered');
            await productReport(order, 'Delivered');
            await salesReport(order, 'Delivered');
            await vendorReport(order, 'Delivered');
        }
        if (orderDocAfter.status === 'Returned' && orderDocBefore.status != 'Returned') {
            await areaReport(order, 'Returned');
            await userReport(order, 'Returned');
            await brandReport(order, 'Returned');
            await categoryReport(order, 'Returned');
            await productReport(order, 'Returned');
            await salesReport(order, 'Returned');
            await vendorReport(order, 'Returned');
        }
    });


exports.onUpdateServiceRequests = functions.firestore
    .document('serviceRequests/{serviceRequestId}').onUpdate(async (change, context) => {
        const serviceRequestId = context.params.serviceRequestId;
        const serviceRequestBefore = change.before.data();
        const serviceCompletedSnapshot = change.after;
        const serviceRequestAfter = change.after.data();
        if (serviceRequestAfter.status === 'Completed' && serviceRequestBefore.status != 'Completed') {
            let service = [];
            service.push(serviceCompletedSnapshot);
            await serviceReport(service);
        }
    });
// coupon Report
async function couponReport(codeId, usageDoc) {
    //let date = new Date(usageDoc.createdAt.toDate()).toDateString();
    let date = getDateString(usageDoc.createdAt);
    let docData = await db.collection('analytics').doc('coupons').collection('data').doc(date).collection('list').doc(codeId).get();
    if (docData && docData.data()) {
        const codeDoc = docData.data();
        codeDoc.usage +=1;
        await db.collection('analytics').doc('coupons').collection('data').doc(date).collection('list').doc(codeId).update(codeDoc);
    } else{
        const coupon = await db.collection('features').doc('coupons').collection('codes').doc(codeId).get();
        const couponDoc = coupon.data();
        if (coupon && couponDoc) {
            let codeDocObj = {
                name: couponDoc.name ? couponDoc.name : 'NA',
                usage: 1
            };
            await db.collection('analytics').doc('coupons').collection('data').doc(date).collection('list').doc(codeId).set(codeDocObj);
            await db.collection('analytics').doc('coupons').collection('data').doc(date).set({
                date: usageDoc.createdAt.toDate(),
            });
        }
    }
}

exports.onCreateCouponCodes = functions.firestore
    .document('features/coupons/codes/{codeId}/usage/{usageId}').onCreate(async (snap, context) => {
        const codeId = context.params.codeId;
        const usageDoc = snap.data();
        await couponReport(codeId, usageDoc);
    });


// Referral Report
async function referralReport(doc, docId) {
    const dataRef = db.collection('analytics').doc('referral').collection('data');
    //let date = new Date(doc.referrer.date.toDate()).toDateString();
    let date = getDateString(doc.referrer.date);
    let docData = await dataRef.doc(date).collection('list').doc(doc.referrer.userId).get();
    if (docData && docData.data()) {
        let referralDoc = docData.data();
        referralDoc.count +=1;
        referralDoc.cashbackEarned += doc.referrer.referrerCashback;
        referralDoc.usersReferred.push({userId: docId, name: doc.name, phoneNo: doc.phoneNo});
        await dataRef.doc(date).collection('list').doc(doc.referrer.userId).update(referralDoc);
    } else{
        let obj = {
            name: doc.referrer.name,
            count: 1,
            cashbackEarned: doc.referrer.referrerCashback,
            usersReferred: [{userId: docId, name: doc.name, phoneNo: doc.phoneNo}]
        };
        await dataRef.doc(date).collection('list').doc(doc.referrer.userId).set(obj);
        await dataRef.doc(date).set({ date: doc.referrer.date.toDate() });
    }
}
exports.onUpdateUser = functions.firestore
    .document('users/{userId}').onUpdate(async (change, context) => {
        const userId = context.params.userId;
        const before = change.before.data();
        const after = change.after.data();
        if (after.referrer && after.referrer.referrerCashback) {
            if (before.referrer && before.referrer.referrerCashback) {
                if (before.referrer.referrerCashback !== after.referrer.referrerCashback) {
                    await referralReport(after, userId);
                }
            } else{
                await referralReport(after, userId);
            }
        }
        // if (before.referrer.referrerCashback !== after.referrer.referrerCashback) {
        //     await referralReport(after, userId);
        // }
    });
