import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { 
  Trophy, ShieldCheck, Fuel, Clock, 
  MessageSquare, ChevronRight, Activity, Bell,
  Shield, Eye, EyeOff, HeartPulse, Pill, AlertCircle,
  TrendingUp, Target, Calendar, Flame, ShoppingBag, 
  Wrench, Share2, MapPin, Navigation, Star, Heart, Coffee
} from 'lucide-react';

interface ParentHubProps {
  setPage: (page: string) => void;
}

const MOCK_CHILD_DATA = {
  name: "Ahmed Derbel",
  level: 4,
  xp: 1250,
  nextPractice: "17:00",
  coachNote: "Ahmed is excelling in sprint endurance. Focus on technical recovery tonight.",
  stats: [
    { subject: 'Speed', A: 85 },
    { subject: 'Endurance', A: 65 },
    { subject: 'Technique', A: 90 },
    { subject: 'Power', A: 75 },
    { subject: 'Strategy', A: 70 },
  ]
};

const VENUES = {
  SOUSSE_OLYMPIC: { name: "Sousse Olympic Pool", location: "http://maps.google.com/?q=Sousse+Olympic+Pool", city: "Sousse" },
  ESS_CLUB: { name: "ESS Aquatic Complex", location: "http://maps.google.com/?q=ESS+Sahloul", city: "Sahloul" },
  MSAKEN_POOL: { name: "Msaken Municipal Pool", location: "http://maps.google.com/?q=Msaken+Pool", city: "Msaken" }
};

const ATTENDANCE_DATA = [
  [1, 1, 1, 0, 1, 1, 0], [1, 1, 1, 1, 1, 1, 0], 
  [1, 0, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1]
];

const DAYS_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const GEAR_HEALTH = [
  { item: "Tech Suit (Carbon)", status: 85, alert: false },
  { item: "Training Fins", status: 20, alert: true },
  { item: "Racing Goggles", status: 95, alert: false }
];

export default function ParentHub({ setPage }: ParentHubProps) {
  const { t } = useTranslation();
  const [isMedicalRevealed, setIsMedicalRevealed] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(VENUES.SOUSSE_OLYMPIC);

  const medicalInfo = {
    blood: "A+",
    allergies: "Latex, Fish",
    status: "Active / Fit"
  };

  const wellnessConclusion = {
    sleep: 9.5,
    status: "Fully Recovered",
    readiness: 94
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pb-20 text-left text-white">
      
      {/* 1. HEADER & COACH MESSAGE */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3">
               <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">{t('monitoring')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
              {MOCK_CHILD_DATA.name}
            </h2>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-[1.5rem] flex items-center gap-4 shadow-2xl">
             <div className="text-end">
               <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{t('rank')}</p>
               <p className="text-sm font-black italic text-orange-500 uppercase">{t('elite')} LVL {MOCK_CHILD_DATA.level}</p>
             </div>
             <Trophy className="text-orange-500" size={20} />
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-[2rem] relative overflow-hidden group shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare size={16} className="text-orange-500" />
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Coach Intelligence Feed</h3>
          </div>
          <p className="text-sm italic text-slate-300 font-medium leading-relaxed ps-7 border-l-2 border-orange-500/30">
            "{MOCK_CHILD_DATA.coachNote}"
          </p>
          <Bell size={60} className="absolute right-[-10px] top-[-10px] text-white/[0.02] pointer-events-none" />
        </div>
      </div>

      {/* 2. QUICK STATUS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LINKED: Opens ProgressDeck */}
        <button onClick={() => setPage('analysis')} className="group bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] relative overflow-hidden text-left transition-all hover:border-orange-500/30 shadow-xl">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{t('xp_points')}</span>
          <p className="text-3xl font-black italic text-white tracking-tighter mt-2">{MOCK_CHILD_DATA.xp} <span className="text-xs text-slate-600">XP</span></p>
          <Trophy className="absolute right-[-10px] bottom-[-10px] size-24 text-white/[0.02] group-hover:text-orange-500/[0.05] transition-colors" />
        </button>

        <button onClick={() => setPage('wellness')} className="group bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] relative overflow-hidden text-left transition-all hover:border-green-500/30 shadow-xl">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{t('daily_recovery')}</span>
          <div className="flex items-center gap-2 mt-2 font-black italic text-green-500 uppercase text-2xl tracking-tighter">
             <ShieldCheck size={20} /> {wellnessConclusion.status}
          </div>
        </button>

        <button onClick={() => setPage('nutrition')} className="group bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] relative overflow-hidden text-left transition-all hover:border-amber-500/30 shadow-xl">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{t('fuel_status')}</span>
          <div className="flex items-center gap-2 mt-2 font-black italic text-amber-500 uppercase text-2xl tracking-tighter">
             <Fuel size={20} /> 75%
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 3. PERFORMANCE RADAR & ARCHETYPE (Left Column) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col group shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('performance_radar')}</h3>
            <Activity size={18} className="text-orange-500" />
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={MOCK_CHILD_DATA.stats}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                <Radar dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/50 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Technical Archetype</span>
              <span className="text-[10px] font-black uppercase italic text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 tracking-tighter">Tactical Sprinter</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/50">
                <div className="flex items-center gap-2 mb-1.5"><TrendingUp size={12} className="text-green-500" /><p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Peak Power</p></div>
                <p className="text-xs font-black text-white italic uppercase leading-none">Technique (90%)</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/50">
                <div className="flex items-center gap-2 mb-1.5"><Target size={12} className="text-amber-500" /><p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Growth Area</p></div>
                <p className="text-xs font-black text-amber-500 italic uppercase leading-none">Endurance (65%)</p>
              </div>
            </div>

            {/* LINKED: Opens ProgressDeck */}
            <div onClick={() => setPage('analysis')} className="cursor-pointer p-4 bg-slate-950 border border-slate-800/50 rounded-2xl relative overflow-hidden group/badge transition-all hover:border-orange-500/40">
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600"><Star size={20} className="group-hover/badge:text-orange-500 transition-colors" /></div>
                  <div>
                    <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Approaching Milestone</p>
                    <p className="text-[10px] font-black text-white uppercase italic tracking-tighter leading-none">Silver Endurance Badge</p>
                  </div>
                </div>
                <p className="text-xs font-black italic text-orange-500 leading-none">85%</p>
              </div>
              <div className="mt-4 h-1 bg-slate-900 rounded-full overflow-hidden"><div className="h-full bg-orange-500 rounded-full" style={{ width: '85%' }}></div></div>
            </div>
          </div>
        </div>

        {/* 4. LOGISTICS & WELLNESS (Right Column) */}
        <div className="lg:col-span-7 space-y-6">
          {/* LOGISTICS BRIDGE */}
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 space-y-6 shadow-2xl relative overflow-hidden text-slate-400">
            <div className="flex justify-between items-center relative z-10">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-600/20 rounded-xl text-orange-500"><MapPin size={20} /></div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Logistics Bridge</h3>
               </div>
               <select onChange={(e) => setSelectedVenue(VENUES[e.target.value as keyof typeof VENUES])} className="bg-slate-950 border border-slate-800 text-[9px] font-black uppercase py-2 px-4 rounded-full text-orange-500 focus:outline-none cursor-pointer">
                  <option value="SOUSSE_OLYMPIC">Sousse Olympic</option>
                  <option value="ESS_CLUB">ESS Sahloul</option>
                  <option value="MSAKEN_POOL">Msaken Pool</option>
               </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
               <div className="bg-slate-950 border border-slate-800/50 p-6 rounded-[2rem] flex flex-col justify-between">
                  <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Next Practice</p>
                  <p className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none">{MOCK_CHILD_DATA.nextPractice}</p>
                  <p className="text-[10px] font-black uppercase italic text-orange-500 mt-4 leading-tight">{selectedVenue.name}</p>
               </div>
               <button onClick={() => window.open(selectedVenue.location, '_blank')} className="bg-slate-950 border border-slate-800/50 p-6 rounded-[2rem] flex flex-col justify-between group hover:bg-orange-600 hover:border-orange-500 transition-all text-left">
                  <div className="flex justify-between items-start w-full">
                    <p className="text-[8px] font-black text-slate-500 uppercase group-hover:text-white transition-colors">Venue Location</p>
                    <Navigation size={18} className="text-orange-500 group-hover:text-white" />
                  </div>
                  <p className="text-[10px] font-black uppercase italic tracking-tighter text-white mt-auto">Open in Maps →</p>
               </button>
            </div>
          </div>

          {/* WELLNESS CONCLUSION */}
          <button onClick={() => setPage('wellness')} className="w-full bg-slate-900 border border-slate-800 rounded-[3rem] p-8 group hover:border-green-500/40 transition-all text-left shadow-xl overflow-hidden relative">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-xl text-green-500"><Coffee size={20} /></div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wellness Conclusion</h3>
              </div>
              <ChevronRight size={16} className="text-slate-600 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="grid grid-cols-3 gap-4 relative z-10">
              <div className="space-y-1 text-white">
                <p className="text-[7px] font-black text-slate-500 uppercase">Sleep Quality</p>
                <p className="text-xl font-black italic leading-none">{wellnessConclusion.sleep} <span className="text-[8px]">Hrs</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-[7px] font-black text-slate-500 uppercase">Readiness</p>
                <p className="text-xl font-black italic text-green-500 leading-none">{wellnessConclusion.readiness}%</p>
              </div>
              <div className="space-y-1 text-right text-white">
                <p className="text-[7px] font-black text-slate-500 uppercase">Muscle State</p>
                <p className="text-[10px] font-black italic uppercase">Optimal</p>
              </div>
            </div>
            <Coffee size={120} className="absolute right-[-20px] bottom-[-20px] text-white/[0.02] pointer-events-none group-hover:text-green-500/[0.03] transition-colors" />
          </button>

          {/* MEDICAL VAULT */}
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 relative overflow-hidden group shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3"><Shield size={20} className="text-purple-500" /><h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Medical Vault</h3></div>
              <button onClick={() => setIsMedicalRevealed(!isMedicalRevealed)} className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                {isMedicalRevealed ? <><EyeOff size={14} className="inline mr-1"/> Hide</> : <><Eye size={14} className="inline mr-1"/> Reveal</>}
              </button>
            </div>
            <div className={`grid grid-cols-2 gap-4 transition-all duration-500 ${!isMedicalRevealed ? 'blur-md grayscale opacity-20 pointer-events-none' : 'blur-0 opacity-100'}`}>
              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/50 text-white">
                <HeartPulse size={14} className="text-red-500 mb-2" /><span className="text-[8px] font-black text-slate-500 uppercase block">Blood Type</span>
                <p className="text-2xl font-black italic leading-none">{medicalInfo.blood}</p>
              </div>
              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800/50 text-white">
                <Pill size={14} className="text-blue-500 mb-2" /><span className="text-[8px] font-black text-slate-500 uppercase block">Allergies</span>
                <p className="text-xs font-bold uppercase truncate leading-none">{medicalInfo.allergies}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM ROW: ATTENDANCE & GEAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ATTENDANCE */}
        <div className="text-left bg-slate-900 border border-slate-800 p-8 rounded-[3rem] group shadow-2xl transition-all">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3 text-orange-500"><Calendar size={18} /><h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Attendance Tracker</h3></div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded-lg"><Flame size={12} className="text-green-500" /><span className="text-[8px] font-black text-green-500 uppercase tracking-tighter">92% Month</span></div>
          </div>
          <div className="flex flex-col gap-2 text-white">
            <div className="flex justify-between mb-1 px-1">{DAYS_LABELS.map((day, idx) => (<span key={idx} className="w-8 text-center text-[8px] font-black text-slate-600 uppercase">{day}</span>))}</div>
            <div className="space-y-2">
              {ATTENDANCE_DATA.map((week, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex justify-between flex-1 pr-4">{week.map((status, dIdx) => (<div key={dIdx} className={`w-8 h-8 rounded-lg border transition-all ${status === 1 ? 'bg-orange-500 border-orange-400 shadow-[0_0_15px_-5px_rgba(249,115,22,0.5)]' : 'bg-slate-950 border-slate-800'}`} />))}</div>
                  <div className={`w-1.5 h-1.5 rounded-full ${week.filter(d => d === 1).length >= 6 ? 'bg-orange-500 animate-pulse' : 'bg-slate-800'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GEAR SYNC */}
        <button onClick={() => setPage('gear_audit')} className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 text-left group hover:border-orange-500 transition-all relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center mb-6 text-orange-500 text-white">
            <div className="flex items-center gap-3"><div className="p-2 bg-orange-500/10 rounded-xl"><ShoppingBag size={20} /></div><h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Equipment Health Sync</h3></div>
            <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 group-hover:text-orange-500 transition-all" />
          </div>
          <div className="space-y-4 relative z-10">
            {GEAR_HEALTH.map((gear, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center"><span className="text-[10px] font-black italic uppercase text-white tracking-tighter">{gear.item}</span>{gear.alert && <Wrench size={12} className="text-red-500 animate-pulse" />}</div>
                <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50"><div className={`h-full rounded-full transition-all duration-1000 ${gear.alert ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-orange-500'}`} style={{ width: `${gear.status}%` }}></div></div>
              </div>
            ))}
          </div>
          <ShoppingBag size={120} className="absolute right-[-20px] bottom-[-20px] text-white/[0.02] pointer-events-none group-hover:text-orange-500/[0.03] transition-colors" />
        </button>
      </div>
    </div>
  );
}