import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Plus, CheckCircle2 } from 'lucide-react';

interface WorkoutLog {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function CoachConsole({ engine }: any) {
  const [level, setLevel] = useState('Intermediate');
  const [goal, setGoal] = useState('Endurance');
  const [duration, setDuration] = useState('60');
  const [workout, setWorkout] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // --- MANUAL LOG STATE ---
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualContent, setManualContent] = useState('');

  // --- HISTORY FROM SUPABASE ---
  const [history, setHistory] = useState<WorkoutLog[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // --- FETCH WORKOUT HISTORY ---
  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    setLoadingHistory(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setLoadingHistory(false); return; }

    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('created_by', session.user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error && data) setHistory(data);
    setLoadingHistory(false);
  }

  // --- GENERATE AI WORKOUT ---
  const handleGenerate = async () => {
    setLoading(true);
    setWorkout('');
    setSaved(false);
    try {
      const res = await engine.generateWorkout(level, goal, duration);
      setWorkout(res);
    } catch (err) {
      setWorkout('Coach is currently at the pool. Please try again in a moment.');
    }
    setLoading(false);
  };

  // --- SAVE GENERATED WORKOUT TO SUPABASE ---
  const handleSaveWorkout = async () => {
    if (!workout) return;
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSaving(false); return; }

    const { error } = await supabase
      .from('workouts')
      .insert({
        created_by: session.user.id,
        title: `AI ${goal} Session — ${level}`,
        content: workout
      });

    if (!error) {
      setSaved(true);
      fetchHistory();
    }
    setSaving(false);
  };

  // --- SAVE MANUAL WORKOUT ---
  const handleSaveManual = async () => {
    if (!manualTitle) return;
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSaving(false); return; }

    const { error } = await supabase
      .from('workouts')
      .insert({
        created_by: session.user.id,
        title: manualTitle,
        content: manualContent
      });

    if (!error) {
      setManualTitle('');
      setManualContent('');
      setShowManualForm(false);
      fetchHistory();
    }
    setSaving(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const getMood = (title: string) => {
    if (title.toLowerCase().includes('speed') || title.toLowerCase().includes('sprint')) return '🔥';
    if (title.toLowerCase().includes('endurance')) return '💪';
    if (title.toLowerCase().includes('technique')) return '🎯';
    return '🔱';
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20 text-left">
      
      {/* HEADER */}
      <div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500">Coach Console</h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest mt-2 uppercase">AI Intelligence</p>
      </div>

      {/* 1. AI GENERATOR */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-8 w-full">
        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Session Generator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex flex-col gap-2">
            <label className="font-black text-slate-500 uppercase tracking-widest">Athlete Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="bg-slate-950 p-4 rounded-xl font-bold border border-slate-800 outline-none focus:border-blue-500 text-white">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-black text-slate-500 uppercase tracking-widest">Session Goal</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="bg-slate-950 p-4 rounded-xl font-bold border border-slate-800 outline-none focus:border-blue-500 text-white">
              <option>Endurance</option>
              <option>Speed</option>
              <option>Technique</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-black text-slate-500 uppercase tracking-widest">Duration (Mins)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="bg-slate-950 p-4 rounded-xl font-bold border border-slate-800 outline-none focus:border-blue-500 text-white" />
          </div>
        </div>

        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-blue-500 transition-all disabled:opacity-50"
        >
          {loading ? 'Writing your session...' : 'Generate AI Workout'}
        </button>

        {workout && (
          <div className="space-y-4 animate-in slide-in-from-top-4">
            <div className="p-6 bg-slate-950 rounded-2xl border border-blue-900/30 font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
              {workout}
            </div>
            <button
              onClick={handleSaveWorkout}
              disabled={saving || saved}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                saved 
                  ? 'bg-green-600/20 border border-green-500/30 text-green-500' 
                  : 'bg-slate-800 hover:bg-blue-600 text-white border border-slate-700'
              }`}
            >
              {saving ? (
                <><Loader2 size={16} className="animate-spin" /> Saving...</>
              ) : saved ? (
                <><CheckCircle2 size={16} /> Saved to History!</>
              ) : (
                '💾 Save This Workout'
              )}
            </button>
          </div>
        )}
      </div>

      {/* 2. LOG MANUAL WORKOUT */}
      {!showManualForm ? (
        <button 
          onClick={() => setShowManualForm(true)}
          className="w-full bg-slate-900/50 border-2 border-dashed border-slate-800 p-8 rounded-[2.5rem] flex items-center justify-center gap-4 hover:border-blue-500 group transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">+</div>
          <div className="text-left">
            <p className="text-xs font-black uppercase tracking-widest text-slate-300">Log Manual Workout</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase italic">Add your poolside results here.</p>
          </div>
        </button>
      ) : (
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6 animate-in slide-in-from-top-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Log Manual Workout</h3>
          <input
            value={manualTitle}
            onChange={e => setManualTitle(e.target.value)}
            placeholder="Session Title (e.g. Sousse Elite Session)"
            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm font-bold text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
          />
          <textarea
            value={manualContent}
            onChange={e => setManualContent(e.target.value)}
            placeholder="Session details, volume, notes..."
            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm font-bold text-white outline-none focus:border-blue-500 transition-all placeholder:text-slate-600 min-h-[120px]"
          />
          <div className="flex gap-4">
            <button
              onClick={() => setShowManualForm(false)}
              className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all border border-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveManual}
              disabled={saving || !manualTitle}
              className="flex-1 bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : '💾 Save Workout'}
            </button>
          </div>
        </div>
      )}

      {/* 3. TRAINING HISTORY */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Training History</h3>
        
        {loadingHistory ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="text-blue-500 animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-[2rem] text-center">
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest">No workouts logged yet. Generate or log your first session!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {history.map((item) => (
              <div key={item.id} className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 flex justify-between items-center group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-3xl">{getMood(item.title)}</span>
                  <div>
                    <h4 className="font-black italic uppercase text-base text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{formatDate(item.created_at)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-black uppercase text-blue-500">✓ Logged</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}