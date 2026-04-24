import { useState, useEffect } from 'react';
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
import WellnessMonitor from './components/parent/WellnessMonitor';
import GearAudit from './components/parent/GearAudit';
import ParentFuelDeck from './components/parent/ParentFuelDeck'; 
import DrillLibrary from './components/DrillLibrary';
import CoachConsole from './components/CoachConsole';
import SwimNews from './components/SwimNews';
import NutritionDeck from './components/NutritionDeck';
import Contact from './components/Contact';
import RaceStrategy from './components/RaceStrategy';
import GearLocker from './components/GearLocker';

const engine = new SwimCoachEngine();

export default function App() {
  // --- AUTH & PROFILE STATE ---
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [xp, setXp] = useState(1250);
  const [activePage, setActivePage] = useState('pool');

  // --- SHARED RECOVERY STATE (Syncs Athlete & Parent) ---
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [hydrationML, setHydrationML] = useState(0);

  // --- INITIALIZATION ---
  useEffect(() => {
    // FIX: Using (import.meta as any) to bypass the TypeScript env existence error
    const key = (import.meta as any).env.VITE_GEMINI_API_KEY;
    if (key) engine.initialize(key);
  }, []);

  // --- LOGIN HANDLER ---
  const handleLogin = (role: Exclude<UserRole, null>, name: string) => {
    setUserRole(role);
    setUserName(name);
    
    // Initial routing based on user type
    if (role === 'coach') setActivePage('squad');
    else if (role === 'parent') setActivePage('monitoring');
    else setActivePage('pool');

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#3b82f6', '#10b981', '#f97316']
    });
  };

  // GATEKEEPER: LOGIN
  if (!userRole) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <Navbar activePage={activePage} setActivePage={setActivePage} userRole={userRole} />
      
      {/* 2. PERSISTENT HEADER */}
      <header className="py-6 px-6 sticky top-0 z-40 bg-slate-950/50 backdrop-blur-sm flex justify-end">
        <div className="max-w-7xl w-full flex justify-end items-center gap-6">
          <div className="text-right">
            <div className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-none mb-1">
              {userName}
            </div>
            <div className="flex items-center gap-2 justify-end">
               <span className={`w-2 h-2 rounded-full animate-pulse ${
                 userRole === 'coach' ? 'bg-purple-500' : 
                 userRole === 'parent' ? 'bg-orange-500' : 'bg-blue-500'
               }`}></span>
               <div className="text-xs font-black italic uppercase text-white tracking-tighter">
                {userRole} Mode
               </div>
            </div>
          </div>
          <button 
            onClick={() => setUserRole(null)}
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[8px] font-black hover:border-red-500 transition-all text-slate-500 hover:text-red-500 shadow-xl group"
          >
            <span className="group-hover:scale-110 transition-transform">OUT</span>
          </button>
        </div>
      </header>

      {/* 3. MAIN CONTENT ROUTER */}
      <main className="max-w-7xl mx-auto p-6 pt-10 pb-20">
        
        {/* --- ATHLETE VIEW --- */}
        {userRole === 'athlete' && (
          <div className="animate-in fade-in duration-500">
            {activePage === 'pool' && <Dashboard setPage={setActivePage} xp={xp} setXp={setXp} level={calculateLevel(xp)} dailyTip="Optimize your streamline." />}
            {activePage === 'strategy' && <RaceStrategy />}
            {activePage === 'gear' && <GearLocker />}
            {activePage === 'nutrition' && (
              <NutritionDeck 
                role="athlete" 
                burned={caloriesBurned} 
                consumed={caloriesConsumed} 
                hydration={hydrationML}
                setBurned={setCaloriesBurned} 
                setConsumed={setCaloriesConsumed} 
                setHydration={setHydrationML}
              />
            )}
            {activePage === 'news' && <SwimNews />}
            {activePage === 'drills' && <DrillLibrary />}
            {activePage === 'workout' && <CoachConsole engine={engine} />}
            {activePage === 'dryland' && <DrylandDeck setXp={setXp} />}
            {activePage === 'contact' && <Contact />}
          </div>
        )}

        {/* --- COACH VIEW --- */}
        {userRole === 'coach' && (
          <div className="animate-in fade-in duration-500">
            {activePage === 'squad' && <SquadCommand />}
            {activePage === 'drills' && <DrillLibrary />}
            {activePage === 'dryland' && <DrylandDeck setXp={setXp} />}
            {activePage === 'news' && <SwimNews />}
            {activePage === 'contact' && <Contact />}
          </div>
        )}

        {/* --- PARENT VIEW --- */}
        {userRole === 'parent' && (
          <div className="animate-in fade-in duration-500">
            {activePage === 'monitoring' && <ParentHub />} 
            {activePage === 'wellness' && <WellnessMonitor />}
            {activePage === 'gear_audit' && <GearAudit />}
            {activePage === 'nutrition' && (
              <ParentFuelDeck 
                burned={caloriesBurned} 
                consumed={caloriesConsumed} 
                hydration={hydrationML}
                setConsumed={setCaloriesConsumed} 
                setHydration={setHydrationML}
              />
            )}
            {activePage === 'news' && <SwimNews />}
            {activePage === 'contact' && <Contact />}
          </div>
        )}

      </main>

      <footer className="py-12 text-center opacity-30 text-white">
        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
          SwimExpert Ecosystem | Developed for Sousse Elite Athletics
        </p>
      </footer>
    </div>
  );
}