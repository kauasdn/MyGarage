const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');

// Rota POST para registar utilizador (/auth/register)
router.post('/register', registrar);

// Rota POST para fazer login (/auth/login)
router.post('/login', login);

module.exports = router;