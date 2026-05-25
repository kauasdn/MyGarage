const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "super_segredo_mygarage_123";

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).json({ error: "Token de acesso não fornecido." });
  }

  const token = authHeader.split(' ')[1];

  try {
    const descodificado = jwt.verify(token, JWT_SECRET);
    
    req.usuarioLogado = descodificado;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

const verificarAdmin = (req, res, next) => {
  if (req.usuarioLogado && req.usuarioLogado.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: "Acesso negado. Apenas administradores." });
  }
};

module.exports = { verificarToken, verificarAdmin };