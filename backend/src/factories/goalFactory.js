const GoalService = require('../services/GoalService');
const goalModel = require('../models/goalModel');
const habitModel = require('../models/habitModel');
const GoalRepository = require('../repositories/goalRepository');
const HabitRepository = require('../repositories/habitRepository');

function makeGoalService() {
  const goalRepository = new GoalRepository(goalModel);
  const habitRepository = new HabitRepository(habitModel);
  return new GoalService(goalRepository, habitRepository);
}

module.exports = { makeGoalService };
