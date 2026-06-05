const goals = [];
let id = 1;

const findAllByUserId = (userId) => {
  return goals.filter(goal => goal.userId === userId);
};

const findById = (goalId, userId) => {
  return goals.find(
    goal => goal.id === Number(goalId) && goal.userId === userId
  ) || null;
};

const findAllByHabitId = (habitId, userId) => {
  return goals.filter(
    goal => goal.habitId === Number(habitId) && goal.userId === userId
  );
};

const create = ({ name, userId, period, frequency, habitId }) => {
  const newGoal = {
    id: id++,
    name,
    userId,
    habitId: habitId !== undefined ? Number(habitId) : null,
    period: period || 'diario',
    frequency: frequency || 1,
    progress: 0,
    status: 'ativo',
    createdAt: new Date(),
  };
  goals.push(newGoal);
  return newGoal;
};

const update = (goalId, userId, data) => {
  const goal = goals.find(
    goal => goal.id === Number(goalId) && goal.userId === userId
  );
  if (!goal) return null;
  Object.assign(goal, data);
  return goal;
};

const remove = (goalId, userId) => {
  const index = goals.findIndex(
    goal => goal.id === Number(goalId) && goal.userId === userId
  );
  if (index === -1) return false;
  goals.splice(index, 1);
  return true;
};

module.exports = {
  findAllByUserId,
  findById,
  findAllByHabitId,
  create,
  update,
  remove,
};
