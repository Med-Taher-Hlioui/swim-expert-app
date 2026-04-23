import { useState } from 'react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: any) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'pool', label: 'Pool Deck', icon: '🏠' },
    { id: 'news', label: 'News Brief', icon: '📰' },
    { id: 'drills', label: 'Drill Library', icon: '📺' },
    { id: 'workout', label: 'AI Coach', icon: '🤖' },
    { id: 'dryland', label: 'Dryland', icon: '🧘' },
    { id: 'strategy', label: 'Race Strategy', icon: '🗺️' },
    { id: 'gear', label: 'Gear Locker', icon: '🎒' },
    { id: 'nutrition', label: 'Fuel Deck', icon: '🥗' },
    { id: 'progress', label: 'Stats Log', icon: '📈' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  const handleNavigation = (id: string) => {
    setActivePage(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* HAMBURGER BUTTON (Floating Fixed) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-[60] bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-900/40 hover:scale-105 transition-all flex flex-col gap-1.5 justify-center items-center w-12 h-12"
      >
        <div className="w-6 h-0.5 bg-white rounded-full"></div>
        <div className="w-6 h-0.5 bg-white rounded-full"></div>
        <div className="w-6 h-0.5 bg-white rounded-full"></div>
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[70] animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 z-[80] shadow-2xl transform transition-transform duration-500 ease-out p-8 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header in Sidebar */}
          <div className="mb-10 text-left">
            <h2 className="text-2xl font-black italic text-blue-500 uppercase tracking-tighter leading-none">SwimExpert</h2>
            <p className="text-[8px] font-black uppercase text-slate-500 tracking-[0.3em] mt-2">Menu Navigation</p>
          </div>

          {/* Links */}
          <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all text-left group ${activePage === item.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Branding */}
          <div className="pt-8 border-t border-slate-800">
             <p className="text-[7px] font-black uppercase tracking-[0.4em] text-slate-600 text-center">
               Mohamed Tahar Hlioui
             </p>
          </div>
        </div>
      </aside>
    </>
  );
}