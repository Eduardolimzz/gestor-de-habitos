const GoalRepositoryContract = require('./contracts/goalRepositoryContract');

class GoalRepository extends GoalRepositoryContract {
  constructor(goalModel) {
    super();
    this.goalModel = goalModel;
  }

  findAllByUserId(userId) {
    return this.goalModel.findAllByUserId(userId);
  }

  findById(id, userId) {
    return this.goalModel.findById(id, userId);
  }

  findAllByHabitId(habitId, userId) {
    return this.goalModel.findAllByHabitId(habitId, userId);
  }

  create(data) {
    return this.goalModel.create(data);
  }

  update(id, userId, data) {
    return this.goalModel.update(id, userId, data);
  }

  remove(id, userId) {
    return this.goalModel.remove(id, userId);
  }
}

module.exports = GoalRepository;
