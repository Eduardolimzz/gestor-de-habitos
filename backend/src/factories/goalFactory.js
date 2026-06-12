const GoalService = require('../services/GoalService');
const GoalRepository = require('../repositories/goalRepository');
const HabitRepository = require('../repositories/habitRepository');

function makeGoalService() {
  const goalRepository = new GoalRepository();
  const habitRepository = new HabitRepository();
  return new GoalService(goalRepository, habitRepository);
}

module.exports = { makeGoalService };
