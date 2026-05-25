const { registrar, login } = require('../controllers/authController');

// Mocks 
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    usuario: {
      findUnique: jest.fn(),
      create:     jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

jest.mock('pg', () => ({ Pool: jest.fn() }));
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const prisma = new PrismaClient();

// Helpers 
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
};

// registrar 
describe('authController.registrar', () => {
  beforeEach(() => jest.clearAllMocks());

  test('cria utilizador e retorna 201 com dados válidos', async () => {
    prisma.usuario.findUnique.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hash123');
    prisma.usuario.create.mockResolvedValue({ id: 1, nome: 'João', email: 'joao@teste.com' });

    const req = { body: { nome: 'João', email: 'joao@teste.com', senha: '123456' } };
    const res = mockRes();

    await registrar(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ usuarioId: 1 }));
  });

  test('retorna 400 se e-mail já está em uso', async () => {
    prisma.usuario.findUnique.mockResolvedValue({ id: 99 });

    const req = { body: { nome: 'X', email: 'existente@teste.com', senha: '123' } };
    const res = mockRes();

    await registrar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });

  test('retorna 500 em caso de erro inesperado', async () => {
    prisma.usuario.findUnique.mockRejectedValue(new Error('DB offline'));

    const req = { body: { nome: 'X', email: 'x@x.com', senha: '123' } };
    const res = mockRes();

    await registrar(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// login
describe('authController.login', () => {
  beforeEach(() => jest.clearAllMocks());

  test('retorna token e dados do utilizador com credenciais válidas', async () => {
    prisma.usuario.findUnique.mockResolvedValue({
      id: 1, nome: 'João', email: 'joao@teste.com', senha: 'hash', role: 'user',
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token_fake');

    const req = { body: { email: 'joao@teste.com', senha: '123456' } };
    const res = mockRes();

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'token_fake' }));
  });

  test('retorna 401 se utilizador não existe', async () => {
    prisma.usuario.findUnique.mockResolvedValue(null);

    const req = { body: { email: 'naoexiste@teste.com', senha: '123' } };
    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('retorna 401 se senha está incorreta', async () => {
    prisma.usuario.findUnique.mockResolvedValue({ id: 1, senha: 'hash', role: 'user' });
    bcrypt.compare.mockResolvedValue(false);

    const req = { body: { email: 'joao@teste.com', senha: 'errada' } };
    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
