const functions = require('firebase-functions')

const { db, bucket } = require('./admin')

//pdfmake imports
const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("../vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    },
    SakalBharati: {
        normal: "SakalBharati_N_Ship.ttf",
        bold: 'SakalBharati_N_Ship.ttf',
        italics: 'SakalBharati_N_Ship.ttf',
        bolditalics: 'SakalBharati_N_Ship.ttf'
    }
};

exports.onCreateBulkNavigation = functions.firestore
	.document('users/{userId}/bulkNavigations/{bulkNavigationId}')
	.onCreate(async (snap, context) => {
		const data = snap.data()
		for (const order of data.orders) {
			await db
				.collection('orders')
				.doc(order.orderDocId)
				.update({ deliveryStatus: 'inProgress', status: 'Dispatched' })
		}
	})

exports.onUpdateBulkNavigation = functions.firestore
	.document('users/{userId}/bulkNavigations/{bulkNavigationId}')
	.onUpdate(async (change, context) => {
		const after = change.after.data()
		const before = change.before.data()
		if (after.status === 'delivered' && before.status !== 'delivered') {
			for (const order of after.orders) {
				await db
					.collection('orders')
					.doc(order.orderDocId)
					.update({ deliveryStatus: 'delivered', status: 'Delivered' })
			}
		}
	})

exports.generatePdfDeliveryAgent = functions.https.onCall(async (data, context) => {
	try {
		const pdfLink = await generateInvoice(data.uid);
		return { success: true, pdfLink };
	} catch (error) {
		console.log(error);
		return { success: false };
	}
})

async function generateInvoice(uid) {
	return new Promise(async resolve => {
		const deliveryAgentRef = await db.collection('users').doc(uid).get()
		const deliveryAgentDetails = deliveryAgentRef.data()
		let agentName = deliveryAgentDetails.name
		let agentPhoneNo = deliveryAgentDetails.phoneNo

		const pendingOrdersRef = await db
			.collection('orders')
			.where('deliveryAgentId', '==', uid)
			.where('status', 'in', ['Confirmed', 'Dispatched'])
			.get()

		let orders = []
		pendingOrdersRef.forEach(function appendOrder(doc) {
			orders.push({ id: doc.id, ...doc.data() })
		})
		orders.sort(function sortByOrderId(orderA, orderB) {
			let orderAId = orderA['orderId'];
			let orderBId = orderB['orderId'];

			if (orderAId < orderBId) {
				return -1;
			} else if (orderAId > orderBId) {
				return 1;
			}
		})

		var docDefinition = {
			content: [
				{
					text: `Delivery Agent: ${agentName}
								 ${agentPhoneNo}`,
					style: 'header',
					alignment: 'center',
					margin: [0, 0, 0, 25],
				},
				getAgentPendingOrders(orders),
			],
			styles: {
				header: {
					fontSize: 12,
					bold: true,
					color: '#000000',
				},
				tableHeader: {
					color: '#000000',
					fontSize: 8,
					alignment: 'center',
					fillColor: 'lightgrey',
					lineHeight: 1.5,
					margin: [0, 5, 0, 0],
				},
				margin: {
					margin: [0, 5, 0, 0],
					fontSize: 8,
				},
			},
			defaultStyle: {
				fontSize: 13,
				color: '#2e2e2e',
				font: 'SakalBharati',
				lineHeight: 1,
			},
		}

		// console.log('pdf gen starts')
		const pdfGenerator = pdfMake.createPdf(docDefinition)
		let pdfLink
		// console.log('pdf gen completed')
		await pdfGenerator.getBase64(async data => {
			console.log('in getbase64')
			pdfLink = await savePdf(data, uid, agentName)
			resolve(pdfLink)
		})
	})
}

function getAgentPendingOrders(orders) {
	let arr = []

	for (const order of orders) {
		let orderProducts = order.products
		let orderId = order.orderId
		let orderAddress = order.address.address
		let orderCustomerName = order.userName
		let orderAmount = order.totalAmountToPaid
		let orderPaymentStatus = order.payment

		arr.push(
			getOrderHeader(
				orderId,
				orderAddress,
				orderCustomerName,
				orderAmount,
				orderPaymentStatus
			)
		)
		arr.push(getOrderTable(orderProducts))
		arr.push({
			canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }],
			margin: [0, 0, 0, 25],
		})
	}
	return arr
}

function getOrderHeader(orderId, orderAddress, orderCustomerName, orderAmount, orderPaymentStatus) {
	let orderDetails = {
		width: '50%',
		stack: [
			{ text: `OrderId: ${orderId}`, style: 'margin' },
			{ text: `Customer Name: ${orderCustomerName}`, style: 'margin' },
			{ text: `Address: ${orderAddress}`, style: 'margin' },
		],
		alignment: 'left',
	}
	let billDetails = {
		width: '50%',
		stack: [
			{ text: `Total Bill: ${orderAmount != null ? orderAmount : 'NA'}`, style: 'margin' },
			{
				text: `Payment Status: ${
					orderPaymentStatus.completed == false ? 'Not Paid' : 'Paid'
				} (Mode: ${orderPaymentStatus.mode != null ? orderPaymentStatus.mode : 'NA'})`,
				style: 'margin',
			},
		],
		alignment: 'right',
	}

	return {
		columns: [orderDetails, billDetails],
	}
}

function getOrderTable(orderProducts) {
	let orderTable = {
		layout: 'lightHorizontalLines',
		alignment: 'center',
		margin: [0, 10, 0, 20],
		lineHeight: 1.5,
		table: {
			headerRows: 1,
			widths: ['*', '*'],
			body: [],
		},
	}
	let tableHeader = [
		{ text: 'Product', style: 'tableHeader' },
		{ text: 'Quantity', style: 'tableHeader' },
	]
	orderTable.table.body.push(tableHeader)

	for (const product of orderProducts) {
		let tableBody = []
		let productName = product.name
		if (product.pack !== undefined && product.pack.variantType !== undefined && product.pack.weight !== undefined) {
			productName += ` (${product.pack.variantType}: ${product.pack.weight})`
		}
		tableBody.push({ text: `${productName}`, style: 'margin' })
		tableBody.push({ text: `${product.quantity}`, style: 'margin' })
		orderTable.table.body.push(tableBody)
	}

	return orderTable
}

async function savePdf(data, agentId, agentName) {
	return new Promise(async resolve => {
		var base64EncodedPdfString = data,
			mimeType = 'application/pdf',
			fileName = `Delivery Agent ${agentName}'s Pending Orders` + '.pdf',
			pdfBuffer = Buffer.from(base64EncodedPdfString, 'base64')

		var file = bucket.file(`users/${agentId}/` + fileName)
		file.save(pdfBuffer, {
			metadata: { contentType: mimeType },
		})

		const config = {
			action: 'read',
			expires: '03-01-2500',
		}

		let downloadUrl = await file.getSignedUrl(config)
		resolve(downloadUrl[0])
	})
}

exports.acceptNearbyOrder = functions.https.onCall(async (data, context) => {
	try {
		let status = await isNearbyOrderAvailable(data);
		if(status) {
			const deliveryAgents = [];
			const usersRef = await db.collection('users').where('role', '==', 'deliveryAgent').get();
			usersRef.forEach(doc => {
				if(doc && doc.id && doc.data()) {
					deliveryAgents.push({id: doc.id, ...doc.data()});
				}
			});
			for (const agent of deliveryAgents) {
				await db.collection('users').doc(agent.id).collection('nearbyOrders').doc(data.orderId).delete();
			}
		}
		return { status };
	} catch (error) {
		console.log(error);
		return { status: false };
	}
});

async function isNearbyOrderAvailable(data) {
	return new Promise(async resolve => {
		const orderRef = db.collection('orders').doc(data.orderId);
		await db.runTransaction(t => {
		return t.get(orderRef)
			.then(doc => {
				var order = doc.data();
				if(!order.deliveryAgentId) {
					t.update(orderRef, {deliveryAgentId: data.uid, deliveryStatus: 'notStarted'});
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	});
}