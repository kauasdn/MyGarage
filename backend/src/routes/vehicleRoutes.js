const express = require('express');
const router = express.Router();
const { createVehicle, getVehiclesByUser, deleteVehicle } = require('../controllers/vehicleController');

router.get('/', getVehiclesByUser);
router.post('/', createVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router;
