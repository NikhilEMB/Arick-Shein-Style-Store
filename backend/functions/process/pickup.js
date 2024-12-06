const functions = require("firebase-functions");
const {
    db,
    currencySymbol
} = require('./admin');
var globalFile = require('./global');

exports.onUpdatePickupRequest = functions.firestore.document('features/sellByUser/requests/{requestId}').onUpdate(async (snap, context) => {
    const after = snap.after.data();
    const before = snap.before.data();
    if(after.status === 'accepted' && before.status !== 'accepted') {
        const data = {
            amount: after.totalAmount,
            uid: after.user.id
        }

        await globalFile.addToUserWallet(data);

        const chatMsg = {
            message: `Your requested item has been successfully accepted by store. ${currencySymbol}${after.totalAmount} credited to your wallet.`,
            title: 'Items Sold!',
            author: 'admin',
        }

        await globalFile.chatMessage(chatMsg, after.user.id);
    }
});