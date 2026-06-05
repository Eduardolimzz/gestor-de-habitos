const HabitService = require('../services/habitService');
const habitModel = require('../models/habitModel');
const goalModel = require('../models/goalModel');
const HabitRepository = require('../repositories/habitRepository');
const GoalRepository = require('../repositories/goalRepository');
const GoalService = require('../services/GoalService');

const makeHabitService = () => {
  const habitRepository = new HabitRepository(habitModel);
  const goalRepository = new GoalRepository(goalModel);
  const goalService = new GoalService(goalRepository, habitRepository);
  return new HabitService(habitRepository, goalService);
};

module.exports = {
  makeHabitService
};
