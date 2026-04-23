import { useState, useEffect } from 'react';
import { SwimCoachEngine } from './lib/engine';
import { calculateLevel } from './lib/xp'; 
import confetti from 'canvas-confetti';

// Import Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import DrillLibrary from './components/DrillLibrary';
import CoachConsole from './components/CoachConsole';
import StatsLog from './components/StatsLog';
import GearLocker from './components/GearLocker';
import RaceStrategy from './components/RaceStrategy';
import NutritionDeck from './components/NutritionDeck';
import Contact from './components/Contact';
import SwimNews from './components/SwimNews';
import DrylandDeck from './components/DrylandDeck';

const engine = new SwimCoachEngine();

export default function App() {
  const [activePage, setActivePage] = useState<'pool' | 'drills' | 'workout' | 'progress' | 'gear' | 'strategy' | 'nutrition' | 'contact' | 'news' | 'dryland'>('pool');
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(3);
  const [dailyTip, setDailyTip] = useState("Focus on your rotation to reduce drag.");

  useEffect(() => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (key) {
      engine.initialize(key);
      engine.getDailyTip().then(tip => setDailyTip(tip)).catch(() => console.log("AI Quota hit."));
    }
  }, []);

  useEffect(() => {
    const newLevel = calculateLevel(xp);
    if (newLevel > level) {
      setLevel(newLevel);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#3b82f6', '#fbbf24', '#ffffff'] });
    }
  }, [xp, level]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* 1. THE SIDEBAR NAVIGATION COMPONENT */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* 2. ATHLETE STATS HEADER (Updated to be cleaner) */}
      <header className="py-6 px-6 sticky top-0 z-40 bg-slate-950/50 backdrop-blur-sm flex justify-end">
        <div className="max-w-7xl w-full flex justify-end items-center gap-6">
          <div className="text-right">
            <div className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Athlete Level</div>
            <div className="text-xs font-black italic uppercase text-blue-500">LVL {level} ELITE</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-xs border-2 border-white/10 shadow-lg text-white">
            MT
          </div>
        </div>
      </header>

      {/* 3. MAIN CONTENT (Padding adjusted for the lack of bottom bar) */}
      <main className="max-w-7xl mx-auto p-6 pt-10 pb-20">
        {activePage === 'pool' && <Dashboard setPage={setActivePage} xp={xp} setXp={setXp} dailyTip={dailyTip} level={level} />}
        {activePage === 'news' && <SwimNews />}
        {activePage === 'drills' && <DrillLibrary />}
        {activePage === 'workout' && <CoachConsole engine={engine} />}
        {activePage === 'progress' && <StatsLog xp={xp} />}
        {activePage === 'gear' && <GearLocker />}
        {activePage === 'strategy' && <RaceStrategy />}
        {activePage === 'nutrition' && <NutritionDeck />}
        {activePage === 'dryland' && <DrylandDeck setXp={setXp} />}
        {activePage === 'contact' && <Contact />}
      </main>

      <footer className="py-12 text-center opacity-30 text-white">
        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
          Created with ♥ by Mohamed Tahar Hlioui
        </p>
      </footer>
    </div>
  );
}