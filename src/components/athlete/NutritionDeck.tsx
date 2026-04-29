import { useTranslation } from 'react-i18next';

interface NutritionProps {
  role: 'athlete' | 'parent';
  burned: number;
  consumed: number;
  hydration: number;
  setBurned: (val: number) => void;
  setConsumed: (val: number) => void;
  setHydration: (val: number) => void;
}

export default function NutritionDeck({ role, burned, consumed, hydration, setBurned, setConsumed, setHydration }: NutritionProps) {
  const { t } = useTranslation();
  const isAthlete = role === 'athlete';

  const baseTarget = 3000;
  const totalRequired = baseTarget + burned;
  const progress = (consumed / totalRequired) * 100;

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-10 pb-20 text-start text-white">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-emerald-500 leading-none">
          {isAthlete ? t('nutrition') : t('ui.monitoring_child')}
        </h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase italic">
          {t('desc.nutrition')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Energy Bar */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-10 rounded-[3rem] relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-6">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{t('ui.total_progress')}</span>
              <span className="text-3xl font-black italic text-white tracking-tighter">
                {consumed} / {totalRequired} <span className="text-emerald-500 text-sm">KCAL</span>
              </span>
            </div>
            <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 to-cyan-500 transition-all duration-1000 ease-out" 
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] text-[10rem] font-black italic text-white opacity-[0.02] pointer-events-none uppercase">FUEL</div>
        </div>

        {/* Hydration Station */}
        <div className="bg-blue-600/10 border border-blue-500/20 p-10 rounded-[3rem] space-y-6 text-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">{t('ui.fuel_status')}</h3>
          <div className="text-4xl font-black italic text-white tracking-tighter">{hydration} <span className="text-sm">ML</span></div>
          <div className="flex gap-2 justify-center">
            {[250, 500, 750].map(v => (
              <button 
                key={v} 
                onClick={() => setHydration(hydration + v)} 
                className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all hover:scale-110 flex items-center justify-center text-xl shadow-lg shadow-blue-900/40"
              >
                💧
              </button>
            ))}
          </div>
          <button 
            onClick={() => setHydration(0)}
            className="text-[9px] font-black uppercase text-slate-500 hover:text-white transition-colors"
          >
            Reset Hydration
          </button>
        </div>
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-4">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Training Load (Burned)</h4>
          <div className="flex items-center gap-4">
            <button onClick={() => setBurned(Math.max(0, burned - 250))} className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 font-black">-</button>
            <div className="flex-1 text-center text-2xl font-black italic text-white">{burned}</div>
            <button onClick={() => setBurned(burned + 250)} className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 font-black">+</button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-4">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Intake (Consumed)</h4>
          <div className="flex items-center gap-4">
            <button onClick={() => setConsumed(Math.max(0, consumed - 250))} className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 font-black">-</button>
            <div className="flex-1 text-center text-2xl font-black italic text-emerald-500">{consumed}</div>
            <button onClick={() => setConsumed(consumed + 250)} className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 font-black">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}