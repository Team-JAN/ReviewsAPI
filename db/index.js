const { Client, Pool } = require('pg');

// process.env.PGDATABASE = 'sdc';
// process.env.PGHOST = '3.19.60.115'
const client = new Pool({
    user: 'power_user',
    password: 'FILL ME IN',
    host: '13.58.220.221',
    database: 'sdc'
});

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log(`we connected!`);
    }
});

module.exports = client;

