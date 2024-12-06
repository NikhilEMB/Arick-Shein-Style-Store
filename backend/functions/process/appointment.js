const functions = require("firebase-functions");
const {
    db, timeZone
} = require('./admin');
var moment = require('moment-timezone');
var globalFile = require('./global');

exports.onCreateAppointment = functions.firestore.document('appointments/{appointmentId}').onCreate(async (snap, context) => {
    const metaDataRef = db.collection('ordersMetaData').doc('metadata');
    const appointmentData = snap.data();
    const appointmentId = context.params.appointmentId;
    await db.runTransaction(t => {
        return t.get(metaDataRef)
            .then(async doc => {
                let lastAppointmentId = 1000;
                if (doc.exists) {
                    lastAppointmentId = doc.data().lastAppointmentId || 1000;
                }
                t.update(metaDataRef, {
                    lastAppointmentId: lastAppointmentId + 1
                });
                t.update(snap.ref, {
                    appointmentId: lastAppointmentId + 1,
                    createdAt: new Date(moment().tz(timeZone))
                });
                // await manageSlotLimit(appointmentData);
                await appointmentNotification(appointmentData);
                
                await vendorProcess(appointmentData, appointmentId);
            });
    });
});

exports.onUpdateAppointment = functions.firestore.document('appointments/{appointmentId}').onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    if(after.status !== before.status && after.status === 'rejected') {
        const chatData = {
            type: 'txt',
            createdAt: new Date(moment().tz(timeZone)),
            author: 'admin',
            isRead: false,
            published: true,
            message: `Your appointment for ${after.item.name} on ${after.schedule.date} at ${after.schedule.slot.start} to ${after.schedule.slot.end} has been Rejected.`,
            title: 'Appointment Rejected!'
        }
        await globalFile.chatMessage(chatData, after.user.id);
    }
});

async function manageSlotLimit(appointmentData) {
    try {
        const productRef = db.collection('products').doc(appointmentData.item.id);
        await db.runTransaction(t => {
            return t.get(productRef)
            .then(async doc => {
                if(appointmentData.item.variant) {
                    const product = doc.data();
                    const variantIndex = product.appointment.schedules.variant.findIndex(s => s.name === appointmentData.item.variant);
                    const variant = variantIndex !== -1 ? product.appointment.schedules.variant[variantIndex] : {};
                    if(Object.keys(variant).length) {
                        const slotIndex = variant.schedules.findIndex(s => s.day === appointmentData.schedule.day);
                        const slot = slotIndex !== -1 ? variant.schedules[slotIndex] : {};
                        if(Object.keys(slot).length) {
                            const timeScheduleIndex = slot.schedule.findIndex(s => (s.start === appointmentData.schedule.slot.start && s.end === appointmentData.schedule.slot.end));
                            const timeSchedule = timeScheduleIndex !== -1 ? slot.schedule[timeScheduleIndex] : {};
                            if(Object.keys(timeSchedule).length) {
                                if(timeSchedule.slotLimit > 0) {
                                    product.appointment.schedules.variant[variantIndex].schedules[slotIndex].schedule[timeScheduleIndex].slotLimit = timeSchedule.slotLimit - 1;
                                }
                            }
                        }
                    }
                    t.update(productRef, {appointment: product.appointment})
                } else {
                    const product = doc.data();
                    const slotIndex = product.appointment.schedules.single.schedules.findIndex(s => s.day === appointmentData.schedule.day);
                    const slot = slotIndex !== -1 ? product.appointment.schedules.single.schedules[slotIndex] : {};
                    if(Object.keys(slot).length) {
                        const timeScheduleIndex = slot.schedule.findIndex(s => (s.start === appointmentData.schedule.slot.start && s.end === appointmentData.schedule.slot.end));
                        const timeSchedule = timeScheduleIndex !== -1 ? slot.schedule[timeScheduleIndex] : {};
                        if(Object.keys(timeSchedule).length) {
                            if(timeSchedule.slotLimit > 0) {
                                product.appointment.schedules.single.schedules[slotIndex].schedule[timeScheduleIndex].slotLimit = timeSchedule.slotLimit - 1;
                            }
                        }
                    }
                    t.update(productRef, {appointment: product.appointment})
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
}

async function appointmentNotification(appointmentData) {
    const chatData = {
        type: 'txt',
        createdAt: new Date(moment().tz(timeZone)),
        author: 'user',
        isRead: false,
        published: true,
        message: `Booked an appointment for ${appointmentData.item.name} on ${appointmentData.schedule.date} at ${appointmentData.schedule.slot.start} to ${appointmentData.schedule.slot.end}.`,
        title: 'Appointment booked!'
    }
    await globalFile.chatMessage(chatData, appointmentData.user.id);
} 

async function getEnvironmentVariables() {
    return new Promise(async (resolve, reject) => {
        const envDoc = await db.collection('settings').doc('environment').get();
        const envData = envDoc.data();
        resolve(envData);
    });
}

async function vendorProcess(appointmentData, appointmentId) {
    try {
        let ismultiVendor = false;
        const env = await getEnvironmentVariables();
        ismultiVendor = env && env.multiVendor ? true : false;
        if (ismultiVendor) {
            const mvDoc = await db.collection('features').doc('multiVendor').get();
            const mvDocData = mvDoc.data();
            ismultiVendor = mvDocData && mvDocData.active ? true : false;
        }

        if (ismultiVendor && appointmentData.vendor.id) {
            await db.collection('features').doc('multiVendor').collection('vendors').doc(appointmentData.vendor.id).collection('appointments').add(appointmentData);
            const chatData = {
                type: 'txt',
                createdAt: new Date(moment().tz(timeZone)),
                author: 'admin',
                isRead: false,
                published: true,
                message: `You received a new appointment for ${appointmentData.item.name}.`,
                title: 'New Appointment Received!'
            }
            await globalFile.chatMessage(chatData, appointmentData.vendor.id);
        }

    } catch (error) {
        console.log(error);
    }
}