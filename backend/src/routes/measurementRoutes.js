const express = require('express');
const router = express.Router();
const controller = require('../controller/measurementController');

router.post('/', controller.addMeasurement);
router.get('/', controller.getMeasurement);

module.exports = router;