var jsonData = require('../languages/new.json');
var oldJsonData = require('../languages/old.json');

const serviceAccount = require("../translate-service-account.json");
const { Translate } = require('@google-cloud/translate').v2;
const fs = require('fs');

const projectId = serviceAccount.project_id;
const keyFilename = "C:/Users/persh/Desktop/translate-service-account.json";

const translate = new Translate({ projectId, keyFilename });
var updatedObj = {};

const languageCodes = ['hi', 'fr'];

// compare jsons & only add new Or chnaged eng text
async function compareJson() {
    for (const [key, value] of Object.entries(jsonData)) {
        if (!(key in oldJsonData)) {
            if(typeof jsonData[key] === 'object') {
                updatedObj[key] = {
                    ...jsonData[key]
                }
            } else {
                updatedObj[key] = jsonData[key];
            }
        } else {
            if(typeof jsonData[key] === 'object') {
                for (const [innerKey, innerVal] of Object.entries(jsonData[key])) {
                    if (!(innerKey in oldJsonData[key]) || oldJsonData[key][innerKey] !== jsonData[key][innerKey]) {
                        if (key in updatedObj) {
                            updatedObj[key][innerKey] = jsonData[key][innerKey];
                        } else {
                            updatedObj[key] = {};
                            updatedObj[key][innerKey] = innerVal;
                        }
                    }
                }
            }
        }
    }
    translateUpdatedObj();
}


async function translateUpdatedObj() {
    for (let index = 0; index < languageCodes.length; index++) {
        const languageJson = require(`../languages/${languageCodes[index]}.json`);
        for (const [key, value] of Object.entries(updatedObj)) {
            if (key in languageJson) {
                if(typeof updatedObj[key] === 'object') {
                    for (const [innerKey, innerVal] of Object.entries(updatedObj[key])) {
                        let translatedText = await translateOneText(innerVal, languageCodes[index]);
                        languageJson[key][innerKey] = translatedText;
                    }
                } else {
                    let translatedText = await translateOneText(updatedObj[key], languageCodes[index]);
                    languageJson[key] = translatedText;
                }
            } else {
                languageJson[key] = {};
                if(typeof updatedObj[key] === 'object') {
                    for (const [innerKey, innerVal] of Object.entries(updatedObj[key])) {
                        let translatedText = await translateOneText(innerVal, languageCodes[index]);
                        languageJson[key][innerKey] = translatedText;
                    }
                } else {
                    let translatedText = await translateOneText(updatedObj[key], languageCodes[index]);
                    languageJson[key] = translatedText;
                }
            }
        }
        writeFile(languageCodes[index], languageJson);
    }
}

async function translateOneText(text, languageCode) {
    const [translation] = await translate.translate(text, languageCode);
    return translation;
}

function writeFile(languageCode, languageJson) {
    translatedJson = JSON.stringify(languageJson);
    fs.writeFile(`../languages/${languageCode}.json`, translatedJson, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}


compareJson();