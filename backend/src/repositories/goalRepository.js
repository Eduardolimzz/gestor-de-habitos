const GoalRepositoryContract = require('./contracts/goalRepositoryContract');
const { toGoal } = require('../models/goalModel');
const defaultPrisma = require('../database/prisma');

class GoalRepository extends GoalRepositoryContract {
  constructor(prisma = defaultPrisma) {
    super();
    this.prisma = prisma;
  }

  async findAllByUserId(userId) {
    const goals = await this.prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return goals.map(toGoal);
  }

  async findById(id, userId) {
    const goal = await this.prisma.goal.findFirst({
      where: {
        id: Number(id),
        userId
      }
    });

    return toGoal(goal);
  }

  async findAllByHabitId(habitId, userId) {
    const goals = await this.prisma.goal.findMany({
      where: {
        habitId: Number(habitId),
        userId
      }
    });

    return goals.map(toGoal);
  }

  async create(data) {
    const goal = await this.prisma.goal.create({
      data: {
        name: data.name,
        userId: data.userId,
        habitId: data.habitId,
        period: data.period,
        frequency: data.frequency,
        progress: data.progress ?? 0,
        status: data.status ?? 'ativo'
      }
    });

    return toGoal(goal);
  }

  async update(id, userId, data) {
    const goal = await this.findById(id, userId);

    if (!goal) return null;

    const updatedGoal = await this.prisma.goal.update({
      where: { id: Number(id) },
      data
    });

    return toGoal(updatedGoal);
  }

  async remove(id, userId) {
    const goal = await this.findById(id, userId);

    if (!goal) return false;

    await this.prisma.goal.delete({
      where: { id: Number(id) }
    });

    return true;
  }
}

module.exports = GoalRepository;
