import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Waves, 
  LayoutDashboard, 
  Trophy, 
  ShoppingBag, 
  Utensils, 
  Newspaper, 
  BookOpen, 
  Zap, 
  Dumbbell, 
  Mail,
  Users,
  HeartPulse,
  ClipboardCheck,
  X,
  Settings,
  TrendingUp,
  Microscope,
  Timer,
  Medal 
} from 'lucide-react';
import type { UserRole } from '../types/auth';

interface NavbarProps {
  userRole: UserRole;
}

export default function Navbar({ userRole }: NavbarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavItem = ({ path, icon: Icon, labelKey }: { path: string, icon: any, labelKey: string }) => {
    const isActive = location.pathname === path;
    
    return (
      <button
        onClick={() => {
          navigate(path);
          setIsOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
            : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-blue-400'}`} />
        <span className="text-sm font-bold tracking-tight uppercase italic text-start">
          {t(labelKey)}
        </span>
      </button>
    );
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-6 start-6 z-[60] bg-blue-600 p-3 rounded-xl shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
        >
          <Waves className="w-6 h-6 text-white group-hover:animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[55] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 start-0 w-72 bg-slate-950 border-e border-slate-900 z-[60] flex flex-col p-6 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
      }`}>
        
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-white leading-none">SOUSSE</h1>
              <p className="text-[10px] font-black text-blue-500 uppercase italic">Elite Athletics</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {/* --- ATHLETE --- */}
          {userRole === 'athlete' && (
            <>
              <NavItem path="/athlete/pool" icon={LayoutDashboard} labelKey="dashboard" />
              <NavItem path="/athlete/strategy" icon={Trophy} labelKey="strategy" />
              <NavItem path="/athlete/gear" icon={ShoppingBag} labelKey="gear" />
              <NavItem path="/athlete/nutrition" icon={Utensils} labelKey="nutrition" />
              <NavItem path="/athlete/news" icon={Newspaper} labelKey="news" />
              <NavItem path="/athlete/drills" icon={BookOpen} labelKey="drills" />
              <NavItem path="/athlete/workout" icon={Zap} labelKey="workout" />
              <NavItem path="/athlete/dryland" icon={Dumbbell} labelKey="dryland" />
            </>
          )}

          {/* --- COACH --- */}
          {userRole === 'coach' && (
            <>
              <NavItem path="/coach/squad" icon={LayoutDashboard} labelKey="squad" />
              <NavItem path="/coach/manager" icon={Settings} labelKey="manager.title" />
              <NavItem path="/coach/workload" icon={TrendingUp} labelKey="workload.title" />
              <NavItem path="/coach/analysis" icon={Microscope} labelKey="lab.title" />
              <NavItem path="/coach/chrono" icon={Timer} labelKey="chrono.title" />
              <NavItem path="/coach/rankings" icon={Medal} labelKey="leaderboard.title" />
              <NavItem path="/coach/drills" icon={BookOpen} labelKey="drills" />
              <NavItem path="/coach/dryland" icon={Dumbbell} labelKey="dryland" />
              <NavItem path="/coach/news" icon={Newspaper} labelKey="news" />
            </>
          )}

          {/* --- PARENT --- */}
          {userRole === 'parent' && (
            <>
              <NavItem path="/parent/monitoring" icon={LayoutDashboard} labelKey="monitoring" />
              {/* ADDED: Growth Tracking / Progress Deck */}
              <NavItem path="/parent/analysis" icon={TrendingUp} labelKey="Growth Tracking" />
              <NavItem path="/parent/wellness" icon={HeartPulse} labelKey="wellness" />
              <NavItem path="/parent/gear_audit" icon={ClipboardCheck} labelKey="gear_audit" />
              <NavItem path="/parent/nutrition" icon={Utensils} labelKey="nutrition" />
              <NavItem path="/parent/news" icon={Newspaper} labelKey="news" />
            </>
          )}

          <div className="pt-4 border-t border-slate-900 mt-4">
            <NavItem path={userRole ? `/${userRole}/contact` : "/contact"} icon={Mail} labelKey="contact" />
          </div>
        </nav>

        <div className="mt-auto pt-6 opacity-20">
          <p className="text-[10px] font-black uppercase italic text-center text-white">Sousse Elite AI</p>
        </div>
      </aside>
    </>
  );
}