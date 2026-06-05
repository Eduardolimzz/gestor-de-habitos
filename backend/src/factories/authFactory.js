const AuthService = require('../services/authService');
const UserRepository = require('../repositories/userRepository');
const config = require('../config/env');
const prisma = require('../database/prisma');

const makeAuthService = () => {
  const userRepository = new UserRepository(prisma);
  return new AuthService(userRepository, config);
};

module.exports = {
  makeAuthService
};
