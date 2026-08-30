import { AppThemeMode } from '../types';
import { Translations } from '../translations';

interface InstructionCardsProps {
  themeMode?: AppThemeMode;
  t: Translations;
}

export function InstructionCards({ themeMode = 'kawaii', t }: InstructionCardsProps) {
  const isWedding = themeMode === 'wedding';

  const steps = isWedding
    ? [
        {
          num: '1',
          title: t.steps.step1,
          badgeClass: 'bg-[#B76E79] text-white',
        },
        {
          num: '2',
          title: t.steps.step2,
          badgeClass: 'bg-[#D4AF37] text-white',
        },
        {
          num: '3',
          title: t.steps.step3,
          badgeClass: 'bg-[#E8D3C4] text-[#5C3A42]',
        },
      ]
    : [
        {
          num: '1',
          title: t.steps.step1,
          badgeClass: 'bg-[#FFC0CB] text-white',
        },
        {
          num: '2',
          title: t.steps.step2,
          badgeClass: 'bg-[#E6E6FA] text-[#6D5D6E]',
        },
        {
          num: '3',
          title: t.steps.step3,
          badgeClass: 'bg-[#FFFACD] text-[#6D5D6E]',
        },
      ];

  return (
    <div id="instruction-section" className="w-full flex justify-center gap-3 sm:gap-6 px-4 mb-6 flex-wrap">
      {steps.map((step) => (
        <div
          key={step.num}
          id={`step-pill-${step.num}`}
          className={`flex items-center gap-3 bg-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-sm border-2 hover:scale-102 transition-transform ${
            isWedding ? 'border-[#E8D3C4]' : 'border-[#FFE4E1]'
          }`}
        >
          <span className={`${step.badgeClass} w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold shadow-xs shrink-0`}>
            {step.num}
          </span>
          <span className={`text-xs font-semibold whitespace-nowrap ${isWedding ? 'text-[#5C3A42]' : 'text-[#6D5D6E]'}`}>
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
}
