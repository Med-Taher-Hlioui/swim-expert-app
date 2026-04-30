import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Medal, Star, ChevronLeft } from 'lucide-react';

interface ProgressDeckProps {
  setPage: (page: string) => void;
}

const XP_HISTORY = [
  { month: 'Jan', xp: 800 },
  { month: 'Feb', xp: 950 },
  { month: 'Mar', xp: 1100 },
  { month: 'Apr', xp: 1250 },
];

const SKILL_STAMPS = [
  { name: 'Elite Streamline', date: 'Mar 12', icon: '🚀' },
  { name: 'Turn Master', date: 'Apr 05', icon: '🔄' },
  { name: 'Speed King', date: 'Apr 28', icon: '⚡' },
];

export default function ProgressDeck({ setPage }: ProgressDeckProps) {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pb-20 text-left text-white">
      
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setPage('monitoring')}
          className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-orange-500 leading-none">
            Growth Tracking
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2 tracking-[0.2em]">Athlete Development Journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* XP GROWTH CHART */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-orange-500" size={20} />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">XP Accumulation</h3>
            </div>
            <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <span className="text-[8px] font-black text-orange-500 uppercase">+15% Growth</span>
            </div>
          </div>

          <div className="h-[300px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={XP_HISTORY}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#f97316" strokeWidth={4} fill="url(#colorXp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RANK STATUS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col justify-between shadow-xl min-h-[200px]">
             <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Current Rank</span>
                <p className="text-3xl font-black italic text-white uppercase tracking-tighter">Level 4</p>
             </div>
             
             <div className="space-y-4 mt-6">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-black text-orange-500 uppercase">To Level 5</p>
                   <p className="text-xs font-black text-white italic">250 XP Left</p>
                </div>
                <div className="h-2 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                   <div className="h-full bg-orange-500" style={{ width: '75%' }}></div>
                </div>
             </div>
          </div>

          <div className="bg-orange-600 rounded-[3rem] p-8 text-white shadow-xl shadow-orange-900/20">
             <Medal size={32} className="mb-4 text-orange-200" />
             <h4 className="text-lg font-black italic uppercase leading-none mb-2 tracking-tighter">Consistency Hero</h4>
             <p className="text-xs font-medium text-orange-100 opacity-80 italic"> Ahmed has maintained a 92% attendance rate this month.</p>
          </div>
        </div>
      </div>

      {/* SKILL STAMPS */}
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Verified Skill Stamps</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SKILL_STAMPS.map((stamp, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex items-center gap-4 group transition-all hover:border-orange-500/30">
             <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{stamp.icon}</div>
             <div>
                <p className="text-xs font-black italic text-white uppercase tracking-tight leading-none">{stamp.name}</p>
                <p className="text-[8px] font-black text-slate-600 uppercase mt-1 tracking-widest">Awarded {stamp.date}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}