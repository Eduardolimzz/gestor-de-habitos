const HabitService = require('../services/habitService');
const habitModel = require('../models/habitModel');

const makeHabitService = () => {
  return new HabitService(habitModel);
};

module.exports = {
  makeHabitService
};