//Schritt 4: was ist der unterschied zum Service? catches error

const measurementService = require('../service/measurementService');

async function addMeasurement(req, res) {
    console.log('🔥 CONTROLLER HIT');
    console.log('BODY:', req.body);

    try {

        const result = await measurementService.addMeasurement(
            req.body
        );

        res.status(201).json(result);

    } catch (err) {
        console.error('❌ CONTROLLER ERROR:', err.message);
        res.status(400).json({
            error: err.message
        });

    }
}

async function getMeasurements(req, res) {
    try {

        const result =
            await measurementService.getAllMeasurements();

        res.json(result);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
}

module.exports = {
    addMeasurement,
    getMeasurements
};