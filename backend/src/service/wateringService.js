const wateringRepository = require("../repositories/wateringRepository");


const DEFAULT_DURATION = 10;


async function waterPlant(plantId) {

    console.log(
        `💧 Bewässerung gestartet für Pflanze ${plantId}`
    );


    // später:
    // Raspberry Pi Signal senden


    const watering = await wateringRepository.addWatering(
        plantId,
        DEFAULT_DURATION
    );


    console.log(
        `✅ Bewässerung gespeichert`,
        watering
    );


    return watering;
}


module.exports = {
    waterPlant
};