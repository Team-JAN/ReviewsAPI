const db = require('../db/index.js');

module.exports.getReviews = productId => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM reviews WHERE (product_id = $1) LIMIT 5', [productId])
            .then(res => resolve(res.rows))
            .catch(e => reject(e));
    });
}

module.exports.getPhotos = reviewId => {
    return new Promise((resolve, reject) => {
        db.query('SELECT url, id FROM reviews_photos WHERE (review_id = $1)', [reviewId])
            .then(res => resolve(res.rows))
            .catch(e => reject(e));
    });
}

module.exports.countRecommended = async (productId) => {
    const recommended = await db.query('SELECT COUNT (*) FROM reviews WHERE (product_id = $1 AND recommend = true)', [productId]);
    return recommended.rows[0].count;
}

module.exports.countRatings = async (productId) => {
    let promises = [];
    for (let i = 1; i < 6; i ++) {
        promises.push(await db.query('SELECT COUNT (*) FROM reviews WHERE (product_id = $1 AND rating = $2)', [productId, i]));
    }
    return Promise.all(promises).then((res) => {
        let ratings = {}
        for (let i = 1; i < 6; i ++) {
            ratings[i] = res[i - 1].rows[0].count;
        }
        return ratings;
    });
}

module.exports.getCharacteristicsNames = async (productId) => {
    let characteristics = {}
    const charQuery = await db.query('SELECT id, name FROM characteristics WHERE (product_id = $1)', [productId]);
    charQuery.rows.forEach(char => {
        characteristics[char.name] = {id : char.ids};
    })
    return characteristics; 
}