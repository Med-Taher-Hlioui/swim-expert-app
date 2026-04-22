import { useState } from 'react';
import { XP_REWARDS } from '../lib/xp';

interface DrylandProps {
  setXp: (xp: any) => void;
}

export default function DrylandDeck({ setXp }: DrylandProps) {
  const [sessionActive, setSessionActive] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [customExercises, setCustomExercises] = useState([
    { name: 'Banded Face-Pulls', reps: '3 Sets x 15 Reps', focus: 'Shoulder Health' },
    { name: 'Streamline Lunges', reps: '3 Sets x 10/Side', focus: 'Core Stability' },
  ]);

  const [newEx, setNewEx] = useState({ name: '', reps: '', focus: 'Power' });

  const handleAddExercise = () => {
    if (newEx.name && newEx.reps) {
      setCustomExercises([...customExercises, newEx]);
      setNewEx({ name: '', reps: '', focus: 'Power' });
      setIsAdding(false);
    }
  };

  const handleComplete = () => {
    setSessionActive(true);
    setXp((prev: number) => prev + XP_REWARDS.GYM_SESSION);
    setTimeout(() => setSessionActive(false), 2000);
  };

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 space-y-12 pb-20 text-left">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Dryland Deck</h2>
          <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">Mobility & Power</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-slate-900 border border-blue-500/30 text-blue-400 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-lg"
        >
          + Add Exercise
        </button>
      </div>

      {/* 1. EXERCISE GRID */}
      <div className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 relative overflow-hidden group">
        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Active Routine
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {customExercises.map((ex, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800/50 p-6 rounded-2xl hover:border-blue-500/50 transition-all">
              <div className="text-[10px] font-black text-blue-500 uppercase mb-2 tracking-tighter">{ex.focus}</div>
              <div className="text-xl font-black italic text-white uppercase leading-none mb-2">{ex.name}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{ex.reps}</div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
          <span className="text-[12rem] font-black italic uppercase tracking-tighter text-white">DRYLAND</span>
        </div>
      </div>

      {/* 2. ADD EXERCISE MODAL */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-md space-y-6 shadow-2xl">
            <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">New Dryland Drill</h3>
            <div className="space-y-4">
              <input 
                placeholder="Exercise Name (e.g. Plank)" 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm font-bold outline-none focus:border-blue-500"
                value={newEx.name}
                onChange={(e) => setNewEx({...newEx, name: e.target.value})}
              />
              <input 
                placeholder="Sets/Reps (e.g. 3x1min)" 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm font-bold outline-none focus:border-blue-500"
                value={newEx.reps}
                onChange={(e) => setNewEx({...newEx, reps: e.target.value})}
              />
              <select 
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm font-bold outline-none focus:border-blue-500 text-white"
                value={newEx.focus}
                onChange={(e) => setNewEx({...newEx, focus: e.target.value})}
              >
                <option>Power</option>
                <option>Mobility</option>
                <option>Recovery</option>
                <option>Shoulder Health</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsAdding(false)} className="flex-1 text-[10px] font-black uppercase text-slate-500">Cancel</button>
              <button onClick={handleAddExercise} className="flex-1 bg-blue-600 py-4 rounded-xl text-[10px] font-black uppercase text-white shadow-lg">Save to Deck</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. COACH'S CHALKBOARD */}
      <div className="bg-blue-600/5 border-2 border-dashed border-blue-500/20 p-10 rounded-[3rem] text-center space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Coach's Chalkboard</h4>
        <p className="text-lg font-black italic text-white uppercase leading-tight max-w-lg mx-auto">
          "Build explosive power in your core. It's the anchor for your pull."
        </p>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleComplete}
          disabled={sessionActive}
          className="bg-blue-600 text-white px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-900/40 disabled:opacity-50"
        >
          {sessionActive ? "Routine Logged!" : `Finish Dryland Routine +${XP_REWARDS.GYM_SESSION} XP`}
        </button>
      </div>
    </div>
  );
}