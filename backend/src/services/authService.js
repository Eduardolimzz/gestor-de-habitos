const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(userModel, config) {
    this.userModel = userModel;
    this.config = config;
  }

  async register({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('Preencha todos os campos');
    }

    const userExists = this.userModel.findByEmail(email);

    if (userExists) {
      throw new Error('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userModel.create({
      name,
      email,
      password: hashedPassword
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios');
    }

    const user = this.userModel.findByEmail(email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: user.id },
      this.config.jwtSecret,
      { expiresIn: this.config.jwtExpiresIn }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
}

module.exports = AuthService;