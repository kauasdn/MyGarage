const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const registrarAbastecimento = async (req, res) => {
  try {
    const { litros, valorTotal, kmAtual, veiculoId } = req.body;
    const novoAbastecimento = await prisma.abastecimento.create({
      data: {
        litros: parseFloat(litros),
        valorTotal: parseFloat(valorTotal),
        kmAtual: parseInt(kmAtual),
        veiculoId: parseInt(veiculoId)
      }
    });
    res.status(201).json(novoAbastecimento);
  } catch (error) {
    console.error("Erro ao registar abastecimento:", error);
    res.status(500).json({ error: "Erro ao registar abastecimento" });
  }
};

const listarAbastecimentos = async (req, res) => {
  try {
    const veiculoId = parseInt(req.params.veiculoId);
    const abastecimentos = await prisma.abastecimento.findMany({
      where: { veiculoId },
      orderBy: { data: 'desc' }
    });
    res.json(abastecimentos);
  } catch (error) {
    console.error("Erro ao listar abastecimentos:", error);
    res.status(500).json({ error: "Erro ao listar abastecimentos" });
  }
};

module.exports = { registrarAbastecimento, listarAbastecimentos };