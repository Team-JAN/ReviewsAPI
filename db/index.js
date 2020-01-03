const { Client, Pool } = require('pg');

process.env.PGDATABASE = 'sdc';
const client = new Pool({
    user: 'power_user',
    password: 'FILLMEIN'
});

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log(`we connected!`);
    }
});

module.exports = client;

