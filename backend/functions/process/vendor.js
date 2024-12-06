const functions = require("firebase-functions");
var globalFile = require('./global');
var moment = require('moment-timezone');
const QRCode = require('qrcode');
const stream = require('stream');
var slugFile = require('../universal/slug');

const {
    db, timeZone, websiteLink, bucket, admin,
} = require('./admin');

exports.copyVendorProducts = functions.https.onCall(async (data, context) => {
    const vendorFrom = data.vendorFrom,
        vendorTo = data.vendorTo,
        products = data.products;

    const batchArray = [];
    batchArray.push(db.batch());

    let counter = 0,
        batchIndex = 0;

    for (const product of products) {
        const alreadyCopied = await isProductAlreadyCopied(vendorTo, vendorFrom, product.id);
        if (!alreadyCopied) {
            const productRef = db.collection('products').doc(),
                productId = productRef.id;

            product['vendorId'] = vendorTo;
            product['copiedFrom'] = vendorFrom;
            product['createdAt'] = new Date();
            product['copiedFromProduct'] = product.id;
            if (product.hasOwnProperty('rating')) {
                delete product['rating'];
            }
            batchArray[batchIndex].set(productRef, product);
            counter += 1;
            //batch is limited to only 500 operations.
            if (counter === 499) {
                batchArray.push(db.batch());
                batchIndex += 1;
                counter = 0;
            }

            if (product.hasOwnProperty('options') && product.options.length) {
                for (const opt of product.options) {
                    const createdOptRef = await db.collection('products').doc(product.id).collection('options').doc(opt.optionId).get(),
                        optProduct = createdOptRef.data() || null;
                    if (optProduct) {
                        optProduct['createdAt'] = new Date();
                        const optRef = db.collection('products').doc(productId).collection('options').doc(opt.optionId);
                        batchArray[batchIndex].set(optRef, optProduct);
                        counter += 1;
                        if (counter === 499) {
                            batchArray.push(db.batch());
                            batchIndex += 1;
                            counter = 0;
                        }
                    }
                }
            }
            // if (product.hasOwnProperty('rating')) {
            //     const ratingsRef = await db.collection('products').doc(product.id).collection('ratings').get();
            //     ratingsRef.forEach(doc => {
            //         if(doc && doc.id && doc.data()) {
            //             const copyRatingRef = db.collection('products').doc(productId).collection('ratings').doc(doc.id);
            //             batchArray[batchIndex].set(copyRatingRef, doc.data());
            //             counter += 1;
            //             if (counter === 499) {
            //                 batchArray.push(db.batch());
            //                 batchIndex += 1;
            //                 counter = 0;
            //             }
            //         }
            //     });
            // }
        }
    }

    if (batchArray.length) {
        for (const batch of batchArray) {
            await batch.commit();
        }
    }

    return {
        status: true
    }
});

async function isProductAlreadyCopied(vendorTo, vendorFrom, productId) {
    return new Promise(async (resolve, reject) => {
        await db.collection('products').where('vendorId', '==', vendorTo)
            .where('copiedFrom', '==', vendorFrom)
            .where('copiedFromProduct', '==', productId).get().then(docs => {
                if (docs.size) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
    });
}

async function createUserInAuthentication(user) {
    return new Promise(async (resolve, reject) => {
        let userDetails = {
            phoneNumber: user.phoneNo,
            displayName: user.name,
        };
        try {
            const user = await admin.auth().createUser(userDetails);
            resolve(user.uid);
        } catch (error) {
            resolve('');
        }
    });

}

async function approveVendor(vendorDetails) {
    vendorDetails['active'] = true;
    let phoneNo = vendorDetails.phoneNo;
    let users = [];
    let usersDocs;
    if (phoneNo) {
        usersDocs = await db.collection('users').where('phoneNo', '==', phoneNo).get();
        usersDocs.forEach((doc) => {
            if (doc && doc.id && doc.data()) {
                let userId = doc.id;
                users.push(userId);
            }
        });
    } else {
        users[0] = vendorDetails.userId;
    }

    if (users.length > 0) {
        //? If User Exists
        await db.collection('users').doc(users[0]).update({ role: 'vendor', active: true });
    } else {
        //? If User Not Exists
        let userData = vendorDetails;
        userData['lowercaseName'] = userData.name.toLowerCase();
        userData['role'] = 'vendor';
        const authUserId = await createUserInAuthentication(userData);
        if(authUserId) {
            await db.collection('users').doc(authUserId).set(userData);
            users.push(authUserId);
        }
    }

    // ? Update Vendor Details in Vendor sub-collection
    const vendorRef = db.collection('features').doc('multiVendor').collection('vendors').doc(users[0]);
    vendorRef.get().then(async doc => {
        if (doc.exists) {
            await vendorRef.update(vendorDetails);
        } else {
            await vendorRef.set(vendorDetails);
        }
    });
    // ? /Update Vendor Details in Vendor sub-collection

    const chatData = {
        message: `You have been approved as a vendor by the admin. Please contact admin for more information`,
        title: 'Congratulations!',
        author: 'admin',
        type: 'txt',
    };
    console.log('approved vendorId: ', users[0]);
    const chatObj = await db.collection('chats').doc(users[0]).get();
    if (chatObj && chatObj.data()) {
        await globalFile.chatMessage(chatData, users[0]);
    }
}

async function rejectVendor(vendorDetails) {
    let phoneNo = vendorDetails.phoneNo;
    let users = [];
    let usersDocs;
    if (phoneNo) {
        usersDocs = await db.collection('users').where('phoneNo', '==', phoneNo).get();
        usersDocs.forEach((doc) => {
            if (doc && doc.id && doc.data()) {
                let userId = doc.id;
                users.push(userId);
            }
        });
    } else {
        users[0] = vendorDetails.userId;
    }
    const chatData = {
        message: `You have been rejected as a vendor by the admin, Reason ${vendorDetails.rejectedReason}`,
        title: "Rejected!",
        author: "admin",
        type: "txt",
    };
    console.log("Rejected vendorId: ", users[0]);
    const chatObj = await db.collection("chats").doc(users[0]).get();
    if (chatObj && chatObj.data()) {
        await globalFile.chatMessage(chatData, users[0]);
    }
}

// Vendor registration approval Or Rejection
exports.onUpdateVendorRequest = functions.firestore
    .document('features/multiVendor/requests/{requestId}').onUpdate(async (change, context) => {
        const requestId = context.params.requestId;
        const before = change.before.data();
        const after = change.after.data();
        if (before.approved === false && after.approved === true) {
            await approveVendor(after);
        }
        if (!before.rejected && after.rejected === true) {
            await rejectVendor(after);
        }
    });


exports.onCreateVendorRequest = functions.firestore
    .document('features/multiVendor/requests/{requestId}').onCreate(async (snap, context) => {
        const requestId = context.params.requestId;
        const requestDoc = snap.data();
        const envDoc = await db.collection('settings').doc('environment').get();
        const multiVendorDetails = await db.collection('features').doc('multiVendor').get();
        if (multiVendorDetails && multiVendorDetails.data() && multiVendorDetails.data().autoApprove && (envDoc.data().vendorsLimit > multiVendorDetails.data().count)) {
            await approveVendor(requestDoc);
        } else {
            await db.collection('features').doc('multiVendor').collection('requests').doc(requestId).update({
                approved: false
            });
        }
    });

exports.onCreateVendorForm = functions.firestore
    .document('forms/{formId}').onCreate(async (snap, context) => {
        const formId = context.params.formId;
        const formDoc = snap.data();
        if (formDoc && formDoc.formType == 'vendor') {
            await db.collection('features').doc('multiVendor').collection('requests').doc(formId).set(formDoc);
        }
    });


exports.onUpdateVendor = functions.firestore.document('features/multiVendor/vendors/{vendorId}').onUpdate(async (change, context) => {
    const vendorId = context.params.vendorId;
    const after = change.after.data();
    const before = change.before.data();

    //active by vendor change 
    if (('activeByVendor' in after) && (after.activeByVendor !== before.activeByVendor)) {
        const products = await getVendorProducts(vendorId);
        if (!products.length) {
            return;
        }
        for (const product of products) {
            await db.collection('products').doc(product.id).update({
                inactiveByVendor: !after.activeByVendor
            });
        }
        let chatData = {
            message: '',
            title: '',
            author: 'admin',
        };
        if(after.activeByVendor){
            chatData.title = 'Store is now open';
        } else{
            chatData.title = 'Store is now closed';
        }
        const chatObj = await db.collection('chats').doc(vendorId).get();
        if (chatObj && chatObj.data()) {
            await globalFile.chatMessage(chatData, vendorId);
        }
    }
    
    // Make all approved products inactive
    if (('productsInactive' in after) && (after.productsInactive !== before.productsInactive)) {
        const products = await getVendorProducts(vendorId);
        if (!products.length) {
            return;
        }
        const prodStatus = !after.productsInactive;
        console.log('prodStatus:', prodStatus);
        for (const product of products) {
            if (product.approved) {
                console.log('approved:', product.approved);
                console.log('product.id:', product.id);
                await db.collection('products').doc(product.id).update({
                    status: prodStatus
                });
            }
        }
    }

    //active by admin change
    if ((('active' in after) && (after.active !== before.active)) || (('productsActive' in after) && (after.productsActive !== before.productsActive))) {
        const products = await getVendorProducts(vendorId);
        if (!products.length) {
            return;
        }
        for (const product of products) {
            if (product.approved) {
                await db.collection('products').doc(product.id).update({
                    status: after.active
                });
            }
        }
    }

    //update products vendor name
    if(after.displayName !== before.displayName) {
        const products = await getVendorProducts(vendorId);
        if (!products.length) {
            return;
        }
        for (const product of products) {
            await db.collection('products').doc(product.id).update({
                vendorName: after.displayName
            });
        }
    }
});

exports.onUpdateMultiVendor = functions.firestore.document('features/multiVendor').onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    if (('active' in after) && (after.active !== before.active)) {
        const vendorIds = [];
        const vendorsRef = await db.collection('features').doc('multiVendor').collection('vendors').get();
        vendorsRef.forEach(doc => {
            if (doc && doc.id) {
                vendorIds.push(doc.id);
            }
        });
        if (!vendorIds.length) {
            return;
        }
        for (const id of vendorIds) {
            await db.collection('features').doc('multiVendor').collection('vendors').doc(id).update({
                active: after.active
            });
        }
    }
});

async function getVendorProducts(vendorId) {
    return new Promise(async (resolve, reject) => {
        try {
            const products = [];
            const productRef = await db.collection('products').where('vendorId', '==', vendorId).get();
            productRef.forEach(doc => {
                if (doc && doc.id && doc.data()) {
                    products.push({
                        id: doc.id,
                        approved: 'approved' in doc.data() ? doc.data().approved : true
                    });
                }
            });
            resolve(products);
        } catch (error) {
            console.log('error', error);
            resolve([]);
        }

    });
}

exports.onDeleteVendor = functions.firestore.document('features/multiVendor/vendors/{vendorId}').onDelete(async (snap, context) => {
    const vendorId = context.params.vendorId;
    const products = await getVendorProducts(vendorId);
    if (!products.length) {
        return;
    }
    for (const product of products) {
        await db.collection('products').doc(product.id).update({
            vendorName: '',
            vendorId: ''
        });
    }
});

exports.makeVendorSections = functions.https.onCall(async (vendorId, context) => {
        const vendorDoc = await db.collection('features').doc('multiVendor').collection('vendors').doc(vendorId).get();
        if (!(vendorDoc && vendorDoc.data() && vendorDoc.data().sections)) {
            let imageBlock = {
                createdAt: new Date(moment().tz(timeZone)),
                description: '',
                title: '',
                type: 'image-block',
                coverImage: {
                    mob: '', org: '', thumb: ''
                }
            }
            const imageBlockWidgetRef = await db.collection('widgets').add(imageBlock);

            let videoBlock = {
                createdAt: new Date(moment().tz(timeZone)),
                description: '',
                title: '',
                type: 'video-block',
                coverImage: {
                    mob: '', org: '', thumb: ''
                },
                videoID: ''
            }
            const videoBlockWidgetRef = await db.collection('widgets').add(videoBlock);

            let textBlock = {
                createdAt: new Date(moment().tz(timeZone)),
                description: '',
                title: '',
                type: 'text-block'
            }
            const textBlockWidgetRef = await db.collection('widgets').add(textBlock);

            let productCarousel = {
                createdAt: new Date(moment().tz(timeZone)),
                title: '',
                type: 'product-carousel'
            }
            const productCarouselWidgetRef = await db.collection('widgets').add(productCarousel);

            let bannerSlider = {
                createdAt: new Date(moment().tz(timeZone)),
                title: '',
                type: 'banner-slider'
            }
            const bannerSliderWidgetRef = await db.collection('widgets').add(bannerSlider);

            let textBlock2 = {
                createdAt: new Date(moment().tz(timeZone)),
                description: '',
                title: '',
                type: 'text-block'
            }
            const textBlockWidgetRef2 = await db.collection('widgets').add(textBlock2);

            // vendorDoc
            let sections = [
                {
                    location: 'all',
                    widgetID: imageBlockWidgetRef.id,
                    widgetType: 'image-block',
                    sectionName: 'Artist Signature'
                },
                {
                    location: 'all',
                    widgetID: videoBlockWidgetRef.id,
                    widgetType: 'video-block',
                    sectionName: 'Intro Video'
                },
                {
                    location: 'all',
                    widgetID: textBlockWidgetRef.id,
                    widgetType: 'text-block',
                    sectionName: 'Bio of Artist'
                },
                {
                    location: 'all',
                    widgetID: productCarouselWidgetRef.id,
                    widgetType: 'product-carousel',
                    sectionName: 'Current available artwork'
                },
                {
                    location: 'all',
                    widgetID: bannerSliderWidgetRef.id,
                    widgetType: 'banner-slider',
                    sectionName: 'Available for commission artwork'
                },
                {
                    location: 'all',
                    widgetID: textBlockWidgetRef2.id,
                    widgetType: 'text-block',
                    sectionName: 'Achievements'
                },
            ];
            await db.collection('features').doc('multiVendor').collection('vendors').doc(vendorId).update({sections})
            return 'sections created successfully'
        }
    });


exports.onCreateVendor = functions.firestore
    .document('features/multiVendor/vendors/{vendorId}').onCreate(async (snap, context) => {
        const vendorId = context.params.vendorId;
        const vendorDoc = snap.data();
        generateQRCode(vendorId, vendorDoc);
        
        let isUniversal = false;
        const envDoc = await db.collection('settings').doc('environment').get();
        if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
            isUniversal = envDoc.data().isUniversal;
        }

        const sameVendorNames = await db.collection('features').doc('multiVendor').collection('vendors').where('name', '==', vendorDoc.name).get();
        let vendors = [];
        sameVendorNames.forEach(async (doc) => {
            vendors.push({id: doc.id, ...doc.data()});
        });
        if (!vendors.length) {
            vendors[0] = {id: vendorId, ...vendorDoc};
        }
        if (isUniversal) {
            await slugFile.generateSlugs({choice: 'vendors'}, vendors);
        }
    });


async function generateQRCode(vendorId, vendorDoc) {
    const dataUrl = encodeURL(`${websiteLink}/vendor-info/${vendorDoc.name}/${vendorId}`);
    QRCode.toDataURL(dataUrl, { version: 40 }, async function (err, base64) {
        console.log('base64:', base64);
        const mimeType = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
        const base64EncodedImageString = base64.replace(/^data:image\/\w+;base64,/, '')
        const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(imageBuffer);
        // Define file and fileName
        const file = bucket.file(`vendors/${vendorId}/qrCode/qrCode.png`);
        bufferStream.pipe(file.createWriteStream({
            metadata: {
            contentType: mimeType
            },
            public: true,
            validation: "md5"
        }))
            .on('error', function (err) {
            console.log('error from image upload', err);
            })
            .on('finish', function () {
                // The file upload is complete.
                file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(async (signedUrls) => {
                // signedUrls[0] contains the file's public URL
                let pictureURL = signedUrls[0];
                await db.collection('features').doc('multiVendor').collection('vendors').doc(vendorId).update({qrCode: pictureURL});
                });
            });    
    })
}

function encodeURL(url) {
    return ((url.toLowerCase().trim().replace(/ /g, '-')));
}

// async function runQr(){
//     const vendorDoc = await db.collection('features').doc('multiVendor').collection('vendors').doc('wYaqlvSo0qP7lmU2IAt1mF7BQ3e2').get();
//     generateQRCode('wYaqlvSo0qP7lmU2IAt1mF7BQ3e2', vendorDoc.data());
// }

// runQr();