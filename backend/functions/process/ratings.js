const functions = require("firebase-functions");

const {
    db
} = require('./admin');

exports.onUpdateRating = functions.firestore.document('products/{productId}/ratings/{userId}').onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    const productId = context.params.productId;
    
    if(previousData.status === 'pending' && newData.status === 'approved') {
        const ratingRef = db.collection('products').doc(productId);
        await db.runTransaction(t => {
            return t.get(ratingRef)
                .then(async (doc) => {
                    if(doc && doc.data()) {
                        const ratingData = doc.data().rating;
                        let totalRatings = ratingData && ratingData.totalRatings ? ratingData.totalRatings : 0;
                        let totalOne = ratingData && ratingData.totalOne ? ratingData.totalOne : 0;
                        let totalTwo = ratingData && ratingData.totalTwo ? ratingData.totalTwo : 0;
                        let totalThree = ratingData && ratingData.totalThree ? ratingData.totalThree : 0;
                        let totalFour = ratingData && ratingData.totalFour ? ratingData.totalFour : 0;
                        let totalFive = ratingData && ratingData.totalFive ? ratingData.totalFive : 0;
                        let avgRating = ratingData && ratingData.avgRating ? ratingData.avgRating : 0;
    
                        totalRatings += 1
                        if (newData.rating === 1) {
                            totalOne += 1;
                        } else if(newData.rating === 2) {
                            totalTwo += 1;
                        } else if(newData.rating === 3) {
                            totalThree += 1;
                        } else if(newData.rating === 4) {
                            totalFour += 1;
                        } else {
                            totalFive += 1;
                        }
                        avgRating = parseFloat(((5*totalFive + 4*totalFour + 3*totalThree + 2*totalTwo + 1*totalOne) / totalRatings).toFixed(1));
                        t.update(ratingRef, {
                            rating: {
                                totalRatings: totalRatings,
                                totalFive: totalFive,
                                totalFour: totalFour,
                                totalThree: totalThree,
                                totalTwo: totalTwo,
                                totalOne: totalOne,
                                avgRating: avgRating
                            }
                        });
                    }
                    
                });
        });
    }
});

exports.onCreateRating = functions.firestore.document('products/{productId}/ratings/{userId}').onCreate(async (snap, context) => {
    const productId = context.params.productId;
    const product = await db.collection('products').doc(productId).get();
    if(product && product.data() && !('rating' in product.data())) {
        await db.collection('products').doc(productId).update({
            rating: {}
        });
    }
});