const AuthService = require('../services/authService');
const userModel = require('../models/userModel');
const config = require('../config/env');

const makeAuthService = () => {
  return new AuthService(userModel, config);
};

module.exports = {
  makeAuthService
};