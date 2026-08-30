import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Language } from '../translations';
import { AppThemeMode } from '../types';

interface LanguageSelectorProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  themeMode?: AppThemeMode;
}

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  nativeName: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭', nativeName: 'ภาษาไทย' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'ja', label: '日本語', flag: '🇯🇵', nativeName: '日本語' },
];

export function LanguageSelector({ currentLang, onSelectLang, themeMode = 'kawaii' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isWedding = themeMode === 'wedding';

  const currentOption = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <button
        type="button"
        id="language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3.5 py-1.5 sm:py-2 rounded-full backdrop-blur-md shadow-sm hover:shadow-md border-2 transition-all flex items-center gap-2 text-xs sm:text-sm font-bold cursor-pointer select-none hover:scale-103 active:scale-95 ${
          isWedding
            ? 'bg-white/98 text-[#5C3A42] border-[#E8D3C4] hover:border-[#B76E79]'
            : 'bg-white/98 text-[#6D5D6E] border-[#FFDDF0] hover:border-[#FF85A1]'
        }`}
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <span className="text-base leading-none">{currentOption.flag}</span>
        <span className="font-bold">{currentOption.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${
          isWedding ? 'text-[#B76E79]' : 'text-[#FF85A1]'
        }`} />
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          className={`absolute right-0 top-full mt-2 w-48 rounded-2xl shadow-2xl border-2 py-1.5 z-50 animate-fadeIn backdrop-blur-xl ${
            isWedding
              ? 'bg-white/98 border-[#E8D3C4]'
              : 'bg-white/98 border-[#FFE4E1]'
          }`}
        >
          <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A66C78] border-b border-gray-100 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#B76E79]" />
            <span>Languages / ภาษา</span>
          </div>

          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                id={`lang-opt-${lang.code}`}
                onClick={() => {
                  onSelectLang(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? isWedding
                      ? 'bg-[#FDF2EC] text-[#B76E79] font-bold'
                      : 'bg-[#FFF0F5] text-[#FF69B4] font-bold'
                    : 'text-[#6D5D6E] hover:bg-[#FAF9F6]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <div>
                    <span className="block font-semibold">{lang.nativeName}</span>
                    <span className="text-[10px] text-gray-400 font-normal">{lang.label}</span>
                  </div>
                </div>
                {isSelected && (
                  <Check className={`w-4 h-4 ${isWedding ? 'text-[#B76E79]' : 'text-[#FF69B4]'}`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
