const { registrarAbastecimento, listarAbastecimentos } = require('../controllers/abastecimentoController');
const { registrarManutencao, listarManutencoes }       = require('../controllers/manutencaoController');

jest.mock('@prisma/client', () => {
  const mock = {
    abastecimento: { create: jest.fn(), findMany: jest.fn() },
    manutencao:    { create: jest.fn(), findMany: jest.fn() },
  };
  return { PrismaClient: jest.fn(() => mock) };
});
jest.mock('pg', () => ({ Pool: jest.fn() }));
jest.mock('@prisma/adapter-pg', () => ({ PrismaPg: jest.fn() }));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
};

// Abastecimento 
describe('abastecimentoController.registrarAbastecimento', () => {
  beforeEach(() => jest.clearAllMocks());

  test('cria abastecimento e retorna 201', async () => {
    const record = { id: 1, litros: 40, valorTotal: 280, kmAtual: 45000, veiculoId: 1 };
    prisma.abastecimento.create.mockResolvedValue(record);

    const req = { body: { litros: '40', valorTotal: '280', kmAtual: '45000', veiculoId: '1' } };
    const res = mockRes();

    await registrarAbastecimento(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(record);
  });

  test('retorna 500 em erro de banco', async () => {
    prisma.abastecimento.create.mockRejectedValue(new Error('DB error'));

    const req = { body: { litros: '40', valorTotal: '280', kmAtual: '45000', veiculoId: '1' } };
    const res = mockRes();

    await registrarAbastecimento(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('abastecimentoController.listarAbastecimentos', () => {
  beforeEach(() => jest.clearAllMocks());

  test('retorna lista ordenada por data desc', async () => {
    const lista = [{ id: 2, kmAtual: 46000 }, { id: 1, kmAtual: 45000 }];
    prisma.abastecimento.findMany.mockResolvedValue(lista);

    const req = { params: { veiculoId: '1' } };
    const res = mockRes();

    await listarAbastecimentos(req, res);

    expect(res.json).toHaveBeenCalledWith(lista);
  });
});

// Manutenção
describe('manutencaoController.registrarManutencao', () => {
  beforeEach(() => jest.clearAllMocks());

  test('cria manutenção e retorna 201', async () => {
    const record = { id: 1, descricao: 'Troca de óleo', custo: 150, kmAtual: 45000, veiculoId: 1 };
    prisma.manutencao.create.mockResolvedValue(record);

    const req = { body: { descricao: 'Troca de óleo', custo: '150', kmAtual: '45000', veiculoId: '1' } };
    const res = mockRes();

    await registrarManutencao(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(record);
  });

  test('retorna 500 em erro de banco', async () => {
    prisma.manutencao.create.mockRejectedValue(new Error('DB error'));

    const req = { body: { descricao: 'x', custo: '10', kmAtual: '1000', veiculoId: '1' } };
    const res = mockRes();

    await registrarManutencao(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('manutencaoController.listarManutencoes', () => {
  beforeEach(() => jest.clearAllMocks());

  test('retorna lista de manutenções do veículo', async () => {
    const lista = [{ id: 1, descricao: 'Freios' }];
    prisma.manutencao.findMany.mockResolvedValue(lista);

    const req = { params: { veiculoId: '1' } };
    const res = mockRes();

    await listarManutencoes(req, res);

    expect(res.json).toHaveBeenCalledWith(lista);
  });
});
