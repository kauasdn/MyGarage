const express = require('express');
const cors = require('cors');

// Importação das rotas
const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const userRoutes = require('./routes/userRoutes');

// Importação do Middleware de Autenticação
const { verificarToken } = require('./middlewares/authMiddleware');

const app = express();

// Configurações base
app.use(cors());
app.use(express.json());

// 1. Rotas Públicas (Qualquer pessoa pode aceder para fazer login/registo)
app.use('/auth', authRoutes); 

// 2. Rotas Protegidas (Exigem o Token de Autenticação)
// Aplicamos o 'verificarToken' antes das rotas dos veículos
app.use('/vehicles', verificarToken, vehicleRoutes);
app.use('/users', verificarToken, userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
});