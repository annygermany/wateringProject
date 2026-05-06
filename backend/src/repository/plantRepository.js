const db = require('../config/db');

async function getAllPlants() {
    const result = await db.query('SELECT * FROM plants');
    return result.rows;
}

async function createPlant(name, threshold) {
    const result = await db.query(
        'INSERT INTO plants (name, moisture_threshold) VALUES ($1, $2) RETURNING *',
        [name, threshold]
    );
    return result.rows[0];
}

module.exports = {
    getAllPlants,
    createPlant
};