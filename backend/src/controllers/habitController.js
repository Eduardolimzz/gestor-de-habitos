const { getAllHabits, createHabit } = require('../models/habitModel');

const listarHabitos = (req, res) => {
  res.json(getAllHabits());
};

const criarHabito = (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório' });
  }

  const habit = createHabit(nome);
  res.status(201).json(habit);
};

module.exports = {
  listarHabitos,
  criarHabito
};