import { useState } from 'react';

const MOCK_GEAR = [
  { id: '1', name: 'Arena Carbon Air 2', type: 'Racing Suit', wears: 12, maxWears: 15, lastUsed: 'Tunis Nationals' },
  { id: '2', name: 'Speedo Pure Focus', type: 'Goggles', wears: 45, maxWears: 100, lastUsed: 'Daily Practice' },
];

export default function GearAudit() {
  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-10 pb-20 text-left">
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-orange-500 leading-none">Gear Audit</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase italic">Equipment Lifecycle Tracker</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_GEAR.map((item) => {
          const healthPercentage = Math.max(0, 100 - (item.wears / item.maxWears) * 100);
          const isCritical = healthPercentage < 25;

          return (
            <div key={item.id} className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest bg-slate-950 px-2 py-1 rounded">{item.type}</span>
                    <h3 className="text-xl font-black italic uppercase text-white mt-2 tracking-tighter">{item.name}</h3>
                  </div>
                  <div className={`text-[10px] font-black px-3 py-1 rounded-full border ${isCritical ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse' : 'bg-green-500/10 border-green-500 text-green-500'}`}>
                    {Math.round(healthPercentage)}% Life
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[8px] font-black uppercase text-slate-500 tracking-widest">
                    <span>Usage: {item.wears} / {item.maxWears} Wears</span>
                    <span>Compression Level</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full transition-all duration-1000 ${isCritical ? 'bg-red-600' : 'bg-orange-500'}`}
                      style={{ width: `${healthPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-slate-500 uppercase italic">Last used: {item.lastUsed}</span>
                  <button className="bg-slate-800 hover:bg-orange-600 px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all">Add Wear +1</button>
                </div>
              </div>
              
              <div className="absolute right-[-10px] bottom-[-10px] text-8xl font-black italic text-white opacity-[0.02] pointer-events-none uppercase">
                {item.type.split(' ')[0]}
              </div>
            </div>
          );
        })}

        {/* ADD NEW GEAR BUTTON */}
        <button className="border-2 border-dashed border-slate-800 rounded-[3rem] p-12 flex flex-col items-center justify-center group hover:border-orange-500/50 transition-all opacity-40 hover:opacity-100">
           <span className="text-4xl group-hover:scale-110 transition-transform">🎒</span>
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-4">Register New Equipment</span>
        </button>
      </div>

      <div className="bg-orange-600/5 border border-orange-500/20 p-8 rounded-[3rem]">
        <h4 className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-2">Race Day Tip</h4>
        <p className="text-xs text-slate-400 font-bold leading-relaxed italic">
          "Check the seals on goggles every 3 months. Technical suits should only be rinsed in cold water—never use soap or a washing machine to preserve compression."
        </p>
      </div>
    </div>
  );
}