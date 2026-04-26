import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher';
import type { UserRole } from '../../types/auth';

interface LoginProps {
  onLogin: (role: Exclude<UserRole, null>, name: string) => void;
}

export default function LoginView({ onLogin }: LoginProps) {
  const { t } = useTranslation();

  const roles: { id: Exclude<UserRole, null>; titleKey: string; icon: string; descKey: string }[] = [
    { id: 'athlete', titleKey: 'athlete', icon: '🏊‍♂️', descKey: 'desc.athlete_login' },
    { id: 'coach', titleKey: 'coach', icon: '📋', descKey: 'desc.coach_login' },
    { id: 'parent', titleKey: 'parent', icon: '👪', descKey: 'desc.parent_login' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-10">
        <LanguageSwitcher />
      </div>

      <div className="max-w-4xl w-full space-y-12 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black italic uppercase tracking-tighter text-blue-500">SwimExpert</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">{t('deck_subtitle', 'Elite Performance Ecosystem')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onLogin(role.id, `${t(role.titleKey)} User`)}
              className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] text-start hover:border-blue-500 transition-all group relative overflow-hidden active:scale-95 shadow-2xl"
            >
              <div className="relative z-10">
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{role.icon}</span>
                <h3 className="text-xl font-black italic uppercase text-white mb-2 tracking-tighter">{t(role.titleKey)}</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
                  {t(role.descKey)}
                </p>
              </div>
              <div className="absolute -right-4 -bottom-4 text-8xl opacity-[0.02] font-black italic group-hover:opacity-[0.05] transition-opacity uppercase pointer-events-none text-white">
                {role.id}
              </div>
            </button>
          ))}
        </div>
        
        <p className="text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
          {t('ui.footer')}
        </p>
      </div>
    </div>
  );
}