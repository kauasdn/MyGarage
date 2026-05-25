const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const JWT_SECRET = process.env.JWT_SECRET || "super_segredo_mygarage_123";

const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    console.log("Recebido pedido de registo para:", email);

    const utilizadorExistente = await prisma.usuario.findUnique({ where: { email } });
    if (utilizadorExistente) {
      console.log("❌ Erro: O e-mail já existe.");
      return res.status(400).json({ error: "Este e-mail já está em uso." });
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash }
    });

    console.log("✅ SUCESSO! Utilizador ID:", novoUsuario.id);
    res.status(201).json({ mensagem: "Utilizador criado!", usuarioId: novoUsuario.id });
    
  } catch (error) {
    console.error("❌ ERRO GRAVE:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(401).json({ error: "Credenciais inválidas." });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: "Credenciais inválidas." });

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      mensagem: "Login efetuado!",
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role }
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

module.exports = { registrar, login };