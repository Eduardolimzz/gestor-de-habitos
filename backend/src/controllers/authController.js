const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  const userExists = findUserByEmail(email);
  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = createUser({
    id: Date.now(),
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: 'Usuário criado', user: newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).json({ message: 'Senha inválida' });
  }

  const token = jwt.sign({ id: user.id }, 'segredo', {
    expiresIn: '1d'
  });

  res.json({ message: 'Login ok', token, user: { name: user.name, email: user.email } });
};

module.exports = {
  register,
  login
};