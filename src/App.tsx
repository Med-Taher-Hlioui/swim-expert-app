import { useState, useEffect } from 'react';
import { SWIM_DATA } from './lib/swim-data';
import { SwimCoachEngine } from './lib/engine';

const engine = new SwimCoachEngine();

function App() {
  const [activePage, setActivePage] = useState<'pool' | 'drills' | 'workout' | 'progress'>('pool');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [dailyTip, setDailyTip] = useState<string>("Loading coach's briefing...");
  
  const [level, setLevel] = useState('Intermediate');
  const [goal, setGoal] = useState('Endurance');
  const [duration, setDuration] = useState('60');
  const [workout, setWorkout] = useState('');
  const [loading, setLoading] = useState(false);

  const [savedWorkouts, setSavedWorkouts] = useState<string[]>(() => {
    const saved = localStorage.getItem('swim_workouts');
    return saved ? JSON.parse(saved) : [];
  });
  const [customWorkout, setCustomWorkout] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // Expanded State for all events
  const [pbs, setPbs] = useState<any>(() => {
    const events = [
      'free50', 'free100', 'free200', 'free400', 'free800', 'free1500',
      'fly50', 'fly100', 'fly200', 'back50', 'back100', 'back200',
      'breast50', 'breast100', 'breast200'
    ];
    const initial: any = {};
    events.forEach(e => initial[e] = localStorage.getItem(e) || '--.--');
    return initial;
  });

  const [newTime, setNewTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('free50');

  useEffect(() => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (key) {
      engine.initialize(key);
      engine.getDailyTip().then(tip => setDailyTip(tip));
    }
  }, []);

  const savePB = () => {
    if (!newTime) return;
    localStorage.setItem(selectedEvent, newTime);
    setPbs({ ...pbs, [selectedEvent]: newTime });
    setNewTime('');
  };

  const deleteWorkout = (index: number) => {
    const updated = savedWorkouts.filter((_, i) => i !== index);
    setSavedWorkouts(updated);
    localStorage.setItem('swim_workouts', JSON.stringify(updated));
  };

  const saveCurrentWorkout = (text: string) => {
    if (!text) return;
    const updated = [text, ...savedWorkouts];
    setSavedWorkouts(updated);
    localStorage.setItem('swim_workouts', JSON.stringify(updated));
    setWorkout('');
    setCustomWorkout('');
    setIsAddingCustom(false);
  };

  // Personalized Badge Logic
  const checkSub30 = () => {
    const sprintEvents = ['free50', 'fly50', 'back50', 'breast50'];
    return sprintEvents.some(event => {
      const val = parseFloat(pbs[event]);
      return !isNaN(val) && val < 30;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-red-500 text-white p-2 rounded-full transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} allowFullScreen></iframe>
          </div>
        </div>
      )}

      <header className="bg-blue-600 py-4 px-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">SwimExpert</h1>
          <nav className="flex gap-4 md:gap-8 text-[10px] md:text-xs font-black uppercase tracking-widest">
            <button onClick={() => setActivePage('pool')} className={activePage === 'pool' ? 'text-white border-b-2' : 'opacity-60'}>Pool</button>
            <button onClick={() => setActivePage('drills')} className={activePage === 'drills' ? 'text-white border-b-2' : 'opacity-60'}>Drills</button>
            <button onClick={() => setActivePage('workout')} className={activePage === 'workout' ? 'text-white border-b-2' : 'opacity-60'}>Coach</button>
            <button onClick={() => setActivePage('progress')} className={activePage === 'progress' ? 'text-white border-b-2' : 'opacity-60'}>Progress</button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        
        {activePage === 'pool' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="bg-slate-900 border-l-8 border-blue-500 p-8 rounded-3xl shadow-xl flex gap-6 items-center text-left">
              <div className="text-left">
                <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">Morning Briefing</h3>
                <p className="text-lg italic text-slate-200 italic leading-relaxed">"{dailyTip}"</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[3rem] p-12 text-center shadow-2xl">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-4 text-white tracking-tighter">The Deck is Yours.</h2>
              <button onClick={() => setActivePage('workout')} className="bg-white text-blue-700 px-12 py-4 rounded-full font-black uppercase text-sm shadow-xl hover:scale-105 transition-all">
                Build Today's Workout
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-xs">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-blue-500">●</span> News Rubrique
                </h3>
                <ul className="space-y-4">
                  <li className="pb-2 border-b border-slate-800 italic opacity-80">Champions Tour: Sprints break record in Sousse →</li>
                  <li className="pb-2 border-b border-slate-800 italic opacity-80">Nutrition: Why recovery starts before the pool →</li>
                  <li className="italic opacity-80">FINA: New stroke regulations for 2026 →</li>
                </ul>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-blue-500">●</span> Drills & Technique
                  </h3>
                  <p className="text-slate-400 text-sm italic leading-relaxed">"Refine your form across all 4 strokes with our expert-led drill videos."</p>
                </div>
                <button onClick={() => setActivePage('drills')} className="mt-6 text-blue-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">Launch Library <span>→</span></button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'drills' && (
          <div className="space-y-16 animate-in slide-in-from-right-4 duration-500 text-left">
            <h2 className="text-3xl font-black italic border-l-4 border-blue-500 pl-6 uppercase tracking-tight">Technical Library</h2>
            {SWIM_DATA.map((group) => (
              <div key={group.stroke} className="space-y-6">
                <h3 className="text-2xl font-black text-blue-400 uppercase tracking-tighter italic ml-2">{group.stroke}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {group.drills.map((drill) => (
                    <div key={drill.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-lg hover:border-blue-500 transition-all">
                      <div><h4 className="text-lg font-bold mb-2">{drill.name}</h4><p className="text-xs text-slate-400 leading-relaxed italic">{drill.description}</p></div>
                      <button onClick={() => setSelectedVideo(drill.youtubeId)} className="mt-6 bg-slate-800 hover:bg-blue-600 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Watch Tutorial</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activePage === 'workout' && (
          <div className="space-y-12 animate-in zoom-in duration-300">
            <div className="max-w-4xl mx-auto bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-black italic text-blue-400 uppercase">Coach Console</h2>
                <button onClick={() => setIsAddingCustom(!isAddingCustom)} className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-4 py-2 rounded-lg uppercase">{isAddingCustom ? "Cancel" : "+ Add My Own"}</button>
              </div>
              {isAddingCustom ? (
                <div className="space-y-4 text-left">
                  <textarea placeholder="Type your set..." value={customWorkout} onChange={(e) => setCustomWorkout(e.target.value)} className="w-full h-64 bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-300 outline-none focus:border-blue-500" />
                  <button onClick={() => saveCurrentWorkout(customWorkout)} className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-black uppercase tracking-widest transition-all">Save Custom Set</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left text-xs">
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-slate-500 uppercase tracking-widest">Level</label>
                      <select value={level} onChange={(e) => setLevel(e.target.value)} className="bg-slate-800 p-3 rounded-xl font-bold border border-slate-700 outline-none"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-slate-500 uppercase tracking-widest">Goal</label>
                      <select value={goal} onChange={(e) => setGoal(e.target.value)} className="bg-slate-800 p-3 rounded-xl font-bold border border-slate-700 outline-none"><option>Endurance</option><option>Speed</option><option>Technique</option></select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-slate-500 uppercase tracking-widest">Mins</label>
                      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="bg-slate-800 p-3 rounded-xl font-bold border border-slate-700 outline-none" />
                    </div>
                  </div>
                  <button onClick={async () => { setLoading(true); setWorkout(""); const res = await engine.generateWorkout(level, goal, duration); setWorkout(res); setLoading(false); }} className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-blue-500 transition-all mb-4">{loading ? "Coach is thinking..." : "Generate AI Session"}</button>
                  {workout && (
                    <div className="animate-in fade-in duration-500">
                      <div className="p-6 bg-slate-950 rounded-2xl text-left font-mono text-xs whitespace-pre-wrap leading-relaxed border border-blue-900/30 text-slate-300 mb-4">{workout}</div>
                      <button onClick={() => saveCurrentWorkout(workout)} className="w-full bg-slate-800 border border-blue-500/30 py-3 rounded-xl text-[10px] font-black uppercase text-blue-400">💾 Save AI Session</button>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="max-w-4xl mx-auto space-y-6 text-left">
              <h3 className="text-xl font-black italic uppercase tracking-tight border-l-4 border-blue-500 pl-4">Training History</h3>
              {savedWorkouts.length === 0 ? <p className="text-slate-500 italic text-sm">No saved workouts.</p> : (
                <div className="grid grid-cols-1 gap-6">
                  {savedWorkouts.map((saved, index) => (
                    <div key={index} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative group hover:border-blue-500/30">
                      <button onClick={() => deleteWorkout(index)} className="absolute top-4 right-4 text-slate-700 hover:text-red-500 font-bold text-xs uppercase opacity-0 group-hover:opacity-100 transition-all">Delete ×</button>
                      <div className="font-mono text-xs text-slate-400 whitespace-pre-wrap leading-relaxed italic">{saved}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activePage === 'progress' && (
          <div className="animate-in fade-in duration-500 text-left space-y-12">
            <h2 className="text-3xl font-black italic border-l-4 border-blue-500 pl-6 uppercase tracking-tight">Performance Log</h2>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              {/* PB Grid: Reorganized into Stroke Categories for Clarity */}
              <div className="xl:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(pbs).map((key) => (
                  <div key={key} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col items-center">
                    <div className="text-[9px] font-black text-blue-500 uppercase tracking-tighter mb-1 text-center">
                      {key.replace('free', ' Freestyle').replace('fly', ' Butterfly').replace('back', ' Backstroke').replace('breast', ' Breaststroke')}
                    </div>
                    <div className="text-xl font-black italic tracking-tighter">{pbs[key]}s</div>
                  </div>
                ))}
              </div>

              {/* Log Form and Badges */}
              <div className="space-y-6">
                <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-6 shadow-2xl">
                  <h3 className="text-lg font-black italic mb-4 uppercase text-blue-400">Log Record</h3>
                  <div className="flex flex-col gap-3">
                    <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold outline-none">
                      <option value="free50">50m Freestyle</option><option value="free100">100m Freestyle</option><option value="free200">200m Freestyle</option>
                      <option value="free400">400m Freestyle</option><option value="free800">800m Freestyle</option><option value="free1500">1500m Freestyle</option>
                      <option value="fly50">50m Butterfly</option><option value="fly100">100m Butterfly</option><option value="fly200">200m Butterfly</option>
                      <option value="back50">50m Backstroke</option><option value="back100">100m Backstroke</option><option value="back200">200m Backstroke</option>
                      <option value="breast50">50m Breaststroke</option><option value="breast100">100m Breaststroke</option><option value="breast200">200m Breaststroke</option>
                    </select>
                    <input type="text" placeholder="e.g. 24.52" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-bold outline-none" />
                    <button onClick={savePB} className="bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-lg">Save Record</button>
                  </div>
                </div>

                {/* Personalized Badges Section */}
                <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 text-center">Badges</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className={`p-4 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${checkSub30() ? 'border-yellow-500 bg-yellow-500/10 grayscale-0' : 'border-slate-800 grayscale opacity-30'}`}>
                      <span className="text-2xl">⚡</span>
                      <span className="text-[8px] font-black uppercase">Sub-30 Sprint</span>
                    </div>
                    {/* Add more badges here following the same pattern */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;