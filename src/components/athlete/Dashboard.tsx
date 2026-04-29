import { useState } from 'react'; // Added useState
import { useTranslation } from 'react-i18next';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from 'recharts';
import { 
  Zap, Trophy, Flame, Target, ChevronRight, 
  Star, Activity, Layout, MessageSquare, 
  Dumbbell, Tv, Utensils, ShoppingBag, Map,
  X, Sparkles // Added X and Sparkles
} from 'lucide-react';
import { XP_REWARDS } from '../../lib/xp';

interface DashboardProps {
  setPage: (page: string) => void;
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  dailyTip: string;
  level: number;
}

export default function Dashboard({ setPage, xp, setXp, dailyTip, level }: DashboardProps) {
  const { t } = useTranslation();

  // --- NEW STATE FOR FUN MODE ---
  const [activeChallenge, setActiveChallenge] = useState<{task: string, reward: number} | null>(null);

  const radarData = [
    { subject: t('chart.speed', 'Speed'), A: 85, fullMark: 100 },
    { subject: t('chart.endurance', 'Endurance'), A: 65, fullMark: 100 },
    { subject: t('chart.technique', 'Technique'), A: 90, fullMark: 100 },
    { subject: t('chart.consistency', 'Consistency'), A: 70, fullMark: 100 },
    { subject: t('chart.power', 'Power'), A: 75, fullMark: 100 },
  ];

  // --- UPDATED TRIGGER FUNCTION ---
  const triggerFunMode = () => {
    const challenges = [
      { task: "Stealth Mode: 200m zero splashes.", reward: XP_REWARDS.FUN_MODE },
      { task: "Dolphin Day: 100m Back Kick.", reward: XP_REWARDS.FUN_MODE },
      { task: "The Finisher: 4x25 Sprint.", reward: XP_REWARDS.FUN_MODE },
      { task: "Tarzan Drill: 50m Head-up.", reward: XP_REWARDS.FUN_MODE }
    ];
    const random = challenges[Math.floor(Math.random() * challenges.length)];
    setActiveChallenge(random);
  };

  const handleClaimXP = () => {
    if (activeChallenge) {
      setXp(prev => prev + activeChallenge.reward);
      setActiveChallenge(null);
    }
  };

  const subpages = [
    { id: 'strategy', name: t('strategy'), icon: Map, desc: t('desc.strategy', 'Race mapping & pacing.') },
    { id: 'gear', name: t('gear'), icon: ShoppingBag, desc: t('desc.gear', 'Equipment health & tracking.') },
    { id: 'nutrition', name: t('nutrition'), icon: Utensils, desc: t('desc.nutrition', 'Fueling for performance.') },
    { id: 'drills', name: t('drills'), icon: Tv, desc: t('desc.drills', 'Elite technical video lab.') },
    { id: 'dryland', name: t('dryland'), icon: Dumbbell, desc: t('desc.dryland', 'Power & mobility routines.') },
  ];

  return (
    <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      
      {/* --- FUN MODE OVERLAY --- */}
      {activeChallenge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setActiveChallenge(null)} />
          
          <div className="relative w-full max-w-md bg-slate-900 border border-purple-500/50 rounded-[3rem] p-8 md:p-10 shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)] text-center overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl" />
            
            <button 
              onClick={() => setActiveChallenge(null)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 space-y-6">
              <div className="w-20 h-20 bg-purple-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-purple-900/40 rotate-12">
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <div className="space-y-2">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">{t('fun_mode')}</h2>
                <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter">Daily Challenge</h3>
              </div>

              <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl">
                <p className="text-lg font-black italic text-purple-100 leading-tight">
                  "{activeChallenge.task}"
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-amber-500 font-black italic uppercase text-xs tracking-widest">
                <Trophy size={16} />
                <span>+{activeChallenge.reward} XP REWARD</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => setActiveChallenge(null)}
                  className="px-6 py-4 rounded-2xl bg-slate-800 text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors font-bold"
                >
                  Dismiss
                </button>
                <button 
                  onClick={handleClaimXP}
                  className="px-6 py-4 rounded-2xl bg-purple-600 text-[10px] font-black uppercase text-white shadow-lg shadow-purple-900/20 hover:scale-105 active:scale-95 transition-all font-bold"
                >
                  Accept & Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. HERO & RADAR SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 relative group overflow-hidden rounded-[3rem] bg-slate-900 border border-slate-800 p-1 shadow-2xl">
          <div className="bg-slate-950 rounded-[2.9rem] p-8 md:p-12 relative overflow-hidden h-full flex flex-col justify-center">
            <div className="relative z-10 text-start space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{t('daily_briefing')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter leading-none mb-3">
                {t('deck_title')}
              </h1>
              <p className="text-slate-400 font-bold max-w-md italic uppercase tracking-wider text-[10px]">{t('deck_subtitle')}</p>
              <button onClick={() => setPage('workout')} className="group/btn w-fit bg-white text-black px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95 font-bold">
                <span className="flex items-center gap-3">{t('workout')} <ChevronRight size={16} /></span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-[3rem] p-8 min-h-[350px] flex flex-col group hover:border-blue-500/30 transition-all">
          <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-4">{t('performance_radar')}</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 8, fontWeight: '900' }} />
                <Radar name="Athlete" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('xp_points')}</p>
          <p className="text-2xl font-black italic text-blue-500">{xp}</p>
        </div>
        
        <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('streak')}</p>
          <p className="text-2xl font-black italic text-white uppercase">5 {t('days_count', 'Days')}</p> 
        </div>

        <button onClick={triggerFunMode} className="bg-purple-600/10 border border-purple-500/20 p-6 rounded-[2rem] group hover:bg-purple-600/20 transition-all text-start">
          <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">{t('fun_mode')}</p>
          <p className="text-sm font-black text-white uppercase font-bold">{t('surprise_me')} →</p>
        </button>

        <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t('rank')}</p>
          <p className="text-sm font-black italic text-amber-500 uppercase">{t('elite')} LVL {level}</p>
        </div>
      </div>

      {/* 3. DAILY TIP & MODERN GATEWAYS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <Target size={120} className="absolute right-[-20px] bottom-[-20px] opacity-10" />
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-4">{t('daily_briefing')}</p>
          <p className="text-xl font-black italic uppercase leading-tight">"{dailyTip}"</p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {subpages.map(page => (
            <button 
              key={page.id} 
              onClick={() => setPage(page.id)}
              className="bg-slate-900/50 p-6 rounded-[2rem] border border-slate-800 text-start hover:border-blue-500 transition-all group relative overflow-hidden h-[160px] flex flex-col justify-between"
            >
              <div className="relative z-10">
                <h4 className="text-xs font-black italic uppercase text-white mb-2 tracking-tighter group-hover:text-blue-400 transition-colors">
                  {page.name}
                </h4>
                <p className="text-[8px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">
                  {page.desc}
                </p>
              </div>
              <div className="mt-auto opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                <page.icon size={20} className="text-blue-500" />
              </div>
              <div className="absolute top-[-10px] right-[-10px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                <page.icon size={80} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. NEWS & CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] group">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-500">{t('news_briefing')}</h3>
            <button onClick={() => setPage('news')} className="text-[9px] font-black uppercase text-slate-500 hover:text-blue-500 transition-colors font-bold">{t('view_all')} →</button>
          </div>
          <div className="ps-4 border-l-2 border-blue-600">
            <p className="text-xs font-black text-white uppercase italic">{t('news_sample')}</p>
            <p className="text-[10px] text-slate-500 mt-2 uppercase font-bold tracking-widest opacity-60">Regional Championship updates finalized.</p>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-8 rounded-[3rem] flex items-center justify-between border-dashed group hover:border-blue-500/50 transition-all">
          <div className="text-start">
            <h3 className="text-xs font-black italic uppercase text-white tracking-widest">{t('connect_dev')}</h3>
            <p className="text-[9px] text-slate-600 font-bold uppercase mt-1">Direct Developer Support</p>
          </div>
          <button onClick={() => setPage('contact')} className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all font-bold">
            <MessageSquare size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}