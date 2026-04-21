import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define the interface so TypeScript knows to expect 'xp'
interface StatsLogProps {
  xp: number;
}

const data = [
  { name: '10/04', time: 58.2 },
  { name: '12/04', time: 57.8 },
  { name: '15/04', time: 57.1 },
  { name: '18/04', time: 57.5 },
  { name: '21/04', time: 56.8 },
];

export default function StatsLog({ xp }: StatsLogProps) {
  const [selectedStroke, setSelectedStroke] = useState('Freestyle');
  const [selectedDistance, setSelectedDistance] = useState('100');

  // Logic to define available distances based on the chosen stroke
  const getAvailableDistances = () => {
    if (selectedStroke === 'IM') return ['200', '400'];
    if (selectedStroke === 'Freestyle') return ['50', '100', '200', '400', '800', '1500'];
    return ['50', '100', '200'];
  };

  const distances = getAvailableDistances();

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 space-y-10 pb-20 text-left">
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Performance Stats</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">Analytics & Progress Tracking</p>
      </div>

      {/* --- LOG NEW PERFORMANCE BOX --- */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest">Log New Performance</h3>
          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
            Current XP: {xp}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Stroke Selector */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-slate-600 ml-1">Stroke</label>
            <select 
              value={selectedStroke}
              onChange={(e) => {
                setSelectedStroke(e.target.value);
                setSelectedDistance('100');
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-bold outline-none focus:border-blue-500 text-white cursor-pointer"
            >
              <option>Freestyle</option>
              <option>Butterfly</option>
              <option>Backstroke</option>
              <option>Breaststroke</option>
              <option>IM</option>
            </select>
          </div>

          {/* Distance Selector */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-slate-600 ml-1">Distance (m)</label>
            <select 
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-bold outline-none focus:border-blue-500 text-white cursor-pointer"
            >
              {distances.map(d => (
                <option key={d} value={d}>{d}m</option>
              ))}
            </select>
          </div>

          {/* Time Input */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-slate-600 ml-1">Time Result</label>
            <input 
              type="text" 
              inputMode="decimal"
              placeholder="MM:SS.ms" 
              onInput={(e: any) => e.target.value = e.target.value.replace(/[^0-9:.]/g, '')}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-bold outline-none focus:border-blue-500 text-white placeholder:opacity-20" 
            />
          </div>

          <div className="flex items-end">
            <button className="w-full bg-blue-600 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 text-white">
              Save Entry
            </button>
          </div>
        </div>
      </div>

      {/* --- CHART SECTION --- */}
      <div className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 h-[450px] relative overflow-hidden">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Progression Analysis</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{selectedDistance}m {selectedStroke}</p>
          </div>
          <div className="bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest italic">Fastest: 56.8s</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="75%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={10} 
              fontWeight="bold" 
              axisLine={false} 
              tickLine={false} 
              dy={10}
            />
            <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
              itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
              cursor={{ stroke: '#1e293b', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="time" 
              stroke="#3b82f6" 
              strokeWidth={4} 
              dot={{ r: 6, fill: '#3b82f6', strokeWidth: 0 }} 
              activeDot={{ r: 8, stroke: '#020617', strokeWidth: 4 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}