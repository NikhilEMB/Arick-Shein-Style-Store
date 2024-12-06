const functions = require( "firebase-functions" );
var moment = require( 'moment-timezone' );
const axios = require( 'axios' ).default;
const {
    db,
    timeZone,
    projectId,
    middleware
} = require( './admin' );

exports.addNewProductToZohoInventory = functions.firestore.document( 'products/{productId}' ).onCreate( async ( snap, context ) => {
    try {
        const productData = snap.data()
        const productDocId = context.params.userId
        productData[ 'productDocId' ] = productDocId
        let apiBody = {
            projectId: projectId,
            product: productData
        }
        axios.post( middleware.apiUrl + '/zohoInventoryProducts-addNewProductToZohoInventory', apiBody )
            .then( response => {
                console.log( 'Success response : ', response.data )
            } )
            .catch( error => {
                console.log( 'Error in addNewProductToZohoInventory IC : ', error )
            } )
    } catch ( error ) {
        console.log( 'Error in addNewProductToZohoInventory OC : ', error )
    }
} )

exports.updateExistingProductToZohoInventory = functions.firestore.document( 'products/{productId}' ).onUpdate( async ( change, context ) => {
    try {
        let changeAssets = [], apiBody = {}
        const beforeProductData = change.before.data()
        const afterProductData = change.after.data()
        const productDocId = context.params.productId
        afterProductData[ 'productDocId' ] = productDocId
        if (afterProductData.isPriceList && afterProductData.priceList.length) {
            // *** main product name change
            if (afterProductData.prodName !== beforeProductData.prodName) {
                changeAssets.push({
                    key: 'mainName',
                    value: afterProductData.prodName
                })
            }
            // *** main product SKU change
            if (afterProductData.productCode !== beforeProductData.productCode) {
                changeAssets.push({
                    key: 'mainSKU',
                    value: afterProductData.productCode
                })
            }
            // *** variant SKU change
            for (let i = 0; i < afterProductData.priceList.length; i++) {
                if (afterProductData.priceList[i].sku !== beforeProductData.priceList[i].sku) {
                    changeAssets.push({
                        key: 'varSKU',
                        value: { after: afterProductData.priceList[i], before: beforeProductData.priceList[i] , productCode: afterProductData.productCode }
                    })
                }
            }
            // *** variant name change
            for (let i = 0; i < afterProductData.priceList.length; i++) {
                if (afterProductData.priceList[i].weight !== beforeProductData.priceList[i].weight) {
                    changeAssets.push({
                        key: 'varName',
                        value: { after: afterProductData.priceList[i], before: beforeProductData.priceList[i] , productCode: afterProductData.productCode }
                    })
                }
            }
            // *** variant price change
            for (let i = 0; i < afterProductData.priceList.length; i++) {
                if (afterProductData.priceList[i].price !== beforeProductData.priceList[i].price) {
                    changeAssets.push({
                        key: 'varPrice',
                        value: { after: afterProductData.priceList[i], before: beforeProductData.priceList[i] , productCode: afterProductData.productCode }
                    })
                }
            }
            // *** variant purchase price change
            for (let i = 0; i < afterProductData.priceList.length; i++) {
                if (afterProductData.priceList[i].purchasePrice !== beforeProductData.priceList[i].purchasePrice) {
                    changeAssets.push({
                        key: 'varPurchasePrice',
                        value: { after: afterProductData.priceList[i], before: beforeProductData.priceList[i] , productCode: afterProductData.productCode }
                    })
                }
            }
            // *** variant qty change
            for (let i = 0; i < afterProductData.priceList.length; i++) {
                if (afterProductData.priceList[i].totalQuantity !== beforeProductData.priceList[i].totalQuantity) {
                    changeAssets.push({
                        key: 'varQuantity',
                        value: { after: afterProductData.priceList[i], before: beforeProductData.priceList[i] , productCode: afterProductData.productCode }
                    })
                }
            }
            apiBody = {
                projectId: projectId,
                product: afterProductData,
                changeAssets
            }   
        } else {
            apiBody = {
                projectId: projectId,
                product: afterProductData
            }
        }
        axios.post( middleware.apiUrl + '/zohoInventoryProducts-updateProductOnZohoInventory', apiBody )
            .then( response => {
                console.log( 'Success response : ', response.data )
            } )
            .catch( error => {
                console.log( 'Error in updateExistingProductToZohoInventory IC : ', error )
            } )
    } catch ( error ) {
        console.log( 'Error in updateExistingProductToZohoInventory OC : ', error )
    }
} )

exports.deleteProductOnZohoInventory = functions.firestore.document( 'products/{productId}' ).onDelete( async ( snap, context ) => {
    try {
        const productData = snap.data()
        const productDocId = context.params.productId
        productData[ 'productDocId' ] = productDocId
        let apiBody = {
            projectId: projectId,
            product: productData
        }
        axios.post( middleware.apiUrl + '/zohoInventoryProducts-deleteProductOnZohoInventory', apiBody )
            .then( response => {
                console.log( 'Success response : ', response.data )
            } )
            .catch( error => {
                console.log( 'Error in deleteProductOnZohoInventory IC : ', error )
            } )
    } catch ( error ) {
        console.log( 'Error in deleteProductOnZohoInventory OC : ', error )
    }
} )

exports.addExistingProductsToZohoInventory = functions.https.onCall( async ( data, context ) => {
    try {
        const zohoIntegrationDoc = await db.collection( 'integrations' ).doc( 'inventoryManagement' ).collection( 'list' ).doc( 'zohoInventory' ).get()
        const zohoIntegrationData = zohoIntegrationDoc.data()
        if ( zohoIntegrationData.initProdSync === true ) {
            let productsData = [], callData = data
            const productRef = await db.collection( 'products' ).get()
            if ( productRef.empty ) {
                console.log( 'No Product found in project : ', projectId )
            } else {
                productRef.forEach( async ( product ) => {
                    let productData = { ...product.data(), productDocId: product.id }
                    productsData.push( productData )
                } )
            }
            let apiBody = {
                projectId: projectId,
                products: productsData
            }
            if ( productsData.length ) {
                axios.post( middleware.apiUrl + '/zohoInventoryProducts-addExistingProductsToZohoInventory', apiBody )
                    .then( response => {
                        console.log( 'Success response : ', response.data )
                    } )
                    .catch( error => {
                        console.log( 'Error in addExistingProductsToZohoInventory IC : ', error )
                    } )
            }
        } else {
            console.log( 'ZohoIntegrationData initProdSync disabled!' )
        }
    } catch ( error ) {
        console.log( 'Error in addExistingProductsToZohoInventory OC : ', error )
    }
} )