import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Zap, Droplets, Utensils, Apple, 
  AlertCircle, ChevronRight, Info, Battery,
  Timer, Gauge, Target, Star, ShoppingCart
} from 'lucide-react';

interface NutritionProps {
  role: 'athlete' | 'parent';
  burned: number;
  consumed: number;
  hydration: number;
  setBurned: (val: number) => void;
  setConsumed: (val: number) => void;
  setHydration: (val: number) => void;
}

export default function NutritionDeck({ role, burned, consumed, hydration, setConsumed, setHydration }: NutritionProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'training' | 'race'>('training');
  
  // 1. DYNAMIC CALCULATIONS
  const targetBase = mode === 'training' ? 2500 : 3200;
  const totalRequired = targetBase + burned;
  const progress = (consumed / totalRequired) * 100;
  const remaining = totalRequired - consumed;

  // 2. MACRO SPLITS (Visual only for now)
  const macros = [
    { label: 'Carbs (Power)', val: 65, color: 'bg-emerald-500' },
    { label: 'Protein (Repair)', val: 80, color: 'bg-blue-500' },
    { label: 'Fats (Reserve)', val: 40, color: 'bg-amber-500' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pb-20 text-left text-white">
      
      {/* HEADER & MODE SELECTOR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-emerald-500 leading-none">
            Fuel Command
          </h2>
          <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] mt-3 uppercase italic opacity-70">
            {mode === 'training' ? 'Phase: High Volume Training' : 'Phase: Competition / Race Day'}
          </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800">
          <button 
            onClick={() => setMode('training')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${mode === 'training' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            Training
          </button>
          <button 
            onClick={() => setMode('race')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${mode === 'race' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
          >
            Race Day
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* MAIN ENERGY HUD (Left) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-8 rounded-[3rem] relative overflow-hidden group shadow-2xl">
          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Energy Deficit</span>
                <div className="text-5xl md:text-6xl font-black italic text-white tracking-tighter">
                  {remaining > 0 ? Math.round(remaining) : 0} 
                  <span className="text-lg text-emerald-500 uppercase ml-3 tracking-normal font-black">kcal</span>
                </div>
              </div>
              <Gauge size={28} className="text-emerald-500/50" />
            </div>

            {/* MACRO LOAD BARS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {macros.map((m, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{m.label}</p>
                  <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                    <div className={`h-full ${m.color}`} style={{ width: `${m.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-1">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
          <Zap size={200} className="absolute right-[-40px] top-[-40px] text-white/[0.02] pointer-events-none" />
        </div>

        {/* LOGISTICS & RECOVERY (Right) */}
        <div className="lg:col-span-5 space-y-6">
          {/* RECOVERY WINDOW TIMER */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <Timer size={20} className="text-amber-500 animate-pulse" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-black">Glycogen Window</h3>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-black italic text-white tracking-tighter">28:42 <span className="text-xs text-slate-500 tracking-widest">LEFT</span></p>
              <p className="text-[9px] font-bold text-amber-500 uppercase italic">Refuel now for maximum muscle recovery.</p>
            </div>
          </div>

          {/* HYDRATION HUD */}
          <div className="bg-slate-900 border border-blue-500/20 p-8 rounded-[3rem] group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Daily Fluid Intake</span>
                <div className="text-3xl font-black italic text-white tracking-tighter mt-1">{(hydration / 1000).toFixed(1)}L</div>
              </div>
              <Droplets size={24} className="text-blue-500/40" />
            </div>
            <div className="flex gap-2">
              {[500, 1500, 2500, 3500].map((step) => (
                <button
                  key={step}
                  onClick={() => setHydration(step)}
                  className={`flex-1 h-12 rounded-xl border transition-all ${hydration >= step ? 'bg-blue-600 border-blue-400' : 'bg-slate-950 border-slate-800 opacity-40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QUICK LOGGING ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button onClick={() => setConsumed(consumed + 1200)} className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] hover:border-emerald-500 transition-all text-left group">
           <Utensils size={20} className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
           <p className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest">Main Event</p>
           <p className="text-xs font-black italic text-white uppercase tracking-tighter">Log Full Meal</p>
        </button>

        <button onClick={() => setConsumed(consumed + 500)} className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] hover:border-emerald-500 transition-all text-left group">
           <Apple size={20} className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
           <p className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest">Power Load</p>
           <p className="text-xs font-black italic text-white uppercase tracking-tighter">Log Power Snack</p>
        </button>

        <button className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] hover:border-blue-500 transition-all text-left group">
           <Star size={20} className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
           <p className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest">Recovery</p>
           <p className="text-xs font-black italic text-white uppercase tracking-tighter">Protein Shake</p>
        </button>

        <button className="bg-slate-950 border border-slate-800 p-6 rounded-[2rem] hover:border-orange-500 transition-all text-left group">
           <ShoppingCart size={20} className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
           <p className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest">AI Parent</p>
           <p className="text-xs font-black italic text-white uppercase tracking-tighter">Shopping List</p>
        </button>
      </div>
    </div>
  );
}