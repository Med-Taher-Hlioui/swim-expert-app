import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { LanguageSwitcher } from '../LanguageSwitcher';
import type { UserRole } from '../../types/auth';
import toast from 'react-hot-toast';
import { Loader2, ChevronRight, Scale, Ruler, Calendar, User } from 'lucide-react';

interface LoginProps {
  onLogin: (role: Exclude<UserRole, null>, name: string) => void;
  onLoginSubmit: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string, name: string, role: string) => Promise<void>;
}

export default function LoginView({ onLoginSubmit, onSignup }: LoginProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // --- AUTH FIELDS ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'athlete' | 'coach' | 'parent'>('athlete');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- BIOMETRIC FIELDS (athlete only) ---
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');

  const roles: { id: 'athlete' | 'coach' | 'parent'; titleKey: string; icon: string; descKey: string }[] = [
    { id: 'athlete', titleKey: 'athlete', icon: '🏊‍♂️', descKey: 'desc.athlete_login' },
    { id: 'coach', titleKey: 'coach', icon: '📋', descKey: 'desc.coach_login' },
    { id: 'parent', titleKey: 'parent', icon: '👪', descKey: 'desc.parent_login' },
  ];

  // --- BMI CALCULATOR ---
  const getBMI = () => {
    if (!weight || !height) return null;
    const weightKg = weightUnit === 'lbs' ? parseFloat(weight) * 0.453592 : parseFloat(weight);
    const heightM = heightUnit === 'ft' ? parseFloat(height) * 0.3048 : parseFloat(height) / 100;
    const bmi = weightKg / (heightM * heightM);
    if (isNaN(bmi) || !isFinite(bmi)) return null;
    const label = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Optimal' : bmi < 30 ? 'Overweight' : 'Obese';
    const color = bmi < 18.5 ? 'text-amber-500' : bmi < 25 ? 'text-green-500' : 'text-red-500';
    return { value: bmi.toFixed(1), label, color };
  };

  const handleSubmit = async () => {
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (mode === 'signup' && !name) { setError('Please enter your name'); return; }
    if (mode === 'signup' && role === 'athlete' && !gender) { setError('Please select your gender'); return; }
    if (mode === 'signup' && role === 'athlete' && !dateOfBirth) { setError('Please enter your date of birth'); return; }

    setLoading(true);
    try {
      if (mode === 'login') {
        await onLoginSubmit(email, password);
      } else {
        await onSignup(email, password, name, role);

        // Save biometrics for athletes
        if (role === 'athlete') {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const weightKg = weightUnit === 'lbs' ? parseFloat(weight) * 0.453592 : parseFloat(weight);
            const heightCm = heightUnit === 'ft' ? parseFloat(height) * 30.48 : parseFloat(height);

            await supabase.from('athlete_profiles').insert({
              id: session.user.id,
              weight_kg: weightKg || null,
              height_cm: heightCm || null,
              date_of_birth: dateOfBirth || null,
              gender: gender || null,
              weight_unit: weightUnit,
              height_unit: heightUnit,
            });
          }
        }
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const bmi = getBMI();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-10">
        <LanguageSwitcher />
      </div>

      <div className="max-w-5xl w-full space-y-10 animate-in fade-in zoom-in duration-700">

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
            <button key={m} onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              {m === 'login' ? '🔑 Sign In' : '✨ Sign Up'}
            </button>
          ))}
        </div>

        <div className={`grid gap-8 items-start ${mode === 'signup' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto w-full'}`}>

          {/* LEFT — Main Form */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-4">

            {mode === 'signup' && (
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600" />
            )}

            <input value={email} onChange={e => setEmail(e.target.value)}
              type="email" placeholder="Email"
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600" />

            <input value={password} onChange={e => setPassword(e.target.value)}
              type="password" placeholder="Password"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600" />

            {/* ATHLETE BIOMETRICS — shown inline when role is athlete */}
            {mode === 'signup' && role === 'athlete' && (
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest">🏊 Athlete Biometrics</p>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-1">
                    <User size={10} /> Gender *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['male', 'female'] as const).map(g => (
                      <button key={g} onClick={() => setGender(g)}
                        className={`py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${gender === g ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                        {g === 'male' ? '♂ Male' : '♀ Female'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-1">
                    <Calendar size={10} /> Date of Birth *
                  </label>
                  <input type="date" value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all" />
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-1">
                    <Scale size={10} /> Weight
                  </label>
                  <div className="flex gap-2">
                    <input type="number" value={weight}
                      onChange={e => setWeight(e.target.value)}
                      placeholder={weightUnit === 'kg' ? '70' : '154'}
                      className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600" />
                    <div className="flex bg-slate-950 border border-slate-800 rounded-2xl p-1">
                      {(['kg', 'lbs'] as const).map(u => (
                        <button key={u} onClick={() => setWeightUnit(u)}
                          className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${weightUnit === u ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-1">
                    <Ruler size={10} /> Height
                  </label>
                  <div className="flex gap-2">
                    <input type="number" value={height}
                      onChange={e => setHeight(e.target.value)}
                      placeholder={heightUnit === 'cm' ? '175' : '5.9'}
                      className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600" />
                    <div className="flex bg-slate-950 border border-slate-800 rounded-2xl p-1">
                      {(['cm', 'ft'] as const).map(u => (
                        <button key={u} onClick={() => setHeightUnit(u)}
                          className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${heightUnit === u ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BMI Preview */}
                {bmi && (
                  <div className="bg-slate-950 border border-blue-500/20 p-4 rounded-2xl flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">BMI Preview</span>
                    <div>
                      <span className={`text-lg font-black italic ${bmi.color}`}>{bmi.value}</span>
                      <span className={`text-[9px] font-black uppercase ml-2 ${bmi.color}`}>{bmi.label}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3">
                <p className="text-red-400 text-xs font-bold text-center">{error}</p>
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2">
              {loading 
                ? <><Loader2 size={16} className="animate-spin" /> Loading...</>
                : mode === 'login' ? '🚀 Sign In' : '✨ Create Account'
              }
            </button>
          </div>

          {/* RIGHT — Role Selector */}
          {mode === 'signup' ? (
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">
                Select your role
              </p>
              {roles.map((r) => (
                <button key={r.id} onClick={() => setRole(r.id)}
                  className={`w-full bg-slate-900 border p-5 rounded-[2rem] text-start transition-all active:scale-95 ${role === r.id ? 'border-blue-500 bg-blue-600/5' : 'border-slate-800 hover:border-slate-600'}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{r.icon}</span>
                    <div>
                      <h3 className="text-sm font-black italic uppercase text-white tracking-tighter">{t(r.titleKey)}</h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">{t(r.descKey)}</p>
                    </div>
                    {role === r.id && <span className="ml-auto text-blue-500 font-black text-lg">✓</span>}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {roles.map((r) => (
                <div key={r.id} className="bg-slate-900 border border-slate-800 p-5 rounded-[2rem] flex items-center gap-4 opacity-60">
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