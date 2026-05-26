const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET /admin/stats
const getStats = async (req, res) => {
  try {
    const [totalUsuarios, totalVeiculos, totalAbastecimentos, totalManutencoes] = await Promise.all([
      prisma.usuario.count(),
      prisma.veiculo.count(),
      prisma.abastecimento.count(),
      prisma.manutencao.count(),
    ]);
    res.json({ totalUsuarios, totalVeiculos, totalAbastecimentos, totalManutencoes });
  } catch (error) {
    console.error('Erro ao buscar stats:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
  }
};

// GET /admin/usuarios
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true, nome: true, email: true, role: true, criadoEm: true,
        _count: { select: { veiculos: true } },
      },
      orderBy: { criadoEm: 'desc' },
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
};

// PUT /admin/usuarios/:id/role
const alterarRole = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Role inválida. Use "user" ou "admin".' });
    }
    if (id === req.usuarioLogado.id) {
      return res.status(400).json({ error: 'Não é possível alterar sua própria role.' });
    }

    const atualizado = await prisma.usuario.update({
      where: { id },
      data: { role },
      select: { id: true, nome: true, email: true, role: true },
    });
    res.json(atualizado);
  } catch (error) {
    console.error('Erro ao alterar role:', error);
    res.status(500).json({ error: 'Erro ao alterar role.' });
  }
};

// DELETE /admin/usuarios/:id
const deletarUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id === req.usuarioLogado.id) {
      return res.status(400).json({ error: 'Não é possível excluir a si mesmo.' });
    }
    await prisma.usuario.delete({ where: { id } });
    res.json({ mensagem: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};

// GET /admin/veiculos
const listarTodosVeiculos = async (req, res) => {
  try {
    const veiculos = await prisma.veiculo.findMany({
      include: {
        dono: { select: { id: true, nome: true, email: true } },
        _count: { select: { abastecimentos: true, manutencoes: true } },
      },
      orderBy: { criadoEm: 'desc' },
    });
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao listar veículos:', error);
    res.status(500).json({ error: 'Erro ao listar veículos.' });
  }
};

// DELETE /admin/veiculos/:id
const deletarVeiculo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.veiculo.delete({ where: { id } });
    res.json({ mensagem: 'Veículo excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar veículo:', error);
    res.status(500).json({ error: 'Erro ao excluir veículo.' });
  }
};

module.exports = { getStats, listarUsuarios, alterarRole, deletarUsuario, listarTodosVeiculos, deletarVeiculo };
