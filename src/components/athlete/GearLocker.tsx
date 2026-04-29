export default function GearLocker() {
  const gear = [
    { id: 1, name: 'Arena Carbon Glide', type: 'Tech Suit', life: 65, icon: '🩱' },
    { id: 2, name: 'Speedo Hyper Elite', type: 'Goggles', life: 30, icon: '🥽' },
    { id: 3, name: 'TYR Power Fins', type: 'Fins', life: 90, icon: '👣' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 space-y-12 pb-20 text-left">
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Gear Locker</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">Equipment Health & Tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gear.map((item) => (
          <div key={item.id} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 relative group overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <span className="text-4xl">{item.icon}</span>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${item.life < 40 ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-400'}`}>
                {item.life}% Life
              </span>
            </div>
            <h3 className="text-lg font-black italic uppercase mb-1">{item.name}</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">{item.type}</p>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ${item.life < 40 ? 'bg-red-600' : 'bg-blue-600'}`} style={{ width: `${item.life}%` }}></div>
            </div>
            {item.life < 40 && <p className="text-[9px] font-bold text-red-500 mt-3 uppercase italic animate-pulse">Warning: Performance drop detected</p>}
          </div>
        ))}
        <button className="bg-slate-900/30 border-2 border-dashed border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center justify-center hover:border-blue-500 transition-all group">
          <span className="text-3xl text-slate-700 group-hover:text-blue-500 mb-2">+</span>
          <span className="text-[10px] font-black uppercase text-slate-600 group-hover:text-blue-500">Add New Gear</span>
        </button>
      </div>

      <div className="bg-blue-600/5 p-8 rounded-[2.5rem] border border-blue-500/20 max-w-2xl">
        <h4 className="text-xs font-black uppercase text-blue-400 mb-2">Coach's Pro-Tip</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
          "Tech suits lose their compression properties after 10-15 races. Use your training suit for daily sets and save the Carbon Glide for race day to maximize your power-to-weight ratio."
        </p>
      </div>
    </div>
  );
}