const { dbSync } = require('../db/index.js');
const generateReview = require('./generateReview.js');

for (let i = 0; i < 10000000; i ++) {
    if (i % 1000000 === 0) {
        console.log(`loading data ${i / 1000000}% complete...`)
    }
    const review = generateReview();
    const queryStr = 'INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
    dbSync.querySync(queryStr, review);
}

console.log('complete');
dbSync.end();