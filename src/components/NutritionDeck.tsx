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
  const target = 3500;
  const totalRequired = target + burned;
  const progress = (consumed / totalRequired) * 100;

  // Surgical fix: Use variables to satisfy strict compilers
  const isAthleteView = role === 'athlete';

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-10 pb-20 text-left text-white">
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-emerald-500 leading-none">
          {isAthleteView ? 'Fuel Deck' : 'Athlete Fuel Monitor'}
        </h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase italic">Elite Nutrition & Hydration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Energy Balance</span>
            <span className="text-2xl font-black italic text-white">{consumed} / {totalRequired} kcal</span>
          </div>
          <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${Math.min(progress, 100)}%` }}></div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[3rem] space-y-4">
          <div className="flex justify-between items-center text-blue-400">
            <h3 className="text-xs font-black uppercase tracking-widest">Hydration</h3>
            <span className="text-lg font-black italic">{(hydration / 1000).toFixed(1)}L</span>
          </div>
          <div className="flex gap-2">
            {[500, 1000, 1500, 2000, 2500].map((v) => (
              <button 
                key={v}
                onClick={() => setHydration(v)}
                className={`flex-1 h-8 rounded-lg text-[10px] transition-all ${hydration >= v ? 'bg-blue-600' : 'bg-slate-950 border border-slate-800 text-slate-500'}`}
              >💧</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 text-left">Log Training</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setBurned(burned + 800)} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500 transition-all text-center">
              <span className="text-2xl block mb-2">🏊‍♂️</span>
              <span className="text-[9px] font-black uppercase">Swim Session</span>
            </button>
            <button onClick={() => setConsumed(consumed + 1000)} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500 transition-all text-center">
              <span className="text-2xl block mb-2">🍝</span>
              <span className="text-[9px] font-black uppercase tracking-tighter">Add Meal</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-purple-500/20 p-8 rounded-[3rem] space-y-6 relative overflow-hidden">
          <h3 className="text-xs font-black uppercase tracking-widest text-purple-400 italic">Advanced Supplementation</h3>
          <div className="grid grid-cols-2 gap-4 relative z-10 text-left">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <div className="text-[9px] font-black text-white uppercase tracking-tighter">Creatine</div>
              <div className="text-[8px] text-slate-500 font-bold uppercase mt-1">Power Base</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <div className="text-[9px] font-black text-white uppercase tracking-tighter">Whey Isolate</div>
              <div className="text-[8px] text-slate-500 font-bold uppercase mt-1">Muscle Repair</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}