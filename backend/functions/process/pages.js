const functions = require("firebase-functions");
var globalFile = require('./global');
var universalFile = require('../universal/universal');
var slugFile = require('../universal/slug');

const {
    admin,
    db,
    bucket
} = require('./admin');


exports.onCreatePage = functions.firestore
    .document("pages/{pageId}")
    .onCreate(async (snap, context) => {
        const pageId = context.params.pageId;
        const pageData = snap.data();

        let isUniversal = false;
        const envDoc = await db.collection('settings').doc('environment').get();
        if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
            isUniversal = envDoc.data().isUniversal;
        }
        
        const samePageNames = await db.collection('pages').where('name', '==', pageData.name).get();
        let pages = [];
        samePageNames.forEach(async (doc) => {
            pages.push({id: doc.id, ...doc.data()});
        });
        if (!pages.length) {
            pages[0] = {id: pageId, ...pageData};
        }
        if (isUniversal) {
            const slugName = await slugFile.generateSlugs({choice: 'pages', mode: 'onCreate'}, pages);
            //await universalFile.createJsonFile('pages', 'new', pageId, {data: pageData});
            await db.collection('management').doc('universal').collection('page-updates').doc(slugName).set({mode: 'new', data: {data: pageData}});
        }
    });


exports.onUpdatePage = functions.firestore.document('pages/{pageId}')
.onUpdate(async (change, context) => {
    let pageData = change.after.data();
    const oldPageData = change.before.data();
    const pageId = context.params.pageId;
    
    let isUniversal = false;
    const envDoc = await db.collection('settings').doc('environment').get();
    if (envDoc.data() && envDoc.data().hasOwnProperty('isUniversal')){
        isUniversal = envDoc.data().isUniversal;
    }
    if (isUniversal) {
        if (pageId == 'homepage') {
            //await universalFile.createJsonFile('widgets', 'update', pageId, {});
            await db.collection('management').doc('universal').collection('widget-updates').doc(pageId).set({mode: 'edit'});
        } else if(pageId != 'homepage' || pageId != 'about'){
            //await universalFile.createJsonFile('pages', 'edit', pageId, {data: pageData});
            await db.collection('management').doc('universal').collection('page-updates').doc(pageId).set({mode: 'edit', data: {data: pageData}});
            if (oldPageData.slug.name !== pageData.slug.name) {
                await db.collection('management').doc('universal').collection('page-updates').doc(pageId).set({mode: 'new', data: {data: pageData}});
            }
        }
    }
});