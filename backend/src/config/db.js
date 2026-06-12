// Schritt 1: datenbank definieren

const{Pool} = require('pg');
const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'plant_monitor',
    password: '',
    port: 5432
});

module.exports = pool;