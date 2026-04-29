export default function RaceStrategy() {
  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 space-y-12 pb-20 text-left">
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Race Strategy</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">Split-Map & Technical Execution</p>
      </div>

      <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Event Distance</label>
          <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-bold outline-none focus:border-blue-500 text-white">
            <option>100m Freestyle</option>
            <option>200m Freestyle</option>
            <option>400m Freestyle</option>
            <option>200m Medley</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Goal Time</label>
          <input 
            type="text" 
            inputMode="decimal"
            placeholder="00:54.20" 
            onInput={(e: any) => {
              e.target.value = e.target.value.replace(/[^0-9:.]/g, '');
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-bold outline-none focus:border-blue-500 text-white placeholder:opacity-20" 
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-900/20">
          Generate Split Map
        </button>
      </div>

      <div className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 space-y-8">
        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 text-center">Intensity Heat-Map</h3>
        <div className="relative h-24 w-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex">
          <div className="h-full w-1/4 bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center border-r border-slate-800/50 text-[10px] font-black italic">START</div>
          <div className="h-full w-1/4 bg-gradient-to-r from-orange-500 to-blue-500 flex items-center justify-center border-r border-slate-800/50 text-[10px] font-black italic">BUILD</div>
          <div className="h-full w-1/4 bg-blue-500 flex items-center justify-center border-r border-slate-800/50 text-[10px] font-black italic">HOLD</div>
          <div className="h-full w-1/4 bg-gradient-to-r from-blue-500 to-red-600 flex items-center justify-center text-[10px] font-black italic">FINISH</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">● Technical Execution</h4>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="font-black italic text-blue-500">01</span>
                <p className="text-xs text-slate-300 font-bold leading-relaxed uppercase">Tight streamline off the start. Maximum 6 dolphin kicks to hit 15m.</p>
              </li>
              <li className="flex gap-4">
                <span className="font-black italic text-blue-500">02</span>
                <p className="text-xs text-slate-300 font-bold leading-relaxed uppercase">High elbow catch in the middle 50m. Maintain hip position.</p>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">● Pacing Strategy</h4>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="text-[9px] uppercase font-black text-slate-500">Target 50m</span>
                <span className="text-sm font-black italic text-white">26.10s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase font-black text-slate-500">Target 100m</span>
                <span className="text-sm font-black italic text-white">28.10s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}