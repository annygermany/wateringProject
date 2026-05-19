const measurementService = require('../service/measurementService');
//Wie kommt der Request rein?)

async function getMeasurement(req, res) {
    try {
        const measurement = await measurementService.getAllMeasurements();
        res.json(measurement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function addMeasurement(req, res) {

    try {
        const result = await measurementService.addMeasurement(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getMeasurement,
    addMeasurement
};