let habits = [];
let id = 1;

const findAllByUserId = (userId) => {
  return habits.filter(habit => habit.userId === userId);
};

const create = ({ name, userId }) => {
  const newHabit = {
    id: id++,
    name,
    completed: false,
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
  create,
  update,
  remove
};