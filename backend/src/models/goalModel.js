const goals = [];
let nextId = 1;

const goalModel = {
  findAllByUserId(userId) {
    return goals.filter(g => g.userId === userId);
  },

  findById(id, userId) {
    return goals.find(g => g.id === id && g.userId === userId) || null;
  },

  create(data) {
    const goal = {
      id: nextId++,
      userId: data.userId,
      name: data.name,
      period: data.period || 'diario',
      frequency: data.frequency || 1,
      progress: 0,
      status: 'ativo',
      createdAt: new Date().toISOString(),
    };
    goals.push(goal);
    return goal;
  },

  update(id, userId, data) {
    const index = goals.findIndex(g => g.id === id && g.userId === userId);
    if (index === -1) return null;
    goals[index] = { ...goals[index], ...data };
    return goals[index];
  },

  remove(id, userId) {
    const index = goals.findIndex(g => g.id === id && g.userId === userId);
    if (index === -1) return false;
    goals.splice(index, 1);
    return true;
  },
};

module.exports = goalModel;