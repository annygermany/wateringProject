const pool = require("../config/db");


async function createWatering(
    plant_id,
    duration_seconds
) {

    const result = await pool.query(

        `
        INSERT INTO watering
        (
            plant_id,
            duration_seconds
        )
        VALUES
        ($1, $2)
        RETURNING *
        `,

        [
            plant_id,
            duration_seconds
        ]

    );


    return result.rows[0];

}


async function getLastWatering(plant_id) {

    const result = await pool.query(

        `
        SELECT *
        FROM watering
        WHERE plant_id = $1
        ORDER BY created_at DESC
        LIMIT 1
        `,

        [plant_id]

    );


    return result.rows[0];

}


module.exports = {
    createWatering,
    getLastWatering
};