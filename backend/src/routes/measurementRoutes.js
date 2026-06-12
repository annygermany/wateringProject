//schritt 5: keine Ahnung warum man das separat braucht

const express = require('express');
const router = express.Router();

const controller =
    require('../controller/measurementController');

router.get('/', controller.getMeasurements);

router.post('/', controller.addMeasurement);

module.exports = router;