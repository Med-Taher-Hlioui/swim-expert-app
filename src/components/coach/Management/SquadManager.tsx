import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, CheckCircle2, ShieldAlert, Filter, 
  Plus, Search, Calendar as CalendarIcon, Zap, Lock, EyeOff 
} from 'lucide-react';

const GROUPS = ['All', 'Sprint Group', 'Distance Group', 'Junior Elite'];

export default function SquadManager() {
  const { t } = useTranslation(); // Standard translation hook
  
  const [activeTab, setActiveTab] = useState<'roster' | 'attendance' | 'medical'>('roster');
  const [filterGroup, setFilterGroup] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMedical, setShowMedical] = useState(false);

  // Mock Squad with additional Management Data
  const [squad] = useState([
    { id: '1', name: 'Ahmed Derbel', group: 'Sprint Group', attendance: 98, medical: 'Shoulder Impingement (Left)', allergies: 'None' },
    { id: '2', name: 'Sarra Mansour', group: 'Junior Elite', attendance: 85, medical: 'Asthma - inhaler in bag', allergies: 'Peanuts' },
    { id: '3', name: 'Yassine Ben Amor', group: 'Distance Group', attendance: 92, medical: 'N/A', allergies: 'None' },
  ]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 text-start">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">
            {t('manager.title', 'Squad Management')}
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
            {t('manager.subtitle', 'Administrative Control & Safety')}
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20">
          <Plus size={16} /> {t('manager.add_athlete', 'Add New Athlete')}
        </button>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex gap-2 p-1 bg-slate-900/50 border border-slate-800 rounded-2xl w-fit">
        {(['roster', 'attendance', 'medical'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {t(`manager.tab_${tab}`, tab)}
          </button>
        ))}
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="flex flex-col md:flex-row gap-4 bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem]">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <input 
            type="text"
            placeholder={t('manager.search_placeholder', 'Search by name...')}
            className="w-full bg-slate-950 border border-slate-800 p-4 pl-12 rounded-2xl text-xs font-bold text-white outline-none focus:border-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500" />
          <select 
            className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-slate-400 outline-none focus:border-blue-500"
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
          >
            {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <button className="bg-slate-800 hover:bg-amber-600 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
          <Zap size={14} /> {t('manager.bulk_xp', 'Award Group XP')}
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden">
        
        {/* ROSTER TAB */}
        {activeTab === 'roster' && (
          <table className="w-full text-left">
            <thead className="bg-slate-950/50 border-bottom border-slate-800">
              <tr>
                <th className="p-6 text-[9px] font-black uppercase text-slate-500 tracking-widest">{t('manager.col_name', 'Athlete')}</th>
                <th className="p-6 text-[9px] font-black uppercase text-slate-500 tracking-widest">{t('manager.col_group', 'Group')}</th>
                <th className="p-6 text-[9px] font-black uppercase text-slate-500 tracking-widest">{t('manager.col_attendance', 'Monthly Att.')}</th>
                <th className="p-6 text-[9px] font-black uppercase text-slate-500 tracking-widest text-right">{t('manager.col_actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {squad.map((athlete) => (
                <tr key={athlete.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black italic">{athlete.name.charAt(0)}</div>
                      <span className="text-xs font-bold text-white">{athlete.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[8px] font-black uppercase text-slate-400">
                      {athlete.group}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-slate-950 rounded-full overflow-hidden w-24">
                        <div className="h-full bg-green-500" style={{ width: `${athlete.attendance}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-white">{athlete.attendance}%</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-blue-500 hover:text-white text-[10px] font-black uppercase tracking-widest">{t('manager.edit', 'Edit')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* MEDICAL VAULT TAB */}
        {activeTab === 'medical' && (
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between bg-red-500/5 border border-red-500/20 p-6 rounded-3xl">
              <div className="flex items-center gap-4 text-start">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500">
                  <Lock size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white tracking-widest">{t('manager.medical_title', 'Medical Vault')}</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">{t('manager.medical_warning', 'Confidential Athlete Health Records')}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMedical(!showMedical)}
                className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-6 py-3 rounded-xl text-[10px] font-black uppercase text-white hover:border-red-500 transition-all"
              >
                {showMedical ? <EyeOff size={14} /> : <Users size={14} />}
                {showMedical ? t('manager.hide', 'Hide Data') : t('manager.reveal', 'Reveal Data')}
              </button>
            </div>

            <div className="grid gap-4">
              {squad.map((athlete) => (
                <div key={athlete.id} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-black uppercase text-white tracking-tighter">{athlete.name}</span>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
                    <div className="space-y-1">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">{t('manager.condition', 'Medical Condition')}</span>
                      <p className={`text-[11px] font-bold italic transition-all duration-500 ${showMedical ? 'text-slate-300' : 'text-slate-800 select-none blur-md'}`}>
                        {athlete.medical}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">{t('manager.allergies', 'Allergies')}</span>
                      <p className={`text-[11px] font-bold italic transition-all duration-500 ${showMedical ? 'text-red-400' : 'text-slate-800 select-none blur-md'}`}>
                        {athlete.allergies}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === 'attendance' && (
          <div className="p-20 text-center space-y-4">
            <CalendarIcon size={48} className="mx-auto text-slate-700" />
            <p className="text-slate-500 font-bold italic uppercase text-[10px] tracking-widest">
              {t('manager.attendance_empty', 'Attendance Grid Generator Loading...')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}