// Schritt 2: Datenbankabrufe definieren

const db = require('../config/db');

async function addMeasurement(plant_id, moisture) {
    console.log("addmeasurement()");

    const result = await db.query(
        `INSERT INTO measurements (plant_id,moisture)
         VALUES ($1,$2)
         RETURNING *`,
        [plant_id, moisture]
    );


    return result.rows[0];
}

async function getAllMeasurements() {
    const result = await db.query(
        `SELECT *
         FROM measurements
         ORDER BY created_at DESC`
    );

    return result.rows;
}

module.exports = {
    addMeasurement,
    getAllMeasurements
};