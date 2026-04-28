import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Trophy, Medal, Star, Flame, Award, 
  Settings, Music, Play, Timer, Camera, 
  ShieldCheck, Zap, TrendingUp, Calendar, ChevronRight
} from 'lucide-react';

const BADGES = [
  { id: '1', name: 'Early Bird', icon: '🌅', desc: '100% Morning Attendance' },
  { id: '2', name: 'Iron Lungs', icon: '🫁', desc: 'Top Endurance Score' },
  { id: '3', name: 'Tech Master', icon: '🧬', desc: 'Perfect Drill Execution' },
];

const MOCK_STANDINGS = [
  { id: '1', name: 'Ahmed Derbel', score: 98, badges: ['1', '3'], recovery: 95, attendance: 100, weeklyXp: 450, trend: 'rising' },
  { id: '2', name: 'Yassine Ben Amor', score: 94, badges: ['2'], recovery: 88, attendance: 98, weeklyXp: 520, trend: 'stable' },
  { id: '3', name: 'Sarra Mansour', score: 91, badges: ['1'], recovery: 92, attendance: 85, weeklyXp: 310, trend: 'falling' },
];

export default function EliteBoard() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'pro' | 'recovery' | 'attendance' | 'xp'>('pro');
  const [isProjectorSettingsOpen, setProjectorSettingsOpen] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 text-start pb-10">
      
      {/* 1. HEADER & PROJECTOR QUICK-LINK */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none">
            {t('leaderboard.full_title', 'Elite Rankings')}
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
            {t('leaderboard.full_subtitle', 'Squad Professionalism & Merit')}
          </p>
        </div>
        <button 
          onClick={() => setProjectorSettingsOpen(true)}
          className="flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20"
        >
          <Settings size={16} /> {t('leaderboard.projector_btn', 'Projector Mode Setup')}
        </button>
      </div>

      {/* 2. DYNAMIC CATEGORY FILTERS */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar p-1 bg-slate-900/50 border border-slate-800 rounded-2xl w-fit">
        {[
          { id: 'pro', label: t('leaderboard.pro_label', 'Overall Pro'), icon: ShieldCheck },
          { id: 'recovery', label: t('leaderboard.metric_recovery', 'Best Recovery'), icon: Zap },
          { id: 'attendance', label: t('leaderboard.metric_attendance', 'Highest attendance'), icon: Calendar },
          { id: 'xp', label: t('leaderboard.metric_xp', 'Weekly XP'), icon: TrendingUp },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id as any)}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              filter === cat.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <cat.icon size={14} /> {cat.label}
          </button>
        ))}
      </div>

      {/* 3. THE MAIN PODIUM & LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEADERBOARD LIST */}
        <div className="lg:col-span-2 space-y-4">
          {MOCK_STANDINGS.map((athlete, index) => (
            <div key={athlete.id} className="group relative bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] flex items-center gap-6 transition-all hover:border-blue-500/50 hover:shadow-2xl">
              <div className={`text-4xl font-black italic w-12 ${index === 0 ? 'text-amber-500' : 'text-slate-700'}`}>
                #{index + 1}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl font-black italic text-blue-500">
                {athlete.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-black uppercase text-white tracking-tighter">{athlete.name}</h4>
                <div className="flex gap-2 mt-1">
                  {athlete.badges.map(bId => (
                    <span key={bId} className="w-6 h-6 bg-slate-950 rounded-lg flex items-center justify-center border border-slate-800 text-xs grayscale group-hover:grayscale-0 transition-all cursor-help" title={BADGES.find(b => b.id === bId)?.desc}>
                      {BADGES.find(b => b.id === bId)?.icon}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black italic text-blue-500">
                  {filter === 'pro' && `${athlete.score}%`}
                  {filter === 'recovery' && `${athlete.recovery}%`}
                  {filter === 'attendance' && `${athlete.attendance}%`}
                  {filter === 'xp' && athlete.weeklyXp}
                </div>
                <p className="text-[8px] font-black text-slate-500 uppercase">{filter} SCORE</p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. HALL OF FAME / MONTHLY WINNER */}
        <div className="bg-gradient-to-b from-blue-600 to-indigo-900 p-8 rounded-[3.5rem] relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
          <Award size={120} className="text-white opacity-10 absolute top-[-20px] right-[-20px]" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-xs font-black uppercase text-blue-200 tracking-widest">Hall of Fame</h3>
            <div className="w-24 h-24 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center text-4xl shadow-2xl">
              🏆
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-200 uppercase tracking-[0.2em] mb-1">March MVP</p>
              <h4 className="text-2xl font-black italic uppercase text-white tracking-tighter">Ahmed Derbel</h4>
            </div>
            <p className="text-[11px] font-medium text-blue-100 italic leading-relaxed">
              "Demonstrated elite consistency with 100% attendance and a record-breaking weekly XP gain."
            </p>
            <div className="pt-4">
              <button className="bg-white text-blue-900 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                View History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. AWARD GALLERY */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
        <h3 className="text-xs font-black uppercase text-white tracking-widest flex items-center gap-3">
          <Star className="text-amber-500" size={18} /> Available Elite Badges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BADGES.map(badge => (
            <div key={badge.id} className="bg-slate-950 border border-slate-800 p-5 rounded-3xl flex items-center gap-4 group hover:border-amber-500/30 transition-all">
              <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{badge.icon}</div>
              <div>
                <h5 className="text-[10px] font-black text-white uppercase">{badge.name}</h5>
                <p className="text-[8px] font-bold text-slate-500 uppercase">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PROJECTOR SETTINGS MODAL --- */}
      {isProjectorSettingsOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-2xl z-[120] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[3rem] p-10 relative shadow-2xl">
            <button onClick={() => setProjectorSettingsOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="text-center mb-10">
              <Camera className="mx-auto text-amber-500 mb-4" size={40} />
              <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter">Projector Mode Settings</h3>
              <p className="text-xs font-bold text-slate-500 uppercase mt-2">Format the squad reveal experience</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2"><Music size={14}/> Background Theme</label>
                  <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white">
                    <option>Epic Orchestral</option>
                    <option>Deep Tech-House</option>
                    <option>Cinematic Reveal</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2"><Timer size={14}/> Reveal Speed</label>
                  <select className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white">
                    <option>Instant</option>
                    <option>Delayed (3s per rank)</option>
                    <option>The Big Build-up</option>
                  </select>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase text-white">Audience Interaction</span>
                  <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center px-1">
                    <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
                <p className="text-[8px] font-bold text-slate-600 uppercase">Allow athletes to vote for "Swimmers' Swimmer" via their app during projection.</p>
              </div>

              <button className="w-full bg-amber-500 text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all">
                Launch Fullscreen Presentation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple X Icon local definition if not imported
const X = ({ size, className }: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;