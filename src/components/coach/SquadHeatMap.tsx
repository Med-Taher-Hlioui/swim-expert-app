import { useTranslation } from 'react-i18next';
import { Info, Zap, Calendar } from 'lucide-react'; // Added Zap here

export default function SquadHeatMap() {
  const { t } = useTranslation();

  // Mock data for a 4-week training block
  // Intensity: 0 (Rest) to 4 (Max Effort/Competition)
  const heatmapData = [
    [0, 2, 3, 2, 4, 1, 0], // Week 1
    [0, 3, 4, 3, 4, 2, 0], // Week 2 (Loading)
    [0, 4, 4, 4, 2, 1, 0], // Week 3 (Peak)
    [0, 1, 2, 1, 1, 1, 0], // Week 4 (Taper)
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getIntensityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-950 border-slate-900'; // Rest
      case 1: return 'bg-blue-900/30 border-blue-800/30 text-blue-400'; // Low
      case 2: return 'bg-blue-700/50 border-blue-600/50 text-blue-200'; // Moderate
      case 3: return 'bg-blue-500 border-blue-400 text-white'; // High
      case 4: return 'bg-red-500 border-red-400 text-white animate-pulse'; // Extreme/Race
      default: return 'bg-slate-900';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">
              {t('heatmap.title', 'Squad Workload Heat-Map')}
            </h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
              {t('heatmap.subtitle', '28-Day Load Distribution')}
            </p>
          </div>
        </div>
        <div className="flex gap-1 items-center bg-slate-900/50 p-2 rounded-lg border border-slate-800">
          <span className="text-[8px] font-black uppercase text-slate-600 mr-2">Intensity</span>
          {[0, 1, 2, 3, 4].map(lvl => (
             <div key={lvl} className={`w-3 h-3 rounded-sm ${getIntensityColor(lvl)} border`} />
          ))}
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] shadow-inner">
        <div className="grid grid-cols-7 gap-3 mb-6">
          {days.map(day => (
            <div key={day} className="text-[9px] font-black uppercase text-slate-500 text-center tracking-tighter">
              {t(`days.${day.toLowerCase()}`, day)}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {heatmapData.map((week, wIndex) => (
            <div key={wIndex} className="grid grid-cols-7 gap-3">
              {week.map((intensity, dIndex) => (
                <div 
                  key={dIndex}
                  className={`aspect-square rounded-2xl border flex items-center justify-center transition-all hover:scale-110 cursor-help shadow-lg ${getIntensityColor(intensity)}`}
                  title={`Intensity Level: ${intensity}`}
                >
                  {intensity === 4 && <Zap size={14} className="fill-white text-white" />}
                  {intensity === 3 && <div className="w-1 h-1 rounded-full bg-white/40" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Coaching Insight */}
      <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-[2.5rem] flex gap-4 items-start relative overflow-hidden group">
        <div className="absolute right-[-10px] top-[-10px] text-blue-500/5 select-none transform -rotate-12">
            <Zap size={80} />
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <Info size={20} />
        </div>
        <div className="relative z-10">
          <h4 className="text-[10px] font-black uppercase text-blue-400 mb-1 tracking-widest">
            {t('heatmap.insight_title', 'Weekly Insight')}
          </h4>
          <p className="text-[11px] font-bold text-slate-300 italic leading-relaxed">
            {t('heatmap.insight_body', 'The squad is currently finishing a high-intensity microcycle. Week 4 shows a planned taper to ensure supercompensation for the upcoming Sousse Elite Meet.')}
          </p>
        </div>
      </div>
    </div>
  );
}