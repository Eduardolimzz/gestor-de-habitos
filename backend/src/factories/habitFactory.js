const HabitService = require('../services/habitService');
const HabitRepository = require('../repositories/habitRepository');
const GoalRepository = require('../repositories/goalRepository');
const GoalService = require('../services/GoalService');

const makeHabitService = () => {
  const habitRepository = new HabitRepository();
  const goalRepository = new GoalRepository();
  const goalService = new GoalService(goalRepository, habitRepository);
  return new HabitService(habitRepository, goalService);
};

module.exports = {
  makeHabitService
};
