const db = require('../config/db');
//DB Queries

async function getAllMeasurements() {
    const result = await db.query('SELECT * FROM measurements');
    return result.rows;
}

// Neuen Feuchtigkeits Messwert speichern
async function addMeasurement(plant_id, moisture) {
    const result = await db.query(
        `INSERT INTO measurements (plant_id, moisture)
         VALUES ($1, $2)
         RETURNING *`,
        [plant_id, moisture]
    );

    return result.rows[0];
}

// Letzte Feuchtigkeitsmessung einer Pflanze
async function getLastMeasurement(plant_id) {
    const result = await db.query(
        `SELECT * FROM measurements
         WHERE plant_id = $1
         ORDER BY created_at DESC
         LIMIT 1`,
        [plant_id]
    );

    return result.rows[0];
}

module.exports = {
    getAllMeasurements,
    addMeasurement,
    getLastMeasurement
};