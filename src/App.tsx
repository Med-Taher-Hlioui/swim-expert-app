import { useState, useEffect } from 'react';
import { SwimCoachEngine } from './lib/engine';
import { calculateLevel } from './lib/xp'; 
import confetti from 'canvas-confetti';

// Import Components
import Dashboard from './components/Dashboard';
import DrillLibrary from './components/DrillLibrary';
import CoachConsole from './components/CoachConsole';
import StatsLog from './components/StatsLog';
import GearLocker from './components/GearLocker';
import RaceStrategy from './components/RaceStrategy';
import NutritionDeck from './components/NutritionDeck';
import Contact from './components/Contact';
import SwimNews from './components/SwimNews';

const engine = new SwimCoachEngine();

export default function App() {
  const [activePage, setActivePage] = useState<'pool' | 'drills' | 'workout' | 'progress' | 'gear' | 'strategy' | 'nutrition' | 'contact' | 'news'>('pool');
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(3);
  const [dailyTip, setDailyTip] = useState("Focus on your rotation to reduce drag.");

  useEffect(() => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (key) {
      engine.initialize(key);
      engine.getDailyTip()
        .then(tip => setDailyTip(tip))
        .catch(() => console.log("AI Quota hit. Using default tip."));
    }
  }, []);

  // --- LEVEL UP LOGIC ---
  useEffect(() => {
    const newLevel = calculateLevel(xp);
    if (newLevel > level) {
      setLevel(newLevel);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#fbbf24', '#ffffff'] 
      });
    }
  }, [xp, level]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-40">
      
      {/* HEADER */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-left">
          <button onClick={() => setActivePage('pool')} className="flex flex-col items-start group">
            <h1 className="text-xl font-black italic tracking-tighter uppercase text-blue-500 leading-none">
              SwimExpert
            </h1>
            <span className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase mt-1">
              by Mohamed Tahar Hlioui
            </span>
          </button>

          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
               <div className="text-[10px] font-black uppercase text-slate-500">Athlete Rank</div>
               <div className="text-sm font-black italic uppercase text-white">LVL {level} Elite</div>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-xs border-2 border-white/10 shadow-lg">
               MT
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {activePage === 'pool' && <Dashboard setPage={setActivePage} xp={xp} setXp={setXp} dailyTip={dailyTip} level={level} />}
        {activePage === 'news' && <SwimNews />}
        {activePage === 'drills' && <DrillLibrary />}
        {activePage === 'workout' && <CoachConsole engine={engine} />}
        {activePage === 'progress' && <StatsLog xp={xp} />}
        {activePage === 'gear' && <GearLocker />}
        {activePage === 'strategy' && <RaceStrategy />}
        {activePage === 'nutrition' && <NutritionDeck />}
        {activePage === 'contact' && <Contact />}
      </main>

      {/* NAVIGATION */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full shadow-2xl z-50 flex gap-4 md:gap-6 max-w-[95vw] overflow-x-auto no-scrollbar">
        {[
          { id: 'pool', label: 'Pool', icon: '🏠' },
          { id: 'news', label: 'News', icon: '📰' },
          { id: 'drills', label: 'Drills', icon: '📺' },
          { id: 'workout', label: 'Coach', icon: '🤖' },
          { id: 'strategy', label: 'Strategy', icon: '🗺️' },
          { id: 'gear', label: 'Locker', icon: '🎒' },
          { id: 'nutrition', label: 'Fuel', icon: '🥗' },
          { id: 'progress', label: 'Stats', icon: '📈' },
          { id: 'contact', label: 'Contact', icon: '📧' }
        ].map(item => (
          <button 
            key={item.id} 
            onClick={() => setActivePage(item.id as any)} 
            className={`flex flex-col items-center min-w-[55px] transition-all ${activePage === item.id ? 'text-blue-500 scale-110' : 'opacity-40 hover:opacity-100'}`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-widest leading-none">{item.label}</span>
          </button>
        ))}
      </nav>

      <footer className="mt-12 mb-20 text-center opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
          Created with ♥ by Mohamed Tahar Hlioui
        </p>
      </footer>
    </div>
  );
}