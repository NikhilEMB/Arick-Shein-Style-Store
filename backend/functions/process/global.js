const {
    db,
    currencySymbol,timeZone,
} = require('./admin');
var moment = require('moment-timezone');

module.exports = {
    chatMessage: async function (data, uid) {
        await addChatMsg(data, uid)
    },

    addToUserWallet: async function (data) {
        const response = await addMoneyToUserWallet(data);
        return response;
    },

    debitFromUserWallet: async function (data) {
        const response = await debitFromUserWallet(data);
        return response;
    },

    dummyCallToRemoveColdStart: async function () {
        const response = await dummyCallToRemoveColdStart();
        return response;
    },

    createSlugName: async function (data) {
        const response = await createSlugName(data);
        return response;
    },

    generateSlugs: async function (data, products) {
        const response = await generateSlugs(data, products);
        return response;
    },

    getEnvironmentVariables: async function () {
        const response = await getEnvironmentVariables();
        return response;
    }
}

async function addChatMsg(data, uid) {
    return new Promise(async (resolve, reject) => {

        data['createdAt'] = new Date();
        data['isRead'] = false;
        data['published'] = true;

        const chatRef = db.collection('chats').doc(uid);
        const chatMessageRef = await db.collection('chats').doc(uid).get();
        const chatData = chatMessageRef.data();

        chatData['lastMessage'] = data.message;
        chatData['lastMessageAt'] = new Date();
        chatData['totalMsgs'] = chatData.totalMsgs ? chatData.totalMsgs + 1 : 1;

        if (data.author === 'admin') {
            if (!chatData.userActive) {
                chatData['unreadAdminMsgs'] = chatData.unreadAdminMsgs ? chatData.unreadAdminMsgs + 1 : 1;
            } else {
                data['isRead'] = true;
            }
        } else {
            if (!chatData.adminActive) {
                chatData['unreadMsgs'] = chatData.unreadMsgs ? chatData.unreadMsgs + 1 : 1;
            } else {
                data['isRead'] = true;
            }
        }

        await chatRef.update(chatData);

        await db.collection('chats').doc(uid).collection('messages').add(data);

        resolve(true);
    });
}

async function addMoneyToUserWallet(data) {
    let storeName = 'Store';
    if(!data.storeName) {
        const storeInfo = await db.collection('settings').doc('store').get();
        if (storeInfo.data()) {
            storeName = storeInfo.data().storeName || 'Store';
        }
    }
    const amount = data.amount;
    const uid = data.uid;
    const moneyType = data.type || 'wallet';
    const reason = data.message || '';
    const userRef = await db.collection('users').doc(uid).get();
    try {
        let userData = userRef.data();
        let userWallet = userData.wallet;
        let balance = userWallet.balance;
        let cashback = userWallet && userWallet.cashback ? userWallet.cashback : 0;
        if(moneyType === 'cashback') {
            cashback += amount;
        } else {
            balance += amount;
        }
        let transaction = {
            amount: amount,
            message: data.msg || `Credited by ${storeName} in ${moneyType}`,
            createdAt: new Date(),
            type: 'credit',
            reason
        };
        await db.collection('users').doc(uid).update({
            wallet: {
                balance,
                cashback,
                lastTransactions: transaction
            }
        });
        await db.collection('users').doc(uid).collection('walletTransactions').add(transaction);
        let chatData = {
            message: `${storeName} has credited ${currencySymbol}${amount} to your ${moneyType === 'cashback' ? 'cashback balance' : 'wallet'}.`,
            author: 'admin',
            type: 'txt',
        }
        await addChatMsg(chatData, uid);
        return {
            status: true
        }
    } catch (error) {
        console.log(error);
        return {
            status: false
        }
    }
}

async function debitFromUserWallet(data) {
    const amount = data.amount;
    const uid = data.uid;
    const moneyType = data.type || 'wallet';
    const userRef = await db.collection('users').doc(uid).get();
    try {
        let userData = userRef.data();
        let userWallet = userData.wallet;
        let balance = userWallet.balance;
        let cashback = userWallet && userWallet.cashback ? userWallet.cashback : 0;
        if(moneyType === 'cashback') {
            cashback = cashback - amount;
        } else {
            balance -= amount;
        }
        let transaction = {
            amount: amount,
            message: data.txnMsg,
            createdAt: new Date(),
            type: 'debit',
            reason: data.reason || ''
        };
        await db.collection('users').doc(uid).update({
            wallet: {
                balance,
                cashback,
                lastTransactions: transaction
            }
        });
        await db.collection('users').doc(uid).collection('walletTransactions').add(transaction);
        let chatData = {
            message: data.chatMsg,
            author: 'admin',
            type: 'txt',
        }
        await addChatMsg(chatData, uid);
        return {
            status: true
        }
    } catch (error) {
        console.log(error);
        return {
            status: false
        }
    }
}

async function dummyCallToRemoveColdStart() {
    await db.collection('settings').doc('environment').get();
    return true;
}

async function createSlugName(name){ 
    return name.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');  
}

async function generateSlugs(options, products){
    for (let product of products) {
        if (!('slug' in product)) {
        let slugName;
        if ('prodName' in product) {
            slugName = await createSlugName(product.prodName);
        } else{
            slugName = await createSlugName(product.name);
        }
        let slug = {
            name: slugName,
            updatedBy: 'system',
            updatedAt: new Date(moment().tz(timeZone))
        }
        let sameProdNames;
        const name = (product.prodName || product.name).toLowerCase().trim();
        if ('prodName' in product) {
            sameProdNames = products.filter(obj => obj.prodName.toLowerCase().trim() === name);
        } else{
            sameProdNames = products.filter(obj => obj.name.toLowerCase().trim() === name);
        }   
        if (sameProdNames.length) {
            let lastSlug = null;
            for (const prod of sameProdNames.reverse()) {
                if ('slug' in prod){
                    lastSlug = prod.slug;
                    break;
                }
            }
            if (lastSlug) {
                const slugArr = lastSlug.name.split('-');
                let slugCount = parseInt(slugArr[slugArr.length-1]);
                slug.name = !isNaN(slugCount) ? slug.name + '-' + ++slugCount : slug.name + '-1';
            }
        }
        product.slug = slug;
        if (options.choice === 'products') {
            console.log('prodID: ', product.id);
            const prodName = product.prodName.trim();
            await db.collection('products').doc(product.id).update({slug, prodName});
        } else if(options.choice === 'options'){
            const prodName = product.prodName.trim();
            console.log('prodID: ', options.productId);
            await db.collection('products').doc(options.productId).collection('options').doc(product.id).update({slug, prodName});
        } else if(options.choice === 'categories'){
            const name = product.name.trim();
            console.log('catID: ', product.id);
            await db.collection('categories').doc(product.id).update({slug, name});
        } else if(options.choice === 'subcategories'){
            const name = product.name.trim();
            console.log('subCatID: ', options.categoryId);
            await db.collection('categories').doc(options.categoryId).collection('subcategories').doc(product.id).update({slug, name});
        } else if(options.choice === 'brands'){
            const name = product.name.trim();
            console.log('brandID: ', product.id);
            await db.collection('brands').doc(product.id).update({slug, name});
        } else if(options.choice === 'pages'){
            const name = product.name.trim();
            console.log('pageID: ', product.id);
            await db.collection('pages').doc(product.id).update({slug, name});
        } else if(options.choice === 'vendors'){
            const name = product.name.trim();
            console.log('vendorID: ', product.id);
            await db.collection('features').doc('multiVendor').collection('vendors').doc(product.id).update({slug, name});
        }
        if (options.mode === 'onCreate'){
            return slug.name;
        }
            
        }
    }
}

async function getEnvironmentVariables() {
    return new Promise(async (resolve, reject) => {
        const envDoc = await db.collection('settings').doc('environment').get();
        const envData = envDoc.data();
        resolve(envData);
    });
}