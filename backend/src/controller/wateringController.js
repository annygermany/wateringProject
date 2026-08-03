const wateringService =
    require("../service/wateringService");


async function startWatering(req, res) {


    try {

        const {
            plant_id,
            duration_seconds
        } = req.body;


        const result =
            await wateringService.waterPlant(
                plant_id,
                duration_seconds
            );


        res.json(result);


    } catch(error) {


        console.error(error);


        res.status(500).json({

            error:error.message

        });

    }

}


module.exports = {
    startWatering
};