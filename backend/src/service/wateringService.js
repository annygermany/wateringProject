const wateringRepository =
    require("../repository/wateringRepository");


async function waterPlant(
    plant_id,
    duration_seconds = 5
) {


    console.log(
        "💧 Pumpe EIN für",
        duration_seconds,
        "Sekunden"
    );


    const event =
        await wateringRepository.createWatering(
            plant_id,
            duration_seconds
        );


    setTimeout(() => {

        console.log(
            "💧 Pumpe AUS"
        );

    }, duration_seconds * 1000);



    return event;

}


module.exports = {
    waterPlant
};