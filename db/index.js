const { Client } = require('pg');
const ClientSync = require('pg-native');

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

const clientSync = new ClientSync({
    user: 'alexanderho'
});

clientSync.connectSync();

module.exports.db = client;
module.exports.dbSync = clientSync;

