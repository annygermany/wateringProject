const express = require('express');
const router = express.Router();

const controller = require('../controller/plantController');

router.get('/', controller.getPlants);
router.post('/', controller.createPlant);

module.exports = router;