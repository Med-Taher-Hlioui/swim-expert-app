import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

const MOCK_CHILD_DATA = {
  name: "Ahmed Derbel",
  level: 4,
  xp: 1250,
  nextPractice: "17:00 at Sousse Olympic Pool",
  coachNote: "Ahmed is excelling in sprint endurance. Focus on technical recovery tonight.",
  stats: [
    { subject: 'Speed', A: 85 },
    { subject: 'Endurance', A: 65 },
    { subject: 'Technique', A: 90 },
    { subject: 'Power', A: 75 },
    { subject: 'Strategy', A: 70 },
  ]
};

export default function ParentHub() {
  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-8 pb-20 text-left text-white">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-orange-500 leading-none">Athlete Command</h2>
          <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase italic italic">Monitoring: {MOCK_CHILD_DATA.name}</p>
        </div>
        <div className="hidden md:block bg-slate-900 border border-slate-800 px-6 py-2 rounded-2xl">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Current Rank: </span>
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest italic">Level {MOCK_CHILD_DATA.level} Elite</span>
        </div>
      </div>

      {/* QUICK STATUS BOXES ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] flex flex-col justify-center relative overflow-hidden group">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Total Progress</span>
          <span className="text-2xl font-black italic text-white tracking-tighter">{MOCK_CHILD_DATA.xp} XP</span>
          <div className="absolute right-[-10px] bottom-[-10px] text-5xl opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">🏆</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] flex flex-col justify-center relative overflow-hidden group">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Daily Recovery</span>
          <span className="text-2xl font-black italic text-green-500 tracking-tighter">Optimal</span>
          <div className="absolute right-[-10px] bottom-[-10px] text-5xl opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">🛡️</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] flex flex-col justify-center relative overflow-hidden group">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Fuel Status</span>
          <span className="text-2xl font-black italic text-emerald-500 tracking-tighter">75% Charged</span>
          <div className="absolute right-[-10px] bottom-[-10px] text-5xl opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">🥗</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: PERFORMANCE RADAR */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6 flex flex-col justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Technical Fingerprint</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={MOCK_CHILD_DATA.stats}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                <Radar dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: LOGISTICS & NOTES */}
        <div className="lg:col-span-2 space-y-6">
          {/* SCHEDULE CARD */}
          <div className="bg-orange-600/10 border-2 border-dashed border-orange-500/20 p-8 rounded-[3rem] flex items-center gap-8 group hover:border-orange-500/40 transition-all">
             <div className="w-16 h-16 rounded-3xl bg-orange-600 flex items-center justify-center text-3xl shadow-lg shadow-orange-900/40 group-hover:scale-105 transition-transform">🕒</div>
             <div>
               <h4 className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-1">Upcoming Session</h4>
               <p className="text-2xl font-black italic text-white uppercase tracking-tighter">{MOCK_CHILD_DATA.nextPractice}</p>
             </div>
          </div>

          {/* COACH FEEDBACK */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Coach Intelligence</h3>
              <span className="text-[8px] font-black text-orange-500 uppercase border border-orange-500/20 px-2 py-1 rounded">Private Feed</span>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border-l-4 border-orange-500 italic text-slate-300 text-sm leading-relaxed">
              "{MOCK_CHILD_DATA.coachNote}"
            </div>
            <div className="flex gap-4 pt-2">
              <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[8px] font-black text-slate-500 uppercase">Focus</div>
                <div className="text-[10px] font-bold text-white uppercase">Aerobic Base</div>
              </div>
              <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[8px] font-black text-slate-500 uppercase">Intensity</div>
                <div className="text-[10px] font-bold text-orange-500 uppercase">High Volume</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}