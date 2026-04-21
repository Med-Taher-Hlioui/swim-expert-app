import { useState } from 'react';

export default function CoachConsole({ engine }: any) {
  const [level, setLevel] = useState('Intermediate');
  const [goal, setGoal] = useState('Endurance');
  const [duration, setDuration] = useState('60');
  const [workout, setWorkout] = useState('');
  const [loading, setLoading] = useState(false);

  const [history] = useState([
    { id: 1, date: '21 April 2026', title: 'Sousse Elite Session', volume: '3000m', mood: '🔱' },
    { id: 2, date: '19 April 2026', title: 'Endurance Base', volume: '2500m', mood: '💪' },
    { id: 3, date: '18 April 2026', title: 'Sprinting Power', volume: '1200m', mood: '🔥' },
  ]);

  const handleGenerate = async () => {
    setLoading(true);
    setWorkout("");
    try {
      const res = await engine.generateWorkout(level, goal, duration);
      setWorkout(res);
    } catch (err) {
      setWorkout("Coach is currently at the pool. Please try again in a moment.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20 text-left">
      
      {/* --- STANDARDIZED HEADER --- */}
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Coach Console</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">AI Intelligence</p>
      </div>

      {/* 1. SECTION: AI GENERATOR BAR */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-8 w-full">
        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Session Generator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex flex-col gap-2">
            <label className="font-black text-slate-500 uppercase tracking-widest">Athlete Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="bg-slate-950 p-4 rounded-xl font-bold border border-slate-800 outline-none focus:border-blue-500 text-white">
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-black text-slate-500 uppercase tracking-widest">Session Goal</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="bg-slate-950 p-4 rounded-xl font-bold border border-slate-800 outline-none focus:border-blue-500 text-white">
              <option>Endurance</option><option>Speed</option><option>Technique</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-black text-slate-500 uppercase tracking-widest">Duration (Mins)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="bg-slate-950 p-4 rounded-xl font-bold border border-slate-800 outline-none focus:border-blue-500 text-white" />
          </div>
        </div>

        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-blue-500 transition-all disabled:opacity-50"
        >
          {loading ? "Writing your session..." : "Generate AI Workout"}
        </button>

        {workout && (
          <div className="p-6 bg-slate-950 rounded-2xl border border-blue-900/30 font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap animate-in slide-in-from-top-4">
            {workout}
          </div>
        )}
      </div>

      {/* 2. SECTION: LOG MANUAL WORKOUT */}
      <button className="w-full bg-slate-900/50 border-2 border-dashed border-slate-800 p-8 rounded-[2.5rem] flex items-center justify-center gap-4 hover:border-blue-500 group transition-all">
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">+</div>
        <div className="text-left">
          <p className="text-xs font-black uppercase tracking-widest text-slate-300">Log Manual Workout</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase italic">Add your poolside results here.</p>
        </div>
      </button>

      {/* 3. SECTION: HISTORY */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Training History</h3>
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => (
            <div key={item.id} className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 flex justify-between items-center group">
              <div className="flex items-center gap-6">
                <span className="text-3xl">{item.mood}</span>
                <div>
                  <h4 className="font-black italic uppercase text-base text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black italic text-white">{item.volume}</div>
                <div className="text-[9px] font-black uppercase text-blue-500">Verified</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}