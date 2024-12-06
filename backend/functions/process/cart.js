const functions = require("firebase-functions");
const {
    db
} = require('./admin');
var moment = require('moment');


exports.onCreateCart = functions.firestore.document('users/{uid}/cart/{cartId}').onCreate(async (snap, context) => {
    const cartData = snap.data();
    const uid = context.params.uid;
    const cart = await db.collection('users').doc(uid).collection('cart').get();

    // remove multiple membership plans in cart
    if(cartData.hasOwnProperty('orderType') && cartData.orderType === 'membership') {
        cart.forEach(async (doc) => {
            if(doc && doc.id && doc.data() && (doc.id !== context.params.cartId)) {
                if(doc.data().hasOwnProperty('orderType') && doc.data().orderType === 'membership') {
                    await db.collection('users').doc(uid).collection('cart').doc(doc.id).delete();
                }
            }
        });
    }

    // remove same products in cart
    cart.forEach(async (doc) => {
        if(doc && doc.id && doc.data()) {
            const product = doc.data();
            if((product.productId === cartData.productId) && (doc.id !== context.params.cartId)) {
                let needToDelete = false;
                if(!cartData.hasOwnProperty('pack')) {
                    needToDelete = true;
                } else {
                    if(product.hasOwnProperty('pack')) {
                        if(product.pack.weight === cartData.pack.weight) {
                            needToDelete = true;
                        }
                    }
                }
                if(needToDelete) {
                    await db.collection('users').doc(uid).collection('cart').doc(context.params.cartId).delete();
                }
            }
        }
    });
});



exports.getUpdatedCartProducts = functions.https.onCall(async (uid, context) => {
    let cartPdts = [];
    let pdtsIds = [];
    let subPdtIds = [];
    let pdts = [];
    let subPdts = [];
    let updatedCartPdts = [];
    let subscribedPdts = [];
    let membership = [];
    console.log('uid', uid);
    if (uid) {
        const cartRef = await db.collection('users').doc(uid).collection('cart').get();
        cartRef.forEach((p) => {
            if (p && p.id && p.data()) {
                if(p.data().orderType === 'subscription') {
                    subscribedPdts.push({
                        id: p.id,
                        ...p.data()
                    })
                } else if(p.data().orderType === 'membership') {
                    membership.push({
                        id: p.id,
                        ...p.data()
                    })
                } else {
                    cartPdts.push({
                        id: p.id,
                        ...p.data()
                    });
                    if (!p.data().parentProductId) {
                        pdtsIds.push(p.data().productId);
                    } else {
                        subPdtIds.push({
                            parentId: p.data().parentProductId,
                            pid: p.data().productId
                        });
                    }
                }
                
            }
        });
        if (pdtsIds.length) {
            for (let index = 0; index < pdtsIds.length; index++) {
                let productRef = await db.collection('products').doc(pdtsIds[index]).get();
                if (productRef) {
                    let product = productRef.data();
                    if (product) {
                        product['id'] = pdtsIds[index];
                        pdts.push(product);
                    }
                }

            }
        }
        if (subPdtIds.length) {
            for (let index = 0; index < subPdtIds.length; index++) {
                let subProductRef = await db.collection('products').doc(subPdtIds[index].parentId).collection('options').doc(subPdtIds[index].pid).get();
                if (subProductRef) {
                    let subPdt = subProductRef.data();
                    if (subPdt) {
                        subPdt['id'] = subPdtIds[index].pid;
                        subPdts.push(subPdt);
                    }
                }
            }
        }
        let allUpdatedPdts = pdts.concat(subPdts);
        if (allUpdatedPdts.length) {
            updatedCartPdts = getUpdatedPdts(allUpdatedPdts, cartPdts);
        }
        if(subscribedPdts.length > 0) {
            updatedCartPdts = updatedCartPdts.concat(subscribedPdts);
        }
        if(membership.length > 0) {
            updatedCartPdts = updatedCartPdts.concat(membership);
        }
        return updatedCartPdts;
    } else {
        return 'api resourced';
    }
});

function getUpdatedPdts(pdts, cartPdts) {
    cartPdts.map(c => {
        for (let j = 0; j < pdts.length; j++) {
            if (c.productId === pdts[j].id) {
                c.name = pdts[j].prodName;
                c.maxQty = pdts[j].maxQty ? pdts[j].maxQty : 0;
                c.minQty = pdts[j].minQty ? pdts[j].minQty : 1;
                c.status = typeof pdts[j].status !== undefined ? pdts[j].status : true;
                c.stopWhenNoQty = pdts[j].hasOwnProperty('stopWhenNoQty') && typeof pdts[j].stopWhenNoQty !== undefined ? pdts[j].stopWhenNoQty : false;
                c.retailDiscount = pdts[j].hasOwnProperty('retailDiscount') ? pdts[j].retailDiscount : 0;
                let dealAllowed = checkLimitedTimeDeal(pdts[j]);
                if(dealAllowed) {
                    if(pdts[j].deal.discount > 0) {
                        c.dealDiscount = pdts[j].deal.discount;
                    }
                }
                if (!c.hasOwnProperty('pack')) {
                    c.totalQty = pdts[j].productQty ? pdts[j].productQty : '';
                    if (parseInt(pdts[j].productQty) && (c.quantity > parseInt(pdts[j].productQty))) {
                        c.quantity = parseInt(pdts[j].productQty);
                    }
                    if (pdts[j].discountedPrice && pdts[j].discountedPrice !== pdts[j].prodPrice) {
                        c.price = pdts[j].discountedPrice;
                        c.mrpPrice = pdts[j].prodPrice;
                    } else {
                        c.price = pdts[j].prodPrice;
                    }
                } else {
                    if (c.pack.variantType !== 'pieces') {
                        pdts[j].priceList.forEach((pl) => {
                            if (pl.weight === c.pack.weight) {
                                c.totalQty = pl.totalQuantity ? pl.totalQuantity : '';
                                if (parseInt(pl.totalQuantity) && (c.quantity > parseInt(pl.totalQuantity))) {
                                    c.quantity = parseInt(pl.totalQuantity);
                                }
                                if (pl.discountedPrice && pl.discountedPrice !== pl.price) {
                                    c.price = pl.discountedPrice;
                                    c.mrpPrice = pl.price;
                                    c.pack.price = pl.price;
                                } else {
                                    c.price = pl.price;
                                    c.pack.price = pl.price;
                                }
                            }
                        })
                    } else {
                        pdts[j].priceList.forEach((pl) => {
                            if (pl.weight === c.pack.weight) {
                                c.totalQty = pl.totalQuantity ? pl.totalQuantity : '';
                                if (parseInt(pl.totalQuantity) && (c.quantity > parseInt(pl.totalQuantity))) {
                                    c.quantity = parseInt(pl.totalQuantity);
                                }
                                if (pl.discountedPrice && pl.discountedPrice !== pl.price) {
                                    c.price = pl.discountedPrice * parseInt(pl.weight);
                                    c.mrpPrice = pl.price * parseInt(pl.weight);
                                    c.pack.price = pl.discountedPrice * parseInt(pl.weight);
                                    c.pack.perPcPrice = pl.discountedPrice;
                                } else {
                                    c.price = pl.price * parseInt(pl.weight);
                                    c.pack.price = pl.price * parseInt(pl.weight);
                                    c.pack.perPcPrice = pl.price;
                                }
                            }
                        })
                    }
                }
            }
        }
    })
    return cartPdts;

}

function checkLimitedTimeDeal(data) {
    if(data.hasOwnProperty('deal') && data.deal.isAllowed) {
      const currentTime = moment();
      const startDate = moment(data.deal.start.date).format('YYYY-MM-DD');
      const startTime = moment(data.deal.start.time).format('HH:mm');
      const endDate = moment(data.deal.end.date).format('YYYY-MM-DD');
      const endTime = moment(data.deal.end.time).format('HH:mm');
      const startDateTime = moment(`${startDate} ${startTime}`);
      const endDateTime = moment(`${endDate} ${endTime}`);

      if (moment(currentTime).isBetween(startDateTime, endDateTime)) {
        console.log('in between');
        return true;
      } else {
        console.log('not between');
        return false;
      }
    } else {
        console.log('no deal property');
        return false;
    }
  }

