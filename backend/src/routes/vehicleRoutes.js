const express = require('express');
const router = express.Router();
const { createVehicle, getVehiclesByUser } = require('../controllers/vehicleController');

router.post('/', createVehicle);
router.get('/user/:user_id', getVehiclesByUser);

module.exports = router;