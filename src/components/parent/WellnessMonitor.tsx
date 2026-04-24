import { useState } from 'react';

export default function WellnessMonitor() {
  const [sleep, setSleep] = useState(8);
  const [soreness, setSoreness] = useState(2);
  const [mood, setMood] = useState('Energized');

  const moods = [
    { label: 'Energized', icon: '⚡' },
    { label: 'Tired', icon: '😴' },
    { label: 'Stressed', icon: '🤯' },
    { label: 'Focused', icon: '🎯' }
  ];

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-10 pb-20 text-left">
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-orange-500 leading-none">Wellness Monitor</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase italic">Daily Health Check-in</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* SLEEP TRACKER */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Sleep Duration</h3>
            <span className="text-xl font-black text-white italic">{sleep} Hours</span>
          </div>
          <input 
            type="range" min="4" max="12" step="0.5" value={sleep} 
            onChange={(e) => setSleep(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <p className="text-[10px] text-slate-500 font-bold uppercase text-center">Elite swimmers require 9+ hours for recovery</p>
        </div>

        {/* SORENESS LEVEL */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Muscle Soreness</h3>
            <span className={`text-xl font-black italic uppercase ${soreness > 3 ? 'text-red-500' : 'text-green-500'}`}>
              Level {soreness}
            </span>
          </div>
          <div className="flex justify-between px-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button 
                key={num} 
                onClick={() => setSoreness(num)}
                className={`w-10 h-10 rounded-xl font-black transition-all ${soreness === num ? 'bg-orange-500 text-white scale-110 shadow-lg shadow-orange-900/40' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* MOOD SELECTOR */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Athlete Mental State</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moods.map((m) => (
              <button 
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`p-6 rounded-[2rem] border transition-all text-center space-y-2 ${mood === m.label ? 'bg-orange-600/10 border-orange-500 shadow-xl' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
              >
                <div className="text-3xl">{m.icon}</div>
                <div className={`text-[10px] font-black uppercase tracking-widest ${mood === m.label ? 'text-white' : 'text-slate-500'}`}>{m.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full bg-orange-600 hover:bg-orange-500 py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.4em] transition-all shadow-2xl shadow-orange-900/20 active:scale-95">
        Push Wellness Report to Coach
      </button>
    </div>
  );
}