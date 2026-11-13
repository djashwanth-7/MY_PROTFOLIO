import RevealSection from './RevealSection';
import { LEARNING_JOURNEY } from '../data/portfolioData';

export default function LearningJourneySection() {
  return (
    <RevealSection
      id="journey"
      className="border-t border-white/10 bg-[#080A0F]/85 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#38BDF8]">Roadmap</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Current Learning Journey
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            These items represent my active study areas and upcoming learning goals rather than
            completed achievements.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Currently Learning */}
          <div className="rounded-xl border border-white/10 bg-[#0D1017] p-6 sm:p-8">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-lg font-bold text-white">
                Currently Learning
              </h3>
              <span className="text-xs font-medium text-[#38BDF8]">In Progress</span>
            </div>

            <ol className="mt-5 divide-y divide-white/10">
              {LEARNING_JOURNEY.currentlyLearning.map((item, idx) => (
                <li key={item} className="flex items-center gap-4 py-3.5">
                  <span className="font-mono text-xs font-medium tabular-nums text-[#38BDF8]">
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-100">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Next Goals */}
          <div className="rounded-xl border border-white/10 bg-[#0D1017] p-6 sm:p-8">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-lg font-bold text-white">Next Goals</h3>
              <span className="text-xs font-medium text-slate-400">Planned Milestones</span>
            </div>

            <ol className="mt-5 divide-y divide-white/10">
              {LEARNING_JOURNEY.nextGoals.map((goal, idx) => (
                <li key={goal} className="flex items-center gap-4 py-3.5">
                  <span className="font-mono text-xs font-medium tabular-nums text-slate-400">
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-100">{goal}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
