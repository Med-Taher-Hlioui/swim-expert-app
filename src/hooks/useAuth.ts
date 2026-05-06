import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { UserRole } from '../types/auth';

export function useAuth() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [xp, setXpState] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) loadProfile(session.user.id);
      else setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) loadProfile(session.user.id);
      else {
        setUserRole(null);
        setUserName('');
        setUserId(null);
        setXpState(0);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadProfile(id: string) {
    const { data } = await supabase
      .from('profiles')
      .select('name, role, xp')
      .eq('id', id)
      .single();

    if (data) {
      setUserRole(data.role as UserRole);
      setUserName(data.name);
      setUserId(id);
      setXpState(data.xp ?? 0);
    }
    setLoading(false);
  }

  async function setXp(newXp: number | ((prev: number) => number)) {
    const resolved = typeof newXp === 'function' ? newXp(xp) : newXp;
    setXpState(resolved);

    if (userId) {
      await supabase
        .from('profiles')
        .update({ xp: resolved })
        .eq('id', userId);
    }
  }

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signup(email: string, password: string, name: string, role: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role } }
    });
    if (error) throw error;

    if (data.user) {
      await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: data.user.id, name, role })
      });
    }
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  return { userRole, userName, userId, xp, setXp, loading, login, signup, logout };
}