import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';
import type { UserRole } from '../../types/auth';

interface LoginProps {
  onLogin: (role: Exclude<UserRole, null>, name: string) => void;
  onLoginSubmit: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string, name: string, role: string) => Promise<void>;
}

export default function LoginView({ onLoginSubmit, onSignup }: LoginProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'athlete' | 'coach' | 'parent'>('athlete');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const roles: { id: 'athlete' | 'coach' | 'parent'; titleKey: string; icon: string; descKey: string }[] = [
    { id: 'athlete', titleKey: 'athlete', icon: '🏊‍♂️', descKey: 'desc.athlete_login' },
    { id: 'coach', titleKey: 'coach', icon: '📋', descKey: 'desc.coach_login' },
    { id: 'parent', titleKey: 'parent', icon: '👪', descKey: 'desc.parent_login' },
  ];

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (mode === 'signup' && !name) { setError('Please enter your name'); return; }

    setLoading(true);
    try {
      if (mode === 'login') {
        await onLoginSubmit(email, password);
      } else {
        await onSignup(email, password, name, role);
        setSuccess('Account created! Please check your email to confirm your account.');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-10">
        <LanguageSwitcher />
      </div>

      <div className="max-w-4xl w-full space-y-10 animate-in fade-in zoom-in duration-700">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-blue-500">SwimExpert</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">
            {t('deck_subtitle', 'Elite Performance Ecosystem')}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 max-w-xs mx-auto">
          {(['login', 'signup'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              {m === 'login' ? '🔑 Sign In' : '✨ Sign Up'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Form */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-4">

            {mode === 'signup' && (
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
              />
            )}

            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
            />

            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
            />

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3">
                <p className="text-red-400 text-xs font-bold text-center">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-3">
                <p className="text-green-400 text-xs font-bold text-center">{success}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Loading...' : mode === 'login' ? '🚀 Sign In' : '✨ Create Account'}
            </button>
          </div>

          {/* Role selector — signup only */}
          {mode === 'signup' ? (
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                Select your role
              </p>
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`w-full bg-slate-900 border p-5 rounded-[2rem] text-start transition-all group relative overflow-hidden active:scale-95 ${role === r.id ? 'border-blue-500 bg-blue-600/5' : 'border-slate-800 hover:border-slate-600'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{r.icon}</span>
                    <div>
                      <h3 className="text-sm font-black italic uppercase text-white tracking-tighter">{t(r.titleKey)}</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
                        {t(r.descKey)}
                      </p>
                    </div>
                    {role === r.id && (
                      <span className="ml-auto text-blue-500 font-black text-lg">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Login mode — show role cards as visual only */
            <div className="grid grid-cols-1 gap-4">
              {roles.map((r) => (
                <div
                  key={r.id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-[2rem] flex items-center gap-4 opacity-60"
                >
                  <span className="text-3xl">{r.icon}</span>
                  <div>
                    <h3 className="text-sm font-black italic uppercase text-white tracking-tighter">{t(r.titleKey)}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t(r.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
          {t('ui.footer')}
        </p>
      </div>
    </div>
  );
}