  
var jsonData = require('../languages/old.json');

const serviceAccount = require("../translate-service-account.json");
const {Translate} = require('@google-cloud/translate').v2;
const fs = require('fs');

const projectId = serviceAccount.project_id;
const keyFilename = "C:/Users/persh/Desktop/translate-service-account.json";

const translate = new Translate({projectId, keyFilename});

const languageCodes = ['hi', 'fr'];
var translatedArr = [];
var translatedJson;
var langCodeIndex = 0;

var textArr = [];

for (const [key1, value1] of Object.entries(jsonData)) {
  for (const [key2, value2] of Object.entries(value1)) {
    textArr.push(value2);
  }
}

function chunkArray(myArray, chunk_size){
  var results = [];
  while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
  }
  // Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]
  return results;
}
var chunkedArr = chunkArray(textArr, 100);

async function translateText(array, languageCode) {
  let [translations] = await translate.translate(array, languageCode);
  translations = Array.isArray(translations) ? translations : [translations];
  for (let index = 0; index < translations.length; index++) {
    translatedArr.push(translations[index]);
  }
}

function writeFile(languageCode) {
  translatedJson = JSON.stringify(jsonData);
  fs.writeFile(`../languages/${languageCode}.json`, translatedJson, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    translatedArr = [];
    langCodeIndex++;
    if (languageCodes.length > langCodeIndex) {
      console.log('codee:', languageCodes[langCodeIndex], langCodeIndex);
      startTranslation(languageCodes[langCodeIndex]);
    }
  });
}

function makeTranslatedObj(languageCode){
  //let duplicateJson = jsonData;
  let i = 0;
  for (const [key1, value1] of Object.entries(jsonData)) {
    for (const [key2, value2] of Object.entries(value1)) {
      value1[key2] = translatedArr[i];
      ++i;
    }
  }
  writeFile(languageCode);
}

async function startTranslation(languageCode){
  for (let index = 0; index < chunkedArr.length; index++) {
    await translateText(chunkedArr[index], languageCode);
    if (index + 1 == chunkedArr.length) {
      makeTranslatedObj(languageCode);
    }
  }
}

startTranslation(languageCodes[langCodeIndex]);