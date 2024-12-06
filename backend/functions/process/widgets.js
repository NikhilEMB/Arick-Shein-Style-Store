const functions = require("firebase-functions");
const {
    db
} = require('./admin');

exports.deleteSlides = functions.firestore
    .document("widgets/{widgetID}")
    .onDelete(async (snap, context) => {
        const widgetID = context.params.widgetID;
        const collections = await db.collection('widgets').doc(widgetID).listCollections();
        if (collections.length) {
            for (const coll of collections) {
                const batch = db.batch();
                const documents = await coll.listDocuments();
                for (const doc of documents) {
                    batch.delete(doc);
                }
                await batch.commit();
            }
        } else {
            return;
        }

    });

exports.updateWidgetProduct = functions.firestore.document('products/{productId}').onUpdate(async (change, context) => {
    const productId = context.params.productId;
    let productAfterData = change.after.data();
    let widgetIds = [];
    const widgetsRef = await db.collection('widgets').where('type', 'in', ['product-carousel', 'product-list']).get();
    widgetsRef.forEach(async (widget) => {
        if(widget && widget.id) {
            widgetIds.push(widget.id);
        }
    });
    console.log('widgetIds', widgetIds);
    if(widgetIds.length) {
        const batch = db.batch();
        for (const wid of widgetIds) {
            const productRef = db.collection('widgets').doc(wid).collection('products').doc(productId);
            const isExist = await isProductExist(productRef);
            if(isExist) {
                batch.update(productRef, {"data": productAfterData});
            }
        }
        batch.commit().then(() => {
            console.log('widgets product update success');
        }).catch(error => {
            console.log('err in updating widgets product', error);
        });
    }
});

exports.deleteWidgetProduct = functions.firestore.document('products/{productId}').onDelete(async (snap, context) => {
    const productId = context.params.productId;
    let widgetIds = [];
    const widgetsRef = await db.collection('widgets').where('type', 'in', ['product-carousel', 'product-list']).get();
    widgetsRef.forEach(async (widget) => {
        if(widget && widget.id) {
            widgetIds.push(widget.id);
        }
    });
    if(widgetIds.length) {
        const batch = db.batch();
        for (const wid of widgetIds) {
            const productRef = db.collection('widgets').doc(wid).collection('products').doc(productId);
            const isExist = await isProductExist(productRef);
            if(isExist) {
                batch.delete(productRef);
            }
        }
        batch.commit().then(() => {
            console.log('widgets product delete success');
        }).catch(error => {
            console.log('err in deleting widgets product', error);
        });
    }
});

async function isProductExist(productRef) {
    return new Promise(async (resolve, reject) => {
        let isExist = false;
        productRef.get().then((doc) => {
            if(doc.exists) {
                isExist = true;
            }
            resolve(isExist)
        });
    });
}