const AuthService = require('../services/authService');
const UserRepository = require('../repositories/userRepository');
const config = require('../config/env');

const makeAuthService = () => {
  const userRepository = new UserRepository();
  return new AuthService(userRepository, config);
};

module.exports = {
  makeAuthService
};
