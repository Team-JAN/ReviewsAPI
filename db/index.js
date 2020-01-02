const { Client, Pool } = require('pg');

process.env.PGDATABASE = 'sdc';
const client = new Pool({
    user: 'alexanderho'
});

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log(`we connected!`);
    }
});

module.exports = client;

