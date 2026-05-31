import api from './api';

function fromApiHabit(h) {
  return {
    id: String(h.id),
    title: h.name ?? '',
    done: Boolean(h.completed),
    // campos opcionais que hoje a UI usa em alguns lugares
    habitName: h.name ?? '',
  };
}

function toApiHabitPayload(uiHabit) {
  const payload = {};
  if (typeof uiHabit?.title === 'string') payload.name = uiHabit.title;
  if (typeof uiHabit?.done === 'boolean') payload.completed = uiHabit.done;
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

