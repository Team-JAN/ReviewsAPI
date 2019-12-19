const Client = require('pg-native');

process.env.PGDATABASE = 'sdctest';
const client = new Client({
    user: 'alexanderho'
});

client.connectSync();

module.exports = client;
