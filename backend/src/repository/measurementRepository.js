// Schritt 2: Datenbankabrufe definieren

const db = require('../config/db');

async function addMeasurement(moisture) {
    console.log("addmeasurement()");
    const result = await db.query(
        `INSERT INTO measurements (moisture)
         VALUES ($1)
         RETURNING *`,
        [moisture]
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