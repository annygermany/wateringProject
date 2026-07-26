// Schritt 3: Funktionen mit Fehlerbehandlung definieren, throws error

const measurementRepository =
    require("../repository/measurementRepository");

const wateringService =
    require("./wateringService");


function calcMoistPercentage(rawValue) {

    const dry = 900;
    const wet = 300;


    let percentage =
        ((dry - rawValue) / (dry - wet)) * 100;


    return Math.max(0, Math.min(100, percentage));
}

async function addMeasurement(data) {

    const rawMoistureValue = data['moisture'];
    const plant_id = data['plant_id'];

    console.log('rawMoistureValue:', rawMoistureValue);
    console.log('plant_id:', plant_id);

    const percentage = calcMoistPercentage(rawMoistureValue);
    console.log('percentage:', percentage);

    // Messung speichern
    const savedMeasurement =
        await measurementRepository.addMeasurement(
            plant_id,
            percentage
        );


    // Trockenheitsprüfung
    // 0 % = trocken
    // 100 % = nass

    if (percentage < 20) {
        console.log("🌱 Boden zu trocken");
        await wateringService.waterPlant(
            plant_id
        );
    }

    return savedMeasurement;
}


async function getAllMeasurements() {
    return await measurementRepository.getAllMeasurements();
}


module.exports = {
    addMeasurement,
    getAllMeasurements,
};