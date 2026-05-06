const plantRepository = require('../repository/plantRepository');

async function getPlants() {
    return plantRepository.getAllPlants();
}

async function addPlant(data) {
    const { name, moisture_threshold } = data;

    if (!name || !moisture_threshold) {
        throw new Error('Invalid input');
    }

    return plantRepository.createPlant(name, moisture_threshold);
}

module.exports = {
    getPlants,
    addPlant
};