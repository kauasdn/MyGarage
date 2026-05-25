const { verificarToken } = require('../../middlewares/authMiddleware');
const { recordRequest }  = require('../middlewares/metrics');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
};

// authMiddleware
describe('authMiddleware.verificarToken', () => {
  beforeEach(() => jest.clearAllMocks());

  test('chama next() com token válido', () => {
    jwt.verify.mockReturnValue({ id: 1, role: 'user' });

    const req  = { headers: { authorization: 'Bearer token_valido' } };
    const res  = mockRes();
    const next = jest.fn();

    verificarToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.usuarioLogado).toEqual({ id: 1, role: 'user' });
  });

  test('retorna 403 sem header Authorization', () => {
    const req  = { headers: {} };
    const res  = mockRes();
    const next = jest.fn();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test('retorna 401 com token inválido/expirado', () => {
    jwt.verify.mockImplementation(() => { throw new Error('invalid'); });

    const req  = { headers: { authorization: 'Bearer token_invalido' } };
    const res  = mockRes();
    const next = jest.fn();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});

// metrics 
describe('metrics.recordRequest', () => {
  test('incrementa contador sem lançar erro', () => {
    expect(() => recordRequest('GET', '/vehicles', 200, 45)).not.toThrow();
    expect(() => recordRequest('POST', '/auth/login', 401, 12)).not.toThrow();
  });
});
