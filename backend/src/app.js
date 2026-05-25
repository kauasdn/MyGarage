require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const authRoutes          = require('./routes/authRoutes');
const vehicleRoutes       = require('./routes/vehicleRoutes');
const userRoutes          = require('./routes/userRoutes');
const abastecimentoRoutes = require('./routes/abastecimentoRoutes');
const manutencaoRoutes    = require('./routes/manutencaoRoutes');
const { verificarToken }  = require('../middlewares/authMiddleware');
const { requestLogger, errorHandler } = require('./middlewares/observability');

const app = express();

// ── CORS ────────────────────────────────────────────────────────────────────
// Em produção lê FRONTEND_URL; em dev aceita localhost:5173
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean); // remove undefined se FRONTEND_URL não estiver definida

app.use(cors({
  origin: (origin, callback) => {
    // Permite chamadas sem origin (Postman, curl, health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origem não permitida — ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(requestLogger);

// ── Rotas públicas ──────────────────────────────────────────────────────────
app.get('/', (_req, res) => res.json({ name: 'MyGarage API', status: 'online' }));

app.get('/health', (_req, res) =>
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() })
);

app.get('/metrics', require('./middlewares/metrics').handler);

app.use('/auth', authRoutes);

// ── Rotas protegidas ────────────────────────────────────────────────────────
app.use('/vehicles',       verificarToken, vehicleRoutes);
app.use('/users',          verificarToken, userRoutes);
app.use('/abastecimentos', verificarToken, abastecimentoRoutes);
app.use('/manutencoes',    verificarToken, manutencaoRoutes);

app.use(errorHandler);

module.exports = app;