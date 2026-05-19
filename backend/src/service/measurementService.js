const measurementRepository = require('../repository/measurementRepository');
const plantRepository = require('../repository/plantRepository');
const wateringRepository = require('../repository/wateringRepository');

const COOLDOWN_MINUTES = 30;

async function addMeasurement(data) {
    const { plant_id, moisture } = data;

    if (!plant_id || moisture === undefined) {
        throw new Error('plant_id und moisture sind Pflicht');
    }

    // 1. Messwert speichern
    const measurement = await measurementRepository.addMeasurement(
        plant_id,
        moisture
    );

    // 2. Pflanze laden
    const plant = await plantRepository.getPlantById(plant_id);

    if (!plant) {
        throw new Error('Plant nicht gefunden');
    }

    // 3. Threshold Check
    const isDry = moisture < plant.moisture_threshold;

    if (!isDry) {
        console.log('🌿 Boden ausreichend feucht – keine Aktion');
        return measurement;
    }

    // 4. Letzte Bewässerung holen
    const lastWatering = await wateringRepository.getLastWatering(plant_id);

    let canWater = true;

    if (lastWatering) {
        const lastTime = new Date(lastWatering.created_at);
        const now = new Date();

        const diffMinutes = (now - lastTime) / 1000 / 60;

        if (diffMinutes < COOLDOWN_MINUTES) {
            canWater = false;
        }
    }

    // 5. Entscheidung treffen
    if (canWater) {
        console.log('💧 AUTO-WATERING TRIGGERED');

        await wateringRepository.createWateringEvent(
            plant_id,
            'automatic'
        );
    } else {
        console.log('⏳ Cooldown aktiv – keine Bewässerung');
    }

    return measurement;
}

module.exports = {
    addMeasurement
};