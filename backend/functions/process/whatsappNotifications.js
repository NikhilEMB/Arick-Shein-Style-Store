const {
    db,
} = require('./admin');
const axios = require("axios").default
const functions = require('firebase-functions');

let whatsappSetting = {}

const fetchCreds = async () => {
    try {
        if (!whatsappSetting.credentials) {
            await new Promise((resolve) => {
                db.doc('/settings/whatsapp').onSnapshot(async (creds) => {
                    if (creds.data()) {
                        whatsappSetting = creds.data()
                        console.log("fetched whatsapp settings")
                    }
                    resolve()
                }, async (error) => {
                    whatsappSetting = (await db.doc('/settings/whatsapp').get()).data()
                    console.log("fetched inside error, error : ", error)
                    resolve()
                })
            })
        }
        if (whatsappSetting.credentials) {
            return whatsappSetting
        }
    } catch (error) {
        console.log("error in fetchCreds, error : ", error)
    }
    return
}

const sendMsgRequest = async (body) => {
    //store msg at common place
    let result = false
    if (body) {
        for (const phoneNo of whatsappSetting.phoneNos) {
            body.to = phoneNo
            await axios.post(`${whatsappSetting.credentials.fbGraphApi}/${whatsappSetting.credentials.phoneNumberId}/messages`, body, { headers: { 'Authorization': `Bearer ${whatsappSetting.credentials.authToken}` } }).then(async (response) => {
                console.log(phoneNo, 'success sendMsg response : ', response.data.messages[0].id)
                result = true
            }).catch((error) => {
                console.log('error in sendMsg error : ', error.response ? error.response.data : error)
            })
        }
    }
    return result
}

const createBody = (data) => {
    const body = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": '',
        "type": "template",
        "template": {
            "name": whatsappSetting.templateDetails.templateName,
            "language": {
                "code": whatsappSetting.templateDetails.language
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": data.bookingId
                        }
                    ]
                }
            ]
        }
    }
    return body
}

exports.onUpdateBooking = functions.firestore.document('bookings/{bookingId}').onWrite(async (change, context) => {
    const docBefore = change.before.data();
    const docAfter = change.after.data();
    const bookingDocId = context.params.bookingId
    try {
        // console.log("docBefore : ", docBefore)
        // console.log("docAfter : ", docAfter)
        if (docBefore && docAfter) {
            //update
            const { bookingId, status } = docAfter
            // console.log(1,bookingId,docBefore.bookingId,status)
            if (bookingId && docBefore.bookingId !== bookingId && status && ['accepted', 'pending'].includes(status.toLowerCase())) {
                // console.log(2)
                if (await fetchCreds() && whatsappSetting && whatsappSetting.active && whatsappSetting.scope.includes('booking') && whatsappSetting.phoneNos && whatsappSetting.phoneNos.length) {
                    console.log(bookingId, " sending msg request ", bookingDocId)
                    await sendMsgRequest(createBody({ bookingId }))
                    // console.log(3)
                }
            }
        }
        else if (docBefore) {
            //delete
        }
        else if (docAfter) {
            //create
            const { bookingId, status } = docAfter
            // console.log(1,bookingId,docBefore.bookingId,status)
            if (bookingId && status && ['accepted', 'pending'].includes(status.toLowerCase())) {
                // console.log(2)
                if (await fetchCreds() && whatsappSetting && whatsappSetting.active && whatsappSetting.scope.includes('booking') && whatsappSetting.phoneNos && whatsappSetting.phoneNos.length) {
                    console.log(bookingId, " sending msg request ", bookingDocId)
                    await sendMsgRequest(createBody({ bookingId }))
                    // console.log(3)
                }
            }
        }
    } catch (error) {
        console.log("error occured in onUpdateBooking, ", error)
    }
});
