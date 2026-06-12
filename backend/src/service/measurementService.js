// Schritt 3: Funktionen mit Fehlerbehandlung definieren, throws error

const measurementRepository = require('../repository/measurementRepository');

async function addMeasurement(data) {

    const { moisture } = data;

    if (moisture === undefined) {
        throw new Error('moisture fehlt');
    }

    return await measurementRepository.addMeasurement(
        moisture
    );
}

async function getAllMeasurements() {
    return await measurementRepository.getAllMeasurements();
}

module.exports = {
    addMeasurement,
    getAllMeasurements
};