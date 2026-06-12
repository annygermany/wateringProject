// Schritt 1: datenbank definieren

const{Pool} = require('pg');
const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'plantdb',
    password: '12345678',
    port:  5432
});

module.exports = pool;