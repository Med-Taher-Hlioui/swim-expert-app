import { useTranslation } from 'react-i18next';
import { 
  Zap, Droplets, Utensils, Apple, 
  AlertCircle, ChevronRight, Info, Battery
} from 'lucide-react';

interface ParentFuelProps {
  burned: number;
  consumed: number;
  hydration: number;
  setConsumed: (val: number) => void;
  setHydration: (val: number) => void;
}

export default function ParentFuelDeck({ burned, consumed, hydration, setConsumed, setHydration }: ParentFuelProps) {
  const { t } = useTranslation();
  
  const targetBase = 2500;
  const totalRequired = targetBase + burned;
  const progress = (consumed / totalRequired) * 100;
  const remaining = totalRequired - consumed;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pb-20 text-left text-white">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-emerald-500 leading-none">
            {t('fuel_deck', 'Fuel Command')}
          </h2>
          <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] mt-3 uppercase italic opacity-70">
            {t('energy_sync', 'Nutritional Recovery Sync')}
          </p>
        </div>

        {/* CALORIE BREAKDOWN PILL */}
        <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl flex items-center gap-4">
          <div className="text-end">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Training Burn</p>
            <p className="text-lg font-black italic text-emerald-400 leading-none">+{burned} <span className="text-[10px]">kcal</span></p>
          </div>
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <Zap size={18} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 2. ENERGY TRACKER (Bento Large) */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] relative overflow-hidden group shadow-2xl">
          <div className="relative z-10 space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Athlete Energy Gap</span>
                <div className="text-4xl md:text-5xl font-black italic text-white tracking-tighter">
                  {remaining > 0 ? Math.round(remaining) : 0} 
                  <span className="text-sm md:text-lg text-emerald-500 uppercase ml-2 tracking-normal">Needed</span>
                </div>
              </div>
              <Battery size={24} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
            </div>

            <div className="space-y-4">
              <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-1">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest px-1">
                <span>Consumed: {consumed} kcal</span>
                <span>Target: {totalRequired} kcal</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
              <Info size={14} className="text-emerald-500 shrink-0" />
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-relaxed">
                Energy target includes base metabolism + swim session intensity.
              </p>
            </div>
          </div>
          <Zap size={180} className="absolute right-[-30px] top-[-30px] text-white/[0.02] pointer-events-none" />
        </div>

        {/* 3. HYDRATION STATUS (Bento Medium) */}
        <div className="bg-slate-900 border border-blue-500/20 p-8 rounded-[3rem] flex flex-col justify-between group shadow-xl">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Hydration Level</span>
              <div className="text-4xl font-black italic text-white tracking-tighter">
                {(hydration / 1000).toFixed(1)}<span className="text-sm text-slate-500 uppercase ml-1">Liters</span>
              </div>
            </div>
            <Droplets size={24} className="text-blue-500/40 group-hover:animate-bounce" />
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              {[500, 1500, 2500, 3500].map((step) => (
                <button
                  key={step}
                  onClick={() => setHydration(step)}
                  className={`flex-1 h-16 rounded-2xl border-2 transition-all flex items-center justify-center relative overflow-hidden ${
                    hydration >= step 
                      ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-900/40' 
                      : 'bg-slate-950 border-slate-800 opacity-40 hover:opacity-100 hover:border-blue-500/50'
                  }`}
                >
                  <Droplets size={16} className={hydration >= step ? 'text-white' : 'text-slate-700'} />
                </button>
              ))}
            </div>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">
              Target: 3.5L (Competition Prep)
            </p>
          </div>
        </div>
      </div>

      {/* 4. QUICK LOGGING BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => setConsumed(consumed + 1200)} 
          className="group bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] hover:border-emerald-500 transition-all text-left flex items-center justify-between relative overflow-hidden"
        >
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <Utensils size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">Full Intake</span>
              <span className="text-xl font-black italic text-white uppercase tracking-tighter">Log Main Meal</span>
            </div>
          </div>
          <ChevronRight className="text-slate-700 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
        </button>

        <button 
          onClick={() => setConsumed(consumed + 500)} 
          className="group bg-slate-950 border border-slate-800 p-8 rounded-[2.5rem] hover:border-emerald-500 transition-all text-left flex items-center justify-between relative overflow-hidden"
        >
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <Apple size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-1">Light Intake</span>
              <span className="text-xl font-black italic text-white uppercase tracking-tighter">Log Power Snack</span>
            </div>
          </div>
          <ChevronRight className="text-slate-700 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
        </button>
      </div>

      {/* 5. ELITE WARNING (Conditional) */}
      {remaining > 1000 && (
        <div className="flex items-center gap-4 p-6 bg-amber-500/10 border border-amber-500/20 rounded-[2rem]">
          <AlertCircle size={20} className="text-amber-500 shrink-0" />
          <p className="text-[10px] text-amber-200 font-bold uppercase italic leading-relaxed">
            Critical Fuel Deficit: Your athlete hasn't consumed enough energy to match today's training load. Recovery may be impaired.
          </p>
        </div>
      )}

    </div>
  );
}