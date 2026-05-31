const GoalRepositoryContract = require('./contracts/GoalRepositoryContract');
 
class InMemoryGoalRepository extends GoalRepositoryContract {
  constructor() {
    super();
    this.goals = [];
    this.nextId = 1;
  }
 
  async findAllByUserId(userId) {
    return this.goals.filter((g) => g.userId === userId);
  }
 
  async findByIdAndUser(goalId, userId) {
    return this.goals.find((g) => g.id === goalId && g.userId === userId) || null;
  }
 
  async create({ name, description, targetValue, unit, period, userId }) {
    const goal = {
      id: this.nextId++,
      name,
      description: description || '',
      targetValue: targetValue !== undefined ? Number(targetValue) : null,
      unit: unit || '',
      period: period || 'weekly',
      progress: 0,
      status: 'active',
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.goals.push(goal);
    return goal;
  }
 
  async update(goalId, userId, data) {
    const index = this.goals.findIndex((g) => g.id === goalId && g.userId === userId);
    if (index === -1) return null;
 
    const allowedFields = ['name', 'description', 'targetValue', 'unit', 'period', 'progress', 'status'];
    allowedFields.forEach((field) => {
      if (data[field] !== undefined) {
        this.goals[index][field] = data[field];
      }
    });
    this.goals[index].updatedAt = new Date().toISOString();
 
    return this.goals[index];
  }
 
  async remove(goalId, userId) {
    const index = this.goals.findIndex((g) => g.id === goalId && g.userId === userId);
    if (index === -1) return false;
    this.goals.splice(index, 1);
    return true;
  }
}
 
module.exports = InMemoryGoalRepository;