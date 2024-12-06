const functions = require("firebase-functions");
var moment = require('moment-timezone');
var globalFile = require('./global');
const fmt = require('indian-number-format')
const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("../vfs_fonts");
const QRCode = require('qrcode');
const stream = require('stream');
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
const {
    db,
    bucket,
    orderIdPrefix,
    currencySymbol,
    country,
    taxType,
    timeZone,
    taxName,
    projectId
} = require('./admin');

exports.onCreateBooking = functions.firestore.document('bookings/{bookingId}').onCreate(async (snap, context) => {
    const metaDataRef = db.collection('ordersMetaData').doc('metadata');
    const bookingData = snap.data();
    const bookingDocId = context.params.bookingId;
    let bookingId = null;
    let bookingQrCode = null;
    const ordersMetaData = await metaDataRef.get();
    if(!ordersMetaData || !ordersMetaData.data()) {
        await metaDataRef.set({bookingId: 1000});
    } 
    await db.runTransaction(t => {
        return t.get(metaDataRef)
            .then(async doc => {
                let lastBookingId = 1000;
                // let lastBookingQrCode = 100000;
                if (doc.exists) {
                    lastBookingId = doc.data().lastBookingId || 1000;
                    // lastBookingQrCode = doc.data().lastBookingQrCode || 100000;
                }
                bookingId = lastBookingId + 1;
                // bookingQrCode = lastBookingQrCode + 1;

                bookingQrCode = await generateUniqueQrCode();

                t.update(metaDataRef, {
                    lastBookingId: bookingId,
                    lastBookingQrCode: bookingQrCode
                });
                t.update(snap.ref, {
                    bookingId,
                    createdAt: new Date(moment().tz(timeZone)),
                    bookingQrCode
                });                
            });
    });
    await bookingNotification(bookingData);

    await vendorProcess(bookingData, bookingDocId);
    bookingData.bookingId = bookingId;
    if (bookingData.payment.completed || bookingData.payment.mode === 'cash') {
        generateInvoice(bookingData, bookingDocId);
    }

    if (projectId == 'bwi-1085') { // ! [bwi-1085] projectId belongs to partyNights
        await generateQRCode(bookingDocId);
    }

});

async function generateUniqueQrCode() {
    let uniqueQrCode = null;
    let isUnique = false;      
    while (!isUnique) {
        const randomNo = Math.floor(Math.random() * (10000000 - 100000 + 1)) + 100000;
        const existingQrCode = await db.collection('bookings').where('bookingQrCode', '==', randomNo).limit(1).get();
        
        if (existingQrCode.empty) {
            uniqueQrCode = randomNo;
            isUnique = true;
        }
    }             
    return uniqueQrCode;
}

async function generateQRCode(bookingDocId) {
    console.log("generatingQRCode");
    QRCode.toDataURL(bookingDocId, { version: 2 }, async function (err, base64) {
        const mimeType = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
        const base64EncodedImageString = base64.replace(/^data:image\/\w+;base64,/, '')
        const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(imageBuffer);
        // Define file and fileName
        const file = bucket.file(`bookings-qrCode/${bookingDocId}/qrCode.png`);
        bufferStream.pipe(file.createWriteStream({
            metadata: {
                contentType: mimeType
            },
            public: true,
            validation: "md5"
        })).on('error', function (err) {
            console.log('error from image upload', err);
        }).on('finish', function () {
            // The file upload is complete.
            file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(async (signedUrls) => {
                // signedUrls[0] contains the file's public URL
                let pictureURL = signedUrls[0];
                await db.collection('bookings').doc(bookingDocId).update({ qrCode: pictureURL });
            });
        });
    })
}

exports.onUpdateBooking = functions.firestore.document('bookings/{bookingId}').onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    const bookingId = context.params.bookingId;
    if (((after.payment.completed && !before.payment.completed) || (after.payment.mode === 'cash' && before.payment.mode !== 'cash')) && !after.invoice) {
        generateInvoice(after, bookingId);
    }
    if (after.status !== before.status) {
        const chatData = {
            type: 'txt',
            createdAt: new Date(moment().tz(timeZone)),
            author: 'admin',
            isRead: false,
            published: true,
            message: `Your booking for ${after.item.name} on ${after.schedule.date} at ${after.schedule.slot.start} to ${after.schedule.slot.end} has been ${after.status}.`,
            title: `Booking ${after.status}!`
        }
        await globalFile.chatMessage(chatData, after.user.id);
    }
    if(after.schedule && JSON.stringify(after.schedule) !== JSON.stringify(before.schedule)) {
        const chatData = {
            type: 'txt',
            createdAt: new Date(moment().tz(timeZone)),
            author: 'admin',
            isRead: false,
            published: true,
            message: `Your booking schedule for ${after.item.name} has been changed to ${after.schedule.date} at ${after.schedule.slot.start} to ${after.schedule.slot.end}.`,
            title: `Booking Schedule Changed!`
        }
        await globalFile.chatMessage(chatData, after.user.id);
    }
});

async function bookingNotification(appointmentData) {
    let bookingMsg = '';
    if (appointmentData.schedule) {
        bookingMsg = `Booked a service for ${appointmentData.item.name} on ${appointmentData.schedule.date} at ${appointmentData.schedule.slot.start} to ${appointmentData.schedule.slot.end}.`;
    } else {
        bookingMsg = `Booked a service for ${appointmentData.item.name} successfully.`;
    }
    const chatData = {
        type: 'txt',
        createdAt: new Date(moment().tz(timeZone)),
        author: 'user',
        isRead: false,
        published: true,
        message: bookingMsg,
        title: 'Service booked!'
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
            // await db.collection('features').doc('multiVendor').collection('vendors').doc(appointmentData.vendor.id).collection('bookings').add(appointmentData);
            const chatData = {
                type: 'txt',
                createdAt: new Date(moment().tz(timeZone)),
                author: 'admin',
                isRead: false,
                published: true,
                message: `You received a new booking for ${appointmentData.item.name}.`,
                title: 'New Booking Received!'
            }
            await globalFile.chatMessage(chatData, appointmentData.vendor.id);
        }

    } catch (error) {
        console.log(error);
    }
}

async function generateInvoice(order, bookingId) {
    return new Promise(async (resolve, reject) => {
        try {
            let gstNo = '';
            let storeName = '';
            let storePhone = '';
            let shopLogoBase64 = '';
            let authorizedSign = '';
            let storeAddress = {};
            let panNo = '';
            let customerGstNo = order.customerGstNo ? order.customerGstNo : '';
            let isGstApplicable = true;
            let customMsg = '';
            const storeInfo = await db.collection('settings').doc('store').get();
            if (storeInfo.data()) {
                storeName = storeInfo.data().storeName;
                storePhone = storeInfo.data().storePhone;
                storeAddress = storeInfo.data().storeAddress ? storeInfo.data().storeAddress : {};
            }
            const invoiceData = await db.collection('settings').doc('invoice').get();

            if (invoiceData.data()) {
                storeName = 'gstFirmName' in invoiceData.data() && invoiceData.data().gstFirmName ? invoiceData.data().gstFirmName : storeInfo.data().storeName;
                shopLogoBase64 = invoiceData.data().shopLogo;
                authorizedSign = invoiceData.data().signature ? invoiceData.data().signature : '';
                customMsg = 'customMessage' in invoiceData.data() ? invoiceData.data().customMessage : '';
            }
            const paymentData = await db.collection('payment').doc('info').get();

            if (paymentData.data()) {
                gstNo = paymentData.data().gstNo;
                panNo = paymentData.data().panNo ? paymentData.data().panNo : '';
                isGstApplicable = typeof paymentData.data().isGstApplicable !== undefined ? paymentData.data().isGstApplicable : true;
                // const isInternationalUser = await checkIsInternationalUser(order.address);
                // if(isInternationalUser) {
                //     isGstApplicable = false;
                // }
            }

            var docDefinition = {
                content: [
                    getBillHeading(isGstApplicable),
                    {
                        columns: [
                            getShopLogo(shopLogoBase64),
                            getStoreInfo(storeName, gstNo, storePhone, storeAddress, panNo, isGstApplicable),
                        ],
                        columnGap: 20,
                    },
                    {
                        columns: [
                            getCustomerAddressInfo(order, 'shipping'),
                        ],
                        columnGap: 20
                    },
                    {
                        columns: [
                            getInvoiceInfo(order),
                            getPaymentInfo(order, customerGstNo),
                        ],
                    },
                    getProductTable(order, storeAddress, isGstApplicable),
                    getOrderPriceInfo(order, isGstApplicable),
                    //   {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 1 }], margin: [0, 30, 0, 0],},
                    getAuthorizedSign(storeName, authorizedSign)
                ],
                styles: {
                    header: {
                        fontSize: 13,
                        bold: true,
                        alignment: 'center',
                        color: '#000000'
                    },
                    tableHeader: {
                        fontSize: 9,
                        color: '#000000',
                        bold: true,
                        fillColor: 'lightgrey',
                    },
                    subHeadings: {
                        bold: true,
                        color: '#000000',
                    },
                    tableDesc: {
                        fontSize: 10
                    },
                    hsnCode: {
                        fontSize: 8
                    }
                },
                defaultStyle: {
                    fontSize: 10,
                    color: '#2e2e2e',
                    font: 'SakalBharati',
                    lineHeight: 0.5
                },
                pageMargins: [40, 3, 40, 40],
            }

            console.log('pdf gen starts');
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            console.log("pdf generated");
            pdfDocGenerator.getBase64(async (data) => {
                console.log("saving pdf");
                const res = await savePdf(data, order, bookingId);
                resolve(res);
            });
        } catch (error) {
            console.log(error);
            reject({
                status: 'not_generated'
            })
        }
    })
}

function getBillHeading(isGstApplicable) {
    let heading = {};
    if (isGstApplicable) {
        heading = {
            text: 'Tax Invoice/Bill of Supply/Cash Memo',
            style: 'header',
            margin: [0, 0, 0, 5]
        };
    } else {
        heading = {
            text: 'Invoice/Bill of Supply/Cash Memo',
            style: 'header',
            margin: [0, 0, 0, 5]
        };
    }

    return heading;
}

function getShopLogo(base64) {
    let logo = {};
    if (base64 !== '') {
        logo = {
            image: base64,
            width: 80,
            height: 70,
            alignment: 'left',
        }
    }
    return logo;
}

function getStoreInfo(name, gst, phone, storeAddress, panNo, isGstApplicable) {
    let storeInfo = {
        stack: [],
        alignment: 'right'
    };
    let tel_gst_pan_line = {
        text: []
    };
    if (name !== '') {
        storeInfo.stack.push({
            text: [{
                text: 'Service By: ',
                style: 'subHeadings'
            }, {
                text: name
            }]
        })
    }
    if (storeAddress.hasOwnProperty('address')) {
        storeInfo.stack.push({
            text: [{
                text: 'Store Address: ',
                style: 'subHeadings'
            }, {
                text: storeAddress.address
            }]
        });
    }
    if (phone !== '') {
        storeInfo.stack.push({
            text: [{
                text: 'Tel No: ',
                style: 'subHeadings'
            }, {
                text: phone
            }]
        })
    }
    if (gst !== '' && isGstApplicable && country && country.toLowerCase() === 'india') {
        tel_gst_pan_line.text.push({
            text: 'GSTIN: ',
            style: 'subHeadings'
        }, {
            text: gst
        });
    }
    if (panNo !== '') {
        tel_gst_pan_line.text.push({
            text: `, ${taxName}: `,
            style: 'subHeadings'
        }, {
            text: panNo
        });
    }
    storeInfo.stack.push(tel_gst_pan_line);
    return storeInfo;
}

function getCustomerAddressInfo(order, type) {
    if (order.user.address) {
        const address = order.user.address;
        let customerInfo = {
            width: '50%',
            stack: type === 'shipping' ? [{
                text: 'Shipping Address:',
                style: 'subHeadings'
            }] : [{
                text: 'Billing Address:',
                style: 'subHeadings'
            }],
            alignment: type === 'shipping' ? 'left' : 'right',
            margin: [0, 0, 0, 5]
        }
        customerInfo.stack.push(address.name);
        customerInfo.stack.push(`${address.address}, ${address.city}, ${address.state}, ${address.pincode}`);
        customerInfo.stack.push({
            text: [{
                    text: 'Tel No: ',
                    style: 'subHeadings'
                },
                {
                    text: address.phoneNo
                }
            ]
        });
        return customerInfo;
    }
}

function getInvoiceInfo(order) {
    let invoice = {
        width: '50%',
        stack: [{
                text: [{
                        text: 'Invoice No: ',
                        style: 'subHeadings'
                    },
                    {
                        text: orderIdPrefix + order.bookingId
                    }
                ]
            },
            {
                text: [{
                        text: 'Total Amount: ',
                        style: 'subHeadings'
                    },
                    {
                        text: `${currencySymbol}${numberFormatter(parseFloat(getTotalPrice(order)))}`
                    }
                ]
            }
        ],
        alignment: 'left'
    }
    return invoice;
}

function getPaymentInfo(order, customerGstNo) {
    const paymentObj = order.payment;
    const orderDate = order.createdAt;
    let payment = {
        width: '50%',
        stack: [{
            text: [{
                    text: 'Order Id: ',
                    style: 'subHeadings'
                },
                {
                    text: orderIdPrefix + order.bookingId
                }
            ]
        }],
        alignment: 'right'
    }
    if (orderDate) {
        console.log('orderDate', orderDate);
        payment.stack.push({
            text: [{
                    text: 'Placed On: ',
                    style: 'subHeadings'
                },
                {
                    text: moment(orderDate).tz(timeZone).format('DD/MM/YYYY')
                }
            ]
        })
    }
    if (customerGstNo && country && country.toLowerCase() === 'india') {
        payment.stack.push({
            text: [{
                    text: 'Customer GST No: ',
                    style: 'subHeadings'
                },
                {
                    text: customerGstNo
                }
            ]
        })
    }
    if (paymentObj.mode) {
        payment.stack.push({
            text: [{
                    text: 'Payment By: ',
                    style: 'subHeadings'
                },
                {
                    text: paymentObj.mode === 'custom' ? paymentObj.optionName : paymentObj.mode
                }
            ]
        })
    }
    if (order.payment.walletAmount) {
        payment.stack.push({
            text: [{
                    text: 'Wallet Amount Used: ',
                    style: 'subHeadings'
                },
                {
                    text: `${currencySymbol}${numberFormatter(order.payment.walletAmount)}`
                }
            ]
        })
    }
    return payment;

}

function getProductTable(order, storeAddress, isGstApplicable) {
    const product = order.item;
    const orderAddress = order.user.address || null;
    let shippingStateCode = orderAddress.stateCode ? orderAddress.stateCode : '';
    let storeStateCode = storeAddress.stateCode ? storeAddress.stateCode : '';
    let sameStates = false;
    let prodDoc = {
        alignment: 'center',
        margin: [0, 10, 0, 0],
        lineHeight: 0.8,
        fontSize: 9,
        table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: []
        },
    };
    let tableHeader = [{
            text: "S.No",
            style: 'tableHeader'
        },
        {
            text: 'Description',
            style: 'tableHeader'
        },
        {
            text: `MRP ${currencySymbol}`,
            style: 'tableHeader'
        },
        {
            text: `Unit Price ${currencySymbol}`,
            style: 'tableHeader'
        },
        {
            text: 'Qty',
            style: 'tableHeader'
        },
        {
            text: `Net Amount ${currencySymbol}`,
            style: 'tableHeader'
        }
    ]
    if (country && country.toLowerCase() === 'india') {
        if (shippingStateCode === storeStateCode && isGstApplicable) {
            sameStates = true;
            prodDoc.table.widths.push('auto');
            prodDoc.table.widths.push('auto');
            tableHeader.push({
                text: `CGST ${currencySymbol}`,
                style: 'tableHeader'
            }, {
                text: `SGST ${currencySymbol}`,
                style: 'tableHeader'
            });
        } else {
            if (isGstApplicable) {
                prodDoc.table.widths.push('auto');
                tableHeader.push({
                    text: `IGST ${currencySymbol}`,
                    style: 'tableHeader'
                });
            }
        }
    } else {
        if (isGstApplicable) {
            prodDoc.table.widths.push('auto');
            tableHeader.push({
                text: `${taxType} ${currencySymbol}`,
                style: 'tableHeader'
            });
        }
    }

    tableHeader.push({
        text: `Savings ${currencySymbol}`,
        style: 'tableHeader'
    }, )
    tableHeader.push({
        text: `Total Amount ${currencySymbol}`,
        style: 'tableHeader'
    }, )
    prodDoc.table.body.push(tableHeader);
    let qty = product.quantity || 1;
    let unitPrice = 0;
    let totalAmnt = 0;
    let mrpPrice = 0;
    let savings = 0;
    if (isGstApplicable) {

        unitPrice = product.gst.isExclusive === false ? ((product.price) - (product.gst.total / qty)) : (product.price);
        totalAmnt = parseFloat((product.price * qty));
        mrpPrice = product.mrpPrice || product.price;
        savings = (mrpPrice - product.price) * qty;
        totalAmnt = product.gst.isExclusive ? totalAmnt + (totalAmnt * product.gst.value / 100) : totalAmnt;

    } else {
        unitPrice = (product.price);
        totalAmnt = (product.price * qty);
        mrpPrice = product.mrpPrice || product.price;
        savings = (mrpPrice - product.price) * qty;
    }

    let netAmnt = (unitPrice * qty);
    let cgstAmnt = product.gst.total / 2;
    let sgstAmnt = product.gst.total / 2;
    let igstAmnt = product.gst.total;

    unitPrice = numberFormatter(unitPrice);
    totalAmnt = numberFormatter(totalAmnt);
    mrpPrice = numberFormatter(mrpPrice);
    savings = numberFormatter(savings);
    netAmnt = numberFormatter(netAmnt);
    cgstAmnt = numberFormatter(cgstAmnt);
    sgstAmnt = numberFormatter(sgstAmnt);
    igstAmnt = numberFormatter(igstAmnt);


    let prodRow = [];
    let pname = {
        stack: [{
            text: product.name,
            style: 'tableDesc'
        }]
    };
    if (product.hasOwnProperty('hsn') && product.hsn !== '') {
        pname.stack.push({
            text: [{
                text: '(HSN Code: '
            }, {
                text: `${product.hsn})`
            }],
            style: 'hsnCode'
        })
    }
    if (sameStates && country && country.toLowerCase() === 'india') {
        if (isGstApplicable) {
            prodRow = [1, pname, `${mrpPrice}`, `${unitPrice}`, qty, `${netAmnt}`, {
                text: [{
                    text: `${cgstAmnt}`
                }, {
                    text: ` (${product.gst.value / 2}%)`
                }]
            }, {
                text: [{
                    text: `${sgstAmnt}`
                }, {
                    text: ` (${product.gst.value / 2}%)`
                }]
            }, `${savings}`, `${totalAmnt}`];
        } else {
            prodRow = [1, pname, `${mrpPrice}`, `${unitPrice}`, qty, `${netAmnt}`, `${savings}`, `${totalAmnt}`];
        }
    } else {
        if (isGstApplicable) {
            prodRow = [1, pname, `${mrpPrice}`, `${unitPrice}`, qty, `${netAmnt}`, {
                text: [{
                    text: `${igstAmnt}`
                }, {
                    text: ` (${product.gst.value}%)`
                }]
            }, `${savings}`, `${totalAmnt}`];
        } else {
            prodRow = [1, pname, `${mrpPrice}`, `${unitPrice}`, qty, `${netAmnt}`, `${savings}`, `${totalAmnt}`];
        }
    }
    prodDoc.table.body.push(prodRow);
    return prodDoc;

}

function getOrderPriceInfo(order, isGstApplicable) {
    let totalGst = getTotalGst(order);
    let totalAmountToPaid = parseFloat((getTotalPrice(order) - (order.payment.cashbackAmount || 0)));

    let priceInfo = {
        alignment: 'center',
        margin: [0, 10, 0, 0],
        lineHeight: 0.8,
        fontSize: 9,
        table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: []
        },
    };
    let tableHeader = [{
        text: `Total ${currencySymbol}`,
        style: 'tableHeader'
    }];
    let pricesRow = [`${numberFormatter(getTotalPrice(order) - totalGst)}`];

    if (order.payment.extraChargeOnPayment.charge) {
        priceInfo.table.widths.push('*');
        tableHeader.push({
            text: `${(order.payment.extraChargeOnPayment.name || 'Payment Gateway Charge')} ${currencySymbol}`,
            style: 'tableHeader'
        });
        pricesRow.push(`${numberFormatter(order.payment.extraChargeOnPayment.charge)}`);
    }
    if (isGstApplicable) {
        priceInfo.table.widths.push('*');
        tableHeader.push({
            text: `Total Tax ${currencySymbol}`,
            style: 'tableHeader'
        });
        pricesRow.push(`${numberFormatter(totalGst)}`);
    }
    if (order.payment.cashbackAmount) {
        priceInfo.table.widths.push('*');
        tableHeader.push({
            text: `Cashback Used ${currencySymbol}`,
            style: 'tableHeader'
        });
        pricesRow.push(`${numberFormatter(order.payment.cashbackAmount)}`);
    }
    tableHeader.push({
        text: `Grand Total ${currencySymbol}`,
        style: 'tableHeader'
    });
    pricesRow.push(`${numberFormatter(totalAmountToPaid)}`);
    priceInfo.table.body.push(tableHeader);
    priceInfo.table.body.push(pricesRow);

    return priceInfo;

}

function getAuthorizedSign(name, sign) {
    let authSignInfo = {
        alignment: 'right',
        stack: [],
        margin: [0, 10, 0, 0]
    }
    if (name && sign) {
        authSignInfo.stack.push({
            text: 'For ' + name + ' ' + ':',
            style: 'subHeadings',
            margin: [0, 0, 0, 10]
        });
        let authSign = {
            image: sign,
            width: 80,
            height: 70,
        }
        authSignInfo.stack.push(authSign);
        authSignInfo.stack.push({
            text: 'Authorized Signature',
            style: 'subHeadings'
        });
    }

    return authSignInfo;
}



async function savePdf(data, order, bookingId) {
    return new Promise(async (resolve, reject) => {
        try {
            var base64EncodedPdfString = data,
                mimeType = 'application/pdf',
                fileName = orderIdPrefix + order.bookingId + '.pdf',
                pdfBuffer = new Buffer(base64EncodedPdfString, 'base64');

            var file = bucket.file('booking-invoices/' + fileName);

            file.save(pdfBuffer, {
                metadata: {
                    contentType: mimeType
                },
            });
            const config = {
                action: 'read',
                expires: '03-01-2500'
            };
            console.log("file saved");
            let downloadUrl = await file.getSignedUrl(config);
            const invoice = {
                status: 'generated',
                url: downloadUrl[0]
            };
            await db.collection('bookings').doc(bookingId).update({
                invoice
            });
            resolve(invoice);
        } catch (error) {
            console.log(error);
            reject({
                status: 'not_generated'
            });
        }

    });
}

function numberFormatter(number) {
    number = parseFloat(number);
    return fmt.formatFixed(number, 2);
}

function getTotalPrice(order) {
    return order.item.price + order.payment.extraChargeOnPayment.charge;
}

function getTotalGst(order) {
    return order.item.totalGst + order.payment.extraChargeOnPayment.gst;
}