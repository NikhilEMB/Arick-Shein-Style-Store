const axios = require('axios').default;
const functions = require("firebase-functions");
const { db, timeZone, projectId } = require('./admin');
var moment = require('moment-timezone');
const genieUrl = 'https://us-central1-bwi-genie.cloudfunctions.net/universalProjectRequests';

exports.onCreateUniversalUpdate = functions.firestore
    .document('management/universal').onCreate(async (snap, context) => {
        try {
            let data = {
                projectId: projectId
            }
            await db.collection('management').doc('universal').set({createdAt: new Date(moment().tz(timeZone))});
            axios.post(genieUrl, data)
                .then(function (response) {
                    console.log('success from genie', response);
                })
                .catch(function (error) {
                    console.log('management: error after calling genie:', error);
                });
        } catch (error) {
            console.log('error in calling genie url:', error);
        }
    });