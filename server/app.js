require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller.js');
const cors = require('cors');

const corsOptions  = {
    origin: '*',
    methods: 'GET,POST,PUT',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//cors policy
app.use(cors(corsOptions));

let port = process.env.PORT || 8080;

app.get('/reviews/:product_id/list', (req, res) => {
    controller.listReviews(req.params.product_id, req.query.page, req.query.count, req.query.sort)
        .then(reviews => res.send(reviews))
        .catch(e => {
            console.log('Could not GET reviews: ' + e);
            res.sendStatus(404);
        });
});

app.get('/reviews/:product_id/meta', (req, res) => {
    controller.getMeta(req.params.product_id)
        .then(meta => res.send(meta))
        .catch(e => {
            console.log('Could not GET reviews meta: ' + e);
            res.sendStatus(404);
        });
});

app.post('/reviews/:product_id', (req, res) => {
    controller.postReview(req.params.product_id, req.body)
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log('Could not POST review: ' + e);
            res.sendStatus(400);
        });
});

app.put('/reviews/helpful/:review_id', (req, res) => {
    controller.putHelpful(req.params.review_id)
        .then(() => res.sendStatus(202))
        .catch(e => {
            console.log('helpful not PUT: ' + e);
            res.sendStatus(400);
        });
});

app.put('/reviews/report/:review_id', (req, res) => {
    controller.putReported(req.params.review_id)
        .then(() => res.sendStatus(202))
        .catch(e => {
            console.log('reported not PUT: ' + e);
            res.sendStatus(400);
        });
});

app.delete('/reviews/delete/:review_id', (req, res) => {
    controller.deleteReview(req.params.review_id)
        .then(() => res.sendStatus(202))
        .catch(e => {
            console.log('Could not DELETE review: ' + e);
            res.sendStatus(400);
        });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});