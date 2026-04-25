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

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-10 pb-20 text-left text-white">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter text-emerald-500">
        {role === 'athlete' ? 'My Fuel Deck' : 'Athlete Fuel Monitor'}
      </h2>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem]">
        <div className="flex justify-between mb-4">
          <span className="text-[10px] font-black text-slate-500 uppercase">Energy Balance</span>
          <span className="text-2xl font-black italic">{consumed} kcal</span>
        </div>
        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: `${Math.min(progress, 100)}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setBurned(burned + 500)} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl font-black uppercase text-[10px]">Add Burn</button>
        <button onClick={() => setConsumed(consumed + 500)} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl font-black uppercase text-[10px]">Add Meal</button>
      </div>

      <div className="flex gap-2">
        {[500, 1000, 2000].map(v => (
          <button key={v} onClick={() => setHydration(v)} className="flex-1 bg-blue-600/20 p-4 rounded-xl text-xl">💧</button>
        ))}
      </div>
    </div>
  );
}