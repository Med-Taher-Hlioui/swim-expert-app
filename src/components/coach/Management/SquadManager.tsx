import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../../lib/supabase';
import { 
  Users, Filter, Plus, Search, 
  CalendarIcon, Zap, Lock, EyeOff, 
  Loader2, Link, CheckCircle2
} from 'lucide-react';

const GROUPS = ['All', 'Sprint Group', 'Distance Group', 'Junior Elite'];

interface Profile {
  id: string;
  name: string;
  role: string;
  xp: number;
}

interface Relationship {
  id: string;
  athlete_id: string;
  parent_id: string | null;
  athlete?: Profile;
  parent?: Profile;
}

export default function SquadManager() {
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState<'roster' | 'attendance' | 'medical' | 'link'>('roster');
  const [filterGroup, setFilterGroup] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMedical, setShowMedical] = useState(false);

  // --- REAL DATA ---
  const [athletes, setAthletes] = useState<Profile[]>([]);
  const [parents, setParents] = useState<Profile[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState<string | null>(null);

  // --- LINK FORM STATE ---
  const [selectedAthlete, setSelectedAthlete] = useState('');
  const [selectedParent, setSelectedParent] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setLoading(false); return; }

    // Fetch all athletes
    const { data: athleteData } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'athlete');

    // Fetch all parents
    const { data: parentData } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'parent');

    // Fetch existing relationships for this coach
    const { data: relData } = await supabase
      .from('relationships')
      .select('*')
      .eq('coach_id', session.user.id);

    setAthletes(athleteData || []);
    setParents(parentData || []);
    setRelationships(relData || []);
    setLoading(false);
  }

  async function handleLink() {
    if (!selectedAthlete || !selectedParent) return;
    setLinking(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setLinking(false); return; }

    // Check if relationship already exists
    const exists = relationships.find(
      r => r.athlete_id === selectedAthlete && r.parent_id === selectedParent
    );

    if (exists) {
      setLinkSuccess('Already linked!');
      setLinking(false);
      setTimeout(() => setLinkSuccess(null), 3000);
      return;
    }

    const { error } = await supabase
      .from('relationships')
      .insert({
        coach_id: session.user.id,
        athlete_id: selectedAthlete,
        parent_id: selectedParent
      });

    if (!error) {
      const athlete = athletes.find(a => a.id === selectedAthlete);
      const parent = parents.find(p => p.id === selectedParent);
      setLinkSuccess(`✓ ${athlete?.name} linked to ${parent?.name}!`);
      setSelectedAthlete('');
      setSelectedParent('');
      fetchData();
    }

    setLinking(false);
    setTimeout(() => setLinkSuccess(null), 4000);
  }

  const filteredAthletes = athletes.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loader2 size={40} className="text-blue-500 animate-spin" />
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 text-start">
      
      {/* HEADER */}
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

      {/* TABS */}
      <div className="flex gap-2 p-1 bg-slate-900/50 border border-slate-800 rounded-2xl w-fit flex-wrap">
        {(['roster', 'attendance', 'medical', 'link'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab === 'link' ? '🔗 Link Parent' : t(`manager.tab_${tab}`, tab)}
          </button>
        ))}
      </div>

      {/* SEARCH & FILTERS */}
      {activeTab !== 'link' && (
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
      )}

      {/* CONTENT */}
      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden">

        {/* ROSTER TAB */}
        {activeTab === 'roster' && (
          <table className="w-full text-left">
            <thead className="bg-slate-950/50">
              <tr>
                <th className="p-6 text-[9px] font-black uppercase text-slate-500 tracking-widest">Athlete</th>
                <th className="p-6 text-[9px] font-black uppercase text-slate-500 tracking-widest">XP</th>
                <th className="p-6 text-[9px] font-black uppercase text-slate-500 tracking-widest">Parent Linked</th>
                <th className="p-6 text-[9px] font-black uppercase text-slate-500 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredAthletes.map((athlete) => {
                const rel = relationships.find(r => r.athlete_id === athlete.id);
                const linkedParent = rel ? parents.find(p => p.id === rel.parent_id) : null;
                return (
                  <tr key={athlete.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black italic">
                          {athlete.name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-white">{athlete.name}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-xs font-black italic text-orange-500">{athlete.xp} XP</span>
                    </td>
                    <td className="p-6">
                      {linkedParent ? (
                        <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[8px] font-black uppercase text-green-400">
                          ✓ {linkedParent.name}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-[8px] font-black uppercase text-slate-600">
                          Not linked
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => { setActiveTab('link'); setSelectedAthlete(athlete.id); }}
                        className="text-blue-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                        {linkedParent ? 'Re-link' : 'Link Parent'}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredAthletes.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    No athletes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* LINK PARENT TAB */}
        {activeTab === 'link' && (
          <div className="p-8 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                <Link size={24} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase text-white tracking-widest">Link Parent to Athlete</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Connect a parent account to their child</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Select Athlete</label>
                <select
                  value={selectedAthlete}
                  onChange={e => setSelectedAthlete(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white outline-none focus:border-blue-500 transition-all"
                >
                  <option value="">Choose athlete...</option>
                  {athletes.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Select Parent</label>
                <select
                  value={selectedParent}
                  onChange={e => setSelectedParent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs font-bold text-white outline-none focus:border-blue-500 transition-all"
                >
                  <option value="">Choose parent...</option>
                  {parents.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {linkSuccess && (
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-[10px] font-black uppercase text-green-500 tracking-widest">{linkSuccess}</span>
              </div>
            )}

            <button
              onClick={handleLink}
              disabled={!selectedAthlete || !selectedParent || linking}
              className="w-full bg-blue-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {linking 
                ? <><Loader2 size={16} className="animate-spin" /> Linking...</>
                : <><Link size={16} /> Create Link</>
              }
            </button>

            {/* EXISTING LINKS */}
            {relationships.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Existing Links</h4>
                <div className="space-y-3">
                  {relationships.map(rel => {
                    const athlete = athletes.find(a => a.id === rel.athlete_id);
                    const parent = parents.find(p => p.id === rel.parent_id);
                    if (!athlete || !parent) return null;
                    return (
                      <div key={rel.id} className="flex items-center justify-between bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-black text-white">{athlete.name}</span>
                          <span className="text-slate-600">←→</span>
                          <span className="text-xs font-black text-orange-400">{parent.name}</span>
                        </div>
                        <span className="text-[8px] font-black uppercase text-green-500 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">Linked</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MEDICAL TAB */}
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
                {showMedical ? 'Hide Data' : 'Reveal Data'}
              </button>
            </div>
            <div className="grid gap-4">
              {athletes.map((athlete) => (
                <div key={athlete.id} className="bg-slate-950 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-black uppercase text-white tracking-tighter">{athlete.name}</span>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
                    <div className="space-y-1">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Medical Condition</span>
                      <p className={`text-[11px] font-bold italic transition-all duration-500 ${showMedical ? 'text-slate-300' : 'text-slate-800 select-none blur-md'}`}>
                        N/A
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Allergies</span>
                      <p className={`text-[11px] font-bold italic transition-all duration-500 ${showMedical ? 'text-red-400' : 'text-slate-800 select-none blur-md'}`}>
                        None
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
              Attendance Grid Generator Loading...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}