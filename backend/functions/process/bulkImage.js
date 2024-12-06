const functions = require("firebase-functions");
var globalFile = require('./global');
var universalFile = require('../universal/universal');
var slugFile = require('../universal/slug');
const unzip = require('unzipper')
const axios = require('axios').default;
const stream = require('stream');
const https = require('https')

const {
    firestore
} = require("firebase-admin");
const request = require('request');

const {
    admin,
    db,
    bucket,
    WEB_API_KEY,
    dynamicLinkInfo
} = require('./admin');

const runtimeOpts = {
  memory: '2GB',
  timeoutSeconds: 540
}

function calculateImageSize (base64String) {
  let padding = 0, inBytes = 0, base64StringLength = 0;
  if (base64String.endsWith('==')) {
      padding = 2;
  } else if (base64String.endsWith('=')) {
      padding = 1;
  } else { padding = 0; }
  base64StringLength = base64String.length;
  inBytes = (base64StringLength / 4) * 3 - padding;
  const KBytes = inBytes / 1000;
  return KBytes;
}

exports.unzip = functions.runWith(runtimeOpts).storage.object().onFinalize((object) => {
  return new Promise(async (resolve, reject) => {
      let prodMeta = 0
      let doc = await db.collection('features').doc('bulkImagesUpload').collection('products').get()
      doc.forEach(doc => {
          if (doc.id === 'meta') {
              // console.log('totalCount : ', doc.data().totalCount)
              prodMeta = doc.data()
          }
      })
      if (object.contentType !== 'application/zip') {
          reject();
      } else {
          let count = []
          const remoteFile = bucket.file(object.name)
          const remoteDir = object.name.replace('.zip', '')
          // console.log(`Downloading ${remoteFile}`)
          remoteFile.createReadStream()
              .on('error', async err => {
                  // console.error(err)
                  // * Push log in error []
                  let err1 = await db.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({ 'errorMessage': err })
                  reject(err);
              })
              .on('response', response => {
              })
              .pipe(unzip.Parse())
              .on('entry',async entry => {
                  if ((entry.path.includes('__MACOSX')) || (entry.path.includes('.DS_Store'))) {
                      reject()
                  }  
                  else {
                      console.log('entry : ', entry.path)
                      let file
                      if (entry.path.includes('/')) {
                        console.log('In Multi Mode!!!')
                        file = bucket.file(`bulkImages/${remoteDir}/${entry.path}`)
                      } else {
                        console.log('In Single Mode!!!')
                        file = bucket.file(`bulkImages/${remoteDir}/${entry.path.split('.')[0]}/${'cover-'+entry.path}`)
                      }
                      await entry.pipe(file.createWriteStream())
                          .on('error', async err => {
                              // console.log(err)
                              let err2 = await db.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({ 'errorMessage': err })
                              reject(err);
                          })
                          .on('finish', async () => {
                              count++
                              // console.log(`Finished extracting ${remoteDir}/${entry.path}`)
                              // console.log("Finished downloading : ", 'L - ', prodMeta.totalCount, ' C - ', count)
                              if (count === prodMeta.totalCount) {
                                  // ! somehow the below update cmd is not working for two fields to be updated
                                  // ! hence separate update cmd is being used
                                  let ref2 = await db.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({ 'events.completed.createdAt': new Date() })
                                  resolve();
                                  let ref1 = await db.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({ 'events.inProgress.completedAt': new Date() })
                                  await imageParse(prodMeta)
                              }
                          })
                  }
              })
      }
  })

})

async function imageParse(prodMeta) {
  // console.log('reached here : ', prodMeta.totalCount)
  try {
    let count = 0
    let variantState = false
    let image = {
      url: null,
      size: null,
      uploadedAt: null,
      productId: null
    }
    for (const sku of prodMeta.meta) {
      if (sku.productCode && sku.images && sku.images.length) {
        // console.log(sku.productCode)
        await db.collection('products').doc(sku.pid).update({ images: [], coverPic: {} })
        let varRef = await db.collection('products').doc(sku.pid).get()
        if (varRef.data().isPriceList && varRef.data().priceList.length) {
          // for (let i = 0; i < varRef.data().priceList.length; i++) {
          //   let updatedPriceList = varRef.data().priceList[i]
          //   updatedPriceList.images = []
          //   await db.collection('products').doc(sku.pid).update({
          //     priceList: updatedPriceList
          //   })
          // }
          let updatedPriceList = varRef.data().priceList
          for (let i = 0; i < updatedPriceList.length; i++) {
            if (updatedPriceList[i].images && updatedPriceList[i].images.length) {
              updatedPriceList[i].images = []
            }
          }
          await db.collection('products').doc(sku.pid).update({
            priceList: updatedPriceList
          })
        }
        for (const img of sku.images) {
          let imageLink = bucket.file(`bulkImages/productImagesZip/${sku.productCode}/${img}`)
          let coverState = false
          const config = {
            action: 'read',
            expires: '03-01-2500',
          }
          let url = await imageLink.getSignedUrl(config)
          // console.log(url)
          const imgUrl = url[0]
          if (url[0].includes('cover')) {
            coverState = true
          } else {
            coverState = false
          }
          // await db.collection('features').doc('bulkImagesUpload').collection('products').add({url})
          if (url[0].includes('var-%5B')) {
            variantState = true
          } else {
            variantState = false
          }
          const imageData = await axios.get(imgUrl, { 
            responseType: "arraybuffer",
            httpsAgent: new https.Agent({ keepAlive: true }),
          })
          // console.log('--------------------------------')
          let B64 = `data:image/jpeg;base64,` + Buffer.from(imageData.data).toString('base64')
          image.url = '';
          image.size = calculateImageSize(B64);
          image.uploadedAt = new Date();
          image.productId = sku.pid;
          // console.log('imageData : ', image)
          const mediaDocRef = await db.collection('media').doc('images').collection('products').add(image)
          const imgRef = bucket.file(`products/${sku.pid}/images/` + mediaDocRef.id + `.${img.substring(img.indexOf('.') + 1)}`)
          // console.log('skuCode : ', sku.pid)
          // console.log('before upload sku : ', sku.productCode)
          await uploadImage(B64, sku.pid, mediaDocRef.id, coverState, sku.productCode, img, variantState, sku.nameOfVariants, sku.variantType)
        }
        // *** Update SKU-Completed Count
        let zipState = await db.collection( 'features' ).doc( 'bulkImagesUpload' ).collection( 'products' ).doc( 'zipState' ).get()
        let skusCompleted = zipState.data().skusCompleted
        await db.collection( 'features' ).doc( 'bulkImagesUpload' ).collection( 'products' ).doc( 'zipState' ).update( {
          skusCompleted: skusCompleted + 1
        } )
      }
    }
    let ref3 = await db.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({
      'status': 'Completed',
      'events.completed.completedAt': new Date(),
      'deleteZip': true,
      'deleteExtractedZip': true
    })
    bucket.file('productImagesZip.zip').delete()
    bucket.deleteFiles({
      prefix: 'bulkImages/productImagesZip'
    })
  } catch (error) {
    console.log('ERROR IN IMAGE-PARSE : ', error)
    await db.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({
      'events.failed.createdAt': new Date(),
      errorMessage: admin.firestore.FieldValue.arrayUnion('ERROR IN IMAGE-PARSE')
    })
  }
}

async function uploadImage (base64, pid, mid, coverState, skuCode, img, variantState, nameOfVariants, variantType) {
  try {
    const mimeType = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
    const base64EncodedImageString = base64.replace(/^data:image\/\w+;base64,/, '')
    const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(imageBuffer);
    let file = ''
    if (variantState) {
      file = bucket.file(`products/${pid}/images/${mid}+${img}`);
    } else {
      file = bucket.file(`products/${pid}/images/${mid}.${img.substring(img.indexOf('.') + 1)}`);
    }
    bufferStream.pipe(file.createWriteStream({
      metadata: {
        contentType: mimeType
      },
      public: true,
      validation: "md5"
    })).on('error', (err) => { 
      // console.log('error : ', err) 
    })
      .on('finish', () => {
        file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        }).then(async (url) => {
          if (coverState) {
            await db.collection('products').doc(pid).update({
              coverPic: {
                imageId: mid,
                url: url
              }
            })
          }
          if (variantState) {
            // await db.collection('features').doc('bulkImagesUpload').collection('products').doc('variants').collection(pid).set({
            //   variantState: variantState,
            //   url: url,
            //   img: img,
            //   nameOfVariants: nameOfVariants,
            //   pid: pid,
            //   skuCode: skuCode,
            // })
            // for (let variant of nameOfVariants) {
            //   console.log('variant in : ', variant)
            //   let prodDoc = await db.collection('products').doc(pid).get()
            //   if (prodDoc.data().isPriceList && prodDoc.data().priceList.length) {
            //     let updatedPriceList = prodDoc.data().priceList
            //     console.log('reached in 1st if')
            //     for (let i = 0; i < updatedPriceList.length; i++) {
            //       console.log('reached in for')
            //       if (variantType === 'pieces') {
            //         console.log('reached in vt p : ', variantType)
            //         if (updatedPriceList.some(f => f.name === variant)) {
            //           console.log('reached in pieces : ', variant)
            //           updatedPriceList[i].images = url
            //           console.log('update pieces : ', updatedPriceList)
            //           await db.collection('products').doc(pid).update({
            //             priceList: updatedPriceList
            //           })
            //         }
            //       } else {
            //         console.log('reached in vt e : ', variantType)
            //         if (updatedPriceList.some(f => f.weight === variant)) {
            //           console.log('reached in weight : ', variant)
            //           updatedPriceList[i].images = url
            //           console.log('update weight : ', updatedPriceList)
            //           await db.collection('products').doc(pid).update({
            //             priceList: updatedPriceList
            //           })
            //         }
            //       }
            //     }
            //   }
            // }

          }
        })
      })
  } catch (error) {
    console.log('ERROR IN IMAGE-UPLOAD : ', error)
    await db.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({
      'events.failed.createdAt': new Date(),
      errorMessage: admin.firestore.FieldValue.arrayUnion('ERROR IN IMAGE-UPLOAD')
    });
  }
}

// !!! Beta feature for checking prodState after catch exception
async function checkStatus(prodMeta) {}

async function setVariantImages(prodMeta) {
  for (const meta of prodMeta.meta) {
    if (meta.nameOfVariants && meta.nameOfVariants.length) {
      let prodDoc = await db.collection('products').doc(meta.productCode).get()
      let uploadedImages = prodDoc.data().images
      let updatedPriceList = prodDoc.data().priceList
      // if (updatedPriceList.length) {
      //   if (meta.variantType === 'pieces') {
      //     for (let i = 0; i < meta.nameOfVariants.length; i++) {
      //       if (updatedPriceList.some(f => f.name === meta.nameOfVariants[i])) {
      //         updatedPriceList.images[i] = uploadedImages[i]
      //       }
      //     }
      //   } else {
      //     for (let i = 0; i < meta.nameOfVariants.length; i++) {
      //       if (updatedPriceList.some(f => f.weight === meta.nameOfVariants[i])) {
      //         updatedPriceList.images[i] = uploadedImages[i]
      //       }
      //     }
      //   }
      // }
    }
  }
}

// exports.deleteExtractedZip = functions.firestore.document('features/{bulkImagesUpload}/products/{zipState}').onUpdate(async (change, context) => {
//   const beforeData = change.before.data()
//   const afterData = change.after.data()
//   if (beforeData.status !== afterData.status) {
//     if ((afterData.events.completed.completedAt) && (afterData.status === 'Completed')) {
//       bucket.deleteFiles({
//         prefix: 'bulkImages/productImagesZip'
//       })
//       await db.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').update({ 
//         'deleteExtractedZip': true
//     })
//     }
//   }
// })

// async function deleteTest() {
//   // bucket.file('productImagesZip.zip').delete()
//   // bucket.deleteFiles({
//   //   prefix: 'bulkImages/productImagesZip/'
//   // })
//   let arr1 = ['1.jpeg', '2.jpg', '3.jpg', '4.jpg']
//   for (const arr of arr1) {
//     console.log(`.${arr.substring(arr.indexOf('.') + 1)}`)
//   }
// }
// deleteTest()

async function testGet() {
  let docRef = await db.collection('products').doc('dT8t9AHCNT7yIMrwB6MT').get()
  console.log('docRef : ', docRef.data())
}
// testGet()

function test() {
  str = 'var-[v1]-[v2]-[v3].jpeg'
  let ext = '.'+str.split('.')[1]
  str = str.replace(ext, '')
  let occurrence = str.split('-[')
  let imgs = []
  for (const d of occurrence) {
    if (d.includes(']')) {
      imgs.push(d.replace(']', ''))
    }
  }
  console.log(imgs)
}
// test()

async function testDeleteVar() {
  console.log('running test delete')
  let varRef = await db.collection('products').doc('1Rk6KJj7nKHSj0ieekcv').get()
  let updatedPriceList
  if (varRef.data().isPriceList && varRef.data().priceList.length) {
    updatedPriceList = varRef.data().priceList
  }
  for (let i = 0; i < updatedPriceList.length; i++) {
    updatedPriceList[i].images = []
  }
  // await db.collection('products').doc('1Rk6KJj7nKHSj0ieekcv').update({
  //   priceList: updatedPriceList
  // })
}
// testDeleteVar()

async function testView() {
  let varRef = await db.collection('products').doc('1Rk6KJj7nKHSj0ieekcv').get()
  let meta = await db.collection('features').doc('bulkImagesUpload').collection('products').doc('meta').get()
  let uploadedImages = varRef.data().images
  let updatedPriceList = varRef.data().priceList
  // console.log('uploaded images: ', uploadedImages)
  // console.log('updated price list: ', updatedPriceList)
  for (let i of meta.data().meta) {
    console.log(i)
  }
}
// testView()

async function del() {
  let zipState = await db.collection('features').doc('bulkImagesUpload').collection('products').doc('zipState').get()
  console.log(zipState.data().skusCompleted)
}
// del()