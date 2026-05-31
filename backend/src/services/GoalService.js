const GoalServiceContract = require('./contracts/goalServiceContract');

class GoalService extends GoalServiceContract {
  constructor(goalModel) {
    super();
    this.goalModel = goalModel;
  }

  list(userId) {
    return this.goalModel.findAllByUserId(userId);
  }

  create(userId, data) {
    return this.goalModel.create({ ...data, userId });
  }

  update(goalId, userId, data) {
    const goal = this.goalModel.findById(goalId, userId);
    if (!goal) throw new Error('Meta não encontrada');
    return this.goalModel.update(goalId, userId, data);
  }

  delete(goalId, userId) {
    const goal = this.goalModel.findById(goalId, userId);
    if (!goal) throw new Error('Meta não encontrada');
    return this.goalModel.remove(goalId, userId);
  }

  getById(goalId, userId) {
    const goal = this.goalModel.findById(goalId, userId);
    if (!goal) throw new Error('Meta não encontrada');
    return goal;
  }
}

module.exports = GoalService;