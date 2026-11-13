import { ExternalLink, Eye, Github } from 'lucide-react';
import RevealSection from './RevealSection';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  return (
    <RevealSection
      id="projects"
      className="border-t border-white/10 bg-[#080A0F]/85 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#38BDF8]">Practical Practice</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Projects
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Beginner Python applications built to practice conditional logic, functions, user
            interaction, and structured problem solving. Click &ldquo;View Project&rdquo; to try an
            interactive simulation or inspect the Python logic.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0D1017] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/45"
            >
              <div>
                <p className="font-mono text-xs font-medium tabular-nums text-[#38BDF8]">
                  Project 0{index + 1}
                </p>

                <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-white">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {project.description}
                </p>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-xs font-medium text-slate-400">Technologies used</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-200">
                    {project.technologies.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#3B82F6] whitespace-nowrap shrink-0"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  <span>View Project</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#121622] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:border-white/30 hover:bg-[#191F30] whitespace-nowrap shrink-0"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
