import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Timer, Play, Square, RotateCcw, ChevronRight, 
  Settings2, Share2, Volume2, Save, Users, Plus, X, UserPlus, Check, Trash2 
} from 'lucide-react';

interface LaneState {
  id: number;
  athleteName: string;
  time: number;
  lastSplit: number;
  isActive: boolean;
  repCount: number;
}

const MOCK_ATHLETES = ['Ahmed Derbel', 'Sarra Mansour', 'Yassine Ben Amor', 'Rayen Feki', 'Sami Toumi', 'Lina Ben Salem'];

export default function ChronoDeck() {
  const { t } = useTranslation();
  
  // --- TIMER STATE ---
  const [globalTime, setGlobalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // --- MODAL STATES ---
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // --- INTERVAL CONFIG ---
  const [config, setConfig] = useState({
    reps: 10,
    distance: 100,
    minutes: 1,
    seconds: 25
  });

  // --- DYNAMIC LANES STATE ---
  const [lanes, setLanes] = useState<LaneState[]>([
    { id: 1, athleteName: '', time: 0, lastSplit: 0, isActive: false, repCount: 0 }
  ]);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setGlobalTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleStartSet = () => {
    if (lanes.every(l => l.athleteName === '')) {
      alert("Please assign at least one athlete before starting.");
      return;
    }
    setIsRunning(true);
    setLanes(lanes.map(l => ({ ...l, isActive: true })));
  };

  const handleReset = () => {
    setIsRunning(false);
    setGlobalTime(0);
    setLanes(lanes.map(l => ({ ...l, time: 0, lastSplit: 0, isActive: false, repCount: 0 })));
  };

  const handleLaneTap = (laneId: number) => {
    if (!isRunning) return;
    setLanes(lanes.map(l => {
      if (l.id === laneId) {
        return {
          ...l,
          lastSplit: globalTime - l.time,
          time: globalTime,
          repCount: Math.min(l.repCount + 1, config.reps)
        };
      }
      return l;
    }));
  };

  const addLane = () => {
    const newId = lanes.length > 0 ? Math.max(...lanes.map(l => l.id)) + 1 : 1;
    setLanes([...lanes, { id: newId, athleteName: '', time: 0, lastSplit: 0, isActive: false, repCount: 0 }]);
  };

  const removeLane = (id: number) => {
    if (lanes.length > 1) {
      setLanes(lanes.filter(l => l.id !== id));
    }
  };

  const assignAthlete = (laneId: number, name: string) => {
    setLanes(lanes.map(l => l.id === laneId ? { ...l, athleteName: name } : l));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 text-start">
      
      {/* 1. TOP CONTROL BAR */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-900/40">
            <Timer size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black italic uppercase text-white tracking-tighter leading-none">{t('chrono.title')}</h2>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{t('chrono.subtitle')}</p>
          </div>
        </div>

        <div className="bg-slate-950 px-10 py-4 rounded-[2rem] border border-slate-800/50 shadow-inner">
          <span className="text-4xl font-black text-blue-500 tabular-nums italic">{formatTime(globalTime)}</span>
        </div>

        <div className="flex gap-3">
          <button onClick={handleReset} className="w-12 h-12 rounded-full border border-slate-800 text-slate-500 hover:text-white flex items-center justify-center transition-all"><RotateCcw size={20} /></button>
          {!isRunning ? (
            <button onClick={handleStartSet} className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg"><Play size={16} fill="currentColor" /> {t('chrono.start_set')}</button>
          ) : (
            <button onClick={() => setIsRunning(false)} className="bg-red-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg"><Square size={16} fill="currentColor" /> {t('chrono.stop')}</button>
          )}
        </div>
      </div>

      {/* 2. CONFIGURATION BUTTONS */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        <button onClick={() => setIsConfigOpen(true)} className="bg-slate-900 border border-blue-500/30 p-4 rounded-2xl flex items-center gap-4 min-w-[250px] hover:border-blue-500 transition-all text-start">
          <Settings2 size={16} className="text-blue-500" />
          <div>
            <p className="text-[8px] font-black text-slate-500 uppercase">{t('chrono.set_config')}</p>
            <p className="text-xs font-bold text-white italic">{config.reps} x {config.distance}m @ {config.minutes}:{config.seconds.toString().padStart(2, '0')}</p>
          </div>
        </button>
        
        <button onClick={() => setIsAssignOpen(true)} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 min-w-[200px] hover:border-blue-500/50 transition-all text-start">
          <UserPlus size={16} className="text-purple-500" />
          <div>
            <p className="text-[8px] font-black text-slate-500 uppercase">{t('chrono.assign_title')}</p>
            <p className="text-xs font-bold text-white italic">{lanes.filter(l => l.athleteName).length} {t('chrono.assigned')}</p>
          </div>
        </button>
      </div>

      {/* 3. DYNAMIC LANE TIMING GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {lanes.map((lane) => (
          <button
            key={lane.id}
            onClick={() => handleLaneTap(lane.id)}
            className={`relative h-72 rounded-[2.5rem] border-2 transition-all p-6 flex flex-col justify-between group overflow-hidden active:scale-95
              ${lane.isActive ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-900/10' : 'bg-slate-900/40 border-slate-800 grayscale'}`}
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="text-left">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">Lane {lane.id}</span>
                <h4 className="text-sm font-black italic text-white leading-none mt-2 truncate max-w-[140px]">
                  {lane.athleteName || t('chrono.unassigned')}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-500 uppercase">Rep</span>
                <p className="text-xl font-black italic text-white leading-none">{lane.repCount}/{config.reps}</p>
              </div>
            </div>

            <div className="relative z-10 text-start">
              <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Last Split</p>
              <h5 className="text-2xl font-black italic text-green-500 tracking-tight">
                {lane.lastSplit > 0 ? formatTime(lane.lastSplit) : '--:--.--'}
              </h5>
            </div>

            <div className="absolute bottom-0 right-0 p-4 z-10 opacity-20 group-hover:opacity-100 transition-opacity"><ChevronRight size={40} className="text-blue-500" /></div>
            <div className="absolute right-[-20px] bottom-[-20px] text-[10rem] font-black italic text-white opacity-[0.02] pointer-events-none uppercase">{lane.id}</div>
          </button>
        ))}
      </div>

      {/* 4. FOOTER ACTIONS - RESTORED & INTEGRATED */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/50 border border-slate-800 p-6 rounded-[2.5rem] gap-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 italic">
          <Check size={16} className="text-green-500" />
          {t('chrono.ready_msg')}
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-slate-950 border border-slate-800 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:border-slate-600 transition-all">
            <Share2 size={14} /> {t('share')}
          </button>
          <button 
            onClick={() => alert("Splits pushed to Athlete Lab archive.")}
            className="flex-1 md:flex-none bg-green-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-500 transition-all shadow-lg shadow-green-900/20"
          >
            <Save size={14} /> {t('save')}
          </button>
        </div>
      </div>

      {/* --- CONFIG MODAL --- */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[3rem] p-10 relative shadow-2xl">
            <button onClick={() => setIsConfigOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X size={24} /></button>
            <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter mb-8 text-center">{t('chrono.config_title')}</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-start">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Reps</label>
                  <input type="number" value={config.reps} onChange={(e) => setConfig({...config, reps: parseInt(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Distance (m)</label>
                  <input type="number" value={config.distance} onChange={(e) => setConfig({...config, distance: parseInt(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="space-y-2 text-start">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Interval (Min:Sec)</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={config.minutes} onChange={(e) => setConfig({...config, minutes: parseInt(e.target.value)})} className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white text-center outline-none focus:border-blue-500" />
                  <span className="text-white font-black">:</span>
                  <input type="number" value={config.seconds} onChange={(e) => setConfig({...config, seconds: parseInt(e.target.value)})} className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white text-center outline-none focus:border-blue-500" />
                </div>
              </div>
              <button onClick={() => setIsConfigOpen(false)} className="w-full bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mt-4 shadow-lg shadow-blue-900/40">{t('chrono.apply_config')}</button>
            </div>
          </div>
        </div>
      )}

      {/* --- ASSIGN SWIMMERS MODAL --- */}
      {isAssignOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-[3rem] p-10 relative shadow-2xl flex flex-col max-h-[90vh]">
            <button onClick={() => setIsAssignOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter mb-4 text-center">{t('chrono.assign_title')}</h3>
            
            <div className="overflow-y-auto pr-2 space-y-4 flex-1 no-scrollbar">
              {lanes.map((lane) => (
                <div key={lane.id} className="flex items-center gap-4 bg-slate-950 border border-slate-800 p-4 rounded-3xl">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black italic">{lane.id}</div>
                  <div className="flex-1 text-start">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest ml-1 mb-1">Assign Swimmer</p>
                    <select value={lane.athleteName} onChange={(e) => assignAthlete(lane.id, e.target.value)} className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs font-bold text-white outline-none focus:border-blue-500">
                      <option value="">Select Athlete...</option>
                      {MOCK_ATHLETES.map(name => <option key={name} value={name}>{name}</option>)}
                    </select>
                  </div>
                  <button onClick={() => removeLane(lane.id)} className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all mt-4"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>

            <div className="pt-8 space-y-3">
              <button onClick={addLane} className="w-full bg-slate-950 border border-slate-800 text-slate-400 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-blue-500 hover:text-white transition-all flex items-center justify-center gap-2"><Plus size={16} /> Add Another Lane</button>
              <button onClick={() => setIsAssignOpen(false)} className="w-full bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/40">{t('chrono.confirm_assign')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}