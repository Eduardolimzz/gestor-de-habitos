let habits = [];
let id = 1;

const findAllByUserId = (userId) => {
  return habits.filter(habit => habit.userId === userId);
};

const findById = (id, userId) => {
  return habits.find(
    habit => habit.id === Number(id) && habit.userId === userId
  ) || null;
};

const create = ({ name, userId }) => {
  const newHabit = {
    id: id++,
    name,
    completed: false,
    completedDates: [],
    userId,
    createdAt: new Date()
  };

  habits.push(newHabit);
  return newHabit;
};

const update = (id, userId, data) => {
  const habit = habits.find(
    habit => habit.id === Number(id) && habit.userId === userId
  );

  if (!habit) return null;

  Object.assign(habit, data);
  return habit;
};

const remove = (id, userId) => {
  const index = habits.findIndex(
    habit => habit.id === Number(id) && habit.userId === userId
  );

  if (index === -1) return false;

  habits.splice(index, 1);
  return true;
};

module.exports = {
  findAllByUserId,
  findById,
  create,
  update,
  remove
};
