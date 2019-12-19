const { dbSync } = require('../db/testDb.js');
const generateReview = require('./generateReview.js');

for (let i = 0; i < 10; i ++) {
    const review = generateReview();
    const queryStr = 'INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
    dbSync.querySync(queryStr, review);
}

console.log('complete');
dbSync.end();

// const insert = async () => {
//     const review = generateReview();
//     const queryStr = 'INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
//     try {
//         const q = await db.query(queryStr, review);
//     } catch (e) {
//         console.log('ruh roh' + e);
//         db.end();
//     }
// }

// for (let i = 0; i < 10; i ++) {
//     insert();
// }

// console.log('success');
// db.end();

// Promise.all(insertions)
//     .then(() => {
//         console.log('success yo');
//         db.end();
//     })
//     .catch((e) => {
//         console.log(`ruh roh ${e}`);
//         db.end();
//     });

