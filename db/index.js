const { Client } = require('pg');

process.env.PGDATABASE = 'sdc';
const client = new Client({
    user: 'alexanderho'
});

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log(`connected`);
    }
});

module.exports = client;

