const HabitService = require('../services/habitService');
const goalModel = require('../models/goalModel');
const HabitRepository = require('../repositories/habitRepository');
const GoalRepository = require('../repositories/goalRepository');
const GoalService = require('../services/GoalService');
const prisma = require('../database/prisma');

const makeHabitService = () => {
  const habitRepository = new HabitRepository(prisma);
  const goalRepository = new GoalRepository(goalModel);
  const goalService = new GoalService(goalRepository, habitRepository);
  return new HabitService(habitRepository, goalService);
};

module.exports = {
  makeHabitService
};
