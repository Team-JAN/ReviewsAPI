const models = require('./models.js');

//TODO: Rewrite with async/await
module.exports.listReviews = (productId, page=0, count=5, sort='helpful') => {
    let reviews = { 
        product: productId,
        page: parseInt(page),
        count: parseInt(count), 
    };
    return new Promise((resolve, reject) => {
        models.getReviews(productId, page, count, sort)
            .then(dbRes => {
                reviews.results = dbRes;
                let photos = [];
                reviews.results.forEach(review => {
                    review.review_id = review.id;
                    delete review.id;
                    photos.push(models.getPhotos(review.review_id));
                });
                Promise.all(photos).then(photosRes => {
                    for (let i = 0; i < reviews.results.length; i ++) {
                        reviews.results[i].photos = photosRes[i];
                    }
                    resolve(reviews);
                })
            })
            .catch(e => reject('zoinks!' + e));
    });
}

module.exports.listReviewsAsync = async (productId, page=0, count=5, sort='helpful') => {
    try {
        const reviews = { 
            product: productId,
            page: parseInt(page),
            count: parseInt(count), 
        };

        const reviewsQuery = await models.getReviews(productId, page, count, sort);
        reviews.results = reviewsQuery;
        const photosQueries = [];

        reviews.results.forEach(review => {
            review.review_id = review.id;
            delete review.id;
            photosQueries.push(models.getPhotos(review.review_id));
        });

        await Promise.all(photosQueries).then(photosRes => {
            for (let i = 0; i < photosRes.length; i ++) {
                reviews.results[i].photos = photosRes[i];
            }
        });
        
        return reviews;
    } catch (e) {
        console.log('zoinks!' + e)
        throw 'Error getting reviews :(';
    }
}

module.exports.getMeta = (productId) => {
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

