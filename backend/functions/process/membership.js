const functions = require("firebase-functions");
var moment = require('moment-timezone');

const {
    db,
    timeZone
} = require('./admin');
var globalFile = require('./global');

exports.removeUserMembership = functions.pubsub.schedule('0 0 * * *').timeZone(timeZone).onRun(async (context) => {
    const today = moment().tz(timeZone).format('YYYY-MM-DD');
    const userIds = [];
    const membersRef = await db.collection('users').where('membership.isMember', '==', true).get();
    membersRef.forEach(async (doc) => {
        if(doc && doc.id && doc.data()) {
            const user = doc.data();
            const validTill = user.membership.planConfig.validTill || null;
            if(validTill) {
                const leftDays = moment(validTill).diff(moment(today), 'days');
                if(leftDays <= 0) {
                    userIds.push(doc.id);
                }
            }
        }
    });
    if(userIds.length) {
        userIds.forEach(async (uid) => {
            await db.collection('users').doc(uid).update({
                membership: {isMember: false}
            });
        });
    }
    
});

exports.sendMembershipNotifications = functions.pubsub.schedule('0 10 * * *').timeZone(timeZone).onRun(async (context) => {
    const today = moment().tz(timeZone).format('YYYY-MM-DD');
    const membersRef = await db.collection('users').where('membership.isMember', '==', true).get();
    membersRef.forEach(async (doc) => {
        if(doc && doc.id && doc.data()) {
            const user = doc.data();
            const validTill = user.membership.planConfig.validTill || null;
            if(validTill) {
                const leftDays = moment(validTill).diff(moment(today), 'days');
                const chatData = {
                    message: '',
                    author: 'admin',
                    type: 'link'
                };
                if(leftDays === 7) {
                    chatData['message'] = "Just 7 days are left in your membership."
                    await globalFile.chatMessage(chatData, doc.id);
                }
                if(leftDays === 3) {
                    chatData['message'] = "Just 3 days are left in your membership."
                    await globalFile.chatMessage(chatData, doc.id);
                }
                if(leftDays === 0) {
                    chatData['message'] = "Today is your last day of your membership"
                    await globalFile.chatMessage(chatData, doc.id);
                }
            }
        }
    });
});