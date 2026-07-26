const pool = require("../config/db");

async function addWatering(plantId, durationSeconds) {
    const query = `
        INSERT INTO watering (plant_id, duration_seconds)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const result = await pool.query(query, [
        plantId,
        durationSeconds
    ]);

    return result.rows[0];
}

async function getLastWatering(plantId) {
    const query = `
        SELECT *
        FROM watering
        WHERE plant_id = $1
        ORDER BY created_at DESC
        LIMIT 1;
    `;

    const result = await pool.query(query, [plantId]);

    return result.rows[0];
}


module.exports = {
    addWatering,
    getLastWatering
};