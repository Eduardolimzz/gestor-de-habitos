const GoalServiceContract = require('./contracts/goalServiceContract');
const { GOAL_PERIODS, GOAL_FREQUENCIES } = require('../constants/goalOptions');

const ALLOWED_UPDATE_FIELDS = ['name', 'period', 'frequency', 'progress', 'status', 'habitId'];
const GOAL_PERIOD_DAYS = {
  '7 Dias': 7,
  '15 Dias': 15,
  '1 Mês (30 Dias)': 30,
  '3 Meses': 90
};

function validationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

class GoalService extends GoalServiceContract {
  constructor(goalRepository, habitRepository = null) {
    super();
    this.goalRepository = goalRepository;
    this.habitRepository = habitRepository;
  }

  async list(userId) {
    return this.goalRepository.findAllByUserId(userId);
  }

  async create(userId, data) {
    this.validateCreate(data);
    const habitId = await this.validateHabitOwnership(userId, data.habitId);

    return this.goalRepository.create({
      name: data.name.trim(),
      period: data.period,
      frequency: data.frequency,
      habitId,
      userId
    });
  }

  async update(goalId, userId, data) {
    const goal = await this.goalRepository.findById(goalId, userId);
    if (!goal) {
      const error = new Error('Meta não encontrada');
      error.status = 404;
      throw error;
    }

    const updateData = await this.buildUpdateData(userId, data);
    return this.goalRepository.update(goalId, userId, updateData);
  }

  async delete(goalId, userId) {
    const goal = await this.goalRepository.findById(goalId, userId);
    if (!goal) {
      const error = new Error('Meta não encontrada');
      error.status = 404;
      throw error;
    }
    return this.goalRepository.remove(goalId, userId);
  }

  async getById(goalId, userId) {
    const goal = await this.goalRepository.findById(goalId, userId);
    if (!goal) {
      const error = new Error('Meta não encontrada');
      error.status = 404;
      throw error;
    }
    return goal;
  }

  async updateProgressByHabitId(userId, habitId, completed) {
    const habit = await this.validateHabitOwnership(userId, habitId);
    const linkedGoals = await this.goalRepository.findAllByHabitId(habit, userId);
    const linkedHabit = await this.habitRepository.findById(habit, userId);

    return Promise.all(linkedGoals.map((goal) => {
      const nextProgress = this.calculateProgressFromHabitDates(goal, linkedHabit);
      return this.goalRepository.update(goal.id, userId, {
        progress: nextProgress,
        status: nextProgress >= 100 ? 'concluido' : 'ativo'
      });
    }));
  }

  validateCreate(data) {
    if (!data?.name || !data.name.trim()) {
      throw validationError('Nome da meta é obrigatório');
    }

    if (!data.period) {
      throw validationError('Período da meta é obrigatório');
    }

    if (!GOAL_PERIODS.includes(data.period)) {
      throw validationError(`Período inválido. Valores permitidos: ${GOAL_PERIODS.join(', ')}`);
    }

    if (!data.frequency) {
      throw validationError('Frequência da meta é obrigatória');
    }

    if (!GOAL_FREQUENCIES.includes(data.frequency)) {
      throw validationError(`Frequência inválida. Valores permitidos: ${GOAL_FREQUENCIES.join(', ')}`);
    }
  }

  async buildUpdateData(userId, data) {
    const updateData = {};
    const source = data || {};

    ALLOWED_UPDATE_FIELDS.forEach((field) => {
      if (source[field] !== undefined) {
        updateData[field] = source[field];
      }
    });

    if (updateData.name !== undefined) {
      if (!updateData.name || !updateData.name.trim()) {
        throw validationError('Nome da meta não pode ser vazio');
      }
      updateData.name = updateData.name.trim();
    }

    if (updateData.period !== undefined && !GOAL_PERIODS.includes(updateData.period)) {
      throw validationError(`Período inválido. Valores permitidos: ${GOAL_PERIODS.join(', ')}`);
    }

    if (updateData.frequency !== undefined && !GOAL_FREQUENCIES.includes(updateData.frequency)) {
      throw validationError(`Frequência inválida. Valores permitidos: ${GOAL_FREQUENCIES.join(', ')}`);
    }

    if (updateData.habitId !== undefined) {
      updateData.habitId = await this.validateHabitOwnership(userId, updateData.habitId);
    }

    return updateData;
  }

  async validateHabitOwnership(userId, habitId) {
    if (habitId === undefined || habitId === null || habitId === '') {
      return null;
    }

    if (!this.habitRepository) {
      throw validationError('Não foi possível validar o hábito vinculado');
    }

    const habit = await this.habitRepository.findById(habitId, userId);
    if (!habit) {
      throw validationError('Hábito vinculado não encontrado para este usuário');
    }

    return habit.id;
  }

  getPeriodDays(period) {
    return GOAL_PERIOD_DAYS[period] || 1;
  }

  calculateProgressFromHabitDates(goal, habit) {
    const completedCount = Array.isArray(habit?.completedDates)
      ? habit.completedDates.length
      : 0;
    const progress = (completedCount / this.getPeriodDays(goal.period)) * 100;

    return Math.round(Math.min(100, Math.max(0, progress)));
  }
}

module.exports = GoalService;
