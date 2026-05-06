const plantService = require('../service/plantService');

async function getPlants(req, res) {
    try {
        const plants = await plantService.getPlants();
        res.json(plants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createPlant(req, res) {
    try {
        const plant = await plantService.addPlant(req.body);
        res.status(201).json(plant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getPlants,
    createPlant
};