export default function NutritionDeck() {
  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 space-y-12 pb-20 text-left">
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Nutrition Deck</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">Fueling the High-Performance Athlete</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">⚡</span>
            <div>
              <h3 className="text-lg font-black italic uppercase">Pre-Swim Energy</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">30-60 Mins Before</p>
            </div>
          </div>
          <ul className="space-y-4">
            <li className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold">3-4 Deglet Nour Dates</span>
              <span className="text-[10px] font-black text-blue-400 uppercase">Fast Carbs</span>
            </li>
            <li className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold">1 Banana + Honey</span>
              <span className="text-[10px] font-black text-blue-400 uppercase">Electrolytes</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🌊</span>
            <div>
              <h3 className="text-lg font-black italic uppercase">Recovery Window</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Immediate Post-Swim</p>
            </div>
          </div>
          <ul className="space-y-4">
            <li className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold">Grilled Sea Bream (Dorade)</span>
              <span className="text-[10px] font-black text-green-400 uppercase">Lean Protein</span>
            </li>
            <li className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold">Couscous with Veggies</span>
              <span className="text-[10px] font-black text-green-400 uppercase">Glycogen Refill</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-600/5 p-10 rounded-[3rem] border border-blue-500/20 grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="space-y-2">
           <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Daily Hydration</h4>
           <div className="flex items-end gap-2">
             <span className="text-3xl font-black italic">3.5</span>
             <span className="text-sm font-bold text-slate-500 uppercase pb-1">Liters</span>
           </div>
           <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
             <div className="h-full w-[70%] bg-blue-500"></div>
           </div>
         </div>
         <div className="md:col-span-2">
           <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Coach's Nutrition Tip</h4>
           <p className="text-xs text-slate-400 italic leading-relaxed">
             "In Sousse heat, focus on magnesium-rich foods to prevent cramping. Use cold-pressed olive oil in your post-swim meals to reduce muscle inflammation naturally."
           </p>
         </div>
      </div>
    </div>
  );
}