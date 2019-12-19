const db = require('../db/testDb.js');
const generateReview = require('./generateReview.js');

const insertions = [];

for (let i = 0; i < 10; i ++) {
    const review = generateReview();
    const queryStr = 'INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
    insertions.push(db.query(queryStr, review));
}

Promise.all(insertions)
    .then(() => {
        console.log('success yo');
        db.end();
    })
    .catch((e) => {
        console.log(`ruh roh ${e}`);
        db.end();
    });

//Reviews Schema
// id serial PRIMARY KEY,
// product_id INT NOT NULL, //Between 1 and 4
// rating SMALLINT NOT NULL, //Between 1 and 5
// date DATE NOT NULL, //
// summary VARCHAR(60) NOT NULL,
// body VARCHAR(1000),
// recommend BOOLEAN NOT NULL,
// reported BOOLEAN NOT NULL,
// reviewer_name VARCHAR(60) NOT NULL,
// reviewer_email VARCHAR(60) NOT NULL,
// response VARCHAR(1000),
// helpfulness SMALLINT NOT NULL