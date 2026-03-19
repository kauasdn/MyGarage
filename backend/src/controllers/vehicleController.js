let vehicles = [];

const getVehicles = (req, res) => {
  res.json(vehicles);
};

const createVehicle = (req, res) => {
  const { marca, modelo, ano, placa, cor } = req.body;

  const newVehicle = {
    id: vehicles.length + 1,
    marca,
    modelo,
    ano,
    placa,
    cor
  };

  vehicles.push(newVehicle);

  res.status(201).json(newVehicle);
};

module.exports = {
  getVehicles,
  createVehicle
};