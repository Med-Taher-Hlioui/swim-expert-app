import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { 
  Activity, TrendingUp, AlertCircle, Timer, 
  Calendar, Info, ChevronRight, Zap
} from 'lucide-react';

const MOCK_MONTHLY_DATA = [
  { day: 'W1', squad: 45, individual: 42 },
  { day: 'W2', squad: 52, individual: 58 },
  { day: 'W3', squad: 48, individual: 35 },
  { day: 'W4', squad: 65, individual: 62 },
];

export default function WorkloadDetails() {
  const { t } = useTranslation();
  const [viewMetric, setViewMetric] = useState<'volume' | 'intensity'>('volume');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 text-start">
      
      {/* HEADER & TAPER CLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">
            {t('workload.title', 'Workload Analytics')}
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
            {t('workload.subtitle', 'Biometric Load & Injury Prevention')}
          </p>
        </div>

        {/* Taper Countdown Card */}
        <div className="bg-blue-600 p-6 rounded-[2rem] shadow-xl shadow-blue-900/20 flex items-center justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[8px] font-black text-blue-200 uppercase tracking-[0.2em]">Next Major Meet</p>
            <h4 className="text-xl font-black text-white italic">Sousse Championships</h4>
            <div className="flex items-center gap-2 mt-2">
              <Timer size={14} className="text-blue-200" />
              <span className="text-2xl font-black text-white">14 {t('days_count')}</span>
            </div>
          </div>
          <Zap size={60} className="absolute right-[-10px] opacity-20 text-white group-hover:rotate-12 transition-transform" />
        </div>
      </div>

      {/* PRIMARY ANALYSIS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Acute:Chronic Ratio</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-green-500 italic">1.14</span>
            <span className="text-[9px] font-bold text-slate-400 mb-1 uppercase">Optimal Range</span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-2">Squad Fatigue Avg</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-amber-500 italic">64%</span>
            <TrendingUp size={16} className="text-amber-500 mb-1" />
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-[2rem] lg:col-span-2 flex items-center gap-4">
          <AlertCircle className="text-red-500" size={32} />
          <div>
            <p className="text-[10px] font-black text-red-500 uppercase">Injury Risk Alert</p>
            <p className="text-xs font-bold text-white italic">Ahmed Derbel: Significant intensity spike in Week 4. Recommended volume reduction: 15%.</p>
          </div>
        </div>
      </div>

      {/* LOAD CHART SECTION */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-500"><Activity size={20} /></div>
            <h3 className="text-xs font-black uppercase text-white tracking-widest">Training Load Comparison</h3>
          </div>
          <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button 
              onClick={() => setViewMetric('volume')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${viewMetric === 'volume' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
            >
              Volume (KM)
            </button>
            <button 
              onClick={() => setViewMetric('intensity')}
              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${viewMetric === 'intensity' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
            >
              Intensity (RPE)
            </button>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_MONTHLY_DATA}>
              <defs>
                <linearGradient id="colorSquad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorIndiv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="day" stroke="#475569" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', fontSize: '10px' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="squad" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSquad)" strokeWidth={3} name="Squad Average" />
              <Area type="monotone" dataKey="individual" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorIndiv)" strokeWidth={3} name="Selected Athlete" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}