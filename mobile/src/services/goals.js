import api from './api';

export function normalizeProgress(progress) {
  const value = Number(progress ?? 0);
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function isGoalCompleted(goal) {
  return goal?.status === 'concluido' || normalizeProgress(goal?.progress) >= 100;
}

export function formatGoalFrequency(frequency) {
  const value = frequency ?? 'Diário';
  return typeof value === 'number' ? `${value}x` : String(value);
}

function fromApiGoal(goal) {
  return {
    id: String(goal.id),
    name: goal.name ?? '',
    period: goal.period ?? 'diario',
    frequency: goal.frequency ?? 'Diário',
    habitId: goal.habitId !== undefined && goal.habitId !== null ? String(goal.habitId) : null,
    progress: normalizeProgress(goal.progress),
    status: isGoalCompleted(goal) ? 'concluido' : 'ativo',
    createdAt: goal.createdAt,
  };
}

export async function listGoals() {
  const response = await api.get('/goals');
  const data = Array.isArray(response.data?.goals) ? response.data.goals : [];
  return data
    .map(fromApiGoal)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (dateA !== dateB) return dateB - dateA;
      return Number(b.id) - Number(a.id);
    });
}

export async function createGoal({ name, period, frequency, habitId }) {
  const payload = {
    name,
    period,
    frequency,
  };

  if (habitId) {
    payload.habitId = habitId;
  }

  const response = await api.post('/goals', payload);

  return fromApiGoal(response.data.goal);
}

export async function deleteGoal(id) {
  await api.delete(`/goals/${id}`);
}
