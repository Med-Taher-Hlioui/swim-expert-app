import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import ParentHub from './components/parent/ParentHub'; 
import WellnessMonitor from './components/parent/WellnessMonitor'; // Ensure this exists
import GearAudit from './components/parent/GearAudit';           // Ensure this exists
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
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [xp, setXp] = useState(1250);
  const [activePage, setActivePage] = useState('pool');

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
    
    // Set initial page based on role
    if (role === 'coach') setActivePage('squad');
    else if (role === 'parent') setActivePage('monitoring');
    else setActivePage('pool');

    confetti({
      particleCount: 100, spread: 70, origin: { y: 0.8 },
      colors: ['#3b82f6', '#10b981', '#f97316']
    });
  };

  if (!userRole) return <LoginView onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      <Navbar activePage={activePage} setActivePage={setActivePage} userRole={userRole} />
      
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
          <button onClick={() => setUserRole(null)} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[8px] font-black hover:border-red-500 transition-all text-slate-500 hover:text-red-500 group">
            <span className="group-hover:scale-110 transition-transform">{t('ui.out')}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 pt-10 pb-20">
        
        {/* --- ATHLETE ROUTER --- */}
        {userRole === 'athlete' && (
          <div className="animate-in fade-in duration-500">
            {activePage === 'pool' && <Dashboard setPage={setActivePage} xp={xp} setXp={setXp} level={calculateLevel(xp)} dailyTip={t('technical.streamline')} />}
            {activePage === 'strategy' && <RaceStrategy />}
            {activePage === 'gear' && <GearLocker />}
            
            {activePage === 'nutrition' && (
              <NutritionDeck 
                role="athlete" 
                burned={burned} 
                consumed={consumed} 
                hydration={hydration}
                setBurned={setBurned}
                setConsumed={setConsumed}
                setHydration={setHydration}
              />
            )}

            {activePage === 'news' && <SwimNews />}
            {activePage === 'drills' && <DrillLibrary />}
            {activePage === 'workout' && <CoachConsole engine={engine} />}
            {activePage === 'dryland' && <DrylandDeck setXp={setXp} />}
            {activePage === 'contact' && <Contact />}
          </div>
        )}

        {/* --- COACH ROUTER --- */}
        {userRole === 'coach' && (
          <div className="animate-in fade-in duration-500">
            {activePage === 'squad' && <SquadCommand />}
            {activePage === 'drills' && <DrillLibrary />}
            {activePage === 'dryland' && <DrylandDeck setXp={setXp} />}
            {activePage === 'news' && <SwimNews />}
            {activePage === 'contact' && <Contact />}
          </div>
        )}

        {/* --- PARENT ROUTER --- */}
        {userRole === 'parent' && (
          <div className="animate-in fade-in duration-500">
            {/* Primary Dashboard */}
            {activePage === 'monitoring' && <ParentHub />} 
            
            {/* Wellness & Health Monitoring */}
            {activePage === 'wellness' && <WellnessMonitor />}

            {/* Equipment Auditing */}
            {activePage === 'gear_audit' && <GearAudit />}

            {/* Parent Monitoring of Nutrition */}
            {activePage === 'nutrition' && (
              <NutritionDeck 
                role="parent" 
                burned={burned} 
                consumed={consumed} 
                hydration={hydration}
                setBurned={setBurned}
                setConsumed={setConsumed}
                setHydration={setHydration}
              />
            )}

            {activePage === 'news' && <SwimNews />}
            {activePage === 'contact' && <Contact />}
          </div>
        )}

      </main>
    </div>
  );
}