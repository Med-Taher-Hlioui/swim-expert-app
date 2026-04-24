// Removed unused useState import entirely
export default function GearAudit() {
  const gearItems = [
    { id: 1, name: "Racing Suit", health: 85, sessions: 12, limit: 30 },
    { id: 2, name: "Training Goggles", health: 40, sessions: 45, limit: 60 },
    { id: 3, name: "Carbon Fins", health: 95, sessions: 5, limit: 100 },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-10 pb-20 text-left text-white">
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-orange-500 leading-none">Gear Audit</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase italic">Equipment Status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gearItems.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">{item.name}</h3>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${item.health < 50 ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                {item.health}%
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className={`h-full transition-all duration-1000 ${item.health < 50 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${item.health}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[8px] font-black uppercase text-slate-500 tracking-[0.2em]">
                <span>{item.sessions} / {item.limit} Sessions</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}