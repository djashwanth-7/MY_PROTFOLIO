import { Layers, Lightbulb, Users } from 'lucide-react';
import RevealSection from './RevealSection';
import { HACKATHON_FOCUS } from '../data/portfolioData';

const FOCUS_ICONS = [Lightbulb, Layers, Users];

export default function HackathonsSection() {
  return (
    <RevealSection id="hackathons" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-[#38BDF8]">Collaborative Learning</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Hackathons &amp; Idea-thons
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-200">
            I actively participate in hackathons and idea-thons to explore real-world problems,
            develop ideas, collaborate with others, and improve my problem-solving and technical
            skills.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {HACKATHON_FOCUS.map((item, idx) => {
            const Icon = FOCUS_ICONS[idx] || Lightbulb;
            return (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-[#0D1017]/90 p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-[#38BDF8]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Dedicated transparent space for future achievements */}
        <div className="mt-8 rounded-xl border border-dashed border-white/20 bg-[#0D1017]/75 p-6 sm:p-8">
          <p className="text-xs font-medium text-[#38BDF8]">Future Achievements Log</p>
          <h3 className="mt-1 font-display text-base font-semibold text-white">
            Room to Grow Across Upcoming Semesters
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
            As a B.Tech 1st-semester student, this space is reserved for documenting upcoming
            hackathon builds, project demos, team milestones, and verifiable outcomes as I
            continue participating and learning.
          </p>
        </div>
      </div>
    </RevealSection>
  );
}
