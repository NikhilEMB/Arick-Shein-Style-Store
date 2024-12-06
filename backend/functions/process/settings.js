const functions = require( "firebase-functions" );
var moment = require( 'moment-timezone' );
const {
    db,
    timeZone
} = require( './admin' );

exports.onCreateManageSlot = functions.firestore.document( "features/delivery/manageSlots/{date}" ).onCreate( async ( snap, context ) => {
    const today = moment().tz( timeZone );
    const slotRef = db.collection( 'features' ).doc( 'delivery' ).collection( 'manageSlots' );
    const slots = await slotRef.get();
    slots.forEach( async ( doc ) => {
        if ( doc && doc.id ) {
            const docDate = new Date( doc.id );
            const diff = moment( docDate ).diff( moment( today ), 'days' );
            if ( diff < 0 ) {
                await slotRef.doc( doc.id ).delete();
            }
        }
    } );
} );

exports.forceUpdateVariation = functions.firestore.document( "settings/{app}" ).onUpdate( async ( change, context ) => {
    let afterAppData = change.after.data()
    let beforeAppData = change.before.data()
    // if ( afterAppData.forceUpdate === true && ( afterAppData.appVersion !== beforeAppData.appVersion ) ) {
    if ( afterAppData.forceUpdate === true ) {
        console.log( 'Force App Update : ', afterAppData.forceUpdate )
        await db.collection( 'settings' ).doc( 'app' ).collection( 'forceUpdateHistory' ).add( {
            createdAt: new Date( moment().tz( timeZone ) ),
            appVersion: afterAppData.appVersion
        } )
    }
} )

