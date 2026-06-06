const HabitRepositoryContract = require('./contracts/habitRepositoryContract');
const { toDateKey, toHabit } = require('../models/habitModel');
const defaultPrisma = require('../database/prisma');

class HabitRepository extends HabitRepositoryContract {
  constructor(prisma = defaultPrisma) {
    super();
    this.prisma = prisma;
  }

  async findAllByUserId(userId) {
    const habits = await this.prisma.habit.findMany({
      where: { userId },
      include: { completions: true },
      orderBy: { createdAt: 'desc' }
    });

    return habits.map(toHabit);
  }

  async findById(id, userId) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: Number(id),
        userId
      },
      include: { completions: true }
    });

    return toHabit(habit);
  }

  async create(data) {
    const habit = await this.prisma.habit.create({
      data: {
        name: data.name,
        userId: data.userId
      },
      include: { completions: true }
    });

    return toHabit(habit);
  }

  async update(id, userId, data) {
    const habitId = Number(id);
    const existingHabit = await this.findById(habitId, userId);

    if (!existingHabit) return null;

    if (data.name !== undefined) {
      await this.prisma.habit.update({
        where: { id: habitId },
        data: { name: data.name }
      });
    }

    if (Array.isArray(data.completedDates)) {
      const completedDates = data.completedDates.map(toDateKey);

      if (completedDates.length > 0) {
        await this.prisma.habitCompletion.deleteMany({
          where: {
            habitId,
            completedDate: {
              notIn: completedDates.map((date) => new Date(date))
            }
          }
        });
      } else {
        await this.prisma.habitCompletion.deleteMany({
          where: { habitId }
        });
      }

      await Promise.all(completedDates.map((date) => (
        this.prisma.habitCompletion.upsert({
          where: {
            habitId_completedDate: {
              habitId,
              completedDate: new Date(date)
            }
          },
          update: {},
          create: {
            habitId,
            userId,
            completedDate: new Date(date)
          }
        })
      )));
    }

    return this.findById(habitId, userId);
  }

  async remove(id, userId) {
    const habit = await this.findById(id, userId);

    if (!habit) return false;

    await this.prisma.habit.delete({
      where: { id: Number(id) }
    });

    return true;
  }
}

module.exports = HabitRepository;
