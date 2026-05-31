const UserRepositoryContract = require('./contracts/userRepositoryContract');

class UserRepository extends UserRepositoryContract {
  constructor(userModel) {
    super();
    this.userModel = userModel;
  }

  create(user) {
    return this.userModel.create(user);
  }

  findByEmail(email) {
    return this.userModel.findByEmail(email);
  }

  findById(id) {
    return this.userModel.findById(id);
  }
}

module.exports = UserRepository;

