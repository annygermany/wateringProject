//schritt 5: keine Ahnung warum man das separat braucht

const express = require('express');
const router = express.Router();

const controller =
    require('../controller/wateringController');

router.post(
    "/watering",
    controller.startWatering
);


module.exports = router;