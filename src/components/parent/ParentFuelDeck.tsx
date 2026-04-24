interface ParentFuelProps {
  burned: number;
  consumed: number;
  hydration: number;
  setConsumed: (val: number) => void;
  setHydration: (val: number) => void;
}

export default function ParentFuelDeck({ burned, consumed, hydration, setConsumed, setHydration }: ParentFuelProps) {
  const targetBase = 2500;
  const totalRequired = targetBase + burned;
  const progress = (consumed / totalRequired) * 100;
  const remaining = totalRequired - consumed;

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-8 pb-20 text-left text-white">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter text-emerald-500">Parent Fuel Deck</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ENERGY TRACKER */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col justify-between min-h-[250px]">
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Energy Gap</span>
            <div className="text-4xl font-black italic mt-1 text-white">
              {remaining > 0 ? Math.round(remaining) : 0} <span className="text-lg text-emerald-500">kcal needed</span>
            </div>
          </div>
          <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${Math.min(progress, 100)}%` }}></div>
          </div>
        </div>

        {/* HYDRATION TOGGLE */}
        <div className="bg-slate-900 border border-blue-500/20 p-8 rounded-[3rem] flex flex-col justify-between min-h-[250px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Hydration Status</span>
            <div className="text-4xl font-black italic">{(hydration / 1000).toFixed(1)}L</div>
          </div>
          <div className="flex gap-2">
            {[500, 1000, 1500, 2000, 2500, 3000].map((step) => (
              <button
                key={step}
                onClick={() => setHydration(step)}
                className={`flex-1 h-12 rounded-xl border-2 ${hydration >= step ? 'bg-blue-600 border-blue-400' : 'bg-slate-950 border-slate-800 opacity-20'}`}
              >💧</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button onClick={() => setConsumed(consumed + 1200)} className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] hover:border-emerald-500 transition-all text-center">
          <span className="text-3xl block mb-2">🍝</span>
          <span className="text-[10px] font-black uppercase text-white tracking-widest">Log Full Meal</span>
        </button>
        <button onClick={() => setConsumed(consumed + 500)} className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] hover:border-emerald-500 transition-all text-center">
          <span className="text-3xl block mb-2">🥪</span>
          <span className="text-[10px] font-black uppercase text-white tracking-widest">Log Power Snack</span>
        </button>
      </div>
    </div>
  );
}