const HabitService = require('../services/habitService');
const habitModel = require('../models/habitModel');
const HabitRepository = require('../repositories/habitRepository');

const makeHabitService = () => {
  const habitRepository = new HabitRepository(habitModel);
  return new HabitService(habitRepository);
};

module.exports = {
  makeHabitService
};
