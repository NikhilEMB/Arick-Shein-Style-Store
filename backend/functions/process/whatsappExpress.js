const {
    admin,
    db,
    websiteLink,
    bucket,
    projectId,
    firebaseLocation,
    typesenseCred,
    fbGraphApi,
    timeZone,
    currencyCode,
    adminName,
    websiteData,
    razorpayUrl
} = require('./admin');

const https = require('https')
const functions = require("firebase-functions");
const cors = require('cors'),
    express = require("express"),
    axios = require("axios").default,
    app = express();
app.use(cors({ origin: true }));
const jsonToCsvConverter = require('json-2-csv')
const crypto = require("crypto");
const moment = require('moment-timezone')


let credData;
let menuDocs;
let storeData;
let integrationCreds = {};


const fetchCreds = async () => {
    await new Promise(async (resolve) => {
        // console.time('fetchCreds')
        const doc = await db.collection('whatsapp').doc('account').get()
        if (doc.data()) {
            credData = doc.data().credentials;
            doc.data().setting ? credData.setting = doc.data().setting : {}
            console.log("fetched creds : ", Object.keys(doc.data().credentials).length)
        } else {
            console.log("credientials not available, please update creds, fetchCreds")
        }
        // console.timeEnd('fetchCreds')
        resolve()
    })
};

const fetchStoreData = async () => {
    await new Promise(async (resolve) => {
        const storeDataRef = await db.collection('settings').doc('store').get()
        if (storeDataRef.data()) {
            storeData = storeDataRef.data()
        } else {
            console.log("store data is not available, please update , fetchStoreData")
        }
        resolve()
    })
};


const fetchMenuDocsDb = async (fetchFromCache) => {
    if (fetchFromCache) {
        const docs = await db.doc(`/whatsapp/cacheDocs/cacheMenuDocs/allMenuDocs`).get();
        if (docs.data()) {
            const menuItems = { ...docs.data() }
            console.log("total docs fetched : ", Object.keys(menuItems).length)
            menuDocs = menuItems
            return menuItems
        } else {
            return (await fetchMenuDocsDb())
        }
    }
    else {
        return new Promise(async resolve => {
            try {
                const docs = await db.collection(`/whatsapp/menu/menu-items`).get()
                if (!docs.empty) {
                    const menuItems = {}
                    docs.forEach((doc) => {
                        menuItems[doc.id] = doc.data()
                    })
                    menuDocs = menuItems
                    console.log("total docs fetched2 : ", docs.size)
                    resolve(menuItems)
                    db.doc(`whatsapp/cacheDocs/cacheMenuDocs/allMenuDocs`).set({ ...menuItems }, { merge: true }).catch((error) => { console.log("error in fetchMenuDocsDb while saving in cacheMenuDocs, error : ", error) })
                }
                else {
                    console.log('menu-items not present please update database, fetchMenuDocsDb')
                    resolve(undefined)
                }
            } catch (error) {
                console.log("error in fetchMenuDocsDb for project, error : ", error)
                resolve(undefined)
            }
        })
    }
}

const checkResources = async () => {
    try {
        const timstamp = Date.now()
        console.time(`time taken to fetch resource ${timstamp}`)
        const promiseArray = []
        if (!credData) {
            promiseArray.push(fetchCreds())
        }
        if (!menuDocs) {
            promiseArray.push(fetchMenuDocsDb(true))
        }
        if (!storeData) {
            promiseArray.push(fetchStoreData())
        }
        await Promise.all(promiseArray)
        console.timeEnd(`time taken to fetch resource ${timstamp}`)

        return
    } catch (error) {
        console.log("error in checking Resources, error : ", error)
    }
}

const unsubscribeFunction = {}
const checkResources2 = async () => {
    try {
        unsubscribeFunction.pending = true
        const timstamp = Date.now()
        console.time(`fetch resource ${timstamp}`)
        const location = { menuDocs: "/whatsapp/cacheDocs/cacheMenuDocs/allMenuDocs", credData: "/whatsapp/account", storeData: "/settings/store" }
        const promiseArray = []
        if (!credData) {
            unsubscribeFunction['credData'] ? unsubscribeFunction['credData']() : {}
            promiseArray.push(new Promise(async (resolve) => {
                unsubscribeFunction['credData'] = db.doc(location.credData).onSnapshot((doc) => {
                    if (doc.data()) {
                        credData = doc.data().credentials;
                        doc.data().setting ? credData.setting = doc.data().setting : {}
                        console.log("credData ", Object.keys(credData).length)
                    } else {
                        console.log("credData not available")
                    }
                    resolve()
                })
                // .catch(async (error) => {
                //     console.log("error in checkResources2 credData, error : ", error)
                //     await fetchCreds()
                //     resolve()
                // })
            }))
        }
        if (!menuDocs) {
            unsubscribeFunction['menuDocs'] ? unsubscribeFunction['menuDocs']() : {}
            promiseArray.push(new Promise(async (resolve) => {
                unsubscribeFunction['menuDocs'] = db.doc(location.menuDocs).onSnapshot((data) => {
                    if (data.data()) {
                        menuDocs = data.data()
                        console.log("menuDocs : ", Object.keys(menuDocs).length)
                    } else {
                        console.log("menu docs not available")
                    }
                    resolve()
                })
                // .catch(async (error) => {
                //     console.log("error in checkResources2 credData, error : ", error)
                //     await fetchMenuDocsDb(true)
                //     resolve()
                // })
            }))
        }
        if (!storeData) {
            unsubscribeFunction['storeData'] ? unsubscribeFunction['storeData']() : {}
            promiseArray.push(new Promise(async (resolve) => {
                unsubscribeFunction['storeData'] = db.doc(location.storeData).onSnapshot((data) => {
                    if (data.data()) {
                        storeData = data.data()
                        console.log("storeData : ", Object.keys(storeData).length)
                    } else {
                        console.log("menu docs not available")
                    }
                    resolve()
                })
                // .catch(async (error) => {
                //     console.log("error in checkResources2 credData, error : ", error)
                //     await fetchStoreData()
                //     resolve()
                // })
            }))
        }
        await Promise.all(promiseArray)
        console.timeEnd(`fetch resource ${timstamp}`)
        unsubscribeFunction.pending = false
        return
    } catch (error) {
        console.log("error in checking Resources, error : ", error)
    }
}

app.post("/webhook", async (req, res) => {
    // const msg = JSON.stringify(req.body, null, 2)
    // console.log(msg ? msg : 'no msg');
    const object = req.body.object
    if (object) {
        if (
            req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value.messages &&
            req.body.entry[0].changes[0].value.messages[0]
        ) {
            try {
                console.log('msg receive')
                const body = req.body;
                const senderNo = body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
                const msg_body = body.entry[0].changes[0].value.messages; // extract the message text from the webhook payload
                const userName = body.entry[0].changes[0].value.contacts && body.entry[0].changes[0].value.contacts[0] && body.entry[0].changes[0].value.contacts[0].profile && body.entry[0].changes[0].value.contacts[0].profile.name ? body.entry[0].changes[0].value.contacts[0].profile.name : ""
                let userId;
                let userChatRef
                let sessionExist = false;

                res.sendStatus(200);
                //find user ID
                console.time(userName + " ")
                const userDetails = await db.collection('chats').where('userPhoneNo', '==', `+${senderNo}`).get()
                console.timeEnd(userName + " ")
                if (!(credData && menuDocs && storeData)) {
                    await checkResources2()
                }
                markMsgRead(msg_body[0].id)
                if (userDetails.empty) {
                    await sendTextMsg(senderNo, `*Hi ${userName ? userName : ''} 😀,*\n\nGreetings from *${adminName}*,\n\nWe’re glad that you chose us. ✨\nPlease wait while we setup everything for you. ⏳\n\nThank you so much! 🤍`, '', {}, true)
                    console.log('new')
                    const newUserDetails = {
                        phoneNumber: `+${senderNo}`,
                        displayName: userName ? userName : 'unknown'
                    }
                    try {
                        console.time('save new user')///
                        const userID = await admin.auth().createUser(newUserDetails);
                        db.collection('chats').doc(userID.uid).set({
                            userPhoneNo: newUserDetails.phoneNumber,
                            name: newUserDetails.displayName,
                            totalMsgs: 1,
                            unreadMsgs: 0,
                            unreadAdminMsgs: 1,
                        }, { merge: true }).catch((error) => { console.log('error while setting user doc, userID : ', userID.uid, '\nerror : ', error) })
                        console.log('new user ID', userID.uid)
                        console.timeEnd('save new user')///

                        userId = userID.uid;
                        let bodyData
                        if (menuDocs && menuDocs['menu-welcome-msg']) {
                            bodyData = await getDocs('menu-welcome-msg')
                        } else {
                            bodyData = await getDocs('menu-entry-point');
                        }
                        if (bodyData !== false) {
                            await createDocMsg(senderNo, bodyData, userId, { userPhoneNo: newUserDetails.phoneNumber, name: newUserDetails.displayName })
                        }
                        //admin.uid took time to create user doc in collection
                        await db.collection('whatsapp').doc("usersByWhatsapp").collection("usersDetails").doc(userID.uid).set({ ...newUserDetails, createdAt: new Date() })
                        await timeDelay(2)
                        await saveMsgForChat('user', userID.uid, msg_body[0], undefined)
                    } catch (error) {
                        console.log("error in create new user error : ", error)
                        collectErrors(senderNo, error, 'app.post', 'user does not exist in users collection but exists in authentication')
                    }
                    return
                }
                else {
                    console.log('old')
                    userDetails.forEach(async userDoc => {
                        console.log('user userId', userDoc.id)
                        userId = userDoc.id;
                        userChatRef = userDoc.data()
                    })
                }
                if (userChatRef) {
                    saveMsgForChat('user', userId, msg_body[0], undefined, userChatRef)
                    //store msg at common place

                    if (userChatRef.whatsappMeta && userChatRef.whatsappMeta.sessionExpiry && (userChatRef.whatsappMeta.sessionExpiry * 1000 > Date.now())) {
                        //session exists
                        sessionExist = true
                    } else {
                        //new session
                        console.log("new session")
                    }

                    if (userChatRef.botState) {
                        //what to send after a question
                        let result = false
                        //weather condition available
                        if (userChatRef.botState.isCondition && userChatRef.botState.condition && Object.keys(userChatRef.botState.condition).length) {
                            //condition available
                            if (userChatRef.botState.condition.inputType && getTextFromUserInput(msg_body[0]).type.toLowerCase().includes(userChatRef.botState.condition.inputType.toLowerCase())) {
                                //condition is true
                                //store user input in the given variable if variable exist in userChatRef.botState
                                if (userChatRef.botState.variable) {
                                    if (!userChatRef.variableState) {
                                        userChatRef.variableState = {}
                                    }
                                    userChatRef.variableState[userChatRef.botState.variable] = getTextFromUserInput(msg_body[0])
                                }
                                if (userChatRef.botState.nextDocId) {
                                    const bodyData = await getDocs(userChatRef.botState.nextDocId);
                                    if (bodyData) {
                                        result = await createDocMsg(senderNo, bodyData, userId, userChatRef)
                                    }
                                }
                            } else {
                                //condition is false
                                userChatRef.botState.condition.invalidInputCount = userChatRef.botState.condition.invalidInputCount && userChatRef.botState.condition.invalidInputCount > 0 ? userChatRef.botState.condition.invalidInputCount - 1 : 0
                                //weather invalid count is availble
                                if (userChatRef.botState.condition.invalidInputCount) {
                                    //invalid count is availble
                                    if (userChatRef.botState.condition.invalidInput && userChatRef.botState.condition.invalidInput.type) {
                                        //invalid input msg is available
                                        if (userChatRef.botState.condition.invalidInput.type == 'id' && userChatRef.botState.condition.invalidInput.id) {
                                            const bodyData = await getDocs(userChatRef.botState.condition.invalidInput.id);
                                            if (bodyData) {
                                                result = await createDocMsg(senderNo, bodyData, userId, userChatRef, true)
                                            }
                                        } else if (userChatRef.botState.condition.invalidInput.type == 'text' && userChatRef.botState.condition.invalidInput.text) {
                                            result = await sendTextMsg(senderNo, userChatRef.botState.condition.invalidInput.text, userId, userChatRef, true)
                                        } else {
                                            console.log("invalid type in userChatRef.botState.condition.invalidInput.type, botState", userChatRef.botState)
                                        }
                                    }
                                    if (userChatRef.botState.condition.sendMsgAgain) {
                                        //send prev msg again
                                        const bodyData = await getDocs(userChatRef.botState.prevDocId);
                                        if (bodyData) {
                                            result = await createDocMsg(senderNo, bodyData, userId, userChatRef, true)
                                        }
                                    }
                                } else {
                                    //invalid count is not availble
                                    if (userChatRef.botState.condition.errorInput && userChatRef.botState.condition.errorInput.type) {
                                        //invalid input msg is available
                                        if (userChatRef.botState.condition.errorInput.type == 'id' && userChatRef.botState.condition.errorInput.id) {
                                            const bodyData = await getDocs(userChatRef.botState.condition.errorInput.id);
                                            if (bodyData) {
                                                result = await createDocMsg(senderNo, bodyData, userId, userChatRef)
                                            }
                                        } else if (userChatRef.botState.condition.errorInput.type == 'text' && userChatRef.botState.condition.errorInput.text) {
                                            result = await sendTextMsg(senderNo, userChatRef.botState.condition.errorInput.text, userId, userChatRef)
                                        } else {
                                            console.log("invalid type in userChatRef.botState.condition.errorInput.type, botState", userChatRef.botState)
                                        }
                                    }
                                }
                            }
                        } else {
                            //condition not available
                            if (userChatRef.botState.variable) {
                                if (!userChatRef.variableState) {
                                    userChatRef.variableState = {}
                                }
                                userChatRef.variableState[userChatRef.botState.variable] = getTextFromUserInput(msg_body[0])
                            }
                            if (userChatRef.botState.nextDocId) {
                                const bodyData = await getDocs(userChatRef.botState.nextDocId);
                                if (bodyData) {
                                    result = await createDocMsg(senderNo, bodyData, userId, userChatRef)
                                }
                            }
                        }
                        if (result) {
                            return
                        }
                    }

                    const msgType = msg_body[0].type;
                    if (msgType == 'text') {
                        await msgTypeText(msg_body[0].text.body, senderNo, userId, userName, userChatRef, sessionExist)
                    }
                    else if (msgType == 'interactive' || msgType == 'button') {
                        await msgTypeIntractive(msg_body[0], senderNo, userId, userChatRef)
                    }
                    //working on add to cart
                    else if (msgType == 'order' && msg_body[0].order.product_items && msg_body[0].order.product_items[0]) {
                        sendTextMsg(senderNo, "Thank You,\n\nWe are adding product in your cart.\nPlease wait for a moment. ⏳", userId, userChatRef)
                        await addToCart(senderNo, msg_body[0].order.product_items, userId, userChatRef)
                    }
                } else {
                    console.log("user not found, phonenNo : ", senderNo)
                    collectErrors(senderNo, 'user not found, phonenNo ', 'whatsapp express', 'user not found in chat collection')
                }
            } catch (error) {
                console.log("error occured in whatsapp express : ", error)
                collectErrors("global", error, 'whatsapp express', 'something went wrong in whatsapp express unhandled error, ' + JSON.stringify(req.body.entry[0].changes[0].value.messages[0]))
            }

            return
        }
        else if (
            req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value.statuses &&
            req.body.entry[0].changes[0].value.statuses[0]
        ) {
            res.sendStatus(200);
            try {
                console.log('msg status changed')
                const value = req.body.entry[0].changes[0].value.statuses[0]
                await updateMsgStatus(value)
            } catch (error) {
                console.log("error in updateMsgStatus app.post", error)
                collectErrors('unknown', error, 'app.post', 'error in updateMsgStatus app.post')
            }
            return
        }
        else if (
            req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0] &&
            req.body.entry[0].changes[0].value) {
            res.sendStatus(200);
            try {
                console.log('account related updates')
                const changes = req.body.entry[0].changes[0]
                await db.collection("whatsapp").doc('logs').collection("accountUpdateMsg").add({
                    createdAt: new Date(),
                    msgObj: changes,
                    msg: "account related updates"
                })
                if (changes.field == "message_template_status_update") {
                    const updatedObj = { status: changes.value.event.toLowerCase(), templateId: changes.value.message_template_id }
                    changes.value.reason ? updatedObj.reason = changes.value.reason : {}
                    const templateDocRef = await db.collection('whatsapp').doc('templates').collection('list').doc(changes.value.message_template_name).get()
                    if (templateDocRef.data()) {
                        await db.collection('whatsapp').doc('templates').collection('list').doc(changes.value.message_template_name).update({ ...updatedObj })
                    }
                    const templateDocRef2 = await db.collection('whatsapp').doc('templates').collection('whatsappList').doc(changes.value.message_template_name).get()
                    if (templateDocRef2.data()) {
                        await db.collection('whatsapp').doc('templates').collection('whatsappList').doc(changes.value.message_template_name).update({ ...updatedObj })
                    }

                }
                else if (changes.field == "phone_number_quality_update" && changes.value.current_limit) {
                    let current_limit;
                    if (changes.value.current_limit.toLowerCase().includes('250')) {
                        current_limit = 250
                    }
                    else if (changes.value.current_limit.toLowerCase().includes('50')) {
                        current_limit = 50
                    }
                    else if (changes.value.current_limit.toLowerCase().includes('1k')) {
                        current_limit = 1000
                    }
                    else if (changes.value.current_limit.toLowerCase().includes('10k')) {
                        current_limit = 10000
                    }
                    else if (changes.value.current_limit.toLowerCase().includes('100k')) {
                        current_limit = 100000
                    }
                    else {
                        current_limit = changes.value.current_limit
                    }
                    await db.collection('whatsapp').doc('account').update({ "insights.broadcastLimit": current_limit })
                }
            } catch (error) {
                console.log("error in updateMsgStatus app.post", error)
                collectErrors('unknown', error, 'app.post', 'error in saving account related updates app.post')
            }
            return
        }

        res.sendStatus(200);

        /*
                if (credData == undefined) {
                    await checkResources()
                } else if (object.update) {
                    const timstamp = Date.now()
                    console.time(`update resource via api ${timstamp}`)
                    if (object.credData) {
                        credData = { ...object.credData }
                        console.log("updated creds")
                    }
                    if (object.menuDocs) {
                        menuDocs = { ...object.menuDocs }
                        console.log("updated menuDoc")
                    }
                    if (object.storeData) {
                        storeData = { ...object.storeData }
                        console.log("updated storeData")
                    }
                    console.timeEnd(`update resource via api ${timstamp}`)
                }
        */

        if (!(credData && menuDocs && storeData)) {
            if (!unsubscribeFunction.pending) {
                await checkResources2()
            }
        }
        await sendCartUpdates()
        return
    } else {
        // Return a '404 Not Found' if event is not from a WhatsApp API
        res.sendStatus(404);
    }
});

app.get("/webhook", async (req, res) => {
    if (credData == undefined) {
        await fetchCreds();
    }
    const verify_token = credData ? credData.webhookVerifyToken : 'BWI@123';
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === verify_token) {
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.status(403).send({ error: "either cred data is not available or wrong" });
        }
    }
});

app.get("/", async (req, res) => {
    res.status(200).send("api is working");
});


//format phone no
const formatPhoneNo = (phoneNo) => {
    return phoneNo.startsWith('+') ? phoneNo : `+${phoneNo}`
}

//extract number from string
const extractNumber = (string) => {
    var numsStr = string.replace(/[^0-9]/g, '');
    return parseInt(numsStr);
}

//fetching data from db

//find user ID by phone No
const findUserId = async (senderNo) => {
    // console.log("user no : ", senderNo)
    let userId
    const userDetails = await db.collection('chats').where('userPhoneNo', '==', formatPhoneNo(senderNo)).get()
    if (userDetails.empty) {
        console.log("user Not Found in findUserId, phoneNo : ", senderNo)
    }
    else {
        userDetails.forEach((userDoc) => {
            userId = { uid: userDoc.id, userChat: userDoc.data() }
            console.log("user found in findUserId : ", userId.uid)
        })
    }
    return userId
}

//fetch docs
const getDocs = async (id) => {
    try {
        if (menuDocs && menuDocs[id]) {
            return { ...menuDocs[id] }
        }
        else {
            const docData = await db.collection('whatsapp').doc('menu').collection('menu-items').doc(id).get();
            if (docData.data()) {
                fetchMenuDocsDb()
                return docData.data()
            }
            else {
                console.log("either wrong doc or menu item not available in db, getdocs")
                return undefined
            }
        }
    } catch (error) {
        console.log("either wrong doc or menu item not available in db, getdocs", error)
        collectErrors('unknown', error, 'getDocs', 'error in fetching docs from whatsapp menu collection docID : ' + (id ? id : ''))
        return undefined
    }
}


const msgTypeText = async (msgTxt, senderNo, userId, userName, userChatRef, sessionExist) => {
    const msgText = msgTxt.toLowerCase();
    if (msgText == 'hi' || msgText == 'hii' || msgText == 'hello') { //change`
        const bodyData = await getDocs('menu-entry-point');
        if (bodyData !== false) {
            await createDocMsg(senderNo, bodyData, userId, userChatRef)
        }
        else {
            await sendTextMsg(senderNo, undefined, userId, userChatRef)
        }
    }
    else if (msgText == 'view cart') {
        await sendCartDetails(senderNo, userId, undefined, userChatRef);
    }
    else if (msgText == 'checkout') {
        await sendProductPaymentLink(senderNo, userId, userChatRef);
    }
    else if (msgText == 'reset cart') {
        const result = await resetCart(userId);
        if (result) { await sendCustomMsg(senderNo, '*Your cart is empty now*\nStart Shopping Now 👇', userId, userChatRef) }
        else {
            await sendTextMsg(senderNo, undefined, userId, userChatRef)
        }
    }
    else if (msgText == 'menu' || msgText == 'main menu') {
        if (menuDocs && menuDocs['menu-main-menu']) {
            const bodyData = await getDocs('menu-main-menu');
            await createDocMsg(senderNo, bodyData, userId, userChatRef)
        } else {
            await sendMenuMsg(senderNo, userId, userChatRef)
        }
    }
    else if (msgText == 'track' || msgText == 'track order') {
        await trackOrderMsg(senderNo, userId, userChatRef)
    }
    else if (msgText == 'update') {
        const promiseArray = []
        promiseArray[0] = fetchCreds();
        promiseArray[1] = fetchMenuDocsDb();
        promiseArray[2] = calCredits();
        promiseArray[3] = fetchStoreData();
        promiseArray[4] = fetchTemplates();
        await Promise.all(promiseArray)
        await sendTextMsg(senderNo, 'updated successfully', userId, userChatRef);
    }
    else if (msgText == 'update catalogue') {
        await updateProductFeed()
        await sendTextMsg(senderNo, 'updated catalogue successfully', userId, userChatRef);
    }
    else if (msgText == 'stop') {
        await db.collection('chats').doc(userId).update({ isUnSubscribe: true }).catch((error) => { console.log("unable to update user chat doc to unsubscribe, error : ", error, "\nuser ID : ", userId) })
        await sendTextMsg(senderNo, 'we unsubscribed you from whatsapp marketing list', userId, userChatRef)
    }
    else if (msgText.startsWith("track")) {
        const orderId = extractNumber(msgText);
        console.log('order ID : ', orderId)
        const result = await trackOrder(senderNo, userId, orderId, userChatRef);
        if (result !== 'found') {
            await sendTextMsg(senderNo, result, userId, userChatRef)
            await sendMenuMsg(senderNo, userId, userChatRef)
        }
    }
    else if (msgText.startsWith("search")) {
        let query = msgText.replace("search", "")
        query = query.trim()
        if (query === "") {
            await sendTextMsg(senderNo, 'please enter what to search', userId, userChatRef)
        }
        else {
            await searchHere(senderNo, query, userId, userChatRef);
        }
    }
    else {
        if (!sessionExist) {
            const bodyData = await getDocs('menu-entry-point');
            if (bodyData !== false) {
                await createDocMsg(senderNo, bodyData, userId, userChatRef)
            }
            return
        }
    }
}

//msg type intractive
const msgTypeIntractive = async (msg_body, senderNo, userId, userChatRef) => {
    let msgBtnOriginal;
    if (msg_body.button) {
        msgBtnOriginal = msg_body.button.payload
    }
    else if (msg_body.interactive.button_reply) {
        msgBtnOriginal = msg_body.interactive.button_reply.id
    }
    else if (msg_body.interactive.list_reply) {
        msgBtnOriginal = msg_body.interactive.list_reply.id
    }
    const msgBtn = msgBtnOriginal.toLowerCase()
    if (msgBtn) {
        if (msgBtn.startsWith("menu-") || msgBtn.startsWith("send-")) {
            const bodyData = await getDocs(msgBtn);
            if (bodyData) {
                await createDocMsg(senderNo, bodyData, userId, userChatRef)
            }
            else {
                await sendTextMsg(senderNo, undefined, userId, userChatRef)
            }
        }
        else if (msgBtn.startsWith("button")) {
            if (msgBtn == 'button-product-payment-link') {
                await sendProductPaymentLink(senderNo, userId, userChatRef);
            }
            else if (msgBtn.startsWith('button-service-payment-link')) {
                const serviceId = msgBtnOriginal.replace('button-service-payment-link-', "")
                await sendServicePaymentLink(senderNo, userId, serviceId);
            }
            else if (msgBtn == 'button-view-cart') {
                await sendCartDetails(senderNo, userId, undefined, userChatRef);
            }
            else if (msgBtn == 'button-track-order') {
                await trackOrderMsg(senderNo, userId, userChatRef);
            }
            else if (msgBtn == 'button-cart-reset') {
                const result = await resetCart(userId);
                if (result) { await sendCustomMsg(senderNo, '*Your cart is empty now*\nStart Shopping Now 👇', userId, userChatRef) }
                else {
                    await sendTextMsg(senderNo, undefined, userChatRef)
                }
            }
            else if (msgBtn == 'button-send-last-orders') {
                await orderList(senderNo, userId, userChatRef);
            }
            else if (msgBtn == 'button-track-order-manually') {
                const msg = 'To track order please send track-orderID\nexample : track-1122'
                await sendTextMsg(senderNo, msg, userId, userChatRef);
            }
        }
        else if (msgBtn.startsWith("track-order-")) {
            const orderId = msgBtn.split('-')[2]
            console.log("track order ID - ", orderId)
            const result = await trackOrder(senderNo, userId, orderId);
            if (result !== 'found') {
                await sendTextMsg(senderNo, result, userId, userChatRef)
                await sendMenuMsg(senderNo, userId, userChatRef)
            }
        }
        else {
            const bodyData = await getDocs('menu-entry-point');
            if (bodyData !== false) {
                await createDocMsg(senderNo, bodyData, userId, userChatRef)
            }
            else {
                await sendTextMsg(senderNo, undefined, userChatRef)
            }
        }
    } else {
        const bodyData = await getDocs('menu-entry-point');
        if (bodyData !== false) {
            await createDocMsg(senderNo, bodyData, userId, userChatRef)
        }
        else {
            await sendTextMsg(senderNo, undefined, userChatRef)
        }
    }
}

//errors
const collectErrors = async (userDetail, error, functionName, msg) => {
    try {
        const errorObj = {
            createdAt: new Date(),
            functionName: functionName ? functionName : "unknown",
            error: error ? JSON.stringify(error) : 'unknown',
            msg: msg ? msg : 'unknown',
            userDetails: userDetail ? userDetail : 'unknown'
        }
        await db.collection("whatsapp").doc('logs').collection("errors").add(errorObj)
    } catch (err) {
        console.log("error in collectErrors, error : ", err)
    }
}

//search product module
//change keys 
//search products
function typesense_initClient() {
    return new Promise(async (resolve, reject) => {
        try {
            const Typesense = require('typesense');
            let typesenseClient = new Typesense.Client({
                'nodes': [{
                    'host': typesenseCred.host,
                    'port': typesenseCred.port,
                    'protocol': typesenseCred.protocol
                }],
                'apiKey': typesenseCred.apiKey,
                'connectionTimeoutSeconds': 2
            });
            resolve(typesenseClient);
        } catch (error) {
            console.log('error in initialising typesense client', error);
            collectErrors('unknown', error, 'typesense_initClient', 'error in initialising typesense client')
            resolve(null);
        }
    });
}

//change
function typesense_getIndex() {
    return `${projectId}-products`;
}

function getSearchProductsFromTypesense(searchValue) {
    return new Promise(async (resolve, reject) => {
        let page = 0
        let products = [];
        page += 1;

        let searchParameters = {
            'q': searchValue,
            'query_by': 'prodName, prodDesc',
            'page': page,
            'per_page': 20
        }
        let typesenseClient = await typesense_initClient();
        typesenseClient.collections(typesense_getIndex()).documents().search(searchParameters).then(response => {
            // console.log(response);
            if (!response) {
                resolve({ status: 'no_products', products: [] });
            } else {
                let noResults = true;
                let noMoreResults = true;
                if (response.found > 0) {
                    noResults = false;
                }
                if (response.hits.length) {
                    noMoreResults = false;
                }
                response.hits.forEach((h) => {
                    if (!products.length || products.some((product) => product.id !== h.document.id)) {
                        h.document = parseArrayOfObjects(h.document);

                        products.push({ ...h.document, id: h.document.id, objectID: h.document.id });

                    }
                });
                if (noResults) {
                    resolve({ status: 'no_products', products: [] });
                } else if (noMoreResults) {
                    resolve({ status: 'no_more_products', products: [] });
                } else {
                    resolve({ status: 'available', products: products })
                }
            }
        }).catch((error) => {
            console.log("error in getSearchProductsFromTypesense error :", error);
            collectErrors('unknown', error, 'getSearchProductsFromTypesense', 'error in search product ' + (searchValue ? searchValue : ""))
            resolve({ status: 'no_products', products: [] });
        })
    })
}

function parseArrayOfObjects(object) {
    for (const key in object) {
        try {
            const value = JSON.parse(object[key]);
            if ((Array.isArray(value) && value.length && typeof value[0] == 'object') || (Array.isArray(value) && !value.length)) {
                object[key] = value;
            }
        } catch (error) {

        }
    }
    return object;
}

//extract product Id variant and without variant
const extractProductId = (productDetails) => {
    const variantList = [];
    if (productDetails.isPriceList && productDetails.priceList && productDetails.priceList.length !== 0) {
        console.log("variant exists ", productDetails.id)
        const variants = productDetails.priceList;
        variants.forEach(variant => {
            const variantName = variant.weight.replace(' ', '*')
            variantList.push({
                id: `${productDetails.id}###${variantName}`
            })
        })
    }
    else {
        console.log("variant not exist", productDetails.id)
        variantList.push({
            id: productDetails.id
        })
    }
    // console.log(variantList)
    return variantList
}

//search main function
const searchHere = async (receiverNo, query, userId, userChatRef) => {
    const list = await getSearchProductsFromTypesense(query)
    if (list.products.length === 0) {
        console.log('no item to search')
        await sendCustomMsg(receiverNo, `No product found for *${query}*\nPlease try with another keyword`)
    } else {
        {
            let productDataList = []
            for (const product of list.products) {
                productDataList = productDataList.concat(extractProductId(product))
            }
            const bodyData = {
                type: "product_list",
                bodyText: `Search Result for *${query}* 👇`,
                headerText: query,
                list: productDataList
            }
            await createDocMsg(receiverNo, bodyData, userId, userChatRef)
        }
    }
}

//creating body schema depending on message type

//create button dynamically
const createButtonData = (buttonArray) => {
    const buttons = []
    const length = buttonArray.length >= 3 ? 3 : buttonArray.length
    for (let i = 0; i < length; i++) {
        if ((buttonArray[i].active == undefined || buttonArray[i].active == true) && buttonArray[i].title && buttonArray[i].id)
            buttons.push({
                "type": "reply",
                "reply": {
                    "id": buttonArray[i].id,
                    "title": buttonArray[i].title.slice(0, 20)
                }
            })
    }
    return buttons
}

//create list dynamically
const createListData = (listArray) => {
    const list = []
    const length = listArray.length >= 10 ? 10 : listArray.length
    for (let i = 0; i < length; i++) {
        if ((listArray[i].active == undefined || listArray[i].active == true) && listArray[i].id && listArray[i].title) {
            list.push({
                "id": listArray[i].id,
                "title": listArray[i].title.slice(0, 24),
                "description": listArray[i].description ? listArray[i].description.slice(0, 72) : ""
            })
        }
    }
    return list
}

//create products list dynamically
const createProductData = (productArray) => {
    const products = []
    const length = productArray.length >= 30 ? 30 : productArray.length
    for (let i = 0; i < length; i++) {
        if (productArray[i].active == undefined || productArray[i].active == true) {
            if (products.findIndex((val) => { return val['product_retailer_id'] === productArray[i].id }) === -1) {
                products.push({
                    "product_retailer_id": productArray[i].id,
                })
            }
        }
    }
    // console.log(products)
    return products
}

//create template component list dynamically
const createTemplateComponent = (componentArray) => {
    const components = []
    for (const element of componentArray) {
        // console.log(element)//
        const component = {}
        if (element.type && element.type.toLowerCase() == 'body' && element.example) {
            component.type = "body"
            const parameterList = []
            if (Array.isArray(element.example)) {
                for (const params of element.example) {
                    parameterList.push({ "type": "text", "text": params })
                }
            } else if (Array.isArray(element.example.body_text[0])) {
                for (const params of element.example.body_text[0]) {
                    parameterList.push({ "type": "text", "text": params })
                }
            }
            else {
                for (const params of element.example.body_text) {
                    parameterList.push({ "type": "text", "text": params })
                }
            }
            component.parameters = parameterList
            components.push(component)
        }
        else if (element.type && element.type.toLowerCase() == 'buttons') { //every button is separate object
            let indicis = 0;
            for (const button of element.buttons) {
                const component = {}
                component.type = "button"
                // console.log(button)//
                if (button.type && button.type.toLowerCase() == "quick_reply" && button.text && button.payload) {
                    component.sub_type = "quick_reply"
                    component.index = indicis++ //0,1,2
                    component.parameters = [
                        {
                            "type": "payload",
                            "payload": button.payload ? button.payload : indicis
                        }
                    ]
                    components.push(component)
                }
                else if (button.type && button.type.toLowerCase() == "url") {
                    if (button.text && button.example) {
                        component.sub_type = "url"
                        component.index = indicis++  //0,1
                        component.parameters = [
                            {
                                "type": "text",
                                "text": button.url ? button.example[0].replace(button.url.replace('{{1}}', ''), '') : button.example[0]
                            }
                        ]
                        components.push(component)
                    } else if (button.text && button.url) {
                        indicis++
                    }
                }
                else if (button.type && button.type.toLowerCase() == "phone_number" && button.text && button[button.type]) {
                    indicis++
                }
            }
        }
        else if (element.type && element.type.toLowerCase() == 'header' && element.format && (element.mediaUrl || element.mediaId || element.example)) {
            component.type = "header"
            component.parameters = []
            if (element.format.toLowerCase() == 'image') {
                const parameterObj = {
                    type: "image",
                    image: {
                        id: element.mediaId,
                        link: element.mediaUrl
                    }
                }
                if (element.example && element.example.header_handle && element.example.header_handle[0]) {
                    parameterObj.image.link = element.example.header_handle[0]
                }
                component.parameters.push(parameterObj)
            }
            else if (element.format.toLowerCase() == 'document') {
                const parameterObj = {
                    type: "document",
                    document: {
                        id: element.mediaId,
                        link: element.mediaUrl
                    }
                }
                if (element.example && element.example.header_handle && element.example.header_handle[0]) {
                    parameterObj.document.link = element.example.header_handle[0]
                }
                component.parameters.push(parameterObj)
            }
            else if (element.format.toLowerCase() == 'video') {
                const parameterObj = {
                    type: "video",
                    video: {
                        id: element.mediaId,
                        link: element.mediaUrl
                    }
                }
                if (element.example && element.example.header_handle && element.example.header_handle[0]) {
                    parameterObj.video.link = element.example.header_handle[0]
                }
                component.parameters.push(parameterObj)
            }
            else if (element.format.toLowerCase() == 'text' && element.example) {
                if (Array.isArray(element.example)) {
                    for (const ele of element.example) {
                        const parameterObj = {
                            type: "text",
                            text: ele
                        }
                        component.parameters.push(parameterObj)
                    }
                } else if (Array.isArray(element.example.header_text[0])) {
                    for (const ele of element.example.body_text[0]) {
                        const parameterObj = {
                            type: "text",
                            text: ele
                        }
                        component.parameters.push(parameterObj)
                    }
                } else {
                    for (const ele of element.example.header_text) {
                        const parameterObj = {
                            type: "text",
                            text: ele
                        }
                        component.parameters.push(parameterObj)
                    }
                }
            }
            components.push(component)
        }
        else {
            console.log("either invalid component type or sample data not available in createTemplateComponent", element)
        }
    }
    // console.log(components)
    return components
}

//creating body payload
const createBody = (receiverNo, data, language) => {

    const body = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": receiverNo
    };
    try {
        if (data.type.toLowerCase() == 'text') {
            body.type = 'text'
            if (language && data.language && data.language[language] && data.language[language].bodyText) {
                body.text = {
                    body: data.language[language].bodyText.slice(0, 4096)
                }
                for (const [key, value] of Object.entries(data.language[language])) {
                    data[key] = value
                }
            } else {
                body.text = {
                    body: data.bodyText ? data.bodyText.slice(0, 4096) : ""
                }
            }
            delete data.language
            return body
        }
        else if (data.type.toLowerCase() == 'button') {
            body.type = 'interactive'
            if (language && data.language && data.language[language] && data.language[language].bodyText) {
                body.interactive = {
                    "type": "button",
                    "body": { "text": data.language[language].bodyText.slice(0, 1024) },
                    "action": {
                        "buttons": createButtonData(data.language[language].list)
                    }
                }
                if (data.language[language].header && data.language[language].header.type) {
                    if (data.language[language].header.type.toLowerCase() == 'image' && (data.language[language].header.mediaId || data.language[language].header.mediaUrl)) {
                        body.interactive.header = { type: 'image', image: {} }
                        data.language[language].header.text ? body.interactive.header.image.caption = data.language[language].header.text : ""
                        data.language[language].header.mediaId ? body.interactive.header.image.id = data.language[language].header.mediaId : body.interactive.header.image.link = data.language[language].header.mediaUrl
                    }
                    else if (data.language[language].header.type.toLowerCase() == 'video' && (data.language[language].header.mediaId || data.language[language].header.mediaUrl)) {
                        body.interactive.header = { type: 'video', video: {} }
                        data.language[language].header.text ? body.interactive.header.video.caption = data.language[language].header.text : ""
                        data.language[language].header.mediaId ? body.interactive.header.video.id = data.language[language].header.mediaId : body.interactive.header.video.link = data.language[language].header.mediaUrl

                    }
                    else if (data.language[language].header.type.toLowerCase() == 'document' && (data.language[language].header.mediaId || data.language[language].header.mediaUrl)) {
                        body.interactive.header = { type: 'document', document: {} }
                        data.language[language].header.text ? body.interactive.header.document.caption = data.language[language].header.text : ""
                        data.language[language].header.mediaId ? body.interactive.header.document.id = data.language[language].header.mediaId : body.interactive.header.document.link = data.language[language].header.mediaUrl
                        data.language[language].header.fileName ? body.interactive.header.document.filename = data.language[language].header.fileName : ""
                    }
                    else if (data.language[language].header.type.toLowerCase() == 'text' && data.language[language].header.text) {
                        body.interactive.header = { type: 'text', text: data.language[language].header.text.splice(0, 60) }
                    }
                }
                data.language[language].footer ? body.interactive.footer = { text: data.language[language].footer.slice(0, 60) } : {}
                for (const [key, value] of Object.entries(data.language[language])) {
                    data[key] = value
                }
            } else {
                body.interactive = {
                    "type": "button",
                    "body": { "text": data.bodyText ? data.bodyText.slice(0, 1024) : "" },
                    "action": {
                        "buttons": createButtonData(data.list)
                    }
                }
                if (data.header && data.header.type) {
                    if (data.header.type.toLowerCase() == 'image' && (data.header.mediaId || data.header.mediaUrl)) {
                        body.interactive.header = { type: 'image', image: {} }
                        data.header.text ? body.interactive.header.image.caption = data.header.text : ""
                        data.header.mediaId ? body.interactive.header.image.id = data.header.mediaId : body.interactive.header.image.link = data.header.mediaUrl
                    }
                    else if (data.header.type.toLowerCase() == 'video' && (data.header.mediaId || data.header.mediaUrl)) {
                        body.interactive.header = { type: 'video', video: {} }
                        data.header.text ? body.interactive.header.video.caption = data.header.text : ""
                        data.header.mediaId ? body.interactive.header.video.id = data.header.mediaId : body.interactive.header.video.link = data.header.mediaUrl

                    }
                    else if (data.header.type.toLowerCase() == 'document' && (data.header.mediaId || data.header.mediaUrl)) {
                        body.interactive.header = { type: 'document', document: {} }
                        data.header.text ? body.interactive.header.document.caption = data.header.text : ""
                        data.header.mediaId ? body.interactive.header.document.id = data.header.mediaId : body.interactive.header.document.link = data.header.mediaUrl
                        data.header.fileName ? body.interactive.header.document.filename = data.header.fileName : ""
                    }
                    else if (data.header.type.toLowerCase() == 'text' && data.header.text) {
                        body.interactive.header = { type: 'text', text: data.header.text.splice(0, 60) }
                    }
                }
                data.footer ? body.interactive.footer = { text: data.footer.slice(0, 60) } : {}
            }
            delete data.language
            return body
        }
        else if (data.type.toLowerCase() == 'list') {
            body.type = 'interactive'
            if (language && data.language && data.language[language] && data.language[language].bodyText) {
                body.interactive = {
                    "type": "list",
                    "body": { "text": data.language[language].bodyText.slice(0, 1024) },
                    "action": {
                        "button": data.language[language].listButtonText ? data.language[language].listButtonText.slice(0, 20) : 'Select Here',
                        "sections": [
                            {
                                "title": data.language[language].listTitleText ? data.language[language].listTitleText.slice(0, 24) : "",
                                "rows": createListData(data.language[language].list)
                            }
                        ]
                    }
                }
                data.language[language].footer ? body.interactive.footer = { text: data.language[language].footer.slice(0, 60) } : {}
                for (const [key, value] of Object.entries(data.language[language])) {
                    data[key] = value
                }
            } else {
                body.interactive = {
                    "type": "list",
                    "body": { "text": data.bodyText ? data.bodyText.slice(0, 1024) : "" },
                    "action": {
                        "button": data.listButtonText ? data.listButtonText.slice(0, 20) : 'Select Here',
                        "sections": [
                            {
                                "title": data.listTitleText ? data.listTitleText.slice(0, 24) : "",
                                "rows": createListData(data.list)
                            }
                        ]
                    }
                }
                data.footer ? body.interactive.footer = { text: data.footer.slice(0, 60) } : {}
            }
            delete data.language
            return body
        }
        else if (data.type.toLowerCase() == 'product') {
            body.type = 'interactive'
            body.interactive = {
                "type": "product",
                "body": { "text": data.bodyText ? data.bodyText.slice(0, 1024) : "" },
                "action": {
                    "catalog_id": credData.catalogueId,
                    "product_retailer_id": data.product
                }
            }
            data.footer ? body.interactive.footer = { text: data.footer.slice(0, 60) } : {}
            if (language && data.language && data.language[language]) {
                if (data.language[language].bodyText) {
                    body.interactive.body.text = data.language[language].bodyText.slice(0, 1024)
                    data.bodyText = data.language[language].bodyText.slice(0, 1024)
                }
                if (data.language[language].footer) {
                    body.interactive.footer = data.language[language].footer.slice(0, 60)
                    data.footer = data.language[language].footer.slice(0, 60)
                }
                if (data.language[language].headerText) {
                    body.interactive.header.text = data.language[language].headerText.slice(0, 60)
                    data.headerText = data.language[language].headerText.slice(0, 60)
                }
            }
            delete data.language
            return body
        }
        else if (data.type.toLowerCase() == 'product_list') {
            body.type = 'interactive'
            if (data.list.length == 1) {
                body.interactive = {
                    "type": "product",
                    "body": { "text": data.bodyText ? data.bodyText.slice(0, 1024) : "" },
                    "action": {
                        "catalog_id": credData.catalogueId,
                        "product_retailer_id": data.list[0].id
                    }
                }
            }
            else {
                body.interactive = {
                    "type": "product_list",
                    "header": {
                        "type": "text",
                        "text": data.headerText ? data.headerText.slice(0, 60) : ""
                    },
                    "body": {
                        "text": data.bodyText ? data.bodyText.slice(0, 1024) : ""
                    },
                    "action": {
                        "catalog_id": credData.catalogueId,
                        "sections": [{ "product_items": createProductData(data.list) }]
                    }
                }
            }
            data.footer ? body.interactive.footer = { text: data.footer.slice(0, 60) } : {}
            if (language && data.language && data.language[language]) {
                if (data.language[language].bodyText) {
                    body.interactive.body.text = data.language[language].bodyText.slice(0, 1024)
                    data.bodyText = data.language[language].bodyText.slice(0, 1024)
                }
                if (data.language[language].footer) {
                    body.interactive.footer = data.language[language].footer.slice(0, 60)
                    data.footer = data.language[language].footer.slice(0, 60)
                }
                if (data.language[language].headerText) {
                    body.interactive.header.text = data.language[language].headerText.slice(0, 60)
                    data.headerText = data.language[language].headerText.slice(0, 60)
                }
            }
            delete data.language
            return body
        }
        else if (data.type.toLowerCase() == 'template') {
            body.type = 'template'
            body.template = {
                "name": data.name,
                "language": {
                    "code": data.language ? data.language : "en_US"
                }
            }
            if (data.components && data.components.length) {
                body.template.components = createTemplateComponent(data.components)
            }
            return body
        }
        else if (data.type.toLowerCase() == 'image') {
            body.type = 'image'
            body.image = {}
            data.bodyText ? body.image.caption = data.bodyText : {}
            data.mediaId ? body.image.id = data.mediaId : body.image.link = data.mediaUrl
            if (language && data.language && data.language[language] && data.language[language].bodyText) {
                body.image.caption = data.language[language].bodyText.slice(0, 1024)
                data.bodyText = data.language[language].bodyText.slice(0, 1024)
            }
            delete data.language
            return body
        }
        else if (data.type.toLowerCase() == 'video') {
            body.type = 'video'
            body.video = {}
            data.bodyText ? body.video.caption = data.bodyText : {}
            data.mediaId ? body.video.id = data.mediaId : body.video.link = data.mediaUrl
            if (language && data.language && data.language[language] && data.language[language].bodyText) {
                body.video.caption = data.language[language].bodyText.slice(0, 1024)
                data.bodyText = data.language[language].bodyText.slice(0, 1024)
            }
            delete data.language
            return body
        }
        else if (data.type.toLowerCase() == 'document') {
            body.type = 'document'
            body.document = {}
            data.bodyText ? body.document.caption = data.bodyText : {}
            data.mediaId ? body.document.id = data.mediaId : body.document.link = data.mediaUrl
            data.fileName ? body.document.filename = data.fileName : {}
            if (language && data.language && data.language[language] && data.language[language].bodyText) {
                body.document.caption = data.language[language].bodyText.slice(0, 1024)
                data.bodyText = data.language[language].bodyText.slice(0, 1024)
            }
            delete data.language
            return body
        }
        //when type not Match
        else {
            body.type = 'text'
            body.text = {
                body: "Oops, something went wrong.\nPlease try again later."
            }
            body.error = true
            return body
        }
    } catch (error) {
        console.log('error in createBody error:', error)
        body.type = 'text'
        body.text = {
            body: "Oops, something went wrong. Please try again later."
        }
        body.error = true
        collectErrors(receiverNo, error, 'createBody', 'error in createBody')
        return body
    }
}

const sendNotificationMsg = async (phoneNo, bodyData) => {
    const body = createBody(phoneNo, bodyData);
    if (bodyData.type.toLowerCase() == 'template') {
        if (!body.error) {
            return await sendMsg(body, '', {}, {})
        } else {
            console.log("error in body creation, sendNotificationMsg, body ", bodyData)
        }
    }
}

const sendNotificationAlert = async (docId, userChatRef) => {
    try {
        if (docId) {
            const bodyData = await getDocs(docId);
            if (bodyData && bodyData.phoneNo) {
                if (bodyData.type && bodyData.type.toLowerCase() == 'template' && Array.isArray(bodyData.components) && bodyData.components.length && bodyData.examples && Array.isArray(bodyData.examples) && bodyData.examples.length) {
                    for (const component of bodyData.components) {
                        if (component.type) {
                            if (component.type.toLowerCase() == 'body' && component.example && Array.isArray(component.example['body_text']) && component.example['body_text'].length && userChatRef && userChatRef.variableState) {
                                for (const example of bodyData.examples) {
                                    if (example.type.toLowerCase() == 'body') {
                                        if (example.variable && Array.isArray(example.variable) && example.variable.length) {
                                            for (const [index, variable] of example.variable.entries()) {
                                                if (variable && userChatRef.variableState[variable] && userChatRef.variableState[variable].text) {
                                                    component.example['body_text'][index] = userChatRef.variableState[variable].text
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (Array.isArray(bodyData.phoneNo)) {
                    if (bodyData.phoneNo.length) {
                        bodyData.phoneNo.forEach(async (number) => {
                            await sendNotificationMsg(number, { ...bodyData })
                        })
                    }
                } else {
                    await sendNotificationMsg(bodyData.phoneNo, bodyData)
                }
            } else {
                console.log("either doc is not found/ senderNo is not available, docId : ", docId, "\n bodyData : ", bodyData)
            }
        }
    } catch (error) {
        console.log("error in sendNotificationAlert, error : ", error)
        console.log("docId : ", docId)
        console.log("userChatRef : ", userChatRef)
        collectErrors(docId, error, 'sendNotificationAlert', 'error in sendNotificationAlert')
    }
}

//message sending to facebook

//Create and send msg
const createDocMsg = async (receiverNo, data, userId, userChatRef, notUpdateBotState) => {
    const body = createBody(receiverNo, data);
    if (!notUpdateBotState && userChatRef) {
        if (data.botState) {
            userChatRef.botState = { ...data.botState }
            userChatRef.botState.prevDocId ? {} : userChatRef.botState.prevDocId = data.id ? data.id : ""
            delete data.botState
        } else {
            userChatRef.botState = {}
        }
    }
    let result = false
    if (data.type.toLowerCase() == 'template') {
        !data.bodyText ? data.bodyText = data.name : {}
        if (!body.error) {
            result = await sendMsg(body, userId, data, userChatRef)
        } else {
            console.log("error in body creation, createDocMsg, body ", data)
        }
    }
    else {
        result = await sendMsg(body, userId, data, userChatRef)
    }
    if (data.sendNotification) {
        sendNotificationAlert(data.sendNotification, userChatRef)
    }
    if (!result) {
        console.log("msg not sent, createDocMsg, data : ", data, "\nbody : ", body)
    }
    return result
}

//main function to send msg
const sendMsg = async (body, userId, bodyData, userChatRef) => {
    //store msg at common place
    if (credData == undefined) {
        await fetchCreds();
    }
    let result = false

    console.time('send msg')///

    // console.log("final created body : ", body)
    await axios.post(`${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${credData.phoneNumberId}/messages`, body, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
        .then(async (response) => {
            // console.log('success');
            console.log('success sendMsg response : ', response.data.messages[0].id)
            console.timeEnd('send msg')///
            result = true
            if (userId && !(userChatRef && Object.keys(userChatRef).length == 0)) {
                saveMsgForChat("admin", userId, { ...body, id: response.data.messages[0].id }, bodyData, userChatRef)
            }
        }).catch((error) => {
            console.log('error');
            console.log('error in sendMsg error : ', error.response ? error.response.data : error, '\n\n body', body)
            collectErrors(userId, error.response ? error.response.data : error, "sendMsg", 'error occurred in axios\n\n' + JSON.stringify(body))
        })
    return result
}

//mark incoming msg read
const markMsgRead = async (msgId) => {
    //store msg at common place
    if (credData == undefined) {
        await fetchCreds();
    }
    try {
        await axios.post(`${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${credData.phoneNumberId}/messages`, { "messaging_product": "whatsapp", "status": "read", "message_id": msgId }, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
    } catch (error) {
        console.log("error in markMsgRead, error : ", error.response ? error.response.data : error)
    }
}

//other function

//custom msg
//if customMsg is defined
// if customMsg is undefined sends error msg with menu buttons
const sendTextMsg = async (receiverNo, customMsg, userId, userChatRef, notUpdateBotState) => {
    const bodyData = {
        bodyText: customMsg ? customMsg : "Oops, something went wrong. Please try again later.", ///
        type: 'text'
    }
    if (customMsg) {
        return await createDocMsg(receiverNo, bodyData, userId, userChatRef, notUpdateBotState)
    } else if (credData && ((credData.setting && credData.setting.errorMsg) || !credData.setting)) {
        return await createDocMsg(receiverNo, bodyData, userId, userChatRef, notUpdateBotState)
    }
}

//send menu
const sendMenuMsg = async (receiverNo, userId, userChatRef) => {
    const buttons = [
        {
            title: 'Buy Item',
            id: 'menu-entry-point'
        },
        {
            title: 'View Cart',
            id: 'button-view-cart'
        },
        {
            title: 'Track Order',
            id: 'button-track-order'
        }
    ]
    const bodyData = {
        bodyText: "*Menu*",
        list: buttons,
        type: 'button'
    }
    await createDocMsg(receiverNo, bodyData, userId, userChatRef)
}

//track order msg
const trackOrderMsg = async (receiverNo, userId, userChatRef) => {
    const buttons = [
        {
            title: 'Track Last 10 Order',
            id: 'button-send-last-orders'
        },
        {
            title: 'Track By Order ID',
            id: 'button-track-order-manually'
        }
    ]
    const bodyData = {
        bodyText: "*Track Order*",
        list: buttons,
        type: 'button'
    }
    await createDocMsg(receiverNo, bodyData, userId, userChatRef)
}

//send last 10 order list
const orderList = async (receiverNo, userId, userChatRef) => {
    try {
        const findOrder = await db.collection('orders').where('userId', '==', userId).orderBy('createdAt', 'desc').limit(1).get()
        if (findOrder.empty) {
            console.log('No previous order found')
            await sendTextMsg(receiverNo, 'No previous order found', userId, userChatRef);
        } else {
            let buttons = [];
            findOrder.forEach(async doc => {
                if (doc.data().orderId) {
                    buttons.push({ title: `Order ID - ${doc.data().orderId}`, id: `track-order-${doc.data().orderId}` })
                }
            })
            if (buttons.length) {
                const bodyData = {
                    bodyText: `Here is the list of your orders: 👇`,
                    listTitleText: "Track order status",
                    listButtonText: "Select order here",
                    list: buttons,
                    type: 'list'
                }
                await createDocMsg(receiverNo, bodyData, userId, userChatRef)
            }
            else {
                await sendTextMsg(receiverNo, 'No previous order found', userId, userChatRef);
            }
        }
    } catch (error) {
        await sendTextMsg(receiverNo, undefined, userId, userChatRef)
        console.log("error in orderList ", error)
        collectErrors(receiverNo, error, "orderList", 'error in orderList ')
    }
}

//track order
const trackOrder = async (receiverNo, userId, orderID, userChatRef) => {
    try {
        let status;
        if (orderID) { //track by order ID manually
            const orderId = orderID * 1
            const findOrder = await db.collection('orders').where('orderId', '==', orderId).get()
            if (findOrder.empty) {
                status = `Order not found with *Order ID ${orderID}*\nPlease enter correct Order ID`
            } else {
                let orderData = {};
                findOrder.forEach(doc => {
                    orderData = doc.data()
                })
                console.log('order found : ', userId, orderData.userId)
                if (userId === orderData.userId) {
                    await sendOrderUpdate(orderData, receiverNo, userChatRef)
                    status = 'found'
                }
                else {
                    console.log('user with another order id :', orderID)
                    status = `Order not found with *Order ID ${orderID}*\nPlease enter correct Order ID`
                }
            }
        }
        else { //track last order
            const findOrder = await db.collection('orders').where('userId', '==', userId).orderBy('createdAt', 'desc').limit(1).get()
            if (findOrder.empty) {
                console.log('Order not found : ')
                status = 'No previous order found'
            } else {
                let orderData;
                findOrder.forEach(async doc => {
                    orderData = doc.data()
                })
                await sendOrderUpdate(orderData, receiverNo, userChatRef)
                status = 'found'
            }
        }
        return status //return found means success
    } catch (error) {
        console.log("error in track order ", error)
        await sendTextMsg(receiverNo, undefined)
        collectErrors(receiverNo, error, "trackOrder", 'error in track order ' + (orderID ? orderID : ''))
    }
}

//welcome custom msg with button start shoping now
const sendCustomMsg = async (receiverNo, msg, userId, userChatRef) => {
    const buttons = [
        {
            title: 'Start Shopping Now',
            id: 'menu-entry-point'
        }
    ]
    const bodyData = {
        bodyText: msg,
        list: buttons,
        type: 'button'
    }
    await createDocMsg(receiverNo, bodyData, userId, userChatRef)
}

//fetch cart data and create cart summary
const createCartSummary = async (userId, updatedCartProducts) => {
    let cartArray = [];
    if (!updatedCartProducts) {
        const cartArrayRef = await db.collection('users').doc(userId).collection('cart').get()
        if (!cartArrayRef.empty) {
            cartArrayRef.forEach((productData) => { cartArray.push(productData.data()) })
        }
    } else {
        cartArray = updatedCartProducts
    }
    const orderSummaryArray = []
    if (cartArray && cartArray.length) {
        let orderSummary = '*Your Cart Items*\n\n';
        let price = 0;
        let i = 0;
        for (const product of cartArray) {
            if ('pack' in product) {
                orderSummary = orderSummary.concat(`*${++i}.* ${product.name} ${product.pack ? '- ' + product.pack.weight : ''}\n     *₹${product.price} X ${product.quantity} Unit = ₹${product.price * product.quantity}*\n`);
            }
            else {
                orderSummary = orderSummary.concat(`*${++i}.* ${product.name}\n    *₹${product.price} X ${product.quantity} Unit = ₹${product.price * product.quantity}*\n`);
            }
            price = price + product.price * product.quantity;
        }
        orderSummary = orderSummary.concat(`\n*Subtotal - ₹${price}*\n\nDelivery charges will be calculated on the payment page.`)///

        if (orderSummary.length > 1024) {
            orderSummaryArray[0] = orderSummary.split(`*${cartArray.length - 4}.*`)[0]
            orderSummaryArray[1] = `*${cartArray.length - 4}.*` + orderSummary.split(`*${cartArray.length - 4}.*`)[1]
        } else {
            orderSummaryArray[0] = orderSummary
        }

    }
    return orderSummaryArray;
}

//send cart details
const sendCartDetails = async (receiverNo, userId, cartSummaryData, userChatRef) => {
    const buttons1 = [
        {
            title: 'Buy More Item',
            id: 'menu-entry-point'
        },
        {
            title: 'Reset Cart',
            id: 'button-cart-reset'
        },
        {
            title: 'Checkout',
            id: 'button-product-payment-link'
        }
    ]
    const buttons2 = [
        {
            title: 'Start Shopping Now',
            id: 'menu-entry-point'
        }
    ]
    let cartSummary;
    if (cartSummaryData) {
        cartSummary = cartSummaryData
    }
    else {
        cartSummary = await createCartSummary(userId)
    }
    if (cartSummary.length) {
        //send updated cart to user
        if (cartSummary.length == 1) {
            //cart summary with 1024 character
            await createDocMsg(receiverNo, { bodyText: cartSummary[0], list: buttons1, type: 'button' }, userId, userChatRef)
        }
        else {
            //cart summary with more than 1024 character
            await sendTextMsg(receiverNo, cartSummary[0], userId, userChatRef)
            await createDocMsg(receiverNo, { bodyText: cartSummary[1], list: buttons1, type: 'button' }, userId, userChatRef)
        }
    }
    else {
        await createDocMsg(receiverNo, { bodyText: '*Your cart is empty !!!*\nStart Shopping Now 👇', list: buttons2, type: 'button' }, userId, userChatRef)
    }
}

//is cart empty
const isCartEmpty = async (userId) => {
    try {
        const cartRef = await db.collection('users').doc(userId).collection('cart').get()
        if (cartRef.empty) {
            return true
        }
        return false
    } catch (error) {
        console.log("error in isCartEmpty", error)
        collectErrors(userId, error, "isCartEmpty", 'error in isCartEmpty')
        return false
    }
}

//reset cart
const resetCart = async (userId) => {
    try {
        const batch = db.batch();
        const cartRef = await db.collection('users').doc(userId).collection('cart').get()
        if (cartRef.empty) {
            console.log('cart is already empty')
        } else {
            cartRef.forEach(async (cartDoc) => {
                batch.delete(cartDoc.ref)
            })
            await batch.commit()
            console.log('cart is empty now')
        }
        return true
    } catch (error) {
        console.log("error in resetCart", error)
        collectErrors(userId, error, "resetCart", 'error in resetCart')
        return false
    }
}

//check weather user is admin
const getUserRole = async (userId) => {
    const userRef = await db.collection('users').doc(userId).get()
    if (userRef.data() && userRef.data().role && typeof userRef.data().role === 'string') {
        return userRef.data().role
    }
    return ''
}

//change payment link template name complete_payment
//send product payment link
const sendProductPaymentLink = async (receiverNo, userId, userChatRef) => {
    const promiseArray = [isCartEmpty(userId), getUserRole(userId)]
    if (!storeData) {
        promiseArray.push(fetchStoreData())
    }
    const [cartEmpty, userType] = await Promise.all(promiseArray)
    if (userType !== 'user') {
        await sendTextMsg(receiverNo, `*${userType ? convertcew(userType) : 'Admin'} can't place orders!!*`, userId, userChatRef)
    }
    else if (cartEmpty) {
        await sendCustomMsg(receiverNo, '*Your cart is empty!!*\nStart Shopping Now 👇', userId, userChatRef)
    }
    else {
        // const msg = `*Order Placed*\n\nThank you for placing Order. Please complete the payment.\n${urlpayment}${userId}` ///
        // await sendTextMsg(receiverNo, msg,userId, userChatRef)
        const bodyData = storeData && storeData.shopInactive ? {
            "type": "text",
            "bodyText": storeData.inactiveMsg ? storeData.inactiveMsg : "WE ARE CURRENTLY NOT ACCEPTING ORDERS"
        } : {
            "name": "complete_payment",
            "type": "template",
            "components": [
                {
                    "type": "BODY",
                    "text": "*Order Placed*\n\nThank you for placing order.\nPlease complete payment."
                },
                {
                    "type": "BUTTONS",
                    "buttons": [
                        {
                            "type": "URL",
                            "text": "Complete Payment",
                            // "url": `${websiteLink}/payment-link/{{1}}`,
                            "example": [
                                userId
                            ]
                        }
                    ]
                }
            ],
            "language": "en_US"
        }
        const msgResult = await createDocMsg(receiverNo, bodyData, userId, userChatRef)
        if (!msgResult) {
            const msg = storeData.shopInactive ? "WE ARE CURRENTLY NOT ACCEPTING ORDERS" : `*Order Placed*\n\nThank you for placing Order. Please complete the payment.\n\n${websiteData && websiteData.source ? 'https://' + websiteData.internalWebsiteUrl : websiteLink}/payment-link/${userId}`
            await sendTextMsg(receiverNo, msg, userId, userChatRef)
        }
    }
}

//send service payment link
const sendServicePaymentLink = async (receiverNo, userId, serviceId) => {
    if (!storeData) {
        await fetchStoreData()
    }
    const bodyData = storeData && storeData.shopInactive ? {
        "type": "text",
        "bodyText": storeData.inactiveMsg ? storeData.inactiveMsg : "WE ARE CURRENTLY NOT ACCEPTING ORDERS"
    } : {
        "name": "complete_service_payment",
        "type": "template",
        "components": [
            {
                "type": "BODY",
                "text": "*Process to Book Service :*\n\n*Step 1 :* Select Date and Time Slot\n*Step 2 :* Complete the Address Details\n*Step 3 :* Proceed to Pay"
            },
            {
                "type": "BUTTONS",
                "buttons": [
                    {
                        "type": "URL",
                        "text": "Proceed",
                        // "url": `${websiteLink}/payment-link/{{1}}`,
                        "example": [
                            `${serviceId}/${userId}`
                        ]
                    }
                ]
            }
        ],
        "language": "en_US"
    }
    const msgResult = await createDocMsg(receiverNo, bodyData, userId, userChatRef)
    if (!msgResult) {
        const msg = storeData.shopInactive ? "WE ARE CURRENTLY NOT ACCEPTING ORDERS" : `*Process to Book Service :*\n\n*Step 1 :* Select Date and Time Slot\n*Step 2 :* Complete the Address Details\n*Step 3 :* Proceed to Pay\n\n${websiteData && websiteData.source ? 'https://' + websiteData.internalWebsiteUrl : websiteLink}/booking-link/${serviceId}/${userId}`
        await sendTextMsg(receiverNo, msg, userId, userChatRef)
    }
}

function removeHtml(desc) {
    const tagsRemoved = desc.replace(/(<([^>]+)>)/ig, '');
    return tagsRemoved;
}

function priceSlabsCheck(cartObj, product) {
    // console.log("04")
    if ('priceSlabs' in product && product.priceSlabs.active) {
        if (product.isPriceList) {
            const variantSlabs = product.priceSlabs.variantSlabs || {};
            // console.log('variantSlabs', variantSlabs);
            if (Object.keys(variantSlabs).length) {
                if (Object.keys(variantSlabs).includes(cartObj.pack.weight)) {
                    const slabs = variantSlabs[cartObj.pack.weight];
                    // console.log('slabs', slabs);
                    if (slabs.length) {
                        let finalRange = {};
                        for (const element of slabs) {
                            // console.log('element', element);
                            if ((cartObj.quantity >= element.qty[0]) && (cartObj.quantity <= element.qty[1])) {
                                finalRange = element;
                                break;
                            }
                        }
                        if (Object.keys(finalRange).length) {
                            if (cartObj.pack.variantType === 'pieces') {
                                cartObj.price = finalRange.price * parseInt(cartObj.pack.weight);
                                cartObj.pack.price = finalRange.price * parseInt(cartObj.pack.weight);
                                cartObj.mrpPrice = finalRange.mrp * parseInt(cartObj.pack.weight);
                            } else {
                                cartObj.price = finalRange.price;
                                cartObj.pack.price = finalRange.price;
                                cartObj.mrpPrice = finalRange.mrp;
                            }
                        }
                    }
                }
            }
        } else {
            const singleSlabs = product.priceSlabs.singleSlabs || {};
            if (Object.keys(singleSlabs).length) {
                let finalRange = {};
                for (const element of singleSlabs) {
                    if ((cartObj.quantity >= element.qty[0]) && (cartObj.quantity <= element.qty[1])) {
                        finalRange = element;
                        break;
                    }
                }
                if (Object.keys(finalRange).length) {
                    cartObj.price = finalRange.price;
                    cartObj.mrpPrice = finalRange.mrp;
                }
            }
        }
    }
    return cartObj;
}

function getCartObj(product, productID, quantity) {
    // console.log("03")
    let cartObj = {
        name: product.prodName,
        quantity: quantity,
        img: product.coverPic ? product.coverPic : {},
        productId: productID,
        commentMsg: '',
        commentImgs: [],
        maxQty: product.maxQty ? product.maxQty : 0,
        minQty: product.minQty ? product.minQty : 1,
        gst: product.gst ? product.gst : 0,
        status: typeof product.status !== 'undefined' ? product.status : true,
        stopWhenNoQty: product.hasOwnProperty('stopWhenNoQty') && typeof product.stopWhenNoQty !== 'undefined' ? product.stopWhenNoQty : false,
        totalQty: product.productQty ? product.productQty : '',
        hsn: product.hsnCode ? product.hsnCode : '',
        sku: product.productCode ? product.productCode : '',
        barcode: product.barcode ? product.barcode : '',
        shippingWt: product.shippingWeight || 0,
        barcodeNo: product.barcodeNo || '',
        gstExclusive: product.gstExclusive || false,
        extraCharges: ('extraCharges' in product) && (typeof product.extraCharges === 'object') && product.extraCharges.active ? product.extraCharges : { charge: 0 },
        isCod: 'isCod' in product ? product.isCod : true,
        vendorId: product.vendorId || '',
        priceSlabs: 'priceSlabs' in product ? product.priceSlabs : { active: false },
        templateId: product.templateId || ''

    };
    if (product.slug && product.slug.name) {
        cartObj.slug = product.slug
    }
    let desc = removeHtml(product.prodDesc);
    cartObj['description'] = desc;
    if (product.discountedPrice && (product.discountedPrice !== product.prodPrice)) {
        cartObj['mrpPrice'] = product.prodPrice;
        cartObj['price'] = product.discountedPrice;
    } else {
        cartObj['price'] = product.prodPrice;
    }
    if (product.hasOwnProperty('color') && product.color.hasOwnProperty('name')) {
        cartObj['color'] = product.color;
    }
    cartObj = priceSlabsCheck(cartObj, product); //removed qunantity 
    return cartObj;
}

function getCoverPic(product, index) {
    const variant = product.priceList[index];
    return 'images' in variant && variant.images.length ? variant.images[0] : (product.coverPic ? product.coverPic : {});
}

function getPriceListCartObj(product, id, quantity, index) {
    // console.log("03")
    let cartObj = {
        name: product.prodName,
        quantity: quantity,
        img: getCoverPic(product, 0),
        description: product.priceList[index].weight,
        commentMsg: '',
        commentImgs: [],
        maxQty: product.maxQty ? product.maxQty : 0,
        minQty: product.minQty ? product.minQty : 1,
        gst: product.gst ? product.gst : 0,
        status: typeof product.status !== 'undefined' ? product.status : true,
        stopWhenNoQty: product.hasOwnProperty('stopWhenNoQty') && typeof product.stopWhenNoQty !== 'undefined' ? product.stopWhenNoQty : false,
        totalQty: product.priceList[index].totalQuantity ? product.priceList[index].totalQuantity : '',
        hsn: product.hsnCode ? product.hsnCode : '',
        sku: ('sku' in product.priceList[index] && product.priceList[index].sku != "") ? product.priceList[index].sku : (product.productCode ? product.productCode : ''),
        barcode: product.priceList[index].barcode ? product.priceList[index].barcode : '',
        shippingWt: product.priceList[index].shippingWeight || 0,
        barcodeNo: product.priceList[index].barcodeNo || '',
        gstExclusive: product.gstExclusive || false,
        extraCharges: ('extraCharges' in product) && (typeof product.extraCharges === 'object') && product.extraCharges.active ? product.extraCharges : { charge: 0 },
        isCod: 'isCod' in product ? product.isCod : true,
        vendorId: product.vendorId || '',
        priceSlabs: 'priceSlabs' in product ? product.priceSlabs : { active: false },
        templateId: product.templateId || '',
        pack: {
            weight: product.priceList[index].weight,
            variantType: product.variantType ? product.variantType : 'variant'
        }
    };
    if (product.slug && product.slug.name) {
        cartObj.slug = product.slug
    }
    if (product.variantType && product.variantType === 'pieces') {
        if (product.priceList[index].discountedPrice && product.priceList[index].discountedPrice !== product.priceList[index].price) {
            cartObj['mrpPrice'] = product.priceList[index].price * parseInt(product.priceList[index].weight);
            cartObj['price'] = product.priceList[index].discountedPrice * parseInt(product.priceList[index].weight);
            cartObj.pack['price'] = product.priceList[index].discountedPrice * parseInt(product.priceList[index].weight);
            cartObj.pack['perPcPrice'] = product.priceList[index].discountedPrice;
        } else {
            cartObj['price'] = product.priceList[index].price * parseInt(product.priceList[index].weight);
            cartObj.pack['price'] = product.priceList[index].price * parseInt(product.priceList[index].weight);
            cartObj.pack['perPcPrice'] = product.priceList[index].price;
        }
    } else {
        if (product.priceList[index].discountedPrice && product.priceList[index].discountedPrice !== product.priceList[index].price) {
            cartObj['mrpPrice'] = product.priceList[index].price;
            cartObj['price'] = product.priceList[index].discountedPrice;
            cartObj.pack['price'] = product.priceList[index].discountedPrice;
        } else {
            cartObj['price'] = product.priceList[index].price;
            cartObj.pack['price'] = product.priceList[index].price;
        }
    }

    if (product.hasOwnProperty('color') && product.color.hasOwnProperty('name')) {
        cartObj['color'] = product.color;
    }

    cartObj['productId'] = id;

    cartObj = priceSlabsCheck(cartObj, product); // removed quantity

    return cartObj;
}

const fetchProductCartData = ({ productDetails, productExtractedData }) => { //id, quantity, variant,prodCartData
    try {
        // console.log("02")
        if (productExtractedData.variant) {
            //variant available
            let variantIndex;
            const variants = productDetails.priceList;
            if (variants) {
                for (const [index, element] of variants.entries()) {
                    if (element.weight == productExtractedData.variant) {
                        //variant index found
                        variantIndex = index
                        // console.log("variant index found : ", index, " ", element.weight)
                        break;
                    }
                }
            }
            if (variantIndex == undefined) {
                //variant index not found
                return undefined
            }
            else {
                //variant index found
                return getPriceListCartObj(productDetails, productExtractedData.id, productExtractedData.quantity, variantIndex)
            }
        }
        else {
            //variant not available
            return getCartObj(productDetails, productExtractedData.id, productExtractedData.quantity)
        }
    } catch (error) {
        console.log("error occurred in create product cart data fetchProductCartData : ", error)
        collectErrors('unknown', error, "fetchProductCartData", 'error occurred in create product cart data ')
        return undefined
    }
}

//fetch product ID, variant, and quantity
function productDetailsExtractor(product) {
    const productDetails = {};
    productDetails.quantity = product.quantity
    if (product.product_retailer_id.includes('###')) {
        // console.log('variant exists')
        const productDetailsArray = product.product_retailer_id.split('###');
        productDetails.id = productDetailsArray[0];
        productDetails.variant = productDetailsArray[1].replace('*', ' ');
    }
    else {
        // console.log('variant not exists')
        productDetails.id = product.product_retailer_id;
    }
    return productDetails;
}

const searchProductInDb = async (product) => {
    if (product.id !== undefined) {
        const productRef = await db.collection('products').doc(product.id).get()
        if (productRef.data()) {
            // console.log("product found product data : ", product)
            return { productDetails: productRef.data(), productExtractedData: product }
        } else {
            console.log("product not found product data : ", product)
        }
    }
    return undefined
}

//add to cart main fucniton
const addToCart = async (receiverNo, productList, userId, userChatRef) => {
    const batch = db.batch();
    try {
        const products = [];//id, quantity, variant
        for (const product of productList) {
            products.push(productDetailsExtractor(product))
        }
        const t1 = Date.now()///
        const productsData = []; //id, quantity, variant,prodCartData
        const productsRef = [] //productRef
        for (const [index, product] of products.entries()) {
            // console.log("product No", index + 1)
            productsRef[index] = searchProductInDb(product)
        }
        const promiseArray = await Promise.all(productsRef)
        for (const [index, prodData] of promiseArray.entries()) {
            if (prodData) { productsData.push(prodData) } else {
                collectErrors(receiverNo, productList[index] ? productList[index] : 'unknwon', "addToCart", 'product not found in the product collection')
            }
        }
        console.log('time taken to fetch ', productList.length, ' products : ', (Date.now() - t1) / 1000)///
        const updatedCartProducts = []
        if (productsData.length) {
            console.log("starting adding product in start total products - " + productsData.length)
            const cartRef = await db.collection('users').doc(userId).collection('cart').get()
            if (cartRef.empty) {
                //cart is empty
                for (const product of productsData) {
                    // console.log("01")
                    const productCartData = fetchProductCartData(product)
                    // console.log("05")
                    if (productCartData) {
                        const addCartRef = db.collection('users').doc(userId).collection('cart').doc()
                        batch.set(addCartRef, productCartData)
                        updatedCartProducts.push(productCartData)
                    }
                    else {
                        //variant not found
                        console.log("error occurred in creating product cart data")
                        collectErrors(receiverNo, product ? product : 'unknwon', "addToCart", 'error occurred in creating product cart data')
                    }
                    // console.log("06")
                }
                await batch.commit()
                console.log("Promise : product details fetched ")
            } else {
                //cart is not empty
                const cartProducts = [];
                cartRef.forEach(cartDoc => {
                    cartProducts.push({ id: cartDoc.id, ...cartDoc.data() })
                    updatedCartProducts.push(cartDoc.data())
                })
                for (const product of productsData) {
                    // console.log("adding product to cart : ", product)
                    let productAddStatus = false
                    for (const [index, cartProduct] of cartProducts.entries()) {
                        if (product.productExtractedData.id == cartProduct.productId) {
                            //same product Id
                            // console.log("product quantity : ", product.productExtractedData.quantity)
                            if (cartProduct.pack) {
                                //variant available
                                if (product.productExtractedData.variant == cartProduct.pack.weight) {
                                    //variant matched
                                    //increasing quantity
                                    const addCartProductRef = db.collection('users').doc(userId).collection('cart').doc(cartProduct.id)
                                    batch.update(addCartProductRef, { quantity: admin.firestore.FieldValue.increment(product.productExtractedData.quantity * 1) })
                                    productAddStatus = true
                                    updatedCartProducts[index].quantity = cartProduct.quantity + product.productExtractedData.quantity * 1
                                    break
                                } else {
                                    //variant not found
                                    productAddStatus = false
                                }
                            } else {
                                //variant not available
                                //increasing quantity
                                const addCartProductRef = db.collection('users').doc(userId).collection('cart').doc(cartProduct.id)
                                batch.update(addCartProductRef, { quantity: admin.firestore.FieldValue.increment(product.productExtractedData.quantity * 1) })
                                productAddStatus = true
                                updatedCartProducts[index].quantity = cartProduct.quantity + product.productExtractedData.quantity * 1
                                break
                            }
                        }
                    }
                    if (!productAddStatus) {
                        //same product not available in cart
                        //adding product in cart
                        const productCartData = fetchProductCartData(product)
                        if (productCartData) {
                            //product added to cart
                            const addCartRef = db.collection('users').doc(userId).collection('cart').doc()
                            batch.set(addCartRef, productCartData)
                            updatedCartProducts.push(productCartData)
                        }
                        else {
                            //some error occurred
                            console.log("error occurred in creating product cart data")
                            collectErrors(receiverNo, product ? product : 'unknwon', "addToCart", 'error occurred in creating product cart data')
                        }
                    }
                }
                // await Promise.all(promiseObj)
                await batch.commit()
                console.log("Promise : products added to cart ")
            }
            console.log("products added to cart successfully")
        }

        console.log('time taken to fetch and add ', productList.length, ' products to cart : ', (Date.now() - t1) / 1000)///

        const cartSummary = await createCartSummary(userId, updatedCartProducts)

        if (cartSummary.length) {
            //send updated cart to user
            await sendCartDetails(receiverNo, userId, cartSummary, userChatRef)
        } else {
            //cart is empty means products not added in cart due to any reason
            await sendTextMsg(receiverNo, undefined, userId, userChatRef)
            collectErrors(receiverNo, "error in addToCart", "addToCart", 'product not found in the collection due to this cart is empty please check sent cart details')
        }
    }
    catch (error) {
        console.log('error in addToCart : ', error)
        collectErrors(receiverNo, error, "addToCart", 'error in addToCart')
        return 'not added'
    }
}

exports.whatsappExpress = functions.https.onRequest(app);

//send invoice details
const sendInvoicePdf = async (orderDetails) => {
    console.log("user ID: ", orderDetails.userId)
    let userDetails = await db.collection('users').doc(orderDetails.userId).get()
    if (userDetails.data()) {
        const userDetail = userDetails.data()
        console.log("user Found mobile no: ", userDetail.phoneNo)
        const body = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": userDetail.phoneNo,
            "type": "document",
            "document": {
                "link": orderDetails.invoice.url,
                "filename": `Invoice-${orderDetails.orderId}.pdf`,
                "caption": `Please find the payment invoice for your *Order ID ${orderDetails.orderId}*`,
            }
        }
        await timeDelay(10)
        await sendMsg(body, orderDetails.userId, { bodyText: body.document.caption })
    }
}

//change
//send order updates
const sendOrderUpdate = async (orderDetails, phoneNo, userChatRef) => {
    let receiverNo;
    let dataPresent = false;
    if (phoneNo) {
        receiverNo = phoneNo
        console.log("phone no Passed : ", receiverNo)
        dataPresent = true
    } else {
        console.log("user ID : ", orderDetails.userId)
        const userDetail = await db.collection('users').doc(orderDetails.userId).get()
        if (userDetail.data()) {
            receiverNo = userDetail.data().phoneNo
            console.log("user Found mobile no: ", receiverNo)
            dataPresent = true
        }
        else {
            dataPresent = false;
            console.log("user not found Id ", orderDetails.userId)
        }
    }
    if (dataPresent) {
        const bodyData = {
            "type": "template",
            "name": `${(orderDetails.status === 'Rejected' || orderDetails.status === 'Cancelled') ? 'order_status_changed2' : 'order_status_changed'}`,
            "components": [
                {
                    "type": "BODY",
                    "text": "*Order {{2}}*\n\nYour order with *Order ID {{1}}* has been/is {{2}}.",
                    "example": {
                        "body_text": [
                            orderDetails.orderId,//orderID
                            orderDetails.status //order status
                        ]
                    }
                }
            ],
            "language": "en_US"
        }
        await createDocMsg(receiverNo, bodyData, orderDetails.userId, userChatRef)
    }
}

exports.onUpdateOrder = functions.firestore.document('orders/{orderId}').onUpdate(async (change, context) => {
    const orderDocBefore = change.before.data();
    const orderDocAfter = change.after.data();
    const orderDocId = context.params.orderId
    if (credData == undefined) {
        await fetchCreds();
    }
    if (credData && orderDocBefore.metaData && (orderDocBefore.metaData.source === 'whatsapp' || (credData.setting && credData.setting.allOrderNotification))) {
        if (orderDocAfter.status != orderDocBefore.status) {
            console.log("order status changed, ID : ", orderDocAfter.orderId, " status : ", orderDocAfter.status)
            if (orderDocAfter.status == 'Confirmed') {
                const bodyData = (await db.collection('whatsapp').doc('menu').collection('menu-items').doc(orderDocAfter.payment && orderDocAfter.payment.completed ? 'order-status-confirmed-prepaid' : 'order-status-confirmed-postpaid').get()).data();
                if (bodyData) {
                    await sendOrderPaymentLink(orderDocAfter.orderId, orderDocAfter, orderDocId, bodyData)
                } else {
                    await sendOrderUpdate(orderDocAfter, undefined)
                }
                if (credData.setting && credData.setting.orderAlertToAdmin) {
                    const bodyData = (await db.collection('whatsapp').doc('menu').collection('menu-items').doc('order-notification-to-admin').get()).data();
                    if (bodyData && bodyData.phoneNoArray && bodyData.phoneNoArray.length) {
                        await Promise.all(bodyData.phoneNoArray.map(async (phoneNo) => {
                            return await createDocMsg(phoneNo, fillOrderTemplateVariables(orderDocAfter, bodyData), '', {})
                        }))
                    }
                }
            } else if (orderDocAfter.status == 'Delivered') {
                const bodyData = (await db.collection('whatsapp').doc('menu').collection('menu-items').doc(orderDocAfter.payment && orderDocAfter.payment.completed ? 'order-status-delivered-prepaid' : 'order-status-delivered-postpaid').get()).data();
                if (bodyData) {
                    await sendOrderPaymentLink(orderDocAfter.orderId, orderDocAfter, orderDocId, bodyData)
                } else {
                    await sendOrderUpdate(orderDocAfter, undefined)
                }
            } else {
                await sendOrderUpdate(orderDocAfter, undefined)
            }
        }
        else if (orderDocAfter.status === 'Confirmed' && (orderDocBefore.orderId === null || !orderDocBefore.hasOwnProperty('orderId')) && orderDocAfter.orderId != null) {
            console.log("order status changed, ID : ", orderDocAfter.orderId, " status : ", orderDocAfter.status)
            const bodyData = (await db.collection('whatsapp').doc('menu').collection('menu-items').doc(orderDocAfter.payment && orderDocAfter.payment.completed ? 'order-status-confirmed-prepaid' : 'order-status-confirmed-postpaid').get()).data();
            if (bodyData) {
                await sendOrderPaymentLink(orderDocAfter.orderId, orderDocAfter, orderDocId, bodyData)
            } else {
                await sendOrderUpdate(orderDocAfter, undefined)
            }
            if (credData.setting && credData.setting.orderAlertToAdmin) {
                const bodyData = (await db.collection('whatsapp').doc('menu').collection('menu-items').doc('order-notification-to-admin').get()).data();
                if (bodyData && bodyData.phoneNoArray && bodyData.phoneNoArray.length) {
                    await Promise.all(bodyData.phoneNoArray.map(async (phoneNo) => {
                        return await createDocMsg(phoneNo, fillOrderTemplateVariables(orderDocAfter, bodyData), '', {})
                    }))
                }
            }
        }
        else if ((orderDocBefore.invoice === null || !orderDocBefore.hasOwnProperty('invoice')) && orderDocAfter.invoice != null && orderDocAfter.invoice.status === 'generated') {
            console.log("order invoice generated, ID : ", orderDocAfter.orderId, " status : ", orderDocAfter.status, " invoice url : ", orderDocAfter.invoice.url)
            await sendInvoicePdf(orderDocAfter)
        }
    }
})

const sendBookingUpdate = async (bookingDetails, templateName, msg) => {
    let receiverNo;
    if (bookingDetails.user && bookingDetails.user.id && templateName && msg) {
        console.log("user ID : ", bookingDetails.user.id)
        const userDetail = await db.collection('users').doc(bookingDetails.user.id).get()
        if (userDetail.data()) {
            receiverNo = userDetail.data().phoneNo
            console.log("user Found mobile no: ", receiverNo)
            const bodyData = {
                "type": "template",
                "name": templateName,
                "components": [
                    {
                        "type": "BODY",
                        "example": {
                            "body_text": []
                        }
                    }
                ],
                "language": "en_US"
            }
            switch (templateName) {
                case 'booking_status_changed_1_schedule': {
                    bodyData.components[0].text = `*Booking {{1}}*\n\nYour Booking for {{2}} Service is {{1}}.\nBooking ID {{3}}.\n\n*Booking Schedule*\n\nDate - {{4}}\nTime Slot - {{5}} to {{6}}`
                    bodyData.components[0].example.body_text = [convertcew(bookingDetails.status), convertcew(bookingDetails.item.name), bookingDetails.bookingId, bookingDetails.schedule.date, bookingDetails.schedule.slot.start, bookingDetails.schedule.slot.end]
                    break;
                }
                case 'booking_status_changed_1': {
                    bodyData.components[0].text = `*Booking {{1}}*\n\nYour Booking for {{2}} Service is {{1}}.\nBooking ID {{3}}.`
                    bodyData.components[0].example.body_text = [convertcew(bookingDetails.status), convertcew(bookingDetails.item.name), bookingDetails.bookingId]
                    break;
                }
                case 'booking_schedule_changed': {
                    bodyData.components[0].text = `*Booking Rescheduled*\n\nYour service is Rescheduled by Our Team because of some reason.\nApologies for the inconvenience.\n\n*New Booking schedule*\n\nDate - {{1}}\nTime slot - {{2}} to {{3}}`
                    bodyData.components[0].example.body_text = [bookingDetails.schedule.date, bookingDetails.schedule.slot.start, bookingDetails.schedule.slot.end]
                    break;
                }
                case 'booking_payment_confirmation': {
                    bodyData.components[0].text = `*Payment Confirmed*\n\nYour payment for {{1}} Booking is Confirmed.\nYour Booking ID is {{2}}.`
                    bodyData.components[0].example.body_text = [convertcew(bookingDetails.item.name), bookingDetails.bookingId]
                    break;
                }
                default: {
                    bodyData.error = true
                    break;
                }
            }
            let status = false
            if (!bodyData.error) {
                status = await createDocMsg(receiverNo, bodyData, bookingDetails.user.id)

            }
            if (!status) {
                await sendTextMsg(receiverNo, msg, bookingDetails.user.id)
            }
        }
        else {
            console.log("user not found Id ", bookingDetails.user.id)
        }
    }
}

exports.onUpdateBooking = functions.firestore.document('bookings/{bookingId}').onUpdate(async (change, context) => {
    try {
        const bookingDocBefore = change.before.data();
        const bookingDocAfter = change.after.data();
        if (bookingDocBefore.metaData && bookingDocBefore.metaData.source === 'whatsapp') {
            console.log("0")
            if (!bookingDocBefore.bookingId && bookingDocAfter.bookingId && bookingDocAfter.status == 'accepted') {
                const msg = bookingDocAfter.schedule ? `*Booking ${convertcew(bookingDocAfter.status)}*\n\nYour Booking for ${bookingDocAfter.item.name} service is ${convertcew(bookingDocAfter.status)}.\nBooking ID ${bookingDocAfter.bookingId}.\n\n*Booking schedule*\n\nDate - ${bookingDocAfter.schedule.date}\nTime slot - ${bookingDocAfter.schedule.slot.start} to ${bookingDocAfter.schedule.slot.end}` : `*Booking ${convertcew(bookingDocAfter.status)}*\n\nYour Booking for ${bookingDocAfter.item.name} service is ${convertcew(bookingDocAfter.status)}.\nBooking ID ${bookingDocAfter.bookingId}.`
                const templateName = bookingDocAfter.schedule ? "booking_status_changed_1_schedule" : "booking_status_changed_1"
                await sendBookingUpdate(bookingDocAfter, templateName, msg)
            }
            else if (bookingDocAfter.bookingId) {
                if (bookingDocAfter.payment && !bookingDocBefore.payment.completed && bookingDocAfter.payment.completed) {
                    console.log("3")
                    const msg = `*Payment Confirmed*\n\nYour payment for ${convertcew(bookingDocAfter.item.name)} Booking is Confirmed.\nYour Booking ID is ${bookingDocAfter.bookingId}.`
                    await sendBookingUpdate(bookingDocAfter, "booking_payment_confirmation", msg)
                }
                if (bookingDocAfter.status != bookingDocBefore.status) {
                    console.log("4")
                    const msg = bookingDocAfter.schedule ? `*Booking ${convertcew(bookingDocAfter.status)}*\n\nYour Booking for ${bookingDocAfter.item.name} service is ${convertcew(bookingDocAfter.status)}.\nBooking ID ${bookingDocAfter.bookingId}.\n\n*Booking schedule*\n\nDate - ${bookingDocAfter.schedule.date}\nTime slot - ${bookingDocAfter.schedule.slot.start} to ${bookingDocAfter.schedule.slot.end}` : `*Booking ${convertcew(bookingDocAfter.status)}*\n\nYour Booking for ${bookingDocAfter.item.name} service is ${convertcew(bookingDocAfter.status)}.\nBooking ID ${bookingDocAfter.bookingId}.`
                    const templateName = bookingDocAfter.schedule ? "booking_status_changed_1_schedule" : "booking_status_changed_1"
                    await sendBookingUpdate(bookingDocAfter, templateName, msg)
                } else if (bookingDocAfter.status == 'accepted' && bookingDocAfter.schedule && JSON.stringify(bookingDocBefore.schedule) !== JSON.stringify(bookingDocAfter.schedule)) {
                    console.log("5")
                    const msg = `*Booking Rescheduled*\n\nYour service is Rescheduled by Our Team because of some reason.\nApologies for the inconvenience.\n\n*New Booking schedule*\n\nDate - ${bookingDocAfter.schedule.date}\nTime slot - ${bookingDocAfter.schedule.slot.start} to ${bookingDocAfter.schedule.slot.end}`
                    await sendBookingUpdate(bookingDocAfter, "booking_schedule_changed", msg)
                }
                console.log("6")
            }
        }
    } catch (error) {
        console.log('error in onUpdateBooking : ', error)
        collectErrors(bookingDocAfter.user ? bookingDocAfter.user.id : "order update", error, "onUpdateBooking", 'error occured while sending booking updates')
    }
})

//save msg, update status and media module

//upload media to firebase
async function uploadMedia(data, userId) {
    // console.log(data)
    return new Promise(async resolve => {
        var file = bucket.file(`whatsapp/chatMedia/${new Date().toLocaleDateString().toString().replace(/\//g, '-')}/${userId}/` + data.id)
        file.save(data.buffer, {
            metadata: { contentType: data.mime_type },
        })
        const config = {
            action: 'read',
            expires: '03-01-2500',
        }
        // @ts-ignore
        let downloadUrl = await file.getSignedUrl(config)
        resolve(downloadUrl[0])
    })
}

//save whatsapp media using media Id to firebase storage
const saveMedia = async (mediaId, userId) => {
    try {
        if (credData == undefined) {
            await fetchCreds();
        }
        const respone = await axios.get(`${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${mediaId}`, { headers: { 'Authorization': `Bearer ${credData.authToken}` }, httpsAgent: new https.Agent({ keepAlive: true }) })
        console.log("media url & details: ", respone.data.url)
        const mediaBufferData = await axios.get(respone.data.url, { headers: { 'Authorization': `Bearer ${credData.authToken}` }, responseType: "arraybuffer", httpsAgent: new https.Agent({ keepAlive: true }) })
        const mediaUrl = await uploadMedia({ buffer: mediaBufferData.data, id: respone.data.id, mime_type: respone.data.mime_type }, userId)
        console.log("media url firebase : ", mediaUrl)
        return mediaUrl

    } catch (error) {
        console.log('error in downloading and uploading media to firebase storage : ', error)
        collectErrors(userId, error, "saveMedia", 'error in downloading and uploading media to firebase storage')
        return undefined
    }
}

const receiveContactFormat = (contactArray) => {
    try {
        let contactSummaryMsg = '\n'
        for (const contact of contactArray) {
            contactSummaryMsg = contactSummaryMsg.concat(contact.name.formatted_name ? contact.name.formatted_name : 'unkown-name')
            contactSummaryMsg = contactSummaryMsg.concat(' - ' + contact.phones.map((e) => { return e.phone }) + '\n')
        }
        return contactSummaryMsg
    }
    catch (error) {
        console.log("error in receiveContactFormat error", error)
        collectErrors("unknown", error, "receiveContactFormat", 'error in receiveContactFormat')
        return 'nan'
    }
}

const objectString = (object) => {
    let objectString = ''
    if (object) {
        for (const [key, value] of Object.entries(object)) {
            objectString = objectString + ' ' + key + ' - ' + value + '\n'
        }
    }
    return objectString
}

const getTextFromUserInput = (sourceObj) => {
    const input = { id: "", text: "", type: "" }
    if (sourceObj.type == 'text') {
        if (isNaN(sourceObj.text.body)) {
            input.text = sourceObj.text.body
            input.type = 'text'
        } else {
            input.text = sourceObj.text.body * 1
            input.type = 'textnumber'
        }
    }
    else if (sourceObj.type == 'button') {
        input.text = sourceObj.button.text
        input.type = 'button'
    }
    else if (sourceObj.type == 'interactive') {
        if (sourceObj.interactive.type == 'button_reply') {
            input.text = sourceObj.interactive.button_reply.title;
            input.id = sourceObj.interactive.button_reply.id;
            input.type = 'button'
        }
        else if (sourceObj.interactive.type == 'list_reply') {
            input.text = sourceObj.interactive.list_reply.title;
            input.id = sourceObj.interactive.list_reply.id;
            input.type = 'list'
        }
    }
    else if (sourceObj.type == 'order') {
        input.text = `Product Added in cart -(${sourceObj.order.product_items ? sourceObj.order.product_items.length : 'nan'} items)`
        input.type = 'order'
    }
    else if (sourceObj.type == 'contacts') {
        input.text = `contact received -${receiveContactFormat(sourceObj.contacts)}`
        input.type = 'contact'
    }
    else if (sourceObj.type == 'location') {
        input.text = `${sourceObj.location.latitude},${sourceObj.location.longitude}`
        input.type = 'location'
    }
    else if (sourceObj.type == 'reaction') {
        input.text = sourceObj.reaction.emoji
        input.type = 'reaction'
    }
    else if (sourceObj.type == 'sticker') {
        input.text = sourceObj.sticker.id
        input.type = 'sticker'
    }
    else if (sourceObj.type == 'image') {
        input.text = sourceObj.image.id
        input.type = 'image'
    }
    else if (sourceObj.type == 'video') {
        input.text = sourceObj.video.id
        input.type = 'video'
    }
    else if (sourceObj.type == 'audio') {
        input.text = sourceObj.audio.id
        input.type = 'audio'
    }
    else if (sourceObj.type == 'document') {
        input.text = sourceObj.document.id
        input.type = 'document'
    }
    else {
        input.text = "Message type is currently not supported."
    }
    return input
}

//seva messages to user's chat
const saveMsgForChat = async (msgAuthor, userID, sourceObj, bodyData, userChatRef) => { //bodyData for admin
    try {
        const author = msgAuthor ? msgAuthor.toLowerCase() : 'unknown'
        let text = 'nan';
        let source = {}
        let userId = userID
        if (userId == undefined) {
            const userID = await findUserId(sourceObj.to)
            userId = userID ? userID.uid : userID
        }
        if (userId) {
            if (author == 'user') {
                let medUrl;
                if (sourceObj.type == 'text') {
                    text = sourceObj.text.body
                }
                else if (sourceObj.type == 'button') {
                    text = sourceObj.button.text
                }
                else if (sourceObj.type == 'interactive') {
                    if (sourceObj.interactive.type == 'button_reply') {
                        text = sourceObj.interactive.button_reply.title;
                    }
                    else if (sourceObj.interactive.type == 'list_reply') {
                        text = sourceObj.interactive.list_reply.title;
                    }
                }
                else if (sourceObj.type == 'order') {
                    text = `Product Added in cart -(${sourceObj.order.product_items ? sourceObj.order.product_items.length : 'nan'} items)`
                }
                else if (sourceObj.type == 'contacts') {
                    text = `contact received -${receiveContactFormat(sourceObj.contacts)}`
                    // text = `contact received -${sourceObj.contacts ? sourceObj.contacts.length : 'nan'}`
                }
                else if (sourceObj.type == 'location') {

                    text = `location received \n http://maps.google.com/maps?q=${sourceObj.location.latitude},${sourceObj.location.longitude}\n` + objectString(sourceObj.location)
                }
                else if (sourceObj.type == 'reaction') {
                    text = sourceObj.reaction.emoji
                }
                else if (sourceObj.type == 'sticker') {
                    const mediaUrl = await saveMedia(sourceObj.document.id, userId)
                    text = `Media received`
                    medUrl = mediaUrl
                }
                else if (sourceObj.type == 'image') {
                    const mediaUrl = await saveMedia(sourceObj.image.id, userId)
                    text = `${sourceObj.image.caption ? sourceObj.image.caption : 'Media received'}`
                    medUrl = mediaUrl
                }
                else if (sourceObj.type == 'video') {
                    const mediaUrl = await saveMedia(sourceObj.video.id, userId)
                    text = `${sourceObj.video.caption ? sourceObj.video.caption : 'Media received'}`
                    medUrl = mediaUrl
                }
                else if (sourceObj.type == 'audio') {
                    const mediaUrl = await saveMedia(sourceObj.audio.id, userId)
                    text = `${sourceObj.audio.caption ? sourceObj.audio.caption : 'Media received'}`
                    medUrl = mediaUrl
                }
                else if (sourceObj.type == 'document') {
                    const mediaUrl = await saveMedia(sourceObj.document.id, userId)
                    text = `${sourceObj.document.caption ? sourceObj.document.caption : 'Media received'}`
                    medUrl = mediaUrl
                }
                else {
                    text = "Message type is currently not supported."
                }
                source.data = { ...sourceObj }
                if (medUrl) {
                    source.data.mediaUrl = medUrl
                }
            }
            else if (author == 'admin') {
                text = bodyData ? bodyData.bodyText : 'msg send by bot'
                source.data = bodyData ? { ...bodyData, status: "pending", id: sourceObj.id } : { ...sourceObj, status: "pending" }
            }
            source.name = "whatsapp"
            if (author == 'admin' && bodyData.type != 'txt' && bodyData.msgId) {
                await db.collection('chats').doc(userId).collection('messages').doc(bodyData.msgId).update({ source });
            }
            else {
                const chatMsg = {
                    type: 'txt',  //text
                    message: text, //msgText
                    createdAt: new Date(), //date
                    images: null, //null
                    isRead: false, //change it
                    author: author, //user/admin
                    published: true, //true
                    thumb: null, //null
                    mob: null, //null
                    imageCount: null,
                    source: source
                };


                //fetching userChat Doc
                if (!userChatRef) {
                    const lastMsgDataRef = await db.collection('chats').doc(userId).get();
                    userChatRef = lastMsgDataRef.data()
                }
                // const lastMsgData = lastMsgDataRef.data()

                if (userChatRef) {

                    const batch = db.batch()
                    if (author == 'admin') {
                        const botState = userChatRef.botState ? userChatRef.botState : {}
                        const variableState = userChatRef.variableState ? userChatRef.variableState : {}
                        variableState.name = { text: userChatRef.name ? userChatRef.name : 'user' }
                        variableState.phoneNo = { text: userChatRef.userPhoneNo ? userChatRef.userPhoneNo : 'userPhoneNo' }
                        if (userChatRef.userActive === false) {
                            const chatDocRef = db.collection('chats').doc(userId).collection('messages').doc()
                            batch.set(chatDocRef, chatMsg)

                            const userChatDocRef = db.collection('chats').doc(userId)
                            batch.update(userChatDocRef, { unreadAdminMsgs: userChatRef.unreadAdminMsgs + 1, lastMessage: chatMsg.message, lastMessageAt: chatMsg.createdAt, totalMsgs: userChatRef.totalMsgs + 1, botState: botState, variableState: variableState })
                        } else {
                            chatMsg.isRead = true
                            const chatDocRef = db.collection('chats').doc(userId).collection('messages').doc()
                            batch.set(chatDocRef, chatMsg)

                            const userChatDocRef = db.collection('chats').doc(userId)
                            batch.update(userChatDocRef, { lastMessage: chatMsg.message, lastMessageAt: chatMsg.createdAt, totalMsgs: userChatRef.totalMsgs + 1, botState: botState, variableState: variableState })
                        }
                    } else if (author === 'user') {
                        if (userChatRef.adminActive === false) {

                            const chatDocRef = db.collection('chats').doc(userId).collection('messages').doc()
                            batch.set(chatDocRef, chatMsg)

                            const userChatDocRef = db.collection('chats').doc(userId)
                            batch.update(userChatDocRef, { unreadMsgs: userChatRef.unreadMsgs + 1, lastMessage: chatMsg.message, lastMessageAt: chatMsg.createdAt, totalMsgs: userChatRef.totalMsgs + 1 })
                        } else {
                            chatMsg.isRead = true

                            const chatDocRef = db.collection('chats').doc(userId).collection('messages').doc()
                            batch.set(chatDocRef, chatMsg)

                            const userChatDocRef = db.collection('chats').doc(userId)
                            batch.update(userChatDocRef, { lastMessage: chatMsg.message, lastMessageAt: chatMsg.createdAt, totalMsgs: userChatRef.totalMsgs + 1 })
                        }
                    }
                    await batch.commit()
                }
            }
        }
    } catch (error) {
        console.log("error in saveMsgForChat : ", error)
        collectErrors(userID, error, "saveMsgForChat", 'error in saveMsgForChat')
    }
}

//update message status by whatsapp Id
const updateMsgStatus = async (sourceObj, tryAgain, userID) => {
    let userId = userID
    let userChat;
    if (!userID) {
        const userID = await findUserId(sourceObj.recipient_id)
        if (userID) {
            userId = userID.uid
            userChat = userID.userChat
        }
    }
    try {
        if (userId) {
            if (!tryAgain && sourceObj.conversation && sourceObj.conversation.expiration_timestamp && userChat && (!userChat.whatsappMeta || !userChat.whatsappMeta.sessionExpiry || userChat.whatsappMeta.sessionExpiry != sourceObj.conversation.expiration_timestamp)) {
                const whatsappMeta = { sessionExpiry: sourceObj.conversation.expiration_timestamp, sendReqMsg: false }
                db.collection('chats').doc(userId).update({ whatsappMeta: whatsappMeta })
                console.log("updated session expiry")
            }
            const docData = await db.collection('chats').doc(userId).collection('messages').where("source.data.id", "==", sourceObj.id).limit(1).get()
            if (docData.empty) {
                console.log("msg not found msgId", sourceObj.id)
                if ((sourceObj.status == 'delivered' || sourceObj.status == 'read') && !tryAgain) {
                    await db.collection("whatsapp").doc('logs').collection("msgIdNotFound").add({
                        createdAt: new Date(),
                        functionName: "updateMsgStatus",
                        msgObj: sourceObj,
                        userDetails: userId ? userId : sourceObj.recipient_id,
                        msg: "user found in collection but msg is not found in chat collection"
                    })
                }
                if (!tryAgain) {
                    console.log("updateMsgStatus retrying")
                    await timeDelay(2)
                    updateMsgStatus(sourceObj, true, userId)
                }
            }
            else {
                let docId
                docData.forEach((doc) => {
                    docId = doc.id
                })
                // console.log(docId)
                const idStatusObj = { "source.data.status": sourceObj.status }
                await db.collection('chats').doc(userId).collection('messages').doc(docId).update({ ...idStatusObj })
            }
        }
        else {
            if (sourceObj.status != 'failed') {
                await db.collection("whatsapp").doc('logs').collection("msgIdNotFound").add({
                    createdAt: new Date(),
                    functionName: "updateMsgStatus",
                    msgObj: sourceObj,
                    userDetails: sourceObj.recipient_id ? sourceObj.recipient_id : 'unknown',
                    msg: "user not found in collection"
                })
            }
        }
        if (sourceObj.errors && !tryAgain) {
            await db.collection("whatsapp").doc('logs').collection("failedMsg").add({
                createdAt: new Date(),
                msgObj: sourceObj,
                userDetails: sourceObj.recipient_id ? sourceObj.recipient_id : 'unknown',
                msg: "msg failed to send most probably due to FB 24H policy"
            })
        }
    } catch (error) {
        console.log("error in updateMsgStatus : ", error)
        collectErrors(userId, error, "updateMsgStatus", 'error in updateMsgStatus')
    }
}

// send msg using admin panel
exports.sendAdminMsg = functions.https.onCall(async (data, context) => { //phoneNo//userId //type //msg
    return new Promise(async (resolve, reject) => {
        //store msg at common place
        if (credData == undefined) {
            await fetchCreds();
        }
        if (credData) {
            try {
                if (data && data.phoneNo) { //data.phoneNo
                    let bodyData;
                    if (data.type.toLowerCase() == "template") {
                        const storeName = adminName ? adminName : 'Store'
                        bodyData = {
                            "type": "template",
                            "name": "default_template",
                            "bodyText": "default_template",
                            "components": [
                                {
                                    "type": "BODY",
                                    "text": "Welcome to *{{1}}*\n\nSend 'Hi' to Start shopping on whatsapp",
                                    "example": [
                                        storeName
                                    ]
                                },
                                {
                                    "type": "BUTTONS",
                                    "buttons": [
                                        {
                                            "type": "QUICK_REPLY",
                                            "text": "Hi",
                                            "payload": "menu-entry-point"
                                        }
                                    ]
                                }
                            ],
                            "language": "en_US"
                        }
                    }
                    else if (data.type.toLowerCase() == "msg") {
                        bodyData = {
                            type: "text",
                            bodyText: data.msg.message
                        }
                    }
                    else if ((data.type.toLowerCase() == "image" || data.type.toLowerCase() == "video" || data.type.toLowerCase() == "document") && data.msgId) {
                        await timeDelay(8)
                        const chatRef = await db.collection('chats').doc(data.userId).collection('messages').doc(data.msgId).get()
                        if (chatRef.data() && (chatRef.data().type.toLowerCase() == "image" || chatRef.data().type.toLowerCase() == "video" || chatRef.data().type.toLowerCase() == "document") && chatRef.data().images && chatRef.data().images.length && chatRef.data().images[0].url) {
                            await axios(chatRef.data().images[0].url).then((res) => {
                            }).catch(async (error) => {
                                console.log("unable to fetch media, url : ", chatRef.data().images[0].url)
                                await timeDelay(3)
                                console.log("done")
                            })
                            bodyData = {
                                type: chatRef.data().type,
                                mediaUrl: chatRef.data().images[0].url,
                                msgId: data.msgId
                            }
                            chatRef.data().message ? bodyData['bodyText'] = chatRef.data().message : {}
                        } else {
                            console.log('image msg not found : ', data)
                            collectErrors(data.phoneNo, data, "sendAdminMsg", 'image msg not found')
                            resolve({ success: false })
                        }
                        ///
                    }
                    if (bodyData) {
                        // console.log("sendAdminMsg bodyData : ", bodyData)
                        const body = createBody(data.phoneNo, bodyData)
                        // console.log(body)
                        if (body.error) {
                            collectErrors(data.phoneNo, bodyData, "sendAdminMsg", 'error in creating admin msg')
                            resolve({ success: false })
                        }
                        else {
                            const result = await sendMsg(body, data.userId, bodyData)
                            if (result) {
                                resolve({ success: true })
                            } else {
                                collectErrors(data.phoneNo, body, "sendAdminMsg", 'error in sending admin msg')
                                resolve({ success: false })
                            }
                        }
                    }
                    else {
                        console.log('invalid msg type ', data)
                        collectErrors(data.phoneNo, data, "sendAdminMsg", 'invalid admin msg type')
                        resolve({ success: false })
                    }
                }
                else {
                    console.log('invalid msg', data)
                    collectErrors(data.phoneNo, data, "sendAdminMsg", 'invalid admin msg')
                    resolve({ success: false })
                }
            } catch (error) {
                console.log('error sendAdminMsg : ', error, '\n\n adminData', data)
                collectErrors(data.phoneNo, error, "sendAdminMsg", 'error occurred in sendAdminMsg ' + (data ? JSON.stringify(data) : ''))
                resolve({ success: false })
            }
        } else {
            resolve({ success: false })
        }
    })
})


//updating facebook catalog Details

//capital each word
const convertcew = (converttext) => {
    if (converttext.length) {
        let text = converttext.toLowerCase().split(" ");
        text.forEach((element, i) => { text[i] = element.charAt(0).toUpperCase() + element.slice(1, element.length) })
        return text.join(' ')
    }
    return ''
};

//filter description text
const removeHtmlTags = (desc) => {
    let desp = desc.replace(/(<([^>]+)>)/ig, '');
    desp = desp.replace(/\n/g, " ")
    if (desp.startsWith('.')) {
        desp = desp.replace('.', '')
    }
    desp = desp.replace(/&nbsp;/g, " ")
    return (desp == desp.toUpperCase() ? convertcew(desp) == desp ? desp.toLowerCase() : convertcew(desp) : desp).slice(0, 450)
}

//create product slug for url
function encodeURL(url) {
    return escape(encodeURIComponent(url.toLowerCase().trim().replace(/ /g, '-')));
}

//find image link
function getImageLink(prodData) {
    if (prodData.coverPic && prodData.coverPic.url) {
        const url = prodData.coverPic.url
        if (url.startsWith("https")) { return url }
    }
    if (prodData.images && prodData.images[0] && prodData.images[0].url) {
        const url = prodData.images[0].url
        if (url.startsWith("https")) { return url }
    }
    return websiteLink + '/assets/img/placeholder-img.jpg'
}

//get additional product images
function getAdditionalImages(prodData) {
    let images = ""
    if (prodData.images && prodData.images[0]) {
        for (const imgs of prodData.images) {
            if (imgs.url.startsWith("https")) {
                if (images) {
                    images = `${images}, ${imgs.url.trim()}`
                } else {
                    images = imgs.url.trim()
                }
            }
        }
    }
    return images
}

//create product data variant & without variant for universal, v2, shopify && woocommerce
const createProductDetails = async (productDetails, productId, websiteSource) => {
    const variantList = [];
    if (productDetails && productDetails.prodName) {
        console.log("prodName : ", productDetails.prodName)
        let productLink;
        //creating product link
        if (websiteSource == 'universal' && productDetails.slug) {
            productLink = `${websiteLink}/product/${productDetails.slug.name}`
        }
        else if (websiteSource == 'v2') {
            const encodedProdName = encodeURL(productDetails.prodName);
            productLink = `${websiteLink}/product-details/${encodedProdName}/${productId}`
        }
        else if (websiteSource == 'shopify' && productDetails.integrationExtras && productDetails.integrationExtras.handle) {
            productLink = `${websiteLink}/products/${productDetails.integrationExtras.handle}`
        }
        else if (websiteSource == 'woocommerce') {
            productLink = websiteLink
        } else {
            productLink = websiteLink
        }

        if (productDetails.isPriceList && productDetails.priceList && productDetails.priceList.length !== 0) {
            console.log("variant exists")
            const variants = productDetails.priceList;
            for (const variant of variants) {
                if (variant.weight && variant.discountedPrice) {
                    const variantName = variant.weight.replace(' ', '*')
                    variantList.push({
                        id: `${productId}###${variantName}`,
                        title: `${(productDetails.prodName == productDetails.prodName.toUpperCase() ? convertcew(productDetails.prodName) == productDetails.prodName ? productDetails.prodName.toLowerCase() : convertcew(productDetails.prodName) : productDetails.prodName).trim().slice(0, 55)} ${variant.weight}`,
                        description: removeHtmlTags(productDetails.prodDesc) == '' ? (productDetails.prodName == productDetails.prodName.toUpperCase() ? convertcew(productDetails.prodName) == productDetails.prodName ? productDetails.prodName.toLowerCase() : convertcew(productDetails.prodName) : productDetails.prodName).trim() : removeHtmlTags(productDetails.prodDesc).trim(),
                        availability: (variant.totalQuantity <= 0 || variant.totalQuantity == '') ? 'out of stock' : 'in stock',
                        condition: 'new',
                        price: variant.price ? variant.price + ` ${currencyCode}` : variant.discountedPrice + ` ${currencyCode}`, //max price 
                        sale_price: variant.discountedPrice + ` ${currencyCode}`, //buy price
                        link: productLink, //product website url
                        image_link: getImageLink(productDetails), //product image url
                        additional_image_link: credData && credData.setting && credData.setting.multipleImage ? getAdditionalImages(productDetails) : "",
                        quantity_to_sell_on_facebook: 50,
                        origin_country: 'IN',
                        brand: 'NA',
                        identifier_exists: 'False',
                        custom_label_0: productDetails.productCode ? productDetails.productCode : 'nan',//temp
                        custom_label_1: (productDetails.searchKeywords && productDetails.searchKeywords[0]) ? productDetails.searchKeywords[0] : 'nan' //temp
                    })
                }
            }
        }
        else if (productDetails.productType && productDetails.productType == 'booking') {
            console.log("service")
            const serviceId = `send-service-${productId}`
            const text = '*' + convertcew(productDetails.prodName.trim()) + '*\n\n*Price :* ₹' + `${productDetails.discountedPrice ? productDetails.discountedPrice : productDetails.prodPrice}` + '\n\n' + removeHtml(productDetails.prodDesc) + '\n\n' + productLink
            const bodyData = {
                "type": "button",
                list: [{ id: `button-service-payment-link-${productId}`, title: "Book Now" }],
                header: { mediaUrl: getImageLink(productDetails), type: "image" },
                bodyText: text,
                id: serviceId
            }
            await db.collection("whatsapp").doc("menu").collection("menu-items").doc(serviceId).set(bodyData).catch((error) => {
                console.log('error in createProductDetails service, error:', error)
                collectErrors("unknown", error.response ? error.response.data : error, "createProductDetails", 'error in createProductDetails service')
            })
        }
        else {
            console.log("variant not exist")
            if (productDetails.discountedPrice) {
                variantList.push({
                    id: productId,
                    title: (productDetails.prodName == productDetails.prodName.toUpperCase() ? convertcew(productDetails.prodName) == productDetails.prodName ? productDetails.prodName.toLowerCase() : convertcew(productDetails.prodName) : productDetails.prodName).trim().slice(0, 64),
                    description: removeHtmlTags(productDetails.prodDesc) == '' ? (productDetails.prodName == productDetails.prodName.toUpperCase() ? convertcew(productDetails.prodName) == productDetails.prodName ? productDetails.prodName.toLowerCase() : convertcew(productDetails.prodName) : productDetails.prodName).trim() : removeHtmlTags(productDetails.prodDesc).trim(),
                    availability: (productDetails.productQty <= 0 || productDetails.productQty == "") ? 'out of stock' : 'in stock',
                    condition: 'new',
                    price: productDetails.prodPrice ? productDetails.prodPrice + ` ${currencyCode}` : productDetails.discountedPrice + ` ${currencyCode}`, //max price 
                    sale_price: productDetails.discountedPrice + ` ${currencyCode}`, //buy price
                    link: productLink, //product website url
                    image_link: getImageLink(productDetails), //product image url
                    additional_image_link: credData && credData.setting && credData.setting.multipleImage ? getAdditionalImages(productDetails) : "",
                    quantity_to_sell_on_facebook: 50,
                    origin_country: 'IN',
                    brand: 'NA',
                    identifier_exists: 'False',
                    custom_label_0: productDetails.productCode ? productDetails.productCode : 'nan',//temp
                    custom_label_1: (productDetails.searchKeywords && productDetails.searchKeywords[0]) ? productDetails.searchKeywords[0] : 'nan' //temp
                })

            }
        }
    }
    return variantList
}

//update product data
const updateFbInventory = async (productId, productDetails) => {
    console.log("productDetails : ", productDetails.prodName)
    let websiteSource = 'v2';
    if (websiteData && websiteData.source) {
        websiteSource = websiteData.source.toLowerCase()
    } else {
        let environmentDoc = await db.collection('settings').doc('environment').get();
        if (environmentDoc && environmentDoc.data() && environmentDoc.data().isUniversal) {
            websiteSource = 'universal';
        }
    }
    console.log('website is on ' + websiteSource)
    const ProductsDataArray = await createProductDetails(productDetails, productId, websiteSource)
    await sendFbInventoryRequest(ProductsDataArray)
}

//update product data request
const sendFbInventoryRequest = async (ProductsArrayData) => {
    if (ProductsArrayData && ProductsArrayData.length) {
        console.log("product length : ", ProductsArrayData.length)
        //store msg at common place
        if (credData == undefined) {
            await fetchCreds();
        }
        if (credData) {
            const ProductsArray = []
            for (const product of ProductsArrayData) {
                ProductsArray.push({ "method": "update", "data": product })
            }
            const body = { "item_type": "PRODUCT_ITEM", "requests": ProductsArray }
            // console.log(body)
            await axios.post(`${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${credData.catalogueId}/items_batch`, body, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
                .then((response) => {
                    console.log('success');
                    console.log('updateFbInventory : ', response.data)
                    if (ProductsArrayData.length > 1) {
                        db.collection("whatsapp").doc('logs').collection("accountUpdateMsg").add({ createdAt: new Date(), feedId: response.data.handles ? response.data.handles : response.data, status: JSON.stringify(response.data ? response.data : '') })
                    }
                }).catch((error) => {
                    console.log('error in update inventory updateFbInventory error : ', error.response ? error.response.data : error, '\n\n body ', body)
                    collectErrors("unknown", error.response ? error.response.data : error, "updateFbInventory", 'error occurred in axios\n\n' + JSON.stringify(body))
                })
        }
    }
}

//fetch fb current products
const fetchFbProducts = async () => {
    if (credData == undefined) {
        await fetchCreds();
    }
    const productsId = []
    try {
        const productBatchSize = 1000
        let url = ''
        let count = 0
        do {
            console.log("fetching iteration : ", ++count)
            const productsRef = await axios.get(url ? url : `${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${credData.catalogueId}/products?limit=${productBatchSize}&bulk_pagination=true`, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
            if (productsRef && productsRef.data && productsRef.data.data && productsRef.data.data.length) {
                for (const prodId of productsRef.data.data) {
                    productsId.push(prodId['retailer_id'])
                }
                if (productsRef.data.paging && productsRef.data.paging.next && productsRef.data.data.length == productBatchSize) {
                    url = productsRef.data.paging.next
                } else {
                    url = ""
                }
            } else {
                url = ""
            }
            console.log(url)
        } while (url);
    } catch (error) {
        console.log('error in fetch inventory fetchFbProducts error : ', error.response ? error.response.data : error)
        collectErrors("unknown", error.response ? error.response.data : error, "fetchFbProducts", 'error occurred in axios\n\n')
    }
    return productsId
}


//update all product data
const updateProductFeed = async () => {
    try {
        //store msg at common place
        if (credData == undefined) {
            await fetchCreds();
        }

        let websiteSource = 'v2';
        if (websiteData && websiteData.source) {
            websiteSource = websiteData.source.toLowerCase()
        } else {
            let environmentDoc = await db.collection('settings').doc('environment').get();
            if (environmentDoc && environmentDoc.data() && environmentDoc.data().isUniversal) {
                websiteSource = 'universal';
            }
        }
        console.log('website is on ' + websiteSource)
        const prodRef = await db.collection("products").get()
        const prodRefArray = []
        let productsArray = []
        prodRef.forEach((doc) => {
            if (doc.data()) {
                prodRefArray.push({ docId: doc.id, docData: doc.data() })
            }
        })
        console.log("total products : ", prodRefArray.length)
        for (const doc of prodRefArray) {
            productsArray = productsArray.concat(await createProductDetails(doc.docData, doc.docId, websiteSource))
        }
        console.log("total products sent : ", productsArray.length)
        const fbProducts = await fetchFbProducts()
        if (fbProducts && fbProducts.length && productsArray.length) {
            const tempProdsObj = {}
            const removedProductId = []
            for (const doc of productsArray) {
                tempProdsObj[doc.id] = true
            }
            console.log("remove product module")
            for (const doc of fbProducts) {
                if (!tempProdsObj[doc]) {
                    removedProductId.push({ id: doc })
                    console.log(doc)
                }
            }
            if (removedProductId.length) {
                console.log("total products removed : ", removedProductId.length)
                await deleteFbProducts(removedProductId)
            }
        }
        if (productsArray.length && credData) {
            const productsChunk = createChunkArray(productsArray, 500)
            for (const [j, productArrayChunk] of productsChunk.entries()) {
                await sendFbInventoryRequest(productArrayChunk)
                console.log("batch number : ", j + 1, "/", productsChunk.length)
                await timeDelay(1)
            }
        }
        return true
    } catch (error) {
        console.log('error in updateProductFeed : ', error.response ? error.response.data : error)
        collectErrors('nan', error.response ? error.response.data : error, "updateProductFeed", 'error in sending csv to facebook catalogue')
        return false
    }
}


const compareObj = (obj1, obj2, ingoreFieldArray = []) => {
    if (typeof obj1 !== typeof obj2) {
        return false
    } else {
        switch (typeof obj1) {
            case 'object':
                if (Array.isArray(obj1) || Array.isArray(obj2)) {
                    if (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length == obj2.length) {
                        for (const [index] of obj1.entries()) {
                            if (!compareObj(obj1[index], obj2[index], ingoreFieldArray)) {
                                return false
                            }
                        }
                        return true
                    } else {
                        return false
                    }
                } else if (!obj1 || !obj2) {
                    if (obj1 == obj2) {
                        return true
                    }
                    return false
                } else {
                    for (const key of Object.keys(obj1)) {
                        if (ingoreFieldArray.includes(key)) {
                        } else if (obj2.hasOwnProperty(key)) {
                            if (typeof obj1[key] !== typeof obj2[key]) {
                                return false
                            }
                            if (!compareObj(obj1[key], obj2[key], ingoreFieldArray)) {
                                return false
                            }
                        } else {
                            return false
                        }
                    }
                    return true
                }
            case 'function':
                return true
            default:
                return obj1 == obj2
        }
    }
}

const compareObjModule = (obj1, obj2, ingoreFieldArray = []) => {
    return compareObj(obj1, obj2, ingoreFieldArray) && compareObj(obj2, obj1, ingoreFieldArray)
}

exports.onUpdateProductDetails = functions.firestore.document('products/{productId}').onUpdate(async (change, context) => {
    const productDocBefore = change.before.data();
    const productDocAfter = change.after.data();
    const productId = context.params.productId
    //store msg at common place
    const prodDetail = {}
    try {
        let needUpdate = false
        if (productDocAfter.isPriceList && productDocAfter.priceList.length != 0) {
            //variant available
            if (JSON.stringify(productDocBefore.priceList) != JSON.stringify(productDocAfter.priceList)) {
                //change happened in price list //variant
                for (const [index, variant] of productDocAfter.priceList.entries()) {
                    if (JSON.stringify(productDocBefore.priceList[index]) != JSON.stringify(productDocAfter.priceList[index])) {
                        if (!(productDocBefore.priceList[index].totalQuantity && productDocAfter.priceList[index].totalQuantity) || !compareObjModule(productDocBefore.priceList[index], productDocAfter.priceList[index], ['totalQuantity'])) {
                            // out of stock //change in dis price //change in weight
                            needUpdate = true
                        }
                        if (!prodDetail.name && productDocBefore.priceList[index].totalQuantity != productDocAfter.priceList[index].totalQuantity) {
                            prodDetail.templateData = (await db.collection('whatsapp').doc('menu').collection('menu-items').doc('product-low-qty-alert').get()).data()
                            //product low qty update
                            if (prodDetail.templateData && prodDetail.templateData.minQty && productDocBefore.priceList[index].totalQuantity > prodDetail.templateData.minQty && productDocAfter.priceList[index].totalQuantity <= prodDetail.templateData.minQty) {
                                prodDetail.name = productDocAfter.prodName
                                prodDetail.qty = productDocAfter.priceList[index].totalQuantity
                                prodDetail.productCode = productDocAfter.productCode
                            }
                        }
                    }
                }
            }
            else if (productDocBefore.prodName != productDocAfter.prodName || productDocBefore.prodDesc != productDocAfter.prodDesc || JSON.stringify(productDocBefore.coverPic) != JSON.stringify(productDocAfter.coverPic) || JSON.stringify(productDocBefore.images) != JSON.stringify(productDocAfter.images)) {
                //change happened in product name desc
                needUpdate = true
            }
        } else {
            //variant not available
            if (!(productDocBefore.productQty && productDocAfter.productQty) || productDocBefore.prodName != productDocAfter.prodName || productDocBefore.prodDesc != productDocAfter.prodDesc || productDocBefore.discountedPrice != productDocAfter.discountedPrice || productDocBefore.prodPrice != productDocAfter.prodPrice || JSON.stringify(productDocBefore.coverPic) != JSON.stringify(productDocAfter.coverPic) || JSON.stringify(productDocBefore.images) != JSON.stringify(productDocAfter.images)) {
                //change happened in product name desc stock price
                needUpdate = true
            }
            if (productDocBefore.productQty != productDocAfter.productQty) {
                prodDetail.templateData = (await db.collection('whatsapp').doc('menu').collection('menu-items').doc('product-low-qty-alert').get()).data()
                //product low qty update
                if (prodDetail.templateData && prodDetail.templateData.minQty && productDocBefore.productQty > prodDetail.templateData.minQty && productDocAfter.productQty <= prodDetail.templateData.minQty) {
                    prodDetail.name = productDocAfter.prodName
                    prodDetail.qty = productDocAfter.productQty
                    prodDetail.productCode = productDocAfter.productCode
                }
            }
        }
        if (needUpdate) {
            if (!credData) {
                await fetchCreds();
            }
            if (credData) {
                console.log("onUpdateProductDetails : change happened in product")
                await updateFbInventory(productId, productDocAfter)
            }
        }
        if (prodDetail.name && prodDetail.templateData) {
            if (!credData) {
                await fetchCreds();
            }
            if (credData) {
                prodDetail.templateData.components[0].example.body_text = [prodDetail.productCode, prodDetail.name]
                prodDetail.templateData.phoneNoArray.forEach(async (phoneNo) => {
                    await createDocMsg(phoneNo, prodDetail.templateData, '', '', true)
                })
            }
        }

    } catch (error) {
        console.log("error in onUpdateProductDetails error : ", error)
        collectErrors("unknown", error, "onUpdateProductDetails", 'error occurred in onUpdateProductDetails productId : ' + (productId ? productId : ""))
    }
})

exports.onCreateProduct = functions.firestore.document('products/{productId}').onCreate(async (snap, context) => {
    const productData = snap.data()
    const productId = context.params.productId
    //store msg at common place
    if (credData == undefined) {
        await fetchCreds();
    }
    if (credData) {
        try {
            await updateFbInventory(productId, productData)
        } catch (error) {
            console.log("error in onCreateProduct error : ", error)
            collectErrors("unknown", error, "onCreateProduct", 'error occurred in onCreateProduct productId : ' + (productId ? productId : ""))
        }
    }
})

const deleteFbProducts = async (removedProductId) => {
    const ProductsArray = []
    for (const product of removedProductId) {
        ProductsArray.push({ "method": "delete", "data": product })
    }
    const body = { "item_type": "PRODUCT_ITEM", "requests": ProductsArray }
    // console.log(ProductsArray)
    await axios.post(`${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${credData.catalogueId}/items_batch`, body, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
        .then((response) => {
            console.log('success');
            console.log('onDeleteProduct ', response.data)
            db.collection("whatsapp").doc('logs').collection("accountUpdateMsg").add({ createdAt: new Date(), feedProductsDelete: removedProductId, status: JSON.stringify(response.data ? response.data : '') })
        }).catch((error) => {
            console.log('error in update inventory onDeleteProduct error : ', error.response ? error.response.data : error, '\n\n body ', body)
            collectErrors("unknown", error.response ? error.response.data : error, "onDeleteProduct", 'error occurred in axios\n\n' + JSON.stringify(body))
        })
}

exports.onDeleteProduct = functions.firestore.document('products/{productId}').onDelete(async (snap, context) => {
    const productData = snap.data()
    const productId = context.params.productId
    //store msg at common place
    if (credData == undefined) {
        await fetchCreds();
    }
    if (credData) {
        try {
            const removedProductId = []
            if (productData.isPriceList && productData.priceList && productData.priceList.length !== 0) {
                console.log("variant exists")
                const variants = productData.priceList;
                for (const variant of variants) {
                    const variantName = variant.weight.replace(' ', '*')
                    removedProductId.push({ id: `${productId}###${variantName}` })
                }
            }
            else {
                removedProductId.push({ id: productId })
            }
            await deleteFbProducts(removedProductId)
        } catch (error) {
            console.log("error in onDeleteProduct error : ", error)
            collectErrors("unknown", error, "onDeleteProduct", 'error occurred in onDeleteProduct productId : ' + (productId ? productId : ""))
        }
    }
})

//sync products to facebook catalogue
exports.syncCatalogue = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        //store msg at common place
        if (credData == undefined) {
            await fetchCreds();
        }
        if (credData) {
            const result = await updateProductFeed()
            resolve({ success: result })
        }
        else {
            resolve({ success: false })
        }
    })
})

//broadcast module

function createChunkArray(myArray, chunk_size) {
    const results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    // Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
    return results;
}

//timeDelay in second
const timeDelay = async (time) => {
    return new Promise(async (resolve, rejects) => {
        setTimeout(() => {
            resolve()
        }, time * 1000);
    })
}

//change template body and broadcast name
const sendBroadcastMiddleware = async (userData, templateObj) => {
    const body = { ...templateObj, to: userData.phoneNo }
    // console.log(userData.phoneNo)
    return new Promise(async (resolve, rejects) => {
        const userChatObj = await findUserId(userData.phoneNo)
        if (userChatObj && userChatObj.userChat && userChatObj.userChat.isUnSubscribe) {
            resolve({ result: false, userData: userData })
        } else {
            const result = await sendMsg(body, userData.id, { bodyText: `Broadcast Template : ${body.template.name.replace(/_/g, ' ')}` }, userChatObj.userChat) //bodyText is broadcast name it display on admin panel chat
            resolve({ result: result, userData: userData })
        }
    })
}

const sendBroadcast = async (usersDataArray, templateObj, totalUsersReceive) => {
    // const usersNo = ["919911961979", "+919911961979", "9911961979"] //phone no format accepted
    const broadcastObj = { createdAt: new Date(), templateName: templateObj.template.name, totalUsers: totalUsersReceive, sendTo: 0, deliveredTo: 0, status: { msg: "Broadcast Started", link: "" } }
    const broadcastId = await db.collection('whatsapp').doc('broadcast').collection('history').add(broadcastObj)
    const usersArray = createChunkArray(usersDataArray, 4)
    const broadcastResult = []
    let sendSuccessfully = 0
    for (const userData of usersArray) {
        const broadcastResultTemp = []//
        const promiseObj = []
        for (const [index, user] of userData.entries()) {
            promiseObj[index] = sendBroadcastMiddleware(user, templateObj)
        }
        const promiseResult = await Promise.all(promiseObj)
        for (const result of promiseResult) {
            broadcastResult.push(result)
            broadcastResultTemp.push(result)//
            if (result.result) {
                ++sendSuccessfully
            }
        }
        console.log("saving logs sent to ", broadcastResult.length)
        await db.collection('whatsapp').doc('broadcast').collection('history').doc(broadcastId.id).collection('usersList').add({ users: broadcastResultTemp, createdAt: new Date() })//
        await db.collection('whatsapp').doc('broadcast').collection('history').doc(broadcastId.id).update({ sendTo: broadcastResult.length, deliveredTo: sendSuccessfully })
        await timeDelay(4)
    }
    broadcastObj.sendTo = broadcastResult.length
    broadcastObj.completedAt = new Date()
    // broadcastObj.deliveredTo = broadcastResult.reduce((i, ele) => { return ele.result ? ++i : i }, 0)
    broadcastObj.deliveredTo = sendSuccessfully
    delete broadcastObj.createdAt
    const csvData = broadcastResult.map((ele) => { return { 'Broadcast Status': ele.result ? "sent" : "failed", "Phone No": ele.userData.phoneNo, "Name": ele.userData.name } })
    //save csv
    const csv = await new Promise(async (resolve, reject) => {
        try {
            jsonToCsvConverter.json2csv(csvData, (err, csv) => {
                if (err) {
                    reject(err)
                }
                console.log('json to csv converted successfully')
                resolve(csv)
            })
        }
        catch (error) {
            console.log('error')
            reject(error)
        }
    })
    let userReportUrl
    if (csv) {
        userReportUrl = await new Promise(async resolve => {
            var file = bucket.file(`whatsapp/broadcastReport/` + `${new Date().toLocaleDateString().toString().replace(/\//g, '-')}` + '/' + `${new Date().toString().slice(0, 24).replace(/ /g, "-")}.csv`)
            file.save(Buffer.from(csv), { metadata: { contentType: 'application/csv' }, })
            // @ts-ignore
            let downloadUrl = await file.getSignedUrl({ action: 'read', expires: '03-01-2500' })
            console.log(downloadUrl[0])
            resolve(downloadUrl[0])
        })
    }
    broadcastObj.status = { link: userReportUrl ? userReportUrl : "", msg: broadcastResult.length == totalUsersReceive ? "Broadcast Completed" : "Broadcast Completed Partially (Daily Limit reached)" }
    console.log("broadcast done\nsaving logs sent to ", broadcastResult.length)
    await db.collection('whatsapp').doc('broadcast').collection('history').doc(broadcastId.id).update(broadcastObj)
    await db.collection('whatsapp').doc('broadcast').set(broadcastObj)
}

// send msg using admin panel
exports.broadcast = functions.https.onCall(async (data, context) => { //phoneNo//userId //type //msg
    return new Promise(async (resolve, reject) => {
        try {
            //store msg at common place
            if (credData == undefined) {
                await fetchCreds();
            }
            console.log("broadcast data : ", data)
            if (data && data.userType && data.templateName && (data.userType == 'allUsers' || data.userType == 'groups')) { //data.phoneNo
                const templateObj = await db.collection('whatsapp').doc('templates').collection('list').doc(data.templateName).get()
                let templateStatus = false
                try {
                    const templateStatusRef = await axios.get(`${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${credData.businessId}/message_templates?name=${data.templateName}`, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
                    if (templateStatusRef.data && templateStatusRef.data.data && templateStatusRef.data.data.length && templateStatusRef.data.data[0].status && templateStatusRef.data.data[0].status.toLowerCase() == 'approved') {
                        templateStatus = true
                    }
                } catch (error) {
                    console.log("error while getting template status : ", data.templateName)
                    console.log("error : ", error.response ? error.response.data : error)
                    collectErrors(data, error.response ? error.response.data : error, "broadcast", 'error occurred in broadcast while fetching status of template')
                }

                if (templateObj.data() && templateStatus) {
                    let broadcastLimit = 50

                    const accountData = await db.collection('whatsapp').doc('account').get()
                    if (accountData && accountData.data() && accountData.data().insights && accountData.data().insights.broadcastLimit) {
                        broadcastLimit = typeof accountData.data().insights.broadcastLimit === 'number' ? accountData.data().insights.broadcastLimit : broadcastLimit
                    }

                    //broadcast in last 24H
                    const oldBroadcastRef = await db.collection('whatsapp').doc('broadcast').collection('history').where('createdAt', '>=', new Date(Date.now() - 86400000)).get()
                    if (!oldBroadcastRef.empty) {
                        oldBroadcastRef.forEach((broadDocs) => {
                            if (broadDocs.data().deliveredTo) {
                                broadcastLimit = broadcastLimit - broadDocs.data().deliveredTo
                            }
                        })
                    }
                    console.log("remaining broadcast limit : ", broadcastLimit)
                    if (broadcastLimit > 0) {
                        const template = createBody('12345', { ...templateObj.data(), "name": data.templateName })
                        const usersArray = []//{phoneNo,userId}
                        if (!template.error) {
                            if (data.userType == 'allUsers') {
                                const usersArrayData = await db.collection('users').limit(broadcastLimit).get();
                                usersArrayData.forEach((user) => {
                                    if (usersArray.findIndex((val) => { return val.phoneNo === user.data().phoneNo }) === -1) {
                                        usersArray.push({ userId: user.id, phoneNo: user.data().phoneNo })
                                    }
                                })
                            }
                            else {
                                for (const group of data.groups) {
                                    const usersArrayData = await db.collection('users').where('groups', 'array-contains', group).get();
                                    usersArrayData.forEach((user) => {
                                        if (usersArray.findIndex((val) => { return val.phoneNo === user.data().phoneNo }) === -1) {
                                            usersArray.push({ userId: user.id, phoneNo: user.data().phoneNo, name: user.data().name })
                                        }
                                    })
                                }
                            }
                            let totalUsersReceive = 0
                            if (usersArray.length) {
                                totalUsersReceive = usersArray.length
                                await sendBroadcast(usersArray.splice(0, broadcastLimit), template, totalUsersReceive)
                                resolve({ success: true })
                                return
                            }
                            else {
                                const broadcastObj = { createdAt: new Date(), templateName: data.templateName, totalUsers: 0, sendTo: 0, deliveredTo: 0, status: { msg: "group is empty, please add user's in group" } }
                                await db.collection('whatsapp').doc('broadcast').collection('history').add(broadcastObj)
                                console.log("group is empty, please add user's in group")
                                resolve({ success: false, msg: "Group is empty, please add user's in group" })
                                return
                            }
                        } else {
                            const broadcastObj = { createdAt: new Date(), templateName: data.templateName, totalUsers: 0, sendTo: 0, deliveredTo: 0, status: { msg: "broadcast unsuccessful" } }
                            await db.collection('whatsapp').doc('broadcast').collection('history').add(broadcastObj)
                            console.log("error in template body creation")
                            resolve({ success: false, msg: "Broadcast Unsuccessful" })
                            return
                        }
                    } else {
                        console.log("broadcast limit exhausted")
                        const broadcastObj = { createdAt: new Date(), templateName: data.templateName, totalUsers: 0, sendTo: 0, deliveredTo: 0, status: { msg: "broadcast limit reached" } }
                        await db.collection('whatsapp').doc('broadcast').collection('history').add(broadcastObj)
                        resolve({ success: false, msg: "Broadcast limit reached" })
                        return
                    }
                }
                else {
                    const broadcastObj = { createdAt: new Date(), templateName: data.templateName, totalUsers: 0, sendTo: 0, deliveredTo: 0, status: { msg: "template is not approved by facebook" } }
                    await db.collection('whatsapp').doc('broadcast').collection('history').add(broadcastObj)
                    resolve({ success: false, msg: "Template is not approved by facebook" })
                    return
                }
            }
            const broadcastObj = { createdAt: new Date(), templateName: data.templateName, totalUsers: 0, sendTo: 0, deliveredTo: 0, status: { msg: "broadcast unsuccessful" } }
            await db.collection('whatsapp').doc('broadcast').collection('history').add(broadcastObj)
            resolve({ success: false })
        } catch (error) {
            console.log('error sendAdminMsg : ', error)
            collectErrors(data, error, "broadcast", 'error occurred in broadcast')
            const broadcastObj = { createdAt: new Date(), templateName: data ? data.templateName ? data.templateName : "tempalteName" : "tempalteName", totalUsers: 0, sendTo: 0, deliveredTo: 0, status: { msg: "broadcast unsuccessful" } }
            await db.collection('whatsapp').doc('broadcast').collection('history').add(broadcastObj)
            resolve({ success: false, msg: "Broadcast Unsuccessful" })
        }
    })
})


//upload tempalate media to dev app
const uploadTemplateMedia = async (url, retry) => {
    let mediaHandle;
    try {
        console.log("fetching media from url")
        //store msg at common place
        if (credData == undefined) {
            await fetchCreds();
        }

        //fetching media buffer & details
        const mediaBuffer = await axios.get(url, { responseType: "arraybuffer" })
        const mediaDetails = { 'file_type': mediaBuffer.headers['content-type'], "file_length": mediaBuffer.headers['content-length'] }

        //creating handle in fb app to upload data using media type and size
        const res = await axios.post(`${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${credData.devAppId}/uploads`, mediaDetails, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })

        // console.log(res.data.id)
        if (res.data && res.data.id && mediaBuffer.data && credData) {
            await axios.post(`${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${res.data.id}`, mediaBuffer.data, { headers: { 'Authorization': `OAuth ${credData.authToken}` } })
                .then(async (response) => {
                    mediaHandle = response.data.h
                    console.log('uploadTemplateMedia : ', response.data.h ? response.data.h : response.data)
                }).catch((error) => {
                    console.log('error uploadTemplateMedia : ', error.response ? error.response.data : error)
                    console.log("body data : ", mediaDetails)
                    collectErrors("templates", error.response ? error.response.data : error, "uploadTemplateMedia", 'error occurred during uploading media for template : ' + (mediaDetails ? JSON.stringify(mediaDetails) : ""))
                })
        }
    } catch (error) {
        console.log("error")
        if (!retry) {
            console.log("retry")
            await timeDelay(10)
            mediaHandle = await uploadTemplateMedia(url, true)
        } else {
            console.log("error", error.response ? error.response.data : error)
            collectErrors("templates", error.response ? error.response.data : error, "uploadTemplateMedia", 'error occurred during download media for template, reason : 1. unable to download media 2. app ID not present in credData')
        }
    }
    console.log("media handle id returned")
    return mediaHandle
}

//template mapping
const formatTemplate = async (template) => {
    let mediaHandle = 'empty'
    for (const [index, component] of template.components.entries()) {
        if (component.type.toLowerCase() == 'header' && component.format) {
            if (component.format.toLowerCase() == 'none') {
                delete template.components[index]
            } else if (component.mediaUrl) {
                console.log("media url : ", component.mediaUrl)
                mediaHandle = await uploadTemplateMedia(component.mediaUrl)
                console.log("mediaHandle : ", mediaHandle)
                delete template.components[index].mediaUrl
                delete template.components[index].text
                component.example = {
                    header_handle: [mediaHandle]
                }
            }
            else if (component.text) {
                delete template.components[index].mediaUrl
            }
        }
        else if (component.type.toLowerCase() == 'buttons' && component.buttonType) {
            if (component.buttonType.toLowerCase().replace(/ /g, '') == 'quickreply' && component.buttons.length) {
                delete template.components[index].buttonType
                const btnArray = []
                for (const btn of component.buttons) {
                    if (btn.text && btn.payload) {
                        delete btn.payload
                        btnArray.push(btn)
                    }
                }
                if (btnArray.length) {
                    template.components[index].buttons = btnArray
                } else {
                    delete template.components[index]
                }
            }
            else if (component.buttonType.toLowerCase().replace(/ /g, '') == 'calltoaction' && component.buttons.length) {
                delete template.components[index].buttonType
            }
            else {
                delete template.components[index]
            }
        }
        else if (component.type.toLowerCase() == 'footer' && (!component.text || component.text == '')) {
            delete template.components[index]
        }
    }
    return { mediaHandle: mediaHandle, template: template }
}

const applyNewTemplate = async (template) => {
    let status = false
    //store msg at common place
    if (credData == undefined) {
        await fetchCreds();
    }
    if (credData) {
        const templateData = await formatTemplate(template)

        if (templateData.mediaHandle) {
            const url = `${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${credData.businessId}/message_templates`
            await axios.post(url, templateData.template, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
                .then(async (response) => {
                    console.log('success');
                    console.log('applyNewTemplate : ', response.data)
                    status = true
                }).catch((error) => {
                    console.log('error');
                    console.log('applyNewTemplate : ', error.response ? error.response.data : error)
                    collectErrors(template.name, error.response ? error.response.data : error, "applyNewTemplate", 'error occurred in axios\n\n' + JSON.stringify(templateData.template))
                })
        }
        else {
            console.log("invalid template media url")
            collectErrors(template.name, templateData.template, "applyNewTemplate", 'invalid template media url')
        }
    } else {
        console.log("invalid template data")
        collectErrors(template.name, template, "applyNewTemplate", 'invalid template data')
    }
    return status
}

//fetch templates
const fetchTemplates = async (URL) => {
    let templateData;
    try {
        let i = 0;
        if (credData == undefined) {
            await fetchCreds();
        }
        if (credData) {
            const url = URL ? URL : `${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${credData.businessId}/message_templates`
            const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
            console.log('success, fetchTemplates');
            // console.log('msg response : ', response.data.data)
            templateData = response.data
            console.log('total templates ' + response.data.data.length)

            const createdTempaltesData = await db.collection('whatsapp').doc('templates').collection('list').get()
            const createdTempaltesName = []
            if (!createdTempaltesData.empty) {
                createdTempaltesData.forEach((doc) => {
                    createdTempaltesName.push(doc.id)
                })
            }
            // console.log(createdTempaltesName)
            for (const doc of response.data.data) {
                if (doc.components[0].example && doc.components[0].example.body_text) {
                    doc.components[0].example.body_text = doc.components[0].example.body_text[0]
                }
                // console.log(doc)
                if (!doc.name.startsWith('sample')) {
                    await db.collection('whatsapp').doc('templates').collection('whatsappList').doc(doc.name).set(doc)
                    i++
                }
                if (createdTempaltesName.findIndex((val) => { return val === doc.name }) !== -1) {
                    await db.collection('whatsapp').doc('templates').collection('list').doc(doc.name).update({ status: doc.status.toLowerCase(), templateId: doc.id })
                }
            }
        }
        console.log('saved ' + i + ' templates')
    } catch (error) {
        console.log('error');
        console.log('fetchTemplates error : ', error.response ? error.response.data : error)
        collectErrors('template fetching', error.response ? error.response.data : error, "fetchTemplates", 'error occurred in axios\n\n' + (URL ? URL : ''))

    }
    if (templateData.paging.next) {
        console.log("fetching template next page")
        await fetchTemplates(templateData.paging.next)
    }
}

exports.onCreateTemplate = functions.firestore.document('whatsapp/templates/list/{template}').onCreate(async (snap, context) => {
    try {
        const templateData = snap.data()
        if (templateData && templateData.components && templateData.components.length && templateData.language && templateData.category) {
            const templateName = context.params.template
            templateData.name = templateName
            const result = await applyNewTemplate(templateData)
            if (result) {
                await timeDelay(10)
                await fetchTemplates()
            } else {
                await db.collection("whatsapp").doc("templates").collection("list").doc(templateName).update({ status: "failed" })
            }
        }
    } catch (error) {
        console.log("error in onCreateProduct error : ", error)
        collectErrors("onCreateTemplate", error, "onCreateProduct", 'error occurred in onCreateProduct productId : ')
    }
})


const updateTemplate = async (template) => {
    //store msg at common place
    if (credData == undefined) {
        await fetchCreds();
    }
    if (credData) {
        const templateData = await formatTemplate(template)

        if (templateData.mediaHandle) {
            const url = `${fbGraphApi ? fbGraphApi : "https://graph.facebook.com/v16.0"}/${template.templateId}`
            axios.post(url, templateData.template, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
                .then(async (response) => {
                    console.log('success');
                    console.log('updateTemplate ', response.data)
                }).catch((error) => {
                    console.log('error');
                    console.log('updateTemplate : ', error.response ? error.response.data : error)
                    collectErrors(template.name, error.response ? error.response.data : error, "updateTemplate", 'error occurred in axios\n\n' + JSON.stringify(templateData.template))
                })
        }
        else {
            console.log("invalid template media url")
            collectErrors(template.name, templateData.template, "updateTemplate", 'invalid template media url')
        }
    } else {
        console.log("invalid template data")
        collectErrors(template.name, template, "updateTemplate", 'invalid template data')
    }
}

exports.onUpdateTemplate = functions.https.onCall(async ({ templateName }, context) => {
    try {
        console.log("templateName : ", templateName)
        const templateRef = await db.collection('whatsapp').doc('templates').collection('list').doc(templateName).get()
        if (templateRef.data()) {
            const templateData = templateRef.data()
            templateData.name = templateName
            if (templateData && templateData.templateId && templateData.components && templateData.components.length && templateData.language && templateData.category) {
                // const templateName = context.params.template
                // templateData.name = templateName
                await updateTemplate(templateData)
                await timeDelay(10)
                await fetchTemplates()
            }
        }
    } catch (error) {
        console.log("error in onCreateProduct error : ", error)
        collectErrors("onCreateTemplate", error, "onCreateProduct", 'error occurred in onCreateProduct productId : ')
    }
})

//calculate credits & cost module
const dateToUnix = (date) => {
    return Math.floor(new Date(date).getTime() / 1000)
}

//main funtion to calculate credit used and cost
const calCredits = async (startDate, endtDate, granularity) => {
    try {
        if (credData == undefined) {
            await fetchCreds();
        }
        const url = fbGraphApi + '/' + credData.businessId + `?fields=conversation_analytics.start(${startDate ? startDate : dateToUnix(new Date()) - 2592000}).end(${endtDate ? endtDate : dateToUnix(new Date())}).granularity(${granularity ? granularity : 'HALF_HOUR'})`
        const res = await axios.get(url, { headers: { 'Authorization': `Bearer ${credData.authToken}` } })
        let chat = 0
        let cost = 0
        res.data.conversation_analytics.data[0].data_points.forEach((e) => {
            chat = chat + e.conversation
            cost = cost + e.cost
        })
        console.log("Date : ", new Date().toLocaleDateString(), '\nTotal chats = ', chat, ' Total cost = ', cost)
        await db.collection('whatsapp').doc('account').update({ "insights.cost": cost, "insights.creditsUsed": chat })
        if (chat >= 950) {
            await limitExhausted('919599663545')
        }
        return { chat, cost }
    } catch (error) {
        console.log('calCredits error : ', error.response ? error.response.data : error)
        collectErrors('calCredits', error.response ? error.response.data : error, "calCredits", 'error occurred in axios\n\n')
    }
}

exports.scheduledWACalCredit = functions.pubsub.schedule('0 8 * * *').timeZone(timeZone).onRun(async (context) => {
    //store msg at common place
    if (credData == undefined) {
        await fetchCreds();
    }
    if (credData) {
        await calCredits();
    }
});

exports.onUpdateMenuItems = functions.firestore.document('whatsapp/menu/menu-items/{docId}').onUpdate(async (change, context) => {
    try {
        const updatedDoc = {}
        updatedDoc[context.params.docId] = change.after.data();
        await db.doc(`/whatsapp/cacheDocs/cacheMenuDocs/allMenuDocs`).set({ ...updatedDoc }, { merge: true })
    } catch (error) {
        console.log("error in onUpdateMenuItems : ", error)
    }
})

/*
exports.onUpdateCacheDocs = functions.firestore.document('/whatsapp/cacheDocs/cacheMenuDocs/allMenuDocs').onWrite(async (change, context) => {
    try {
        const beforeDoc = change.before.data();
        const afterDoc = change.after.data();
        menuDocs = afterDoc
        await checkResources()
        if (beforeDoc && afterDoc) {
            //update happened
            let i = 0
            while (i < 5) {
                axios.post(`https://${firebaseLocation}-${projectId}.cloudfunctions.net/whatsappExpress-whatsappExpress/webhook`, {
                    object: { update: true, credData, menuDocs, storeData }
                }).catch((error) => { console.log("error in axios in onUpdateCreds again") })
                i++
            }
        } else if (!beforeDoc && afterDoc) {
            //create Happened
            const docs = await db.collection(`/whatsapp/menu/menu-items`).get()
            if (!docs.empty) {
                const menus = {}
                docs.forEach((doc) => {
                    menus[doc.id] = doc.data()
                })
                await db.doc(`/whatsapp/cacheDocs/cacheMenuDocs/allMenuDocs`).set(menus)
            }
            console.log(docs.size)
        }
    } catch (error) {
        console.log("error in onUpdateCacheDocs : ", error)
    }
})
*/

const limitExhausted = async (phoneNo) => {
    const storeName = adminName ? adminName : 'Store'
    const bodyData = {
        "type": "template",
        "templateName": `order_status_changed`,
        "list": [
            {
                "type": "body",
                "parameters": [
                    {
                        "type": "text",
                        "text": storeName //orderID
                    },
                    {
                        "type": "text",
                        "text": "Expired"  //order status
                    }
                ]
            }
        ]
    }
    await createDocMsg(phoneNo, bodyData)
}



const sendCartUpdates = async () => {
    try {
        if (credData == undefined) {
            await fetchCreds();
        }
        if (credData && credData.setting && credData.setting.cartNotification && credData.setting.cartNotification.active && credData.setting.cartNotification.alertTiming) {
            const usersRef = await db.collection("chats").where("whatsappMeta.sessionExpiry", '<', (Date.now().toString().slice(0, 10) * 1 + credData.setting.cartNotification.alertTiming * 3600 + 60).toString()).where("whatsappMeta.sessionExpiry", '>', (Date.now().toString().slice(0, 10) * 1 + credData.setting.cartNotification.alertTiming * 3600 - 60).toString()).get()
            // console.log('start', Date.now().toString().slice(0, 10) * 1 + credData.setting.cartNotification.alertTiming * 3600 + 60)
            // console.log('end', Date.now().toString().slice(0, 10) * 1 + credData.setting.cartNotification.alertTiming * 3600 - 60)
            if (!usersRef.empty) {
                const promiseArray = []
                let count = 0
                console.log("total sessions for update ", usersRef.size)
                usersRef.forEach(async (user) => {
                    promiseArray.push(new Promise(async (resolve) => {
                        try {
                            if (user.data().whatsappMeta && !user.data().whatsappMeta.sendReqMsg) {
                                const cartEmpty = await isCartEmpty(user.id)
                                if (!cartEmpty) {
                                    console.log('alert user id : ', user.id)
                                    let bodyData
                                    if (credData.setting.cartNotification.msgDocId) {
                                        bodyData = await getDocs(credData.setting.cartNotification.msgDocId);
                                    } else {
                                        bodyData = {
                                            bodyText: 'Your cart is ready for Checkout\n\nPress the button for *Checkout*',
                                            list: [
                                                {
                                                    title: 'Checkout',
                                                    id: 'button-product-payment-link'
                                                }
                                            ], type: 'button'
                                        }
                                    }
                                    const msgStatus = await createDocMsg(user.data().userPhoneNo, bodyData, user.id, user.data())
                                    if (msgStatus) {
                                        ++count
                                        db.collection("chats").doc(user.id).update({ "whatsappMeta.sendReqMsg": true })
                                    } else {
                                        console.log("sendCartUpdates msg get failed, userId : ", user.id)
                                    }
                                }
                            }
                        } catch (error) {
                            console.log("error in sendCartUpdates for user : ", user.id)
                        }
                        resolve()
                    }))
                })
                console.log("length ", promiseArray.length)
                await Promise.all(promiseArray)
                console.log('sent cart alert to ', count, " user")
            }
        }
    } catch (error) {
        console.log("error in sendCartUpdates :", error)
    }
}


//razorpay payment setup



const fetchIntegrationCreds = async (integrationName) => {
    try {
        if (!integrationCreds[integrationName]) {
            let cred
            switch (integrationName) {
                case 'razorpay':
                    cred = (await db.doc('/payment/razorpay').get()).data()
                    break;
                default:
                    break;
            }
            if (cred && cred.keySecret && cred.id) {
                integrationCreds[integrationName] = cred
            }
        }
        if (integrationCreds[integrationName]) {
            return integrationCreds[integrationName]
        }
    } catch (error) {
        console.log("error in fetchIntegrationCreds, error : ", error)
    }
    return
}


const createPaymentLink = async (orberObj, orderDocId, integrationName) => {
    const result = { status: false }
    try {
        const { totalAmountToPaid, payment, orderId, userId, userName, userPhoneNo } = orberObj
        if (totalAmountToPaid && payment && !payment.completed) {
            const creds = await fetchIntegrationCreds(integrationName)
            if (creds) {
                const { keySecret, id } = creds
                switch (integrationName) {
                    case 'razorpay':
                        if (id && keySecret) {
                            const paymentBody = {
                                "amount": totalAmountToPaid * 100,///
                                "currency": "INR",
                                "accept_partial": false,
                                "description": `${adminName} Order #${orderId}`,
                                "customer": {
                                    "name": userName,
                                    "contact": userPhoneNo
                                },
                                "notify": {
                                    "sms": true,
                                    "email": false
                                },
                                "reminder_enable": false,
                                "notes": {
                                    "policy_name": `${orderId}#${projectId}#${orderDocId}`
                                },
                                "callback_url": websiteLink ? websiteLink : ``,
                                "callback_method": "get"
                            }
                            await axios.post(`${razorpayUrl}/payment_links`, paymentBody, { auth: { username: id, password: keySecret } }).then(async (res) => {
                                const { short_url, id } = res.data
                                console.log("short_url : ", short_url)
                                result.url = short_url
                                result.id = id
                                result.amount = paymentBody.amount / 100
                                result.status = true
                            }).catch((error) => {
                                console.log("error in createPaymentLink 1 ", getError(error))
                            })
                        } else {
                            console.log("keyId, keySecret is not available in razorPayCreds")
                        }
                        break;
                    default:
                        break;
                    // await sendProductPaymentLink(projectId, receiverNo, userId, userChatRef);
                }
            } else {
                console.log("invalid payment partner : ", integrationName)
            }
        }
    } catch (error) {
        console.log("error in createPaymentLink, error : ", error)
    }
    return result
}

const fillOrderTemplateVariables = (orberObj, bodyData) => {
    const { orderId, userName = ' ', userPhoneNo = ' ', products, status, payment, totalAmountToPaid } = orberObj
    const varNameList = {
        "name": userName,
        "phone no": userPhoneNo,
        "order no": orderId,
        "payment link": payment && payment.details && payment.details.url ? payment.details.url : "",
        "products": products.reduce((text, { name, quantity }) => { return text.concat(`➜ ${name.slice(0, 20)}... (${quantity} Unit) `) }, ' '),
        "product count": products.length,
        "amount": totalAmountToPaid,
        "date": moment().tz(timeZone).format('ll'),
        "status": status
    }
    let isPaymentLink = false
    if (bodyData.type.toLowerCase() == "template" && bodyData.components && bodyData.components.length) {
        for (const { type, example } of components) {
            if (example && type.toLowerCase() == 'body' && example.length) {
                for (const text of example) {
                    if (text && text.startsWith('{{') && text.endsWith('}}')) {
                        const varName = text.toLowerCase().replace('{{', "").replace('}}', "")
                        if (varName == 'payment link') {
                            isPaymentLink = true
                        }
                        if (varNameList[varName]) {
                            text = varNameList[varName]
                        }
                    }
                }
                break
            }
        }
    }
    if (isPaymentLink) {
        if (!varNameList['payment link']) {
            return undefined
        }
    }
    return bodyData
}

const sendOrderPaymentLink = async (orderId, orberObj, orderDocId, bodyData) => {
    let result = false
    try {
        const paymentPartner = 'razorpay'
        if (!orberObj) {
            await db.collection('orders').where("orderId", '==', orderId).get().then((docs) => {
                if (docs.size == 1) {
                    docs.forEach((doc) => {
                        orberObj = doc.data()
                        orderDocId = doc.id
                    })
                }
            })
        }
        if (orberObj) {
            let userChatRef
            const { userName, userPhoneNo, userId, payment } = orberObj
            if (!(userName && userPhoneNo)) {
                userChatRef = (await db.collection('chats').doc(userId).get()).data()
                orberObj.userName = userChatRef.name
                orberObj.userPhoneNo = userChatRef.userPhoneNo
            }
            if ((payment && !payment.completed) || !payment) {
                if (!(payment && payment.details && payment.details.url)) {
                    const { url, id, status, amount } = await createPaymentLink(orberObj, orderDocId, paymentPartner)
                    if (status) {
                        const updatedData = {}
                        updatedData['payment.mode'] = paymentPartner
                        updatedData['payment.details.id'] = id
                        updatedData['payment.details.url'] = url
                        updatedData['payment.details.amount'] = amount
                        updatedData['payment.details.status'] = 'link created'
                        updatedData['payment.details.createdAt'] = new Date()
                        await db.collection('orders').doc(orderDocId).update({ ...updatedData })
                        orberObj.payment = {
                            mode: paymentPartner,
                            details: {
                                id: id,
                                url: url,
                                amount: amount,
                                status: 'link created',
                                createdAt: new Date(),
                            }
                        }
                    }
                }
            }
            result = await createDocMsg(orberObj.userPhoneNo, fillOrderTemplateVariables(orberObj, bodyData), userId, userChatRef)
        }
    } catch (error) {
        console.log("error in sendOrderPaymentLink, error : ", error)
    }
    return result
}


const subscribeRazorpayWebhook = async () => {
    let result = false
    const credentials = await fetchIntegrationCreds('razorpay')
    if (credentials) {
        const { keySecret, id } = credentials
        if (id && keySecret) {
            const webhookUrl = `https://${firebaseLocation}-${projectId}.cloudfunctions.net/whatsappExpress-whatsappExpress/payment/razorpay`
            try {
                const response = await axios.get(`${razorpayUrl}/webhooks/`, { auth: { username: id, password: keySecret } })
                // console.log(response.data.items)
                const permissionNeed = {}
                let permissionList = []
                if (response.data && response.data.count && response.data.items && response.data.items.length) {
                    permissionList = response.data.items.reduce((list, doc) => {
                        const permission = []
                        if (doc && doc.active && doc.url == webhookUrl && doc.events && Object.keys(doc.events).length) {
                            for (const [key, value] of Object.entries(doc.events)) {
                                value ? permission.push(key) : {}
                            }
                        }
                        return [...list, ...permission]
                    }, [])
                }
                console.log("permission already : ", permissionList)
                permissionList.includes('payment_link.paid') ? {} : permissionNeed['payment_link.paid'] = true
                console.log("permission required : ", Object.keys(permissionNeed))

                if (Object.keys(permissionNeed).length) {
                    const response = await axios.post(`${razorpayUrl}/webhooks/`, { url: webhookUrl, secret: `BWI-${projectId}`, events: permissionNeed }, { auth: { username: id, password: keySecret } })
                    if (response && response.data) {
                        result = true
                        console.log('webhook updated successfully\n', response.data.id)
                    } else {
                        console.log("fail to register webhook")
                    }
                } else {
                    result = true
                    console.log("webhook already registered")
                }
            } catch (error) {
                console.log("error : ", error.response && error.response.data ? error.response.data : error.response ? error.response : error)
            }
        }
    }
    return result
}

function validateWebhookSignature(body, signature, secret) {
    body = body.toString();
    const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
    return expectedSignature === signature;
}

const razorpayIncomingWebhook = async (req) => {
    const { event, payload } = req.body
    try {
        if (projectId && validateWebhookSignature(JSON.stringify(req.body), req.headers['x-razorpay-signature'], `BWI-${projectId}`)) {
            if (event && event.includes('payment_link.paid') && payload && payload.payment_link && payload.payment_link.entity) {
                // console.log(1)
                const { notes, status, amount_paid, order_id, id } = payload.payment_link.entity
                // console.log(2)
                if (notes && notes.policy_name) {
                    // console.log(3)
                    const [orderId, projectID, orderDocId] = notes.policy_name.split("#")
                    if (orderId && projectID == projectId && orderDocId) {
                        // console.log(4)
                        const orderDataRef = (await db.collection("orders").doc(orderDocId).get()).data()
                        if (orderDataRef && orderId == orderDataRef.orderId && orderDataRef.payment) {
                            const { completed, mode, details } = orderDataRef.payment
                            if (status == 'paid' && !completed && mode && mode.toLowerCase() == 'razorpay' && details && id == details.id) {
                                if (parseInt(details.amount * 100) == parseInt(amount_paid)) {
                                    console.log("payment successfull for order id : ", orderId)
                                    await db.collection("orders").doc(orderDocId).update({ 'payment.completed': true, 'payment.details.completedAt': new Date(), 'payment.details.status': status, 'payment.details.order_id': order_id })
                                }
                            }
                        } else {
                            console.log('order not found orderId : ', orderId, "\norderDocId : ", orderDocId)
                        }
                    }
                }
            }
        } else {
            console.log('signature not matched')
        }
    } catch (error) {
        console.log("error in razorpayIncomingWebhook webhook, error : ", error)
    }
}

app.post("/payment/:paymentPartner", async (req, res) => {
    try {
        const { paymentPartner } = req.params
        const body = req.body
        console.log("paymentPartner : ", paymentPartner)
        res.sendStatus(200)
        if (paymentPartner && body) {
            if (paymentPartner.toLowerCase() == 'razorpay') {
                await razorpayIncomingWebhook(req)
            }
            else {
                console.log('invalid paymentPartner partner')
            }
        } else {
            console.log("insufficient details")
        }
    } catch (error) {
        console.log("error in app/payment webhook, error : ", error)
    }
})

app.get("/payment/:paymentPartner", async (req, res) => {
    const { paymentPartner } = req.params
    console.log("paymentPartner : ", paymentPartner)
    try {
        if (paymentPartner) {
            if (paymentPartner.toLowerCase() == 'razorpay') {
                const result = await subscribeRazorpayWebhook()
                res.status(200).send({ result })
            } else {
                console.log('invalid paymentPartner partner')
            }
        } else {
            console.log("insufficient details")
        }
    } catch (error) {
        console.log("error in payment webhook subscription, error : ", error)
    }
})


exports.sendPaymentReminder = functions.https.onCall(async (data, context) => { //phoneNo//userId //type //msg
    return new Promise(async (resolve, reject) => {
        //store msg at common place
        if (!credData) {
            await fetchCreds();
        }
        if (credData && credData.setting && credData.setting.paymentReminder) {
            try {
                if (data && data.orderId) { //data.phoneNo
                    const bodyData = (await db.collection('whatsapp').doc('menu').collection('menu-items').doc('payment-reminder-msg').get()).data();
                    if (bodyData) {
                        const res = await sendOrderPaymentLink(data.orderId, undefined, '', bodyData)
                        resolve({ success: res })
                    }
                }
                else {
                    console.log('orderDocId not available', data)
                }
            } catch (error) {
                console.log('error sendPaymentReminder : ', error, '\n\n data', data)
            }
        }
        resolve({ success: false })
    })
})
