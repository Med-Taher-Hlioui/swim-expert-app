export default function DrillLibrary() {
  const drills = [
    { id: 1, stroke: 'Freestyle', name: 'High Elbow Catch', desc: 'Focus on early vertical forearm position.' },
    { id: 2, stroke: 'Butterfly', name: 'Single Arm Drill', desc: 'Improve timing between kick and pull.' },
    { id: 3, stroke: 'Backstroke', name: 'Cup on Head', desc: 'Keep head perfectly steady during rotation.' },
    { id: 4, stroke: 'Breaststroke', name: '2 Kicks 1 Pull', desc: 'Maximize the glide phase efficiency.' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 space-y-12 pb-20 text-left">
      {/* --- STANDARDIZED HEADER --- */}
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Technical Library</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">Video Tutorials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drills.map((drill) => (
          <div key={drill.id} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 hover:border-blue-500 transition-all group overflow-hidden relative">
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{drill.stroke}</span>
              <h3 className="text-2xl font-black italic uppercase mt-4 mb-2 group-hover:text-blue-500 transition-colors">{drill.name}</h3>
              <p className="text-sm text-slate-400 italic leading-relaxed">{drill.desc}</p>
              <button className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white group-hover:text-blue-400 transition-colors">
                <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[8px]">▶</span> 
                Watch Drill
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 text-8xl font-black italic text-white/5 select-none pointer-events-none group-hover:scale-110 transition-transform uppercase">{drill.stroke.slice(0, 3)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}