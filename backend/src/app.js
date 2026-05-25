require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes        = require('./routes/authRoutes');
const vehicleRoutes     = require('./routes/vehicleRoutes');
const userRoutes        = require('./routes/userRoutes');
const abastecimentoRoutes = require('./routes/abastecimentoRoutes');
const manutencaoRoutes  = require('./routes/manutencaoRoutes');
const { verificarToken } = require('../middlewares/authMiddleware');
const { requestLogger, errorHandler } = require('./middlewares/observability');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({ name: 'MyGarage API', status: 'online' });
});

// Health check (observabilidade)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Métricas Prometheus (observabilidade)
app.get('/metrics', require('./middlewares/metrics').handler);

// Rotas públicas
app.use('/auth', authRoutes);

// Rotas protegidas
app.use('/vehicles',       verificarToken, vehicleRoutes);
app.use('/users',          verificarToken, userRoutes);
app.use('/abastecimentos', verificarToken, abastecimentoRoutes);
app.use('/manutencoes',    verificarToken, manutencaoRoutes);

app.use(errorHandler);

module.exports = app;