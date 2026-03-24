const express = require('express');
const router = express.Router();

const { listarHabitos, criarHabito } = require('../controllers/habitController');

router.get('/', listarHabitos);
router.post('/', criarHabito);

module.exports = router;    