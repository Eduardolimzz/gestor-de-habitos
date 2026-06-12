const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');

const {
  listHabits,
  createHabit,
  updateHabit,
  deleteHabit
} = require('../controllers/habitController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', listHabits);
router.post('/', createHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

module.exports = router;