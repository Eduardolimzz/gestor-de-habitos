const GoalService = require('../services/GoalService');
const goalModel = require('../models/goalModel');

function makeGoalService() {
  return new GoalService(goalModel);
}

module.exports = { makeGoalService };