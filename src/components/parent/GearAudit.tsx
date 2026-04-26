import { useTranslation } from 'react-i18next';

export default function GearAudit() {
  const { t } = useTranslation();

  const gear = [
    { id: 1, name: 'Arena Carbon Glide', type: t('gear_locker.tech_suit'), life: 65, icon: '🩱' },
    { id: 2, name: 'Speedo Hyper Elite', type: t('gear_locker.goggles'), life: 30, icon: '🥽' },
    { id: 3, name: 'TYR Power Fins', type: t('gear_locker.fins'), life: 90, icon: '👣' },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-12 pb-20 text-start text-white">
      {/* Header with Parent Branding (Orange) */}
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-orange-500 leading-none">
          {t('gear_audit')}
        </h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">
          {t('gear_locker.gear_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gear.map((item) => (
          <div key={item.id} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 relative group overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-500">{item.icon}</span>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${item.life < 40 ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-400'}`}>
                {item.life}% {t('gear_locker.life_remaining')}
              </span>
            </div>
            
            <h3 className="text-lg font-black italic uppercase mb-1 text-white">{item.name}</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">{item.type}</p>
            
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
              <div 
                className={`h-full transition-all duration-1000 ${item.life < 40 ? 'bg-red-600' : 'bg-orange-600'}`} 
                style={{ width: `${item.life}%` }}
              ></div>
            </div>

            {item.life < 40 && (
              <p className="text-[9px] font-bold text-red-500 mt-3 uppercase italic animate-pulse">
                {t('gear_locker.warning')}
              </p>
            )}
            
            {/* Background Decoration */}
            <div className="absolute right-[-10px] bottom-[-10px] text-6xl opacity-[0.02] font-black italic select-none">
              GEAR
            </div>
          </div>
        ))}

        {/* Action Button for Parent */}
        <button className="bg-slate-900/30 border-2 border-dashed border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center justify-center hover:border-orange-500 transition-all group">
          <span className="text-3xl text-slate-700 group-hover:text-orange-500 mb-2 transition-colors">+</span>
          <span className="text-[10px] font-black uppercase text-slate-600 group-hover:text-orange-500 transition-colors">
            {t('gear_locker.add_new')}
          </span>
        </button>
      </div>

      {/* Pro-Tip section matching the Athlete interface but with Parent/Orange theme */}
      <div className="bg-orange-600/5 p-8 rounded-[2.5rem] border border-orange-500/20 max-w-2xl">
        <h4 className="text-xs font-black uppercase text-orange-400 mb-2">{t('gear_locker.coach_tip_title')}</h4>
        <p className="text-xs text-slate-400 leading-relaxed italic">
          {t('gear_locker.coach_tip_body')}
        </p>
      </div>
    </div>
  );
}