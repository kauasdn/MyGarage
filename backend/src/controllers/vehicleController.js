const vehicles = [];
const models3d = require('../models/models3d');

const createVehicle = (req, res) => {
    const { user_id, marca, modelo, ano, placa, cor } = req.body;

    const modelo3d = models3d.find(m => m.cor.toLowerCase() === cor.toLowerCase());
    const modelo_3d_id = modelo3d ? modelo3d.id : null;

    const newVehicle = {
        id: vehicles.length + 1,
        user_id,
        marca,
        modelo,
        ano,
        placa,
        cor,
        modelo_3d_id
    };

    vehicles.push(newVehicle);
    res.status(201).json(newVehicle);
};

const getVehiclesByUser = (req, res) => {
    const user_id = parseInt(req.params.user_id);
    const userVehicles = vehicles.filter(v => v.user_id === user_id);
    res.json(userVehicles);
};

module.exports = { createVehicle, getVehiclesByUser };