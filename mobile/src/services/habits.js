import api from './api';

export function toDateKey(date = new Date()) {
  return new Date(date).toISOString().split('T')[0];
}

export function isHabitAvailableOnDate(habit, dateKey) {
  if (!habit?.createdAt) return true;
  return toDateKey(habit.createdAt) <= dateKey;
}

export function isHabitDoneOnDate(habit, dateKey) {
  return Array.isArray(habit?.completedDates) && habit.completedDates.includes(dateKey);
}

function fromApiHabit(h) {
  const completedDates = Array.isArray(h.completedDates) ? h.completedDates : [];
  return {
    id: String(h.id),
    title: h.name ?? '',
    done: Boolean(h.completed),
    completedDates,
    createdAt: h.createdAt,
    // campos opcionais que hoje a UI usa em alguns lugares
    habitName: h.name ?? '',
  };
}

function toApiHabitPayload(uiHabit) {
  const payload = {};
  if (typeof uiHabit?.title === 'string') payload.name = uiHabit.title;
  if (typeof uiHabit?.done === 'boolean') payload.completed = uiHabit.done;
  if (typeof uiHabit?.date === 'string') payload.date = uiHabit.date;
  return payload;
}

export async function listHabits() {
  const response = await api.get('/habits');
  const data = Array.isArray(response.data) ? response.data : [];
  return data.map(fromApiHabit);
}

export async function createHabit({ title }) {
  const response = await api.post('/habits', { name: title });
  return fromApiHabit(response.data);
}

export async function updateHabit(id, patch) {
  const response = await api.put(`/habits/${id}`, toApiHabitPayload(patch));
  return fromApiHabit(response.data);
}

export async function deleteHabit(id) {
  await api.delete(`/habits/${id}`);
}
