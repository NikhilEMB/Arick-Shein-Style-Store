const functions = require('firebase-functions')
const mkdirp = require('mkdirp-promise')
const spawn = require('child-process-promise').spawn
const path = require('path')
const os = require('os')
const fs = require('fs')
const tinify = require('tinify')

const THUMB_MAX_HEIGHT = 200
const THUMB_MAX_WIDTH = 200
const MOB_MAX_HEIGHT = 500
const MOB_MAX_WIDTH = 500
const THUMB_PREFIX = 'thumb_'
const MOB_PREFIX = 'mob_'
const NO_COMP_MAX_SIZE = 500
const MAX_COMPRESSION_TRIES = 3

const { admin, db } = require('./admin')

exports.generateLowResBusinessAppImages = functions
	.runWith({ memory: '1GB' })
	.storage.object()
	.onFinalize(async object => {
		const originalImgSize = object.size

		// File and directory paths.
		const filePath = object.name
		const contentType = object.contentType // This is the image MIME type
		const fileDir = path.dirname(filePath)
		const fileName = path.basename(filePath)
		const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`))
		const mobileFilePath = path.normalize(path.join(fileDir, `${MOB_PREFIX}${fileName}`))
		const compressedFilePath = path.normalize(path.join(fileDir, `comp${fileName}`))
		const tempLocalFile = path.join(os.tmpdir(), filePath)
		const tempLocalDir = path.dirname(tempLocalFile)
		const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath)
		const tempLocalMobileFile = path.join(os.tmpdir(), mobileFilePath)
		const tempCompressedFile = path.join(os.tmpdir(), compressedFilePath)

		let documentId
		let chatMsgId
		let imageId
		let productId
		let imageType
		let widgetImgType

		if (!contentType.startsWith('image/')) {
			return console.log('This is not an image.')
		}
		if (fileName.startsWith(THUMB_PREFIX)) {
			return console.log('Already a Thumbnail.')
		}
		if (fileName.startsWith(MOB_PREFIX)) {
			return console.log('Already a Mobile.')
		}

		let filePathParts = filePath.split('/')
		const collectionName = filePathParts[0]

		if (collectionName === 'chats') {
			documentId = filePathParts[1]
			chatMsgId = filePathParts[3]
			imageId = filePathParts[5] ? filePathParts[5].split('.')[0] : null
			console.log('documentId', documentId)
			console.log('imageId', imageId)
			console.log('chatMsgId', chatMsgId)
		} else if (collectionName === 'ordersCommentImgs') {
			documentId = filePathParts[1]
			productId = filePathParts[3]
			imageId = filePathParts[4] ? filePathParts[4].split('.')[0] : null
		} else if (collectionName === 'banners') {
			documentId = filePathParts[1]
			imageId = filePathParts[2]
		} else if (collectionName === 'webbanners') {
			documentId = filePathParts[1]
			imageId = filePathParts[2]
		} else if (collectionName === 'subcategories') {
			documentId = filePathParts[1]
			imageId = filePathParts[3]
		} else if (collectionName === 'productOptions') {
			documentId = filePathParts[1]
			optionId = filePathParts[3]
			imageId = filePathParts[5] ? filePathParts[5].split('.')[0] : null
		} else if (collectionName === 'offers') {
			documentId = filePathParts[1]
			imageId = filePathParts[3] ? filePathParts[3].split('.')[0] : null
		} else if (collectionName === 'feedbacks') {
			documentId = filePathParts[1]
			imageId = filePathParts[3] ? filePathParts[3].split('.')[0] : null
		} else if (collectionName === 'categoriesBanner') {
			documentId = filePathParts[1]
			imageId = filePathParts[3] ? filePathParts[3].split('.')[0] : null
		} else if (collectionName === 'subCategoriesBanner') {
			documentId = filePathParts[1]
			imageId = filePathParts[3]
		} else if (collectionName === 'brands') {
			documentId = filePathParts[1]
			imageId = filePathParts[3]
		} else if (collectionName === 'brandsBanner') {
			documentId = filePathParts[1]
			imageId = filePathParts[3]
		} else if (collectionName === 'services') {
			documentId = filePathParts[1]
			imageId = filePathParts[3]
		} else if (collectionName === 'serviceRequests') {
			documentId = filePathParts[1]
			imageId = filePathParts[3]
		} else if (collectionName === 'popups') {
			documentId = filePathParts[1]
			imageId = filePathParts[2]
		} else if (collectionName === 'videos') {
			documentId = filePathParts[1]
			imageId = filePathParts[2]
		} else if (collectionName === 'productRatings') {
			documentId = filePathParts[1]
			imageId = filePathParts[2]
		} else if (collectionName === 'orders') {
			documentId = filePathParts[1]
			imageId = filePathParts[2]
		} else if (collectionName === 'widgets') {
			console.log('widgets')
			documentId = filePathParts[1]
			imageId = filePathParts[3]
			widgetImgType = filePathParts[2]
		} else if (collectionName === 'paymentSettings') {
			documentId = filePathParts[1]
			imageId = filePathParts[3] ? filePathParts[3].split('.')[0] : null
		} else if (collectionName === 'vendors') {
			documentId = filePathParts[1]
			imageId = filePathParts[3] ? filePathParts[3].split('.')[0] : null
		} else {
			documentId = filePathParts[1]
			imageType = filePathParts[2]
			imageId = filePathParts[3] ? filePathParts[3].split('.')[0] : null
			console.log('documentId', documentId)
			console.log('imageId', imageId)
		}

		// const documentId = filePathParts[1];
		// const imageId = filePathParts[3] ? filePathParts[3].split(".")[0] : null;
		console.log('collectionName', collectionName)
		console.log('documentId', documentId)
		console.log('imageId', imageId)
		console.log('productId', productId)
		if (collectionName && documentId && imageId) {
			// Cloud Storage files.
			const bucket = admin.storage().bucket(object.bucket)
			const file = bucket.file(filePath)

			const fileMetadata = await file.getMetadata().then(data => data[0].metadata)

			// Exit from the function if it is being called on the already compressed image.
			if (fileMetadata && fileMetadata.compressed) {
				return
			}

			var newMetadata = {
				metadata: {
					cacheControl: 'public,max-age=604800',
				},
			}
			await file.setMetadata(newMetadata)

			await mkdirp(tempLocalDir)
			// Download file from bucket.
			await file.download({
				destination: tempLocalFile,
			})

			const metadata = {
				metadata: {
					contentType: contentType,
					// To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
					cacheControl: 'public,max-age=604800',
				},
			}

			tinify.key = 'nhGtSnt9Bf9j7xrHjykxc10y7sNLkzSk'
			let wasFileCompressed = false

			// if the original image is > NO_COMP_MAX_SIZE (kB), then compress it.
			if (originalImgSize / 1000 > NO_COMP_MAX_SIZE) {
				for (
					let numCompressionTries = 0;
					numCompressionTries < MAX_COMPRESSION_TRIES;
					numCompressionTries += 1
				) {
					if (!wasFileCompressed) {
						try {
							const sourceData = tinify.fromFile(tempLocalFile)
							await sourceData.toFile(tempCompressedFile)
							wasFileCompressed = true
						} catch (compressionError) {
							wasFileCompressed = false
							console.log(`Error during file compression: ${compressionError}`)
						}
					} else {
						// Upload the compressed file to the same location as the original image.
						await bucket.upload(tempCompressedFile, {
							destination: filePath,
							metadata: {
								metadata: {
									contentType: contentType,
									compressed: true,
									cacheControl: 'public,max-age=604800',
								},
							},
						})
						break
					}
				}
			}

			const thumbFile = bucket.file(thumbFilePath)
			const mobileFile = bucket.file(mobileFilePath)

			// Generate a thumbnail using ImageMagick.
			await spawn(
				'convert',
				[
					tempLocalFile,
					'-thumbnail',
					`${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`,
					tempLocalThumbFile,
				],
				{
					capture: ['stdout', 'stderr'],
				}
			)
			// Uploading the Thumbnail.
			await bucket.upload(tempLocalThumbFile, {
				destination: thumbFilePath,
				metadata: metadata,
			})

			// Generate an image for mobile using ImageMagick
			await spawn(
				'convert',
				[
					tempLocalFile,
					'-thumbnail',
					`${MOB_MAX_WIDTH}x${MOB_MAX_HEIGHT}>`,
					tempLocalMobileFile,
				],
				{
					capture: ['stdout', 'stderr'],
				}
			)
			// Uploading the image for mobile.
			await bucket.upload(tempLocalMobileFile, {
				destination: mobileFilePath,
				metadata: metadata,
			})

			// Once the image has been uploaded delete the local files to free up disk space.
			fs.unlinkSync(tempLocalFile)
			fs.unlinkSync(tempLocalThumbFile)
			fs.unlinkSync(tempLocalMobileFile)

			// Delete the temporary compressed file only if the compression was successful.
			if (wasFileCompressed) {
				fs.unlinkSync(tempCompressedFile)
			}

			const config = {
				action: 'read',
				expires: '03-01-2500',
			}
			const results = await Promise.all([
				thumbFile.getSignedUrl(config),
				mobileFile.getSignedUrl(config),
				file.getSignedUrl(config),
			])
			const thumbResult = results[0]
			const mobileResult = results[1]
			const fileResult = results[2]
			const thumbFileUrl = thumbResult[0]
			const mobileUrl = mobileResult[0]
			const originalUrl = fileResult[0]

			// Update the image urls in the database.
			if (
				collectionName === 'categories' &&
				collectionName === 'chats' &&
				collectionName === 'products' &&
				collectionName === 'productOptions'
			) {
				await db
					.collection('media')
					.doc('images')
					.collection(collectionName)
					.doc(imageId)
					.update({
						thumb: thumbFileUrl,
						mob: mobileUrl,
						url: originalUrl,
					})
			}
			if (collectionName === 'categories') {
				const categoryDoc = await db.collection('categories').doc(documentId).get()
				const categoryData = categoryDoc.data()
				console.log('category data', categoryData)
				await db
					.collection('categories')
					.doc(documentId)
					.update({
						image: {
							size: categoryData.image.size,
							url: categoryData.image.url,
							thumb: thumbFileUrl,
							mob: mobileUrl,
						},
					})
			} else if (collectionName === 'chats') {
				const chatRef = db
					.collection('chats')
					.doc(documentId)
					.collection('messages')
					.doc(chatMsgId)
				await db.runTransaction(t => {
					return t.get(chatRef).then(doc => {
						var chatDoc = doc.data()
						if (!chatDoc.images) {
							chatDoc.images = []
						}
						chatDoc.images.push({
							id: imageId,
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						})
						t.update(chatRef, {
							images: chatDoc.images,
						})
						if (chatDoc.images.length === chatDoc.imageCount) {
							t.update(chatRef, {
								published: true,
							})
						}
					})
				})
			} else if (collectionName === 'ordersCommentImgs') {
				const orderRef = db.collection('orders').doc(documentId)
				await db.runTransaction(t => {
					return t.get(orderRef).then(doc => {
						var orderDoc = doc.data()
						for (let i = 0; i < orderDoc.products.length; i++) {
							if (orderDoc.products[i].productId === productId) {
								orderDoc.products[i].commentImgs.push({
									url: originalUrl,
									mob: mobileUrl,
									thumb: thumbFileUrl,
								})
							}
						}
						t.update(orderRef, {
							products: orderDoc.products,
						})
					})
				})
			} else if (collectionName === 'banners') {
				await db
					.collection('features')
					.doc('banners')
					.collection('images')
					.doc(imageId)
					.update({
						org: originalUrl,
						mob: mobileUrl,
						thumb: thumbFileUrl,
					})
			} else if (collectionName === 'webbanners') {
				await db
					.collection('features')
					.doc('webbanners')
					.collection('images')
					.doc(imageId)
					.update({
						org: originalUrl,
						mob: mobileUrl,
						thumb: thumbFileUrl,
					})
			} else if (collectionName === 'subcategories') {
				await db
					.collection('categories')
					.doc(documentId)
					.collection('subcategories')
					.doc(imageId)
					.update({
						image: {
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						},
					})
			} else if (collectionName === 'productOptions') {
				const productRef = db
					.collection('products')
					.doc(documentId)
					.collection('options')
					.doc(optionId)
				await db.runTransaction(t => {
					return t.get(productRef).then(doc => {
						var productDoc = doc.data()
						if (!productDoc.images) {
							productDoc.images = []
						}
						productDoc.images.push({
							imageId: imageId,
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						})
						if (productDoc.coverPic.imageId === imageId) {
							t.update(productRef, {
								coverPic: {
									imageId: imageId,
									url: originalUrl,
									mob: mobileUrl,
									thumb: thumbFileUrl,
								},
								images: productDoc.images,
							})
						} else {
							t.update(productRef, {
								images: productDoc.images,
							})
						}
					})
				})
			} else if (collectionName === 'offers') {
				const offerDoc = await db.collection('offers').doc(documentId).get()
				const offerData = offerDoc.data()
				console.log('offerData data', offerData)
				if (!offerData.images) {
					offerData.images = []
				}
				offerData.images.push({
					url: originalUrl,
					mob: mobileUrl,
					thumb: thumbFileUrl,
				})
				await db.collection('offers').doc(documentId).update({
					images: offerData.images,
				})
			} else if (collectionName === 'feedbacks') {
				const feedbackDoc = await db.collection('feedbacks').doc(documentId).get()
				const feedbackData = feedbackDoc.data()
				console.log('feedbackData data', feedbackData)
				if (!feedbackData.images) {
					feedbackData.images = []
				}
				feedbackData.images.push({
					url: originalUrl,
					mob: mobileUrl,
					thumb: thumbFileUrl,
				})
				await db.collection('feedbacks').doc(documentId).update({
					images: feedbackData.images,
				})
			} else if (collectionName === 'categoriesBanner') {
				await db
					.collection('categories')
					.doc(documentId)
					.update({
						banner: {
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						},
					})
			} else if (collectionName === 'subCategoriesBanner') {
				await db
					.collection('categories')
					.doc(documentId)
					.collection('subcategories')
					.doc(imageId)
					.update({
						banner: {
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						},
					})
			} else if (collectionName === 'brands') {
				await db
					.collection('brands')
					.doc(documentId)
					.update({
						image: {
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						},
					})
			} else if (collectionName === 'brandsBanner') {
				await db
					.collection('brands')
					.doc(documentId)
					.update({
						banner: {
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						},
					})
			} else if (collectionName === 'services') {
				await db
					.collection('services')
					.doc(documentId)
					.update({
						banner: {
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						},
					})
			} else if (collectionName === 'popups') {
				await db
					.collection('popups')
					.doc(documentId)
					.update({
						banner: {
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						},
					})
			} else if (collectionName === 'videos') {
				await db
					.collection('videos')
					.doc(documentId)
					.update({
						thumbnail: {
							url: originalUrl,
							mob: mobileUrl,
							thumb: thumbFileUrl,
						},
					})
			} else if (collectionName === 'serviceRequests') {
				const srDoc = await db.collection('serviceRequests').doc(documentId).get()
				const srData = srDoc.data()
				if (!srData.attachments) {
					srData.attachments = []
				}
				srData.attachments.push({
					url: originalUrl,
					mob: mobileUrl,
					thumb: thumbFileUrl,
				})
				await db.collection('serviceRequests').doc(documentId).update({
					attachments: srData.attachments,
				})
			} else if (collectionName === 'productRatings') {
				const prDoc = await db
					.collection('products')
					.doc(documentId)
					.collection('ratings')
					.doc(imageId)
					.get()
				const prData = prDoc.data()
				if (!prData.photos) {
					prData.photos = []
				}
				prData.photos.push({
					url: originalUrl,
					mob: mobileUrl,
					thumb: thumbFileUrl,
				})
				await db
					.collection('products')
					.doc(documentId)
					.collection('ratings')
					.doc(imageId)
					.update({
						photos: prData.photos,
					})
			} else if (collectionName === 'orders') {
				if (imageId === 'rating') {
					const orderDoc = await db.collection('orders').doc(documentId).get()
					const orderData = orderDoc.data()
					if (!orderData.rating.photos) {
						orderData.rating.photos = []
					}
					orderData.rating.photos.push({
						url: originalUrl,
						mob: mobileUrl,
						thumb: thumbFileUrl,
					})
					await db.collection('orders').doc(documentId).update({
						rating: orderData.rating,
					})
				}
			} else if (collectionName === 'widgets') {
				console.log('needs to update widgets collection', documentId, imageId)
				let docRef = db.collection('widgets').doc(documentId)
				if (widgetImgType === 'form') {
					await db
						.collection('widgets')
						.doc(documentId)
						.update({
							banner: { url: originalUrl, mob: mobileUrl, thumb: thumbFileUrl },
						})
				} else {
					docRef
						.get()
						.then(async function (doc) {
							if (doc.exists) {
								let docData = doc.data()
								console.log('widget docData', docData)
								if (
									docData.type == 'video-block' ||
									docData.type == 'image-block' ||
									docData.type == 'document'
								) {
									await db
										.collection('widgets')
										.doc(documentId)
										.update({
											coverImage: {
												org: originalUrl,
												mob: mobileUrl,
												thumb: thumbFileUrl,
											},
										})
								} else {
									await db
										.collection('widgets')
										.doc(documentId)
										.collection(widgetImgType)
										.doc(imageId)
										.update({
											image: {
												org: originalUrl,
												mob: mobileUrl,
												thumb: thumbFileUrl,
											},
										})
								}
								console.log('Document data:', docData)
							} else {
								// doc.data() will be undefined in this case
								console.log('No such document!')
							}
						})
						.catch(function (error) {
							console.log('Error getting document:', error)
						})
				}
			} else if (collectionName === 'paymentSettings') {
				if (documentId === 'QRCode') {
					await db.collection('payment').doc('info').update({
						'upiManual.qrCodeMob': mobileUrl,
						'upiManual.qrCodeThumb': thumbFileUrl,
					})
				}
			} else if (collectionName === 'vendors') {
				if (imageId !== 'qrCode') {
					await db
						.collection('features')
						.doc('multiVendor')
						.collection('vendors')
						.doc(documentId)
						.update({
							image: {
								url: originalUrl,
								mob: mobileUrl,
								thumb: thumbFileUrl,
							},
						})
				}
			} else {
				if (imageType === 'images' && collectionName === 'products') {
					const productRef = db.collection('products').doc(documentId)
					await db.runTransaction(t => {
						return t.get(productRef).then(doc => {
							var productDoc = doc.data()
							if (!productDoc.images) {
								productDoc.images = []
							}
							productDoc.images.push({
								imageId: imageId,
								url: originalUrl,
								mob: mobileUrl,
								thumb: thumbFileUrl,
							})

							if (productDoc.coverPic && productDoc.coverPic.imageId === imageId) {
								t.update(productRef, {
									coverPic: {
										imageId: imageId,
										url: originalUrl,
										mob: mobileUrl,
										thumb: thumbFileUrl,
									},
									images: productDoc.images,
								})
							} else {
								t.update(productRef, {
									images: productDoc.images,
								})
							}
						})
					})
				}
			}
		} else {
			return console.log('Ids invalid')
		}
	})
