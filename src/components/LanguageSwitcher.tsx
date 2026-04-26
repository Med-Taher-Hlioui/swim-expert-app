import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
      <Languages className="w-4 h-4 text-emerald-500" />
      <select 
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
}