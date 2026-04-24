import { useState } from 'react';
import type { UserRole } from '../types/auth';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  userRole: Exclude<UserRole, null>;
}

export default function Navbar({ activePage, setActivePage, userRole }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const allMenuItems = [
    // ATHLETE PRIMARY
    { id: 'pool', label: 'Pool Deck', icon: '🏠', roles: ['athlete'] },
    { id: 'strategy', label: 'Race Strategy', icon: '🗺️', roles: ['athlete'] }, // ADDED
    { id: 'gear', label: 'Gear Locker', icon: '🎒', roles: ['athlete'] }, // ADDED
    
    // TRAINING TOOLS
    { id: 'drills', label: 'Drill Library', icon: '📺', roles: ['athlete', 'coach'] },
    { id: 'workout', label: 'AI Coach', icon: '🤖', roles: ['athlete', 'coach'] },
    { id: 'dryland', label: 'Dryland', icon: '🧘', roles: ['athlete', 'coach'] },
    
    // COACH PRIMARY
    { id: 'squad', label: 'Squad Command', icon: '👥', roles: ['coach'] },
    { id: 'broadcast', label: 'Broadcast', icon: '📢', roles: ['coach'] },
    
    // PARENT PRIMARY
    { id: 'monitoring', label: 'Child Stats', icon: '📈', roles: ['parent'] },
    { id: 'wellness', label: 'Wellness', icon: '🛡️', roles: ['parent'] },
    { id: 'gear_audit', label: 'Gear Audit', icon: '🎒', roles: ['parent'] },
    
    // SHARED
    { id: 'news', label: 'News Brief', icon: '📰', roles: ['athlete', 'coach', 'parent'] },
    { id: 'nutrition', label: 'Fuel Deck', icon: '🥗', roles: ['athlete', 'parent'] },
    { id: 'contact', label: 'Support', icon: '📧', roles: ['athlete', 'coach', 'parent'] }
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  const handleNavigation = (id: string) => {
    setActivePage(id);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-[60] bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-900/40 hover:scale-105 transition-all flex flex-col gap-1.5 justify-center items-center w-12 h-12"
      >
        <div className="w-6 h-0.5 bg-white rounded-full"></div>
        <div className="w-6 h-0.5 bg-white rounded-full"></div>
        <div className="w-6 h-0.5 bg-white rounded-full"></div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[70]" onClick={() => setIsOpen(false)}></div>
      )}

      <aside className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 z-[80] shadow-2xl transform transition-transform duration-500 p-8 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="mb-10">
            <h2 className="text-2xl font-black italic text-blue-500 uppercase tracking-tighter">SwimExpert</h2>
            <p className="text-[8px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2 italic">{userRole} Navigation</p>
          </div>
          <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all text-left ${activePage === item.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}