let habits = [];
let id = 1;

const getAllHabits = () => habits;

const createHabit = (nome) => {
  const newHabit = {
    id: id++,
    nome,
    concluido: false
  };

  habits.push(newHabit);
  return newHabit;
};

module.exports = {
  getAllHabits,
  createHabit
};