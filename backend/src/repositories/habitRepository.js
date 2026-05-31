const HabitRepositoryContract = require('./contracts/habitRepositoryContract');

class HabitRepository extends HabitRepositoryContract {
  constructor(habitModel) {
    super();
    this.habitModel = habitModel;
  }

  findAllByUserId(userId) {
    return this.habitModel.findAllByUserId(userId);
  }

  create(data) {
    return this.habitModel.create(data);
  }

  update(id, userId, data) {
    return this.habitModel.update(id, userId, data);
  }

  remove(id, userId) {
    return this.habitModel.remove(id, userId);
  }
}

module.exports = HabitRepository;

