const toGoal = (goal) => {
  if (!goal) return null;

  return {
    id: goal.id,
    name: goal.name,
    userId: goal.userId,
    habitId: goal.habitId,
    period: goal.period,
    frequency: goal.frequency,
    progress: goal.progress,
    status: goal.status,
    createdAt: goal.createdAt
  };
};

module.exports = {
  toGoal
};
