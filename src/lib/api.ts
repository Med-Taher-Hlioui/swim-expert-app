import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function authFetch(path: string, options: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`,
      ...options.headers,
    }
  });
}

export const api = {
  getProfile: () => authFetch('/profile/me').then(r => r.json()),
  updateXp: (xp: number) => authFetch('/profile/xp', {
    method: 'PATCH',
    body: JSON.stringify({ xp })
  }).then(r => r.json()),
  getAthletes: () => authFetch('/athletes').then(r => r.json()),
  getNutrition: () => authFetch('/nutrition').then(r => r.json()),
  logNutrition: (data: { burned: number; consumed: number; hydration: number }) =>
    authFetch('/nutrition', { method: 'POST', body: JSON.stringify(data) }).then(r => r.json()),
  getWorkouts: () => authFetch('/workouts').then(r => r.json()),
  createWorkout: (data: { title: string; content: string }) =>
    authFetch('/workouts', { method: 'POST', body: JSON.stringify(data) }).then(r => r.json()),
};