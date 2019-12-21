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
    //post review, await response with review_id
    const review_id = await models.insertReview(productId, review);
    //post photos to reviews_photos with review_id
    const photos = models.insertPhotos(review_id, review.photos);
    //post characteristics to characteristics_reviews with review_id
    const characteristics = models.insertCharacteristics(review_id, review.characteristics);
    return Promise.all([photos, characteristics])
        .catch(e => console.log('insertion failed: ' + e));
}