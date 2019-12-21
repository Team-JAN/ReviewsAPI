const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

let port = process.env.PORT || 8080;

app.get('/reviews/:product_id/list', (req, res) => {
    controller.listReviews(req.params.product_id, req.query.page, req.query.count)
        .then(reviews => res.send(reviews))
        .catch(e => {
            console.log('zoinks!' + e);
            res.sendStatus(400);
        });
});

app.get('/reviews/:product_id/meta', (req, res) => {
    controller.getMeta(req.params.product_id)
        .then(meta => res.send(meta))
        .catch(e => {
            console.log('zoinks!' + e);
            res.sendStatus(400);
        });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});