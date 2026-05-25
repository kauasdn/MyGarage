const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const getMe = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuarioLogado.id },
      select: { id: true, nome: true, email: true, role: true, criadoEm: true }
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados do utilizador." });
  }
};

const updateMe = async (req, res) => {
  try {
    const { nome, email, senhaAtual, novaSenha } = req.body;
    const usuarioId = req.usuarioLogado.id;

    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });

    if (novaSenha) {
      if (!senhaAtual) return res.status(400).json({ error: "Informe a senha atual para alterá-la." });
      const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
      if (!senhaValida) return res.status(401).json({ error: "Senha atual incorreta." });
    }

    const data = { nome, email };
    if (novaSenha) {
      data.senha = await bcrypt.hash(novaSenha, 10);
    }

    const atualizado = await prisma.usuario.update({
      where: { id: usuarioId },
      data,
      select: { id: true, nome: true, email: true, role: true }
    });

    res.json({ mensagem: "Dados atualizados com sucesso!", usuario: atualizado });
  } catch (error) {
    console.error("Erro ao atualizar utilizador:", error);
    res.status(500).json({ error: "Erro ao atualizar dados." });
  }
};

const deleteMe = async (req, res) => {
  try {
    await prisma.usuario.delete({ where: { id: req.usuarioLogado.id } });
    res.json({ mensagem: "Conta excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    res.status(500).json({ error: "Erro ao excluir conta." });
  }
};

module.exports = { getMe, updateMe, deleteMe };