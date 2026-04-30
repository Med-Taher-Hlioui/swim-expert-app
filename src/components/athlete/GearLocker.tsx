import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  ShoppingBag, 
  X, 
  Info,
  AlertTriangle,
  Zap,
  Waves,
  ShieldAlert,
  ChevronRight,
  Eye
} from 'lucide-react';

interface GearItem {
  id: number;
  name: string;
  brand: string;
  type: 'tech_suit' | 'goggles' | 'fins' | 'cap';
  usageType: 'race' | 'training';
  uses: number;
  maxUses: number;
}

export default function GearLocker() {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [gear, setGear] = useState<GearItem[]>([
    { id: 1, name: 'Carbon Glide', brand: 'Arena', type: 'tech_suit', usageType: 'race', uses: 12, maxUses: 15 },
    { id: 2, name: 'Hyper Elite', brand: 'Speedo', type: 'goggles', usageType: 'training', uses: 142, maxUses: 150 },
    { id: 3, name: 'Power Fins', brand: 'TYR', type: 'fins', usageType: 'training', uses: 120, maxUses: 500 },
  ]);

  const [newGear, setNewGear] = useState<Omit<GearItem, 'id' | 'maxUses'>>({
    name: '',
    brand: '',
    type: 'tech_suit',
    usageType: 'training',
    uses: 0
  });

  const iconMap = {
    tech_suit: <Zap className="w-8 h-8" />,
    goggles: <Eye className="w-8 h-8" />,
    fins: <Waves className="w-8 h-8" />,
    cap: <ShoppingBag className="w-8 h-8" />
  };

  const calculateLife = (uses: number, max: number) => Math.max(0, Math.round(((max - uses) / max) * 100));

  const handleAddGear = (e: React.FormEvent) => {
    e.preventDefault();
    const maxUsesMap = { tech_suit: 15, goggles: 150, fins: 500, cap: 30 };
    const item: GearItem = {
      id: Date.now(),
      ...newGear,
      maxUses: maxUsesMap[newGear.type] || 100
    } as GearItem;

    setGear([...gear, item]);
    setShowAddModal(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pb-20 text-left text-white">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-blue-500 leading-none">
            {t('gear_locker.title')}
          </h2>
          <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] mt-3 uppercase italic opacity-70">
            {t('gear_locker.gear_desc')}
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-2xl font-black italic uppercase text-xs hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          {t('gear_locker.add_new')}
        </button>
      </div>

      {/* GEAR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gear.map((item) => {
          const life = calculateLife(item.uses, item.maxUses);
          const isCritical = life < 20; // Red warning threshold

          return (
            <div key={item.id} className={`bg-slate-900 border ${isCritical ? 'border-red-500/50 shadow-red-900/20' : 'border-slate-800'} p-8 rounded-[3rem] relative group overflow-hidden shadow-xl transition-all duration-500`}>
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-2xl ${isCritical ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'} transition-colors`}>
                    {iconMap[item.type]}
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${isCritical ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-500/10 text-blue-400'}`}>
                      {life}% {t('gear_locker.life_remaining')}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black italic uppercase text-white tracking-tighter leading-none">{item.name}</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">{item.brand}</p>
                </div>

                <div className="space-y-2">
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50 p-0.5">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${isCritical ? 'bg-red-500' : 'bg-blue-500'}`} 
                      style={{ width: `${life}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-widest">
                    <span>{item.uses} {t('uses')}</span>
                    <span>{t('limit')}: {item.maxUses}</span>
                  </div>
                </div>

                {/* DYNAMIC WARNINGS */}
                {isCritical && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in slide-in-from-top-2">
                    <ShieldAlert size={18} className="text-red-500 shrink-0" />
                    <p className="text-[9px] font-black text-red-500 uppercase italic leading-tight">
                      {item.type === 'goggles' ? "Seal Failure Detected: Water Entry Risk" : t('gear_locker.warning')}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Background Accent */}
              <div className={`absolute -right-4 -bottom-4 opacity-[0.03] transition-colors ${isCritical ? 'text-red-500' : 'text-blue-500'}`}>
                {iconMap[item.type]}
              </div>
            </div>
          );
        })}
      </div>

      {/* COACH PRO-TIP */}
      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] relative overflow-hidden group max-w-2xl shadow-inner">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500"><Info size={20} /></div>
          <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">{t('gear_locker.coach_tip_title')}</h4>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed italic relative z-10">
          "{t('gear_locker.coach_tip_body')}"
        </p>
      </div>

      {/* ADD GEAR MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-950/80 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-[3rem] p-8 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-8">Register Gear</h3>
            <form onSubmit={handleAddGear} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Gear Name</label>
                <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-white" value={newGear.name} onChange={e => setNewGear({...newGear, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Brand</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-white" value={newGear.brand} onChange={e => setNewGear({...newGear, brand: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Category</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-white" value={newGear.type} onChange={e => setNewGear({...newGear, type: e.target.value as any})}>
                    <option value="tech_suit">Tech Suit</option>
                    <option value="goggles">Goggles</option>
                    <option value="fins">Fins</option>
                    <option value="cap">Cap</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 py-5 rounded-[2rem] font-black italic uppercase tracking-tighter hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20 text-white">Confirm Sync</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}