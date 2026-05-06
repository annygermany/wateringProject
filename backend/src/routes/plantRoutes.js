//Routes definieren nur die API-Endpunkte

//„Wenn ein Request auf diese URL kommt, schick ihn an diesen Controller.“

const express = require('express');
const router = express.Router();

const controller = require('../controller/plantController');

router.get('/', controller.getPlants);
router.post('/', controller.createPlant);

module.exports = router;