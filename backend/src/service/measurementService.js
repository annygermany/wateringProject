// Schritt 3: Funktionen mit Fehlerbehandlung definieren, throws error

const measurementRepository = require('../repository/measurementRepository');

async function addMeasurement(data) {

    const rawMoistureValue = data['moisture'];

    const moisturePercentage = calcMoistPercentage(rawMoistureValue);
    console.log('moisturePercentage',moisturePercentage);

    return await measurementRepository.addMeasurement(
        moisturePercentage
    );
}

async function getAllMeasurements() {
    return await measurementRepository.getAllMeasurements();
}

 function calcMoistPercentage(rawValue) {

    const min = 600;
    const max = 400;
    const percentage = ((max - rawValue) / (max - min) * 100)
    return Math.round(percentage);
}

module.exports = {
    addMeasurement,
    getAllMeasurements,
};