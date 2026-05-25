const { createVehicle, getVehiclesByUser, deleteVehicle } = require('../controllers/vehicleController');

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    veiculo: {
      create:    jest.fn(),
      findMany:  jest.fn(),
      findUnique: jest.fn(),
      delete:    jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
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

describe('vehicleController.createVehicle', () => {
  beforeEach(() => jest.clearAllMocks());

  test('cria veículo e retorna 201', async () => {
    const veiculo = { id: 1, marca: 'Toyota', modelo: 'Corolla', ano: '2020', placa: 'ABC-1234', usuarioId: 1 };
    prisma.veiculo.create.mockResolvedValue(veiculo);

    const req = {
      body: { marca: 'Toyota', modelo: 'Corolla', ano: '2020', placa: 'ABC-1234' },
      usuarioLogado: { id: 1 },
    };
    const res = mockRes();

    await createVehicle(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(veiculo);
  });

  test('retorna 400 em caso de erro (ex: placa duplicada)', async () => {
    prisma.veiculo.create.mockRejectedValue(new Error('Unique constraint'));

    const req = { body: { placa: 'ABC-1234' }, usuarioLogado: { id: 1 } };
    const res = mockRes();

    await createVehicle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('vehicleController.getVehiclesByUser', () => {
  beforeEach(() => jest.clearAllMocks());

  test('retorna lista de veículos do utilizador', async () => {
    const lista = [{ id: 1, modelo: 'Corolla' }, { id: 2, modelo: 'Civic' }];
    prisma.veiculo.findMany.mockResolvedValue(lista);

    const req = { usuarioLogado: { id: 1 } };
    const res = mockRes();

    await getVehiclesByUser(req, res);

    expect(res.json).toHaveBeenCalledWith(lista);
  });

  test('retorna lista vazia se utilizador não tem veículos', async () => {
    prisma.veiculo.findMany.mockResolvedValue([]);

    const req = { usuarioLogado: { id: 99 } };
    const res = mockRes();

    await getVehiclesByUser(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });
});

describe('vehicleController.deleteVehicle', () => {
  beforeEach(() => jest.clearAllMocks());

  test('remove veículo com sucesso', async () => {
    prisma.veiculo.findUnique.mockResolvedValue({ id: 5, usuarioId: 1 });
    prisma.veiculo.delete.mockResolvedValue({});

    const req = { params: { id: '5' }, usuarioLogado: { id: 1 } };
    const res = mockRes();

    await deleteVehicle(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mensagem: expect.any(String) }));
  });

  test('retorna 403 se veículo pertence a outro utilizador', async () => {
    prisma.veiculo.findUnique.mockResolvedValue({ id: 5, usuarioId: 99 });

    const req = { params: { id: '5' }, usuarioLogado: { id: 1 } };
    const res = mockRes();

    await deleteVehicle(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});
