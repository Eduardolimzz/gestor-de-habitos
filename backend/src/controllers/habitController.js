const { makeHabitService } = require('../factories/habitFactory');

const listHabits = async (req, res) => {
  try {
    const habitService = makeHabitService();

    const habits = await habitService.list(req.user.id);

    return res.json(habits);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

const createHabit = async (req, res) => {
  try {
    const habitService = makeHabitService();

    const habit = await habitService.create({
      name: req.body.name,
      userId: req.user.id
    });

    return res.status(201).json(habit);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

const updateHabit = async (req, res) => {
  try {
    const habitService = makeHabitService();

    const habit = await habitService.update(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.json(habit);
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const habitService = makeHabitService();

    await habitService.delete(req.params.id, req.user.id);

    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
};

module.exports = {
  listHabits,
  createHabit,
  updateHabit,
  deleteHabit
};
