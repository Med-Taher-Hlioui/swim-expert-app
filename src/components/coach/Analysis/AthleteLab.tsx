import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar 
} from 'recharts';
import { 
  Video, History, Target, FileText, Download, Play, 
  CheckCircle2, TrendingUp, ChevronRight, Award, User
} from 'lucide-react';

const MOCK_PROGRESS = [
  { month: 'Nov', technique: 65, speed: 70 },
  { month: 'Dec', technique: 68, speed: 72 },
  { month: 'Jan', technique: 75, speed: 70 },
  { month: 'Feb', technique: 72, speed: 78 },
  { month: 'Mar', technique: 85, speed: 82 },
  { month: 'Apr', technique: 90, speed: 85 },
];

const MOCK_ATHLETES = [
  { id: '1', name: 'Ahmed Derbel', level: 12, xp: 1250, stats: [{ subject: 'Speed', A: 85 }, { subject: 'Endurance', A: 65 }, { subject: 'Technique', A: 90 }, { subject: 'Power', A: 75 }] },
  { id: '2', name: 'Sarra Mansour', level: 8, xp: 850, stats: [{ subject: 'Speed', A: 70 }, { subject: 'Endurance', A: 80 }, { subject: 'Technique', A: 75 }, { subject: 'Power', A: 60 }] },
  { id: '3', name: 'Yassine Ben Amor', level: 15, xp: 2100, stats: [{ subject: 'Speed', A: 95 }, { subject: 'Endurance', A: 85 }, { subject: 'Technique', A: 80 }, { subject: 'Power', A: 90 }] },
];

export default function AthleteLab() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState('1');
  const [activeMetric, setActiveMetric] = useState<'technique' | 'speed'>('technique');

  const athlete = MOCK_ATHLETES.find(a => a.id === selectedId) || MOCK_ATHLETES[0];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 text-start">
      
      {/* 1. ATHLETE SELECTION BAR */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {MOCK_ATHLETES.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelectedId(a.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all whitespace-nowrap ${
              selectedId === a.id 
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black italic ${selectedId === a.id ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-500'}`}>
              {a.name.charAt(0)}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">{a.name}</span>
          </button>
        ))}
      </div>

      {/* 2. TOP PROFILE HEADER */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3.5rem] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-black text-white italic shadow-2xl">
               {athlete.name.charAt(0)}
             </div>
             <div>
                <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter leading-none">{athlete.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-[8px] font-black text-blue-400 uppercase tracking-widest">Level {athlete.level} Elite</span>
                  <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[8px] font-black text-slate-500 uppercase tracking-widest">{athlete.xp} XP Points</span>
                </div>
             </div>
          </div>
          <button className="bg-white text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
             Update Biometrics
          </button>
        </div>
        <div className="absolute right-[-20px] top-[-20px] text-[10rem] font-black italic text-white opacity-[0.02] pointer-events-none uppercase">Lab</div>
      </div>

      {/* 3. CORE ANALYTICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PROGRESS TIMELINE (6 MONTHS) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-500"><History size={18} /></div>
              <h3 className="text-xs font-black uppercase text-white tracking-widest">Historical Performance</h3>
            </div>
            <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button onClick={() => setActiveMetric('technique')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeMetric === 'technique' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Technique</button>
              <button onClick={() => setActiveMetric('speed')} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeMetric === 'speed' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Speed</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_PROGRESS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', fontSize: '10px' }} />
                <Line type="monotone" dataKey={activeMetric} stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RADAR SNAPSHOT */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col items-center justify-center">
          <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-6 self-start">Current Radar</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={athlete.stats}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                <Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. VIDEO VAULT & GOALS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* VIDEO ARCHIVE */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6 text-start">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-purple-500"><Video size={18} /></div>
             <h3 className="text-xs font-black uppercase text-white tracking-widest">Biomechanical Archive</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[1, 2].map((v) => (
               <div key={v} className="group relative aspect-video bg-black rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                 <div className="absolute bottom-4 left-4 z-20">
                   <p className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Technique Review</p>
                   <p className="text-[10px] font-bold text-white italic">Freestyle Turn Correction</p>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-2xl"><Play size={20} fill="currentColor" /></div>
                 </div>
               </div>
             ))}
          </div>
          <button className="w-full py-4 rounded-2xl bg-slate-950 border border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">View All Footage</button>
        </div>

        {/* STRATEGIC GOALS (CONTRACT) */}
        <div className="bg-slate-950 border border-blue-500/20 p-8 rounded-[3rem] space-y-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg"><Target size={18} /></div>
               <h3 className="text-xs font-black uppercase text-white tracking-widest">Monthly Performance Contract</h3>
            </div>
            <div className="space-y-4">
               {[
                 { t: 'High Elbow Catch consistency in main sets', done: true },
                 { t: 'Underwaters: Minimum 12m off every wall', done: false },
                 { t: 'Sleep Hygiene: 8h+ average log', done: true }
               ].map((goal, i) => (
                 <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${goal.done ? 'bg-blue-600/10 border-blue-500/30' : 'bg-slate-900 border-slate-800'}`}>
                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${goal.done ? 'bg-blue-500 border-blue-400 text-white' : 'border-slate-700'}`}>
                     {goal.done && <CheckCircle2 size={12} />}
                   </div>
                   <span className={`text-[11px] font-bold ${goal.done ? 'text-white' : 'text-slate-500'}`}>{goal.t}</span>
                 </div>
               ))}
            </div>
          </div>
          <Award size={150} className="absolute right-[-30px] bottom-[-30px] text-blue-500 opacity-5" />
        </div>
      </div>

      {/* 5. PDF REPORT HISTORY */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-500"><FileText size={18} /></div>
           <h3 className="text-xs font-black uppercase text-white tracking-widest">Report History Archive</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-start">
           {['March 2026', 'February 2026', 'January 2026'].map((date) => (
             <div key={date} className="flex items-center justify-between p-5 bg-slate-950 rounded-2xl border border-slate-800 group hover:border-amber-500/50 transition-all">
                <div>
                   <p className="text-[10px] font-black text-white uppercase">{date}</p>
                   <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Performance Summary</p>
                </div>
                <button className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 group-hover:text-amber-500 transition-colors"><Download size={18} /></button>
             </div>
           ))}
        </div>
      </div>

    </div>
  );
}