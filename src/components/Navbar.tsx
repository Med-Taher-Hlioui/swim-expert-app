import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  Menu,
  X
} from 'lucide-react';
import type { UserRole } from '../types/auth';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  userRole: UserRole;
}

export default function Navbar({ activePage, setActivePage, userRole }: NavbarProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false); // Controls the "slide"

  // Helper to render nav items
  const NavItem = ({ id, icon: Icon, labelKey }: { id: string, icon: any, labelKey: string }) => (
    <button
      onClick={() => {
        setActivePage(id);
        setIsOpen(false); // Close drawer after clicking
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        activePage === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
      }`}
    >
      <Icon className={`w-5 h-5 ${activePage === id ? 'text-white' : 'group-hover:text-blue-400'}`} />
      <span className="text-sm font-bold tracking-tight uppercase italic">
        {t(labelKey)}
      </span>
    </button>
  );

  return (
    <>
      {/* 1. TRIGGER BUTTON (Visible when closed) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-6 start-6 z-[60] bg-blue-600 p-3 rounded-xl shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
        >
          <Waves className="w-6 h-6 text-white group-hover:animate-pulse" />
        </button>
      )}

      {/* 2. OVERLAY (Darkens the screen when menu is open) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[55] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. THE SLIDING NAVBAR */}
      <aside className={`fixed inset-y-0 start-0 w-72 bg-slate-950 border-e border-slate-900 z-[60] flex flex-col p-6 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
      }`}>
        
        {/* Header inside Navbar */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-white">SOUSSE</h1>
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
              <NavItem id="pool" icon={LayoutDashboard} labelKey="dashboard" />
              <NavItem id="strategy" icon={Trophy} labelKey="strategy" />
              <NavItem id="gear" icon={ShoppingBag} labelKey="gear" />
              <NavItem id="nutrition" icon={Utensils} labelKey="nutrition" />
              <NavItem id="news" icon={Newspaper} labelKey="news" />
              <NavItem id="drills" icon={BookOpen} labelKey="drills" />
              <NavItem id="workout" icon={Zap} labelKey="workout" />
              <NavItem id="dryland" icon={Dumbbell} labelKey="dryland" />
            </>
          )}

          {/* --- COACH --- */}
          {userRole === 'coach' && (
            <>
              <NavItem id="squad" icon={Users} labelKey="squad" />
              <NavItem id="drills" icon={BookOpen} labelKey="drills" />
              <NavItem id="dryland" icon={Dumbbell} labelKey="dryland" />
              <NavItem id="news" icon={Newspaper} labelKey="news" />
            </>
          )}

          {/* --- PARENT --- */}
          {userRole === 'parent' && (
            <>
              <NavItem id="monitoring" icon={LayoutDashboard} labelKey="monitoring" />
              <NavItem id="wellness" icon={HeartPulse} labelKey="wellness" />
              <NavItem id="gear_audit" icon={ClipboardCheck} labelKey="gear_audit" />
              <NavItem id="nutrition" icon={Utensils} labelKey="nutrition" />
              <NavItem id="news" icon={Newspaper} labelKey="news" />
            </>
          )}

          <div className="pt-4 border-t border-slate-900 mt-4">
            <NavItem id="contact" icon={Mail} labelKey="contact" />
          </div>
        </nav>

        <div className="mt-auto pt-6 opacity-20">
          <p className="text-[10px] font-black uppercase italic text-center">Sousse Elite AI</p>
        </div>
      </aside>
    </>
  );
}