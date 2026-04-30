import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Moon, Activity, Brain, CheckCircle2, 
  Zap, CloudRain, Target, Smile, AlertCircle
} from 'lucide-react';

export default function WellnessMonitor() {
  const { t } = useTranslation();
  const [sleep, setSleep] = useState(8);
  const [soreness, setSoreness] = useState(2);
  const [mood, setMood] = useState('Energized');

  const moods = [
    { label: 'Energized', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Tired', icon: CloudRain, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Stressed', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
    { label: 'Focused', icon: Target, color: 'text-orange-400', bg: 'bg-orange-400/10' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-10 pb-20 text-left">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-orange-500 leading-none">
            {t('wellness')}
          </h2>
          <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] mt-3 uppercase italic opacity-70">
            {t('daily_health_check', 'Biometric Recovery Sync')}
          </p>
        </div>
        
        {/* RECOVERY SCORE PREVIEW */}
        <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl flex items-center gap-4">
          <div className="text-end">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Est. Recovery</p>
            <p className="text-xl font-black italic text-white leading-none">88%</p>
          </div>
          <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-orange-500 rotate-45"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 2. SLEEP TRACKER (Bento Large) */}
        <div className="md:col-span-7 bg-slate-900 border border-slate-800 p-8 rounded-[3rem] relative overflow-hidden group">
          <div className="relative z-10 space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
                  <Moon size={20} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{t('sleep_duration', 'Sleep Duration')}</h3>
              </div>
              <span className="text-3xl font-black text-white italic tracking-tighter">{sleep} <span className="text-sm text-slate-500 uppercase">Hrs</span></span>
            </div>

            <div className="space-y-4">
              <input 
                type="range" min="4" max="12" step="0.5" value={sleep} 
                onChange={(e) => setSleep(parseFloat(e.target.value))}
                className="w-full h-3 bg-slate-950 rounded-full appearance-none cursor-pointer accent-orange-500 border border-slate-800"
              />
              <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-widest px-1">
                <span>4h (Under)</span>
                <span>8h (Base)</span>
                <span>12h (Elite)</span>
              </div>
            </div>

            <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex items-start gap-3">
              <AlertCircle size={14} className="text-orange-500 mt-0.5" />
              <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase">
                {t('sleep_tip', 'Elite swimmers require 9+ hours. Current duration suggests partial recovery.')}
              </p>
            </div>
          </div>
          <Moon size={150} className="absolute right-[-20px] top-[-20px] text-white/[0.02] pointer-events-none" />
        </div>

        {/* 3. SORENESS LEVEL (Bento Medium) */}
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col justify-between group hover:border-orange-500/30 transition-all">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{t('soreness', 'Body Fatigue')}</h3>
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Level {soreness} / 5</p>
            </div>
            <Activity size={20} className="text-slate-700" />
          </div>

          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button 
                key={num} 
                onClick={() => setSoreness(num)}
                className={`flex-1 aspect-square rounded-2xl font-black transition-all flex items-center justify-center border ${
                  soreness === num 
                    ? 'bg-orange-500 border-orange-400 text-white shadow-xl shadow-orange-900/40 scale-105' 
                    : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center mt-4">
            {soreness > 3 ? 'High Fatigue - Inform Coach' : 'Normal Training Load'}
          </p>
        </div>

        {/* 4. MOOD SELECTOR (Bento Bottom) */}
        <div className="md:col-span-12 bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
              <Brain size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{t('mental_state', 'Mental Readiness')}</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {moods.map((m) => (
              <button 
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`group relative p-6 rounded-[2.5rem] border transition-all text-start overflow-hidden ${
                  mood === m.label 
                    ? 'bg-slate-950 border-orange-500 shadow-2xl' 
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`p-3 rounded-xl w-fit mb-4 transition-colors ${mood === m.label ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-500 group-hover:text-slate-300'}`}>
                  <m.icon size={24} />
                </div>
                <div className={`text-xs font-black uppercase tracking-widest ${mood === m.label ? 'text-white' : 'text-slate-500'}`}>
                  {t(`moods.${m.label.toLowerCase()}`, m.label)}
                </div>
                
                {mood === m.label && (
                  <CheckCircle2 size={16} className="absolute top-6 right-6 text-orange-500 animate-in zoom-in" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. SUBMIT ACTION */}
      <button className="w-full group relative overflow-hidden bg-orange-600 hover:bg-orange-500 py-8 rounded-[2.5rem] transition-all shadow-2xl shadow-orange-900/20 active:scale-[0.98]">
        <div className="relative z-10 flex items-center justify-center gap-4">
          <CheckCircle2 size={20} className="text-orange-200" />
          <span className="text-sm font-black uppercase tracking-[0.3em] text-white">
            {t('push_report', 'Transmit Wellness Data')}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>

    </div>
  );
}