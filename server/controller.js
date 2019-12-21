const models = require('./models.js');

module.exports.listReviews = productId => {
    let reviews = { product: productId };
    return new Promise((resolve, reject) => {
        models.getReviews(productId)
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
            .catch(e => reject('zoinks!'));
    });
}

module.exports.getMeta = async (productId) => {
    const recommended = models.countRecommended(productId);
    const ratings = models.countRatings(productId);
    //Get Characteristics
    const characteristics = models.getCharacteristicsNames(productId);
    return Promise.all([recommended, ratings, characteristics]).then(res => {
        const meta = {
            recommended: res[0],
            ratings: res[1],
            characteristics: res[2]
        };
        return meta;
    })
}