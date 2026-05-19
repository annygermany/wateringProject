const measurementService = require('../service/measurementService');
const service = require("../service/measurementService");
//Wie kommt der Request rein?)

async function getMeasurement(req, res) {
    try {
        const measurement = await measurementService.addMeasurement();
        res.json(measurement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function addMeasurement(req, res) {
    console.log('REQ BODY:', req.body);
    try {
        const result = await service.addMeasurement(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getMeasurement,
    addMeasurement
};