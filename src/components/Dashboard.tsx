import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { XP_REWARDS } from '../lib/xp';

const radarData = [
  { subject: 'Speed', A: 85, fullMark: 100 },
  { subject: 'Endurance', A: 65, fullMark: 100 },
  { subject: 'Technique', A: 90, fullMark: 100 },
  { subject: 'Consistency', A: 70, fullMark: 100 },
  { subject: 'Power', A: 75, fullMark: 100 },
];

interface DashboardProps {
  setPage: (page: any) => void;
  xp: number;
  setXp: (xp: any) => void;
  dailyTip: string;
  level: number;
}

export default function Dashboard({ setPage, xp, setXp, dailyTip, level }: DashboardProps) {
  
  const triggerFunMode = () => {
    const challenges = [
      "Stealth Mode: 200m zero splashes.", 
      "Dolphin Day: 100m Back Kick.", 
      "The Finisher: 4x25 Sprint.", 
      "Tarzan Drill: 50m Head-up."
    ];
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    alert(`🎯 FUN MODE: ${randomChallenge}`);
    
    // This line uses the value from our xp.ts file
    setXp((prev: number) => prev + XP_REWARDS.FUN_MODE);
  };

  const subpages = [
    { id: 'strategy', name: 'Race Strategy', icon: '🗺️', desc: 'Map your splits and technical focus points.' },
    { id: 'gear', name: 'Gear Locker', icon: '🎒', desc: 'Track technical suit compression and health.' },
    { id: 'nutrition', name: 'Fuel Deck', icon: '🥗', desc: 'Optimized pre-swim and recovery meals.' },
    { id: 'drills', name: 'Drill Library', icon: '📺', desc: 'Access elite technical video tutorials.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-left">
      
      {/* 1. DAILY BRIEFING */}
      <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[2rem] flex items-center gap-6 relative overflow-hidden group">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex-shrink-0 flex items-center justify-center text-2xl shadow-lg shadow-blue-900/40 text-white">🎙️</div>
        <div className="relative z-10">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1">Daily Briefing</h3>
          <p className="text-sm font-bold italic text-white leading-tight">"{dailyTip}"</p>
        </div>
        <div className="absolute right-[-20px] top-[-20px] text-8xl opacity-5 pointer-events-none group-hover:scale-110 transition-transform font-black italic text-white">COACH</div>
      </div>

      {/* 2. PERFORMANCE RADAR & HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-1 bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-800 h-[350px]">
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">Performance Radar</h3>
          <ResponsiveContainer width="100%" height="90%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
              <Radar name="Athlete" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-2 leading-none text-white">The Deck is Yours.</h2>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-80 mb-6 italic">Sousse Elite Training Hub</p>
              <button onClick={() => setPage('workout')} className="bg-white text-blue-700 px-8 py-3 rounded-full font-black uppercase text-xs shadow-xl hover:scale-105 transition-all">Generate Session</button>
            </div>
            <div className="absolute -right-10 -bottom-10 text-[15rem] font-black italic text-white/5 select-none">GO</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800">
              <div className="text-[10px] font-black text-slate-500 uppercase mb-1">XP Points</div>
              <div className="text-xl font-black italic text-blue-400">{xp}</div>
            </div>
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800">
              <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Streak</div>
              <div className="text-xl font-black italic text-white">5 Days</div>
            </div>
            <button onClick={triggerFunMode} className="bg-blue-600/10 border border-blue-500/30 p-5 rounded-3xl group hover:bg-blue-600/20 transition-all text-left">
              <div className="text-[10px] font-black text-blue-400 uppercase">Fun Mode</div>
              <div className="text-[10px] font-black uppercase text-white mt-1 group-hover:underline transition-all">Surprise Me →</div>
            </button>
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800">
              <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Rank</div>
              <div className="text-[10px] font-bold text-slate-300 uppercase">Elite (LVL {level})</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUBPAGE GATEWAYS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subpages.map(page => (
          <button 
            key={page.id} 
            onClick={() => setPage(page.id)}
            className="bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-800 text-left hover:border-blue-500 transition-all group relative overflow-hidden h-[180px] flex flex-col justify-center"
          >
            <div className="relative z-10">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{page.icon}</div>
              <h4 className="text-xs font-black italic uppercase text-white mb-1 tracking-tighter">{page.name}</h4>
              <p className="text-[8px] text-slate-500 font-bold leading-tight uppercase tracking-widest">{page.desc}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
              <span className="text-6xl font-black italic uppercase tracking-tighter text-white">{page.id.slice(0, 3)}</span>
            </div>
          </button>
        ))}
      </div>

      {/* 4. NEWS SUMMARY */}
      <div className="bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800">
         <div className="flex justify-between items-center mb-6">
           <h3 className="text-xs font-black uppercase tracking-widest text-blue-500">Swimming News Briefing</h3>
           <button onClick={() => setPage('news')} className="text-[9px] font-black uppercase text-slate-500 hover:text-blue-500">View All →</button>
         </div>
         <div className="border-l-2 border-blue-600 pl-4">
           <p className="text-xs font-bold text-white uppercase italic">Sousse Champions Tour results are out.</p>
           <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest opacity-60">New records set in the 50m Butterfly event...</p>
         </div>
      </div>

      {/* 5. FOOTER CONTACT */}
      <div className="bg-slate-900/50 p-12 rounded-[3rem] border border-dashed border-slate-800 text-center">
        <h3 className="text-2xl font-black italic uppercase mb-2 text-white">Connect with the dev</h3>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto italic">Mohamed Tahar Hlioui is building the future of swim tech.</p>
        <button onClick={() => setPage('contact')} className="text-blue-500 font-black uppercase text-xs tracking-widest hover:underline underline-offset-8">Open Contact Channel →</button>
      </div>
    </div>
  );
}