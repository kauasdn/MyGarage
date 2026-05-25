const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({});

const registrarAbastecimento = async (req, res) => {
  try {
    const { litros, valorTotal, kmAtual, veiculoId } = req.body;
    const novoAbastecimento = await prisma.abastecimento.create({
      data: { litros: parseFloat(litros), valorTotal: parseFloat(valorTotal), kmAtual: parseInt(kmAtual), veiculoId: parseInt(veiculoId) }
    });
    res.status(201).json(novoAbastecimento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao registar abastecimento" });
  }
};

const listarAbastecimentos = async (req, res) => {
  try {
    const veiculoId = parseInt(req.params.veiculoId);
    const abastecimentos = await prisma.abastecimento.findMany({
      where: { veiculoId: veiculoId },
      orderBy: { data: 'desc' }
    });
    res.json(abastecimentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar abastecimentos" });
  }
};

module.exports = { registrarAbastecimento, listarAbastecimentos };