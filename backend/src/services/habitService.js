const HabitServiceContract = require('./contracts/habitServiceContract');

function formatDate(date = new Date()) {
  return new Date(date).toISOString().split('T')[0];
}

class HabitService extends HabitServiceContract {
  constructor(habitRepository, goalService = null) {
    super();
    this.habitRepository = habitRepository;
    this.goalService = goalService;
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
    const currentHabit = this.habitRepository.findById(id, userId);

    if (!currentHabit) {
      throw new Error('Hábito não encontrado');
    }

    const updateData = { ...data };
    let completionChanged = false;

    if (typeof data.completed === 'boolean') {
      const targetDate = formatDate(data.date);
      const completedDates = Array.isArray(currentHabit.completedDates)
        ? [...currentHabit.completedDates]
        : [];
      const alreadyCompleted = completedDates.includes(targetDate);

      if (data.completed && !alreadyCompleted) {
        completedDates.push(targetDate);
        completionChanged = true;
      }

      if (!data.completed && alreadyCompleted) {
        const index = completedDates.indexOf(targetDate);
        completedDates.splice(index, 1);
        completionChanged = true;
      }

      updateData.completedDates = completedDates;
      updateData.completed = completedDates.includes(formatDate());
      delete updateData.date;
    }

    const habit = this.habitRepository.update(id, userId, updateData);

    if (!habit) {
      throw new Error('Hábito não encontrado');
    }

    if (completionChanged && this.goalService) {
      this.goalService.updateProgressByHabitId(userId, id, data.completed);
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
