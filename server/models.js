const db = require('../db/index.js');

module.exports.getReviews = (productId, page, count) => {
    const offset = page * count;
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM reviews WHERE (product_id = $1) OFFSET ($2) LIMIT $3', [productId, offset, count])
            .then(res => resolve(res.rows))
            .catch(e => reject(`couldn't get reviews ${e}`));
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
    let recommended = {};
    const recQ = await db.query('SELECT recommend, COUNT (*) FROM reviews WHERE (product_id = $1) GROUP BY recommend', [productId]);
    recQ.rows.forEach(res => {
        if (res.recommend === false) {
            recommended['0'] = parseInt(res.count);
        } else {
            recommended['1'] = parseInt(res.count);
        }
    });
    return recommended;
}

module.exports.countRatings = async (productId) => {
    let promises = [];
    for (let i = 1; i < 6; i ++) {
        promises.push(await db.query('SELECT COUNT (*) FROM reviews WHERE (product_id = $1 AND rating = $2)', [productId, i]));
    }
    return Promise.all(promises).then((res) => {
        let ratings = {}
        for (let i = 1; i < 6; i ++) {
            ratings[i] = parseInt(res[i - 1].rows[0].count);
        }
        return ratings;
    });
}

module.exports.getCharacteristics = async (productId) => {
    let characteristics = {}
    const charQuery = await db.query('SELECT id, name FROM characteristics WHERE (product_id = $1)', [productId]);
    let charValues = [];
    for (let i = 0; i < charQuery.rows.length; i ++) {
        const char = charQuery.rows[i];
        characteristics[char.name] = {id: char.id}
        const q = await db.query('SELECT ROUND(AVG(value), 4) FROM characteristics_reviews WHERE (characteristic_id = $1)', [char.id]);
        charValues.push(q);
        characteristics[char.name].value = q;
    }
    return Promise.all(charValues).then(() => {
        for (let char in characteristics) {
            characteristics[char].value = characteristics[char].value.rows[0].round;
        }
        return characteristics;
    });
}

