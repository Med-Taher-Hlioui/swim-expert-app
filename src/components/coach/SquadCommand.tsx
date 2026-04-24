import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { calculateLevel } from '../../lib/xp';

const MOCK_SQUAD = [
  { 
    id: '1', name: 'Ahmed Derbel', xp: 1250, status: 'Active', lastDrill: 'High Catch', trend: 'rising',
    stats: [{ subject: 'Speed', A: 85 }, { subject: 'Endurance', A: 65 }, { subject: 'Technique', A: 90 }, { subject: 'Power', A: 75 }]
  },
  { 
    id: '2', name: 'Sarra Mansour', xp: 850, status: 'Resting', lastDrill: 'Ankle Mobility', trend: 'stable',
    stats: [{ subject: 'Speed', A: 70 }, { subject: 'Endurance', A: 80 }, { subject: 'Technique', A: 75 }, { subject: 'Power', A: 60 }]
  },
  { 
    id: '3', name: 'Yassine Ben Amor', xp: 2100, status: 'Active', lastDrill: 'Underwater Phase', trend: 'rising',
    stats: [{ subject: 'Speed', A: 95 }, { subject: 'Endurance', A: 85 }, { subject: 'Technique', A: 80 }, { subject: 'Power', A: 90 }]
  },
];

export default function SquadCommand() {
  const [broadcast, setBroadcast] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedAthlete = MOCK_SQUAD.find(a => a.id === selectedId);

  const awardMerit = (e: React.MouseEvent | React.PointerEvent, name: string) => {
    if (e) e.stopPropagation(); 
    alert(`Merit XP Awarded to ${name}! (+100 XP for Leadership)`);
  };

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-12 pb-20 text-left">
      
      {/* 1. SQUAD PERFORMANCE OVERVIEW */}
      {!selectedId && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in duration-500">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500 leading-none">Squad Command</h2>
            <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase italic">Elite Monitoring System</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-3xl flex flex-col justify-center">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Squad Average XP</span>
            <span className="text-xl font-black italic text-white">1,400</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-3xl flex flex-col justify-center">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Active Today</span>
            <span className="text-xl font-black italic text-green-500">66%</span>
          </div>
        </div>
      )}

      {/* 2. BROADCAST DECK */}
      {!selectedId && (
        <div className="bg-blue-600/5 border-2 border-dashed border-blue-500/20 p-8 rounded-[3rem] relative overflow-hidden group animate-in fade-in duration-500">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black">📢</div>
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Push Session to Squad</h3>
            </div>
            <textarea 
              value={broadcast}
              onChange={(e) => setBroadcast(e.target.value)}
              placeholder="Assign today's main set focus..."
              className="w-full bg-slate-950 border border-slate-800 p-6 rounded-[2rem] text-sm font-bold outline-none focus:border-blue-500 transition-all text-white min-h-[100px]"
            />
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-blue-900/20">
                Broadcast Session
              </button>
            </div>
          </div>
          <div className="absolute right-[-20px] top-[-20px] text-[10rem] font-black italic text-white opacity-[0.02] pointer-events-none uppercase">Set</div>
        </div>
      )}

      {/* 3. MAIN WORKSPACE */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* ROSTER LIST */}
        <div className={`space-y-6 transition-all duration-500 ${selectedId ? 'lg:w-1/3' : 'w-full'}`}>
          <div className="flex justify-between items-center px-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
              {selectedId ? 'Switch Athlete' : 'Athlete Analysis'}
            </h3>
            {selectedId && (
              <button onClick={() => setSelectedId(null)} className="text-[10px] font-black uppercase text-blue-500 underline underline-offset-4">Show All</button>
            )}
          </div>

          <div className={`grid gap-6 ${selectedId ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {MOCK_SQUAD.map((athlete) => (
              <div 
                key={athlete.id} 
                onClick={() => setSelectedId(athlete.id)}
                className={`bg-slate-900 border transition-all group relative overflow-hidden flex flex-col justify-between h-full p-8 rounded-[2.5rem] cursor-pointer hover:shadow-2xl ${selectedId === athlete.id ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-blue-900/40' : 'border-slate-800 hover:border-slate-600'}`}
              >
                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-colors ${selectedId === athlete.id ? 'bg-blue-600 text-white' : 'bg-slate-950 text-blue-500 border border-slate-800'}`}>
                        {athlete.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-black italic uppercase text-white tracking-tighter leading-none">{athlete.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${athlete.status === 'Active' ? 'bg-green-500' : 'bg-slate-600'}`}></span>
                          <span className="text-[8px] font-bold text-slate-500 uppercase">{athlete.status}</span>
                        </div>
                      </div>
                    </div>
                    {athlete.trend === 'rising' && !selectedId && <span className="text-green-500 text-xs animate-bounce">▲</span>}
                  </div>

                  {!selectedId && (
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                      <div className="text-[8px] font-black text-slate-600 uppercase mb-1 tracking-widest">Last Technical Focus</div>
                      <div className="text-[10px] font-bold text-slate-300 uppercase italic">"{athlete.lastDrill}"</div>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex justify-between items-center mt-8 pt-6 border-t border-slate-800">
                  <div>
                    <div className="text-[8px] font-black text-slate-600 uppercase">Athlete XP</div>
                    <div className="text-sm font-black italic text-blue-500 tracking-tighter">{athlete.xp}</div>
                  </div>
                  
                  {/* XP BUTTON ONLY SHOWS HERE IF NO ATHLETE IS SELECTED */}
                  <div className="flex gap-2">
                    {!selectedId && (
                      <button 
                        onClick={(e) => awardMerit(e, athlete.name)}
                        className="bg-slate-800 hover:bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                      >🏆</button>
                    )}
                    <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${selectedId === athlete.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 group-hover:text-white'}`}>
                      Stats
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ANALYSIS DETAIL PANEL */}
        {selectedAthlete && (
          <div className="flex-1 w-full animate-in slide-in-from-right-10 duration-500">
            <div className="bg-slate-900 border border-blue-500/30 p-8 rounded-[3rem] relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">
                    Analysis: <span className="text-blue-500">{selectedAthlete.name}</span>
                  </h3>
                  <button onClick={() => setSelectedId(null)} className="text-slate-500 hover:text-white text-xs font-black uppercase">Close ✕</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-[300px] w-full bg-slate-950/50 rounded-[2rem] border border-slate-800 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={selectedAthlete.stats}>
                        <PolarGrid stroke="#1e293b" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                        <Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                      <div className="text-[8px] font-black text-slate-500 uppercase mb-2 tracking-widest italic">Coach Observation</div>
                      <p className="text-[11px] font-bold text-white italic leading-relaxed">
                        Currently focusing on {selectedAthlete.lastDrill}. Swimmer is at Level {calculateLevel(selectedAthlete.xp)} Elite.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-500 uppercase ml-2 tracking-widest">Private Performance Note</label>
                      <textarea 
                        placeholder="Write a technical note..."
                        className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-[11px] text-white outline-none focus:border-blue-500 min-h-[100px]"
                      />
                    </div>

                    {/* NEW: XP BUTTON AND UPDATE BUTTON SIDE BY SIDE */}
                    <div className="flex gap-4">
                       <button 
                        onClick={(e) => awardMerit(e, selectedAthlete.name)}
                        className="bg-slate-800 hover:bg-blue-600 px-6 rounded-2xl flex items-center justify-center transition-all hover:scale-105 border border-slate-700"
                        title="Award Merit XP"
                      >
                        🏆 <span className="ml-2 text-[10px] font-black uppercase text-white">Award XP</span>
                      </button>
                      <button className="flex-1 bg-blue-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all">
                        Save Profile Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] text-[12rem] font-black italic text-white opacity-[0.02] pointer-events-none select-none uppercase">
                {selectedAthlete.name.charAt(0)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}