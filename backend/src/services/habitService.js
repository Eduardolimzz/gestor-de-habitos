class HabitService {
  constructor(habitModel) {
    this.habitModel = habitModel;
  }

  list(userId) {
    return this.habitModel.findAllByUserId(userId);
  }

  create({ name, userId }) {
    if (!name) {
      throw new Error('Nome do hábito é obrigatório');
    }

    return this.habitModel.create({ name, userId });
  }

  update(id, userId, data) {
    const habit = this.habitModel.update(id, userId, data);

    if (!habit) {
      throw new Error('Hábito não encontrado');
    }

    return habit;
  }

  delete(id, userId) {
    const removed = this.habitModel.remove(id, userId);

    if (!removed) {
      throw new Error('Hábito não encontrado');
    }

    return true;
  }
}

module.exports = HabitService;