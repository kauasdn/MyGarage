const verificarAdmin = (req, res, next) => {
  if (req.usuarioLogado?.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso restrito a administradores.' });
  }
  next();
};

module.exports = { verificarAdmin };
