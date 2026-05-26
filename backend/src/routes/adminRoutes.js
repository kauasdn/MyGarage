const express = require('express');
const router = express.Router();
const {
  getStats,
  listarUsuarios,
  alterarRole,
  deletarUsuario,
  listarTodosVeiculos,
  deletarVeiculo,
} = require('../controllers/adminController');

router.get('/stats',           getStats);
router.get('/usuarios',        listarUsuarios);
router.put('/usuarios/:id/role', alterarRole);
router.delete('/usuarios/:id', deletarUsuario);
router.get('/veiculos',        listarTodosVeiculos);
router.delete('/veiculos/:id', deletarVeiculo);

module.exports = router;
