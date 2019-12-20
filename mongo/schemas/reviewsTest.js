const db = require('../db/dbTest.js');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const reviewsSchema = new Schema ({
    product_id: { type: Number, required: true },
    rating: { type: Number, min: 1, max: 5 },
    date: { type: Date, required: true },
    summary: { type: String, required: true, maxlength: 200 },
    body: { type: String, required: true, maxlength: 1000 },
    recommend: { type: Boolean, required: true },
    reported: { type: Boolean, required: true },
    reviewer_name: { type: String, maxlength: 60 },
    reviewer_email: { type: String, maxlength: 60 },
    response: String,
    helpfulness: { type: Number, required: true }
});
reviewsSchema.plugin(AutoIncrement, {inc_field: 'id'})

// var Kitten = mongoose.model('Kitten', kittySchema);
const Review = mongoose.model('Review', reviewsSchema);
new Review().save();    

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
