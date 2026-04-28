import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// 1. Add these Router imports
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { UserRole } from './types/auth';
import { SwimCoachEngine } from './lib/engine';
import { calculateLevel } from './lib/xp'; 
import confetti from 'canvas-confetti';

// --- COMPONENT IMPORTS ---
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LoginView from './components/auth/LoginView';
import DrylandDeck from './components/DrylandDeck';
import SquadCommand from './components/coach/SquadCommand';
import SquadManager from './components/coach/Management/SquadManager';
import WorkloadDetails from './components/coach/Load/WorkloadDetails';
import AthleteLab from './components/coach/Analysis/AthleteLab';
import ChronoDeck from './components/coach/Timing/ChronoDeck';
import EliteBoard from './components/coach/Rankings/EliteBoard';
import ParentHub from './components/parent/ParentHub'; 
import WellnessMonitor from './components/parent/WellnessMonitor'; 
import GearAudit from './components/parent/GearAudit'; 
import DrillLibrary from './components/DrillLibrary';
import CoachConsole from './components/CoachConsole';
import SwimNews from './components/SwimNews';
import NutritionDeck from './components/NutritionDeck';
import Contact from './components/Contact';
import RaceStrategy from './components/RaceStrategy';
import GearLocker from './components/GearLocker';
import { LanguageSwitcher } from './components/LanguageSwitcher';

const engine = new SwimCoachEngine();

export default function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [xp, setXp] = useState(1250);

  // --- NUTRITION & HYDRATION STATE ---
  const [burned, setBurned] = useState(0);
  const [consumed, setConsumed] = useState(0);
  const [hydration, setHydration] = useState(0);

  useEffect(() => {
    const key = (import.meta as any).env.VITE_GEMINI_API_KEY;
    if (key) engine.initialize(key);
  }, []);

  const handleLogin = (role: Exclude<UserRole, null>, name: string) => {
    setUserRole(role);
    setUserName(name);
    
    // 2. Use navigate() instead of setActivePage for initial login
    if (role === 'coach') navigate('/coach/squad');
    else if (role === 'parent') navigate('/parent/monitoring');
    else navigate('/athlete/pool');

    confetti({
      particleCount: 100, spread: 70, origin: { y: 0.8 },
      colors: ['#3b82f6', '#10b981', '#f97316']
    });
  };

  if (!userRole) return <LoginView onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* 3. Navbar now handles navigation internally via Links/Navigate */}
      <Navbar userRole={userRole} />
      
      <header className="py-6 px-6 sticky top-0 z-40 bg-slate-950/50 backdrop-blur-sm flex justify-between items-center">
        <LanguageSwitcher />

        <div className="flex items-center gap-6">
          <div className="text-start">
            <div className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-none mb-1">{userName}</div>
            <div className="flex items-center gap-2 justify-end">
               <span className={`w-2 h-2 rounded-full animate-pulse ${userRole === 'coach' ? 'bg-purple-500' : userRole === 'parent' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
               <div className="text-xs font-black italic uppercase text-white tracking-tighter">
                {t(userRole)} {t('ui.mode')}
               </div>
            </div>
          </div>
          <button onClick={() => { setUserRole(null); navigate('/'); }} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[8px] font-black hover:border-red-500 transition-all text-slate-500 hover:text-red-500 group">
            <span className="group-hover:scale-110 transition-transform">{t('ui.out')}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 pt-10 pb-20">
        
        {/* 4. Implement the Routes Switch */}
        <Routes>
          {/* --- ATHLETE ROUTES --- */}
          {userRole === 'athlete' && (
            <Route path="/athlete">
              <Route path="pool" element={<Dashboard setPage={(p) => navigate(`/athlete/${p}`)} xp={xp} setXp={setXp} level={calculateLevel(xp)} dailyTip={t('technical.streamline')} />} />
              <Route path="strategy" element={<RaceStrategy />} />
              <Route path="gear" element={<GearLocker />} />
              <Route path="nutrition" element={<NutritionDeck role="athlete" burned={burned} consumed={consumed} hydration={hydration} setBurned={setBurned} setConsumed={setConsumed} setHydration={setHydration} />} />
              <Route path="news" element={<SwimNews />} />
              <Route path="drills" element={<DrillLibrary />} />
              <Route path="workout" element={<CoachConsole engine={engine} />} />
              <Route path="dryland" element={<DrylandDeck setXp={setXp} />} />
              <Route path="contact" element={<Contact />} />
              <Route index element={<Navigate to="pool" />} />
            </Route>
          )}

          {/* --- COACH ROUTES --- */}
          {userRole === 'coach' && (
            <Route path="/coach">
              <Route path="squad" element={<SquadCommand />} />
              <Route path="manager" element={<SquadManager />} />
              <Route path="workload" element={<WorkloadDetails />} />
              <Route path="analysis" element={<AthleteLab />} />
              <Route path="chrono" element={<ChronoDeck />} />
              <Route path="rankings" element={<EliteBoard />} />
              <Route path="drills" element={<DrillLibrary />} />
              <Route path="dryland" element={<DrylandDeck setXp={setXp} />} />
              <Route path="news" element={<SwimNews />} />
              <Route path="contact" element={<Contact />} />
              <Route index element={<Navigate to="squad" />} />
            </Route>
          )}

          {/* --- PARENT ROUTES --- */}
          {userRole === 'parent' && (
            <Route path="/parent">
              <Route path="monitoring" element={<ParentHub />} /> 
              <Route path="wellness" element={<WellnessMonitor />} />
              <Route path="gear_audit" element={<GearAudit />} />
              <Route path="nutrition" element={<NutritionDeck role="parent" burned={burned} consumed={consumed} hydration={hydration} setBurned={setBurned} setConsumed={setConsumed} setHydration={setHydration} />} />
              <Route path="news" element={<SwimNews />} />
              <Route path="contact" element={<Contact />} />
              <Route index element={<Navigate to="monitoring" />} />
            </Route>
          )}

          {/* Global Fallback */}
          <Route path="*" element={<Navigate to={userRole ? `/${userRole}` : "/"} />} />
        </Routes>

      </main>
    </div>
  );
}