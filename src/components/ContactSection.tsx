import { useState } from 'react';
import { Check, Copy, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import RevealSection from './RevealSection';
import { PROFILE } from '../data/portfolioData';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.social.emailPlaceholder);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <RevealSection id="contact" className="border-t border-white/10 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#38BDF8]">Contact</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Let&apos;s Connect
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            I&apos;m always interested in learning, building, and connecting with people who share
            an interest in technology and AI.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* LinkedIn */}
          <a
            href={PROFILE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-xl border border-white/10 bg-[#0D1017]/90 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/60"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#38BDF8]">
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </div>
              <ExternalLink
                className="h-4 w-4 text-slate-400 transition-colors group-hover:text-[#38BDF8]"
                aria-hidden="true"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-display text-base font-semibold text-white">LinkedIn</h3>
              <p className="mt-1 truncate text-sm text-slate-400">
                {PROFILE.social.linkedinDisplay}
              </p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href={PROFILE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-xl border border-white/10 bg-[#0D1017]/90 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/60"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white">
                <Github className="h-5 w-5" aria-hidden="true" />
              </div>
              <ExternalLink
                className="h-4 w-4 text-slate-400 transition-colors group-hover:text-[#38BDF8]"
                aria-hidden="true"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-display text-base font-semibold text-white">GitHub</h3>
              <p className="mt-1 truncate text-sm text-slate-400">
                {PROFILE.social.githubDisplay}
              </p>
            </div>
          </a>

          {/* Email Placeholder */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0D1017]/90 p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#38BDF8]">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy placeholder email address"
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-white/15 bg-[#050507] px-3 py-1 text-xs font-medium text-slate-200 transition-colors hover:border-white/30 hover:text-white"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#38BDF8]" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6">
              <h3 className="font-display text-base font-semibold text-white">
                Email (Placeholder)
              </h3>
              <p className="mt-1 truncate text-sm text-slate-400">
                {PROFILE.social.emailPlaceholder}
              </p>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
