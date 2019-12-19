const Client = require('pg-native');

process.env.PGDATABASE = 'sdc';
const client = new Client({
    user: 'alexanderho'
});

client.connectSync();

module.exports = client;

