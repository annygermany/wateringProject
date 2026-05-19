//Routes definieren nur die API-Endpunkte

//„Wenn ein Request auf diese URL kommt, schick ihn an diesen Controller.“

const express = require('express');
const router = express.Router();

const controller = require('../controller/measurementController');

router.get('/', controller.getMeasurement);
router.post('/', controller.createMeasurement);

module.exports = router;