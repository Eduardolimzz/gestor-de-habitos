const GoalService = require('../services/GoalService');
const goalModel = require('../models/goalModel');
const GoalRepository = require('../repositories/goalRepository');
const HabitRepository = require('../repositories/habitRepository');
const prisma = require('../database/prisma');

function makeGoalService() {
  const goalRepository = new GoalRepository(goalModel);
  const habitRepository = new HabitRepository(prisma);
  return new GoalService(goalRepository, habitRepository);
}

module.exports = { makeGoalService };
