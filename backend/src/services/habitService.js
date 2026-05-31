const HabitServiceContract = require('./contracts/habitServiceContract');

class HabitService extends HabitServiceContract {
  constructor(habitRepository) {
    super();
    this.habitRepository = habitRepository;
  }

  list(userId) {
    return this.habitRepository.findAllByUserId(userId);
  }

  create({ name, userId }) {
    if (!name) {
      throw new Error('Nome do hábito é obrigatório');
    }

    return this.habitRepository.create({ name, userId });
  }

  update(id, userId, data) {
    const habit = this.habitRepository.update(id, userId, data);

    if (!habit) {
      throw new Error('Hábito não encontrado');
    }

    return habit;
  }

  delete(id, userId) {
    const removed = this.habitRepository.remove(id, userId);

    if (!removed) {
      throw new Error('Hábito não encontrado');
    }

    return true;
  }
}

module.exports = HabitService;

