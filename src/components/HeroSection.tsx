import { useState } from 'react';
import { ArrowRight, Code2, Github, Linkedin } from 'lucide-react';
import heroWorkspaceImg from '../assets/images/hero_study_workspace_1794575725366.jpg';
import { PROFILE } from '../data/portfolioData';

export default function HeroSection() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section
      id="top"
      className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8"
    >
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Primary Identity & Actions */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="text-sm font-medium text-[#38BDF8]">
            {PROFILE.status} <span aria-hidden="true">·</span> {PROFILE.goal}
          </p>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.12]">
            {PROFILE.headline}
          </h1>

          <p className="mt-4 text-lg font-medium text-slate-200 sm:text-xl">
            {PROFILE.subtitle}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            {PROFILE.heroSummary}
          </p>

          {/* Primary & Secondary Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#3B82F6] whitespace-nowrap shrink-0"
            >
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/20 bg-[#0D1017]/90 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:border-[#38BDF8]/60 hover:bg-[#131823] whitespace-nowrap shrink-0"
            >
              Connect With Me
            </a>
          </div>

          {/* Direct Social Links */}
          <div className="mt-8 flex items-center gap-5 border-t border-white/10 pt-6">
            <span className="text-xs font-medium text-slate-400">Profiles</span>
            <a
              href={PROFILE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dasari Jashwanth on LinkedIn"
              className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-200 transition-colors hover:text-[#38BDF8]"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>

            <span className="text-slate-600" aria-hidden="true">
              /
            </span>

            <a
              href={PROFILE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dasari Jashwanth on GitHub"
              className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-200 transition-colors hover:text-[#38BDF8]"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column: Framed Workspace Visual */}
        <div className="lg:col-span-5">
          <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/15 bg-[#0D1017]">
            {!imageFailed ? (
              <>
                <img
                  src={heroWorkspaceImg}
                  alt="Clean student developer desk with a laptop running Python code and a notebook of hand-drawn programming flowcharts"
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover brightness-90 contrast-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050507]/70 via-transparent to-[#050507]/20"
                />
              </>
            ) : (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center bg-[#0D1017] p-8 text-center">
                <Code2 className="h-10 w-10 text-[#38BDF8]" aria-hidden="true" />
                <p className="mt-3 font-display text-base font-semibold text-white">
                  {PROFILE.displayName}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Python · Web Development · Generative AI
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
