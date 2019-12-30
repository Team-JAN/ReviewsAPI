const models = require('./models.js');

//TODO: Rewrite with async/await
module.exports.listReviews = (productId, page=0, count=5) => {
    let reviews = { 
        product: productId,
        page: parseInt(page),
        count: parseInt(count)
    };
    return new Promise((resolve, reject) => {
        models.getReviews(productId, page, count)
            .then(dbRes => {
                reviews.results = dbRes;
                let photos = [];
                reviews.results.forEach(review => {
                    review.review_id = review.id;
                    delete review.id;
                    photos.push(models.getPhotos(review.review_id));
                });
                Promise.all(photos).then(photosRes => {
                    for (let i = 0; i < reviews.length; i ++) {
                        reviews.results[i].photos = photosRes[i];
                    }
                    resolve(reviews);
                })
            })
            .catch(e => reject('zoinks!' + e));
    });
}

module.exports.getMeta = async (productId) => {
    const recommended = models.countRecommended(productId);
    const ratings = models.countRatings(productId);
    const characteristics = models.getCharacteristics(productId);
    return Promise.all([recommended, ratings, characteristics]).then(res => {
        const meta = {
            product_id: productId,
            recommended: res[0],
            ratings: res[1],
            characteristics: res[2]
        };
        return meta;
    })
}

module.exports.postReview = async (productId, review) => {
    const review_id = await models.insertReview(productId, review);
    const photos = models.insertPhotos(review_id, review.photos);
    const characteristics = models.insertCharacteristics(review_id, review.characteristics);
    return Promise.all([photos, characteristics])
        .catch(e => console.log('insertion failed: ' + e));
}

module.exports.putHelpful = async (reviewId) => {
    const helpful = await models.putReviews(reviewId, 'helpfulness', 'helpfulness + 1');
    return helpful;
}

module.exports.putReported = async (reviewId) => {
    const reported = await models.putReviews(reviewId, 'reported', 'true');
    return reported;
}

module.exports.deleteReview = (reviewId) => {
    const photos = models.delete('reviews_photos', 'review_id', reviewId);
    const characteristics = models.delete('characteristics_reviews', 'review_id', reviewId);
    return Promise.all([photos, characteristics])
        .then(() => {
            return models.delete('reviews', 'id', reviewId);
        })
        .catch(e => {
            console.log('Deletion failed: ' + e);
        });
}

