import type { ComponentType } from 'react';
import { Code2, Cpu, Globe, Users } from 'lucide-react';
import RevealSection from './RevealSection';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const CATEGORY_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  programming: Code2,
  'web-development': Globe,
  'ai-emerging': Cpu,
  activities: Users,
};

export default function SkillsSection() {
  return (
    <RevealSection id="skills" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#38BDF8]">Foundations</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Technical Skills &amp; Focus Areas
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            An honest snapshot of the languages, web fundamentals, and activities I am currently
            practicing as a first-semester student.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category) => {
            const IconComponent = CATEGORY_ICONS[category.id] || Code2;

            return (
              <div
                key={category.id}
                className="flex flex-col rounded-xl border border-white/10 bg-[#0D1017]/90 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/45"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-[#38BDF8]">
                    <IconComponent className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {category.title}
                  </h3>
                </div>

                <ul className="mt-5 divide-y divide-white/10 border-t border-white/10">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-2 py-2.5 text-sm"
                    >
                      <span className="font-medium text-slate-100">{item.name}</span>
                      {item.level && (
                        <span className="text-xs text-slate-400 shrink-0">{item.level}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
