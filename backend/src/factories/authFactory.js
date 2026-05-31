const AuthService = require('../services/authService');
const userModel = require('../models/userModel');
const UserRepository = require('../repositories/userRepository');
const config = require('../config/env');

const makeAuthService = () => {
  const userRepository = new UserRepository(userModel);
  return new AuthService(userRepository, config);
};

module.exports = {
  makeAuthService
};
