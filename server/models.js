const db = require('../db/index.js');

module.exports.getReviews = (productId, page, count) => {
    const offset = page * count;
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM reviews WHERE (product_id = $1 AND reported = false) ORDER BY helpfulness DESC OFFSET ($2) LIMIT $3', [productId, offset, count])
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
        let ratings = {};
        for (let i = 1; i < 6; i ++) {
            ratings[i] = parseInt(res[i - 1].rows[0].count);
        }
        return ratings;
    });
}

module.exports.getCharacteristicsNames = async (productId) => {
    const characteristics = await db.query('SELECT id, name FROM characteristics WHERE (product_id = $1)', [productId]);
    return characteristics;
}

module.exports.getCharacteristics = async (productId) => {
    let characteristics = {};
    const charQuery = await module.exports.getCharacteristicsNames(productId);
    let charValues = [];
    for (let i = 0; i < charQuery.rows.length; i ++) {
        const char = charQuery.rows[i];
        characteristics[char.name] = {id: char.id};
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

module.exports.insertReview = async (productId, review) => {
    const params = [productId, review.rating, new Date(), review.summary, review.body, review.recommend, false, review.name, review.email, '', 0]
    const queryStr = 'INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id';
    const insert = await db.query(queryStr, params);
    return insert.rows[0].id;
}
   
module.exports.insertPhotos = async (reviewId, photos) => {
    const insertions = [];
    const queryStr = 'INSERT INTO reviews_photos (review_id, url) VALUES ($1, $2)';
    for (let i = 0; i < photos.length; i ++) {
        insertions.push(await db.query(queryStr, [reviewId, photos[i]]))
    }
    return Promise.all(insertions).catch(e => console.log('photos insertion error: ' + e));
}

module.exports.insertCharacteristics = async (reviewId, characteristics) => {
    const insertions = [];
    const queryStr = 'INSERT INTO characteristics_reviews (characteristic_id, review_id, value) VALUES ($1, $2, $3)';
    for (let key in characteristics) {
        insertions.push(db.query(queryStr, [key, reviewId, characteristics[key]]));
    }
    return Promise.all(insertions).catch(e => console.log('characteristics insertion error: ' + e));
}

//TODO: Figure out a better way to escape the params in the query --> SQL injection vunerability
module.exports.putReviews = async (reviewId, col, newVal) => {
    const Q = await db.query(`UPDATE reviews SET ${col} = ${newVal} WHERE id = ${reviewId}`);
    return Q;
}

module.exports.delete = async (table, col, val) => {
    const D = await db.query(`DELETE FROM ${table} WHERE ${col} = ${val}`);
    return D;
}