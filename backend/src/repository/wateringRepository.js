const db = require('../config/db');
//DB Queries

async function getAllWateringEvents() {
    const result = await db.query('SELECT * FROM watering_events');
    return result.rows;
}

// Neues Event speichern
async function createWateringEvent(plant_id, triggered_by) {
    const result = await db.query(
        `INSERT INTO watering_events (plant_id, triggered_by)
         VALUES ($1, $2)
         RETURNING *`,
        [plant_id, triggered_by]
    );

    return result.rows[0];
}

// Letzte Bewässerung einer Pflanze
async function getLastWatering(plant_id) {
    const result = await db.query(
        `SELECT * FROM watering_events
         WHERE plant_id = $1
         ORDER BY created_at DESC
         LIMIT 1`,
        [plant_id]
    );

    return result.rows[0];
}

module.exports = {
    getAllWateringEvents,
    getLastWatering,
    createWateringEvent
};