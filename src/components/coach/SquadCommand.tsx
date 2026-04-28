import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { calculateLevel } from '../../lib/xp';
import { 
  AlertTriangle, Trophy, X, Star, Sparkles, Video, Play, 
  SkipForward, Send, Layout, Target, Clock, Medal, Flame, 
  Maximize2, FileText, Loader2 
} from 'lucide-react';

// --- SUB-COMPONENT IMPORT ---
import SquadHeatMap from './SquadHeatMap';

const MOCK_SQUAD = [
  { 
    id: '1', name: 'Ahmed Derbel', xp: 1250, status: 'Active', 
    wellness: 32, load: 88, consistency: 94,
    lastDrill: 'High Catch', trend: 'rising',
    stats: [{ subject: 'Speed', A: 85 }, { subject: 'Endurance', A: 65 }, { subject: 'Technique', A: 90 }, { subject: 'Power', A: 75 }]
  },
  { 
    id: '2', name: 'Sarra Mansour', xp: 850, status: 'Resting', 
    wellness: 95, load: 15, consistency: 88,
    lastDrill: 'Ankle Mobility', trend: 'stable',
    stats: [{ subject: 'Speed', A: 70 }, { subject: 'Endurance', A: 80 }, { subject: 'Technique', A: 75 }, { subject: 'Power', A: 60 }]
  },
  { 
    id: '3', name: 'Yassine Ben Amor', xp: 2100, status: 'Active', 
    wellness: 72, load: 78, consistency: 98,
    lastDrill: 'Underwater Phase', trend: 'rising',
    stats: [{ subject: 'Speed', A: 95 }, { subject: 'Endurance', A: 85 }, { subject: 'Technique', A: 80 }, { subject: 'Power', A: 90 }]
  },
];

export default function SquadCommand() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // --- UI STATES ---
  const [workout, setWorkout] = useState({ warmup: '', mainSet: '', focus: '' });
  const [isAwarding, setIsAwarding] = useState(false);
  const [lastAwarded, setLastAwarded] = useState<string | null>(null);
  const [isVideoLabOpen, setIsVideoLabOpen] = useState(false);
  const [isProjecting, setIsProjecting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // PDF state

  const selectedAthlete = MOCK_SQUAD.find(a => a.id === selectedId);

  // LOGIC: Professionalism Ranking
  const getProScore = (athlete: typeof MOCK_SQUAD[0]) => {
    return Math.round((athlete.wellness + athlete.consistency + (athlete.xp / 25)) / 3);
  };
  const sortedLeaderboard = [...MOCK_SQUAD].sort((a, b) => getProScore(b) - getProScore(a));

  const getFatigueStatus = (wellness: number, load: number) => {
    if (wellness < 40 && load > 75) return 'RED_ZONE';
    if (wellness < 60) return 'WARNING';
    return 'OPTIMAL';
  };

  const handleQuickAward = (name: string) => {
    setLastAwarded(name);
    setTimeout(() => setLastAwarded(null), 3000);
  };

  // NEW: PDF Generator Handler
  const handleGenerateReport = (name: string) => {
    setIsGenerating(true);
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Monthly Progress Report for ${name} has been generated and ready for export.`);
    }, 2000);
  };

  const awardMerit = (e: React.MouseEvent | React.PointerEvent, name: string) => {
    if (e) e.stopPropagation(); 
    alert(`${t('squad_page.award_btn', 'Award XP')} -> ${name}! (+100 XP)`);
  };

  return (
    <div className={`relative animate-in slide-in-from-bottom-8 duration-700 space-y-12 pb-20 text-start ${isProjecting ? 'overflow-hidden' : ''}`}>
      
      {/* 1. AI INTELLIGENCE BRIEFING */}
      {!selectedId && (
        <div className="bg-slate-900/40 border border-blue-500/20 p-8 rounded-[3rem] relative overflow-hidden group animate-in fade-in duration-1000 text-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white leading-none">{t('ai_briefing.title')}</h3>
              <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.2em]">{t('ai_briefing.status')}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
              <p className="text-[11px] font-bold text-white italic mb-2">"{t('ai_briefing.insight_endurance')}"</p>
              <p className="text-[9px] font-black uppercase text-blue-400">{t('ai_briefing.action_endurance')}</p>
            </div>
            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
              <p className="text-[11px] font-bold text-white italic mb-2">"{t('ai_briefing.insight_wellness')}"</p>
              <p className="text-[9px] font-black uppercase text-green-400">{t('ai_briefing.action_wellness')}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. HEADER & SUMMARY */}
      {!selectedId && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 text-start">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500 leading-none">{t('squad_page.title')}</h2>
            <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase italic">{t('squad_page.subtitle')}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-3xl flex flex-col justify-center text-start">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{t('squad_page.avg_xp')}</span>
            <span className="text-xl font-black italic text-white">1,400</span>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-3xl flex flex-col justify-center text-start">
            <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">{t('squad_page.risk_alerts')}</span>
            <span className="text-xl font-black italic text-white leading-none">1 {t('squad_page.at_risk_count')}</span>
          </div>
        </div>
      )}

      {/* 3. TACTICAL WORKOUT BUILDER */}
      {!selectedId && (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3.5rem] relative overflow-hidden group">
          <div className="relative z-10 space-y-8 text-start">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><Layout size={18} /></div>
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">{t('builder.title')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2">{t('builder.warmup')}</label>
                <input value={workout.warmup} onChange={(e) => setWorkout({...workout, warmup: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700" placeholder="400m Mixed" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2">{t('builder.main_set')}</label>
                <input value={workout.mainSet} onChange={(e) => setWorkout({...workout, mainSet: e.target.value})} className="w-full bg-slate-950 border border-blue-500/20 p-4 rounded-2xl text-xs font-bold text-blue-100 outline-none focus:border-blue-500 transition-all placeholder:text-slate-700 shadow-inner" placeholder="10x100m @ 1:30" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2">{t('builder.focus')}</label>
                <input value={workout.focus} onChange={(e) => setWorkout({...workout, focus: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700" placeholder="High Elbow" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
               <button className="px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">{t('builder.save_template')}</button>
               <button onClick={() => alert('Broadcasted')} className="bg-blue-600 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-blue-900/20"><Send size={14} /> {t('builder.broadcast')}</button>
            </div>
          </div>
          <div className="absolute right-[-20px] top-[-20px] text-[10rem] font-black italic text-white opacity-[0.02] pointer-events-none uppercase select-none">Set</div>
        </div>
      )}

      {/* 4. HEATMAP */}
      {!selectedId && <SquadHeatMap />}

      {/* 5. MAIN WORKSPACE (ROSTER & ANALYSIS) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className={`space-y-6 transition-all duration-500 ${selectedId ? 'lg:w-1/3' : 'w-full'}`}>
          <div className="flex justify-between items-center px-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">{selectedId ? t('squad_page.switch_athlete') : t('squad_page.analysis_title')}</h3>
            {selectedId && <button onClick={() => {setSelectedId(null); setIsVideoLabOpen(false);}} className="text-[10px] font-black uppercase text-blue-500 underline underline-offset-4">{t('view_all')}</button>}
          </div>

          <div className={`grid gap-6 ${selectedId ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {MOCK_SQUAD.map((athlete) => {
              const isRed = getFatigueStatus(athlete.wellness, athlete.load) === 'RED_ZONE';
              return (
                <div key={athlete.id} onClick={() => setSelectedId(athlete.id)} className={`bg-slate-900 border transition-all p-8 rounded-[2.5rem] cursor-pointer hover:shadow-2xl ${isRed ? 'border-red-500 shadow-red-900/20' : 'border-slate-800'} ${selectedId === athlete.id ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-blue-900/40' : ''}`}>
                  <div className="space-y-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${isRed ? 'bg-red-500 text-white' : 'bg-slate-950 text-blue-500 border border-slate-800'}`}>{athlete.name.charAt(0)}</div>
                      <div>
                        <h4 className="text-lg font-black italic uppercase text-white tracking-tighter leading-none">{athlete.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${isRed ? 'bg-red-500' : 'bg-green-500'}`}></span>
                          <span className="text-[8px] font-bold text-slate-500 uppercase">{athlete.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ANALYSIS DETAIL PANEL UPDATED WITH PDF REPORT BUTTON */}
        {selectedAthlete && (
          <div className="flex-1 w-full animate-in slide-in-from-right-10 duration-500">
            <div className="bg-slate-900 border border-blue-500/30 p-8 rounded-[3rem] relative overflow-hidden shadow-2xl text-start">
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">
                    {t('squad_page.analysis_title')}: <span className="text-blue-500">{selectedAthlete.name}</span>
                  </h3>
                  
                  {/* --- NEW: PDF GENERATOR BUTTON --- */}
                  <button 
                    onClick={() => handleGenerateReport(selectedAthlete.name)}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
                  >
                    {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                    {isGenerating ? t('report.generating', 'Generating...') : t('report.generate_btn', 'Monthly Report')}
                  </button>
                </div>

                <button onClick={() => setIsVideoLabOpen(!isVideoLabOpen)} className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-3 ${isVideoLabOpen ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                  <Video size={16} /> {t('video_lab.title')}
                </button>

                <div className="grid grid-cols-1 gap-8">
                  {!isVideoLabOpen ? (
                    <div className="h-[300px] w-full bg-slate-950/50 rounded-[2rem] border border-slate-800 p-4">
                      <ResponsiveContainer width="100%" height="100%"><RadarChart data={selectedAthlete.stats}><PolarGrid stroke="#1e293b" /><PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} /><Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} /></RadarChart></ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in zoom-in duration-300">
                      <div className="aspect-video bg-black rounded-3xl border-2 border-dashed border-slate-800 flex items-center justify-center text-[9px] font-black text-slate-600 uppercase">{t('video_lab.upload_athlete')}</div>
                      <div className="aspect-video bg-black rounded-3xl border-2 border-blue-500/30 flex items-center justify-center relative group">
                        <div className="absolute top-0 left-0 bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-br-2xl uppercase">ELITE</div>
                        <span className="text-[9px] font-black text-blue-500 uppercase">{t('video_lab.select_master')}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-start">
                      <div className="text-[8px] font-black text-slate-500 uppercase mb-2 italic tracking-widest">{t('squad_page.obs_title')}</div>
                      <p className="text-[11px] font-bold text-white italic leading-relaxed">Currently Level {calculateLevel(selectedAthlete.xp)} Elite. High Catch focus.</p>
                    </div>
                    <textarea placeholder={t('squad_page.note_placeholder')} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-[11px] text-white outline-none focus:border-blue-500 min-h-[100px]" />
                    <div className="flex gap-4">
                       <button onClick={(e) => awardMerit(e, selectedAthlete.name)} className="bg-slate-800 hover:bg-blue-600 px-6 rounded-2xl transition-all border border-slate-700 text-white py-4 text-[10px] font-black uppercase">🏆 {t('squad_page.award_btn')}</button>
                       <button className="flex-1 bg-blue-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">{t('squad_page.save_btn')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. SOUSSE ELITE LEADERBOARD */}
      {!selectedId && (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3.5rem] relative overflow-hidden shadow-2xl text-start">
          <div className="flex items-center justify-between mb-10 text-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500"><Medal size={24} /></div>
              <div>
                <h3 className="text-lg font-black italic uppercase text-white tracking-tighter">{t('leaderboard.title')}</h3>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{t('leaderboard.subtitle')}</p>
              </div>
            </div>
            <button onClick={() => setIsProjecting(true)} className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-amber-500 group transition-all"><Maximize2 size={18} className="group-hover:scale-110" /></button>
          </div>

          <div className="space-y-4">
            {sortedLeaderboard.map((athlete, index) => {
              const proScore = getProScore(athlete);
              return (
                <div key={athlete.id} className={`flex items-center gap-6 p-5 rounded-2xl border transition-all ${index === 0 ? 'bg-amber-500/5 border-amber-500/30' : 'bg-slate-950 border-slate-800'}`}>
                  <div className={`text-2xl font-black italic w-8 ${index === 0 ? 'text-amber-500' : 'text-slate-700'}`}>#{index + 1}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[11px] font-black uppercase text-white tracking-tight">{athlete.name}</span>
                      <span className="text-[10px] font-black italic text-amber-500">{proScore}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${proScore}%` }}></div></div>
                  </div>
                  <div className="text-orange-500"><Flame size={16} fill="currentColor" className={athlete.consistency > 95 ? 'animate-bounce' : ''} /></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. FULLSCREEN PROJECTION OVERLAY */}
      {isProjecting && (
        <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col p-12 animate-in fade-in zoom-in duration-500 overflow-y-auto">
           <button onClick={() => setIsProjecting(false)} className="absolute top-12 right-12 w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white"><X size={24} /></button>
           <div className="flex-1 flex flex-col items-center max-w-5xl mx-auto w-full py-10">
              <div className="text-center mb-16"><Medal size={64} className="text-amber-500 mx-auto mb-6" /><h2 className="text-5xl font-black italic uppercase text-white tracking-tighter mb-4">Sousse Elite Standings</h2><div className="h-1 w-32 bg-amber-500 mx-auto rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)]"></div></div>
              <div className="w-full space-y-6">
                {sortedLeaderboard.map((athlete, index) => {
                  const proScore = getProScore(athlete);
                  return (
                    <div key={athlete.id} className={`flex items-center gap-8 p-8 rounded-[2.5rem] border-2 transition-all ${index === 0 ? 'bg-amber-500/10 border-amber-500 scale-105 shadow-2xl shadow-amber-500/10' : 'bg-slate-900 border-slate-800'}`}>
                      <span className={`text-5xl font-black italic ${index === 0 ? 'text-amber-500' : 'text-slate-700'}`}>#{index + 1}</span>
                      <div className="flex-1 text-start"><h4 className="text-2xl font-black uppercase text-white mb-2">{athlete.name}</h4><div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: `${proScore}%` }}></div></div></div>
                      <div className="text-right"><div className="text-3xl font-black italic text-amber-500">{proScore}%</div><div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Professionalism</div></div>
                    </div>
                  );
                })}
              </div>
           </div>
        </div>
      )}

      {/* FAB REWARD SYSTEM */}
      <button onClick={() => setIsAwarding(true)} className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all z-50 group active:scale-95">
        <Trophy size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-12 right-0 bg-slate-900 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{t('quick_award.fab_label')}</span>
      </button>

      {/* QUICK AWARD MODAL */}
      {isAwarding && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[110] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
            <button onClick={() => setIsAwarding(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            <div className="text-center mb-10"><h3 className="text-3xl font-black italic uppercase text-white tracking-tighter">{t('quick_award.title')}</h3><p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('quick_award.subtitle')}</p></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {MOCK_SQUAD.map(a => (
                <button key={a.id} onClick={() => handleQuickAward(a.name)} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl flex flex-col items-center gap-3 hover:border-blue-500 transition-all group active:scale-95">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all text-xl font-black italic">{a.name.charAt(0)}</div>
                  <span className="text-[10px] font-black uppercase text-slate-300 group-hover:text-white">{a.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
            {lastAwarded && <div className="mt-8 bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-center justify-center gap-3 animate-in slide-in-from-top-4"><Star className="text-green-500 fill-green-500" size={16} /><span className="text-[10px] font-black uppercase text-green-500 tracking-widest">{t('quick_award.success')} to {lastAwarded}!</span></div>}
          </div>
        </div>
      )}
    </div>
  );
}