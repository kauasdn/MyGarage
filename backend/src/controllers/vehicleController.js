const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const createVehicle = async (req, res) => {
  try {
    const { marca, modelo, ano, placa } = req.body;
    const usuarioId = req.usuarioLogado.id;

    const newVehicle = await prisma.veiculo.create({
      data: { usuarioId, marca, modelo, ano, placa }
    });

    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    res.status(400).json({ error: "Erro ao criar veículo. Verifique os dados (ex: placa duplicada)." });
  }
};

const getVehiclesByUser = async (req, res) => {
  try {
    const usuarioId = req.usuarioLogado.id;
    const userVehicles = await prisma.veiculo.findMany({ where: { usuarioId } });
    res.json(userVehicles);
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarioId = req.usuarioLogado.id;

    const veiculo = await prisma.veiculo.findUnique({ where: { id } });
    if (!veiculo || veiculo.usuarioId !== usuarioId) {
      return res.status(403).json({ error: "Acesso negado." });
    }

    await prisma.veiculo.delete({ where: { id } });
    res.json({ mensagem: "Veículo removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover veículo:", error);
    res.status(500).json({ error: "Erro ao remover veículo." });
  }
};

module.exports = { createVehicle, getVehiclesByUser, deleteVehicle };