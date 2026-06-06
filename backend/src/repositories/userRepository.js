const UserRepositoryContract = require('./contracts/userRepositoryContract');
const { toUser } = require('../models/userModel');
const defaultPrisma = require('../database/prisma');

class UserRepository extends UserRepositoryContract {
  constructor(prisma = defaultPrisma) {
    super();
    this.prisma = prisma;
  }

  async create(user) {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });

    return toUser(createdUser);
  }

  async findByEmail(email) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    return toUser(user);
  }

  async findById(id) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) }
    });

    return toUser(user);
  }
}

module.exports = UserRepository;
