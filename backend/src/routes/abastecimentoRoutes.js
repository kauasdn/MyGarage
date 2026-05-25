const express = require('express');
const router = express.Router();
const { registrarAbastecimento, listarAbastecimentos } = require('../controllers/abastecimentoController');

router.post('/', registrarAbastecimento);
router.get('/veiculo/:veiculoId', listarAbastecimentos);

module.exports = router;
