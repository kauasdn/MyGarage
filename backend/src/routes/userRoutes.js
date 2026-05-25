const express = require('express');
const router = express.Router();
const { getMe, updateMe, deleteMe } = require('../controllers/userController');

router.get('/me', getMe);
router.put('/me', updateMe);
router.delete('/me', deleteMe);

module.exports = router;
