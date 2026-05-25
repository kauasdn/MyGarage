const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const registrarManutencao = async (req, res) => {
  try {
    const { descricao, custo, kmAtual, veiculoId } = req.body;
    const novaManutencao = await prisma.manutencao.create({
      data: {
        descricao,
        custo: parseFloat(custo),
        kmAtual: parseInt(kmAtual),
        veiculoId: parseInt(veiculoId)
      }
    });
    res.status(201).json(novaManutencao);
  } catch (error) {
    console.error("Erro ao registar manutenção:", error);
    res.status(500).json({ error: "Erro ao registar manutenção" });
  }
};

const listarManutencoes = async (req, res) => {
  try {
    const veiculoId = parseInt(req.params.veiculoId);
    const manutencoes = await prisma.manutencao.findMany({
      where: { veiculoId },
      orderBy: { data: 'desc' }
    });
    res.json(manutencoes);
  } catch (error) {
    console.error("Erro ao listar manutenções:", error);
    res.status(500).json({ error: "Erro ao listar manutenções" });
  }
};

module.exports = { registrarManutencao, listarManutencoes };