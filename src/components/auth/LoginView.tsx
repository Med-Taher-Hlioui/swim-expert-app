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

interface BiometricData {
  weight: string;
  weightUnit: 'kg' | 'lbs';
  height: string;
  heightUnit: 'cm' | 'ft';
  dateOfBirth: string;
  gender: 'male' | 'female' | '';
}

export default function LoginView({ onLoginSubmit, onSignup }: LoginProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [step, setStep] = useState<'auth' | 'biometrics'>('auth');

  // Auth fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'athlete' | 'coach' | 'parent'>('athlete');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Biometric fields
  const [biometrics, setBiometrics] = useState<BiometricData>({
    weight: '',
    weightUnit: 'kg',
    height: '',
    heightUnit: 'cm',
    dateOfBirth: '',
    gender: ''
  });
  const [savingBiometrics, setSavingBiometrics] = useState(false);

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
        // If athlete, show biometrics step
        if (role === 'athlete') {
          setStep('biometrics');
        } else {
          setSuccess('Account created! Welcome to SwimExpert 🎉');
        }
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBiometrics = async () => {
    if (!biometrics.gender || !biometrics.dateOfBirth) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSavingBiometrics(true);

    // Wait for session to be available
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error('Session not found. Please try again.');
      setSavingBiometrics(false);
      return;
    }

    // Convert units if needed
    const weightKg = biometrics.weightUnit === 'lbs' 
      ? parseFloat(biometrics.weight) * 0.453592 
      : parseFloat(biometrics.weight);

    const heightCm = biometrics.heightUnit === 'ft'
      ? parseFloat(biometrics.height) * 30.48
      : parseFloat(biometrics.height);

    const { error } = await supabase
      .from('athlete_profiles')
      .insert({
        id: session.user.id,
        weight_kg: weightKg || null,
        height_cm: heightCm || null,
        date_of_birth: biometrics.dateOfBirth || null,
        gender: biometrics.gender || null,
        weight_unit: biometrics.weightUnit,
        height_unit: biometrics.heightUnit,
      });

    if (!error) {
      toast.success('Profile complete! Welcome to SwimExpert 🏊');
    } else {
      toast.error('Could not save biometrics, you can update them later');
    }
    setSavingBiometrics(false);
    // Auth state change will handle redirect automatically
  };

  const handleSkipBiometrics = () => {
    toast('You can add biometrics later in your profile', { icon: 'ℹ️' });
    // Auth state change will handle redirect automatically
  };

  // --- BIOMETRICS STEP ---
  if (step === 'biometrics') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative">
        <div className="w-full max-w-lg space-y-8 animate-in fade-in zoom-in duration-700">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-4xl mb-2">🏊‍♂️</div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-blue-500">
              Athlete Profile
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
              Step 2 of 2 — Biometric Data
            </p>
            <div className="flex gap-2 justify-center">
              <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
              <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6">

            {/* Gender */}
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                <User size={12} /> Gender *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['male', 'female'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setBiometrics(b => ({ ...b, gender: g }))}
                    className={`py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                      biometrics.gender === g 
                        ? 'bg-blue-600 border-blue-500 text-white' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {g === 'male' ? '♂ Male' : '♀ Female'}
                  </button>
                ))}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                <Calendar size={12} /> Date of Birth *
              </label>
              <input
                type="date"
                value={biometrics.dateOfBirth}
                onChange={e => setBiometrics(b => ({ ...b, dateOfBirth: e.target.value }))}
                max={new Date().toISOString().split('T')[0]}
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* Weight */}
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                <Scale size={12} /> Weight
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={biometrics.weight}
                  onChange={e => setBiometrics(b => ({ ...b, weight: e.target.value }))}
                  placeholder={biometrics.weightUnit === 'kg' ? '70' : '154'}
                  className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
                />
                <div className="flex bg-slate-950 border border-slate-800 rounded-2xl p-1">
                  {(['kg', 'lbs'] as const).map(u => (
                    <button
                      key={u}
                      onClick={() => setBiometrics(b => ({ ...b, weightUnit: u }))}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                        biometrics.weightUnit === u ? 'bg-blue-600 text-white' : 'text-slate-500'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Height */}
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                <Ruler size={12} /> Height
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={biometrics.height}
                  onChange={e => setBiometrics(b => ({ ...b, height: e.target.value }))}
                  placeholder={biometrics.heightUnit === 'cm' ? '175' : '5.9'}
                  className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
                />
                <div className="flex bg-slate-950 border border-slate-800 rounded-2xl p-1">
                  {(['cm', 'ft'] as const).map(u => (
                    <button
                      key={u}
                      onClick={() => setBiometrics(b => ({ ...b, heightUnit: u }))}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                        biometrics.heightUnit === u ? 'bg-blue-600 text-white' : 'text-slate-500'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* BMI Preview */}
            {biometrics.weight && biometrics.height && (
              <div className="bg-slate-950 border border-blue-500/20 p-4 rounded-2xl">
                {(() => {
                  const weightKg = biometrics.weightUnit === 'lbs' 
                    ? parseFloat(biometrics.weight) * 0.453592 
                    : parseFloat(biometrics.weight);
                  const heightM = biometrics.heightUnit === 'ft'
                    ? parseFloat(biometrics.height) * 0.3048
                    : parseFloat(biometrics.height) / 100;
                  const bmi = weightKg / (heightM * heightM);
                  const bmiLabel = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Optimal' : bmi < 30 ? 'Overweight' : 'Obese';
                  const bmiColor = bmi < 18.5 ? 'text-amber-500' : bmi < 25 ? 'text-green-500' : 'text-red-500';
                  return (
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">BMI Preview</span>
                      <div className="text-right">
                        <span className={`text-lg font-black italic ${bmiColor}`}>{bmi.toFixed(1)}</span>
                        <span className={`text-[9px] font-black uppercase ml-2 ${bmiColor}`}>{bmiLabel}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSkipBiometrics}
                className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all border border-slate-800"
              >
                Skip for now
              </button>
              <button
                onClick={handleSaveBiometrics}
                disabled={savingBiometrics || !biometrics.gender || !biometrics.dateOfBirth}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {savingBiometrics 
                  ? <><Loader2 size={14} className="animate-spin" /> Saving...</>
                  : <>Complete Profile <ChevronRight size={14} /></>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTH STEP ---
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
              className="w-full bg-blue-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : mode === 'login' ? '🚀 Sign In' : '✨ Create Account'}
            </button>
          </div>

          {/* Role selector */}
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