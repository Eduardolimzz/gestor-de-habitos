const { makeAuthService } = require('../factories/authFactory');

const register = async (req, res) => {
  try {
    const authService = makeAuthService();

    const user = await authService.register(req.body);

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const authService = makeAuthService();

    const data = await authService.login(req.body);

    return res.json({
      message: 'Login realizado com sucesso',
      ...data
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};

module.exports = {
  register,
  login
};