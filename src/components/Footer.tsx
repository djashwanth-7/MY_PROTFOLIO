import { Github, Linkedin } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050507]/95 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-white">
            {PROFILE.name} — {PROFILE.subtitle}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            &copy; 2026 {PROFILE.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={PROFILE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-[#38BDF8]"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>

          <a
            href={PROFILE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-[#38BDF8]"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
