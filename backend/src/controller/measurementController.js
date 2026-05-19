const measurementService = require('../service/measurementService');
//Wie kommt der Request rein?)

async function getMeasurement(req, res) {
    try {
        const measurement = await measurementService.getPlants();
        res.json(measurement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createMeasurement(req, res) {
    try {
        const measurement = await measurementService.addMeasurement(req.body);
        res.status(201).json(measurement);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getMeasurement,
    createMeasurement
};