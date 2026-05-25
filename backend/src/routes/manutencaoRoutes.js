const express = require('express');
const router = express.Router();
const { registrarManutencao, listarManutencoes } = require('../controllers/manutencaoController');

router.post('/', registrarManutencao);
router.get('/veiculo/:veiculoId', listarManutencoes);

module.exports = router;
