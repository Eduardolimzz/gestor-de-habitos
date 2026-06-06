const toDateKey = (date = new Date()) => {
  return new Date(date).toISOString().split('T')[0];
};

const toHabit = (habit, referenceDate = new Date()) => {
  if (!habit) return null;

  const completedDates = Array.isArray(habit.completions)
    ? habit.completions.map((completion) => toDateKey(completion.completedDate))
    : [];
  const today = toDateKey(referenceDate);

  return {
    id: habit.id,
    name: habit.name,
    completed: completedDates.includes(today),
    completedDates,
    userId: habit.userId,
    createdAt: habit.createdAt
  };
};

module.exports = {
  toDateKey,
  toHabit
};
