const jwt = require('jsonwebtoken');
const config = require('../config/env');
const UserRepository = require('../repositories/userRepository');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token não informado'
    });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    const userRepository = new UserRepository();
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: 'Usuário não autorizado'
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido ou expirado'
    });
  }
};

module.exports = authMiddleware;
