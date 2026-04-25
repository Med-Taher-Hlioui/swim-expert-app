export default function GearAudit() {
  const gearItems = [
    { id: 1, name: "Racing Suit", health: 85, sessions: 12, limit: 30 },
    { id: 2, name: "Training Goggles", health: 40, sessions: 45, limit: 60 },
    { id: 3, name: "Carbon Fins", health: 95, sessions: 5, limit: 100 },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-10 pb-20 text-left text-white">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter text-orange-500">Gear Audit</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gearItems.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem]">
            <h3 className="text-xl font-black italic uppercase text-white mb-4">{item.name}</h3>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-emerald-500" style={{ width: `${item.health}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}