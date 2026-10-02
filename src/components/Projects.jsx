/**
 * Projects.jsx — Featured Projects, Live GitHub Repo Sync & Industrial Training
 *
 * Features:
 * 1. Fetches public non-fork repositories from `https://api.github.com/users/{githubUsername}/repos`.
 * 2. Merges live GitHub metadata (stars, URLs, topics, newly created repos) with curated
 *    `featuredProjects` descriptions, project phases (`Completed` vs `In Development`), and PDF reports.
 * 3. Reports any newly discovered repository languages/topics back to `App.jsx` via
 *    `onRepoSkillsDiscovered` so they automatically appear in the Skills Directory.
 * 4. Renders the Industrial Training & Virtual Experience cards (SortIQ & Deloitte).
 */

import { useEffect, useState } from 'react';

/** Converts a kebab/snake-case repository slug into Title Case */
function formatRepoTitle(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Projects({
  featuredProjects,
  experienceAndAchievements,
  githubUsername,
  onRepoSkillsDiscovered,
}) {
  const [projects, setProjects] = useState(featuredProjects);

  // Sync live GitHub repositories on mount
  useEffect(() => {
    let isMounted = true;

    async function syncGithubProjects() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=30`
        );
        if (!res.ok) return;

        const repos = await res.json();
        if (!Array.isArray(repos) || repos.length === 0) return;

        const discoveredSkills = [];

        // Map non-fork GitHub repos and enrich with curated metadata & project phase
        const merged = repos
          .filter((repo) => !repo.fork)
          .map((repo) => {
            const curated = featuredProjects.find(
              (fp) => fp.name.toLowerCase() === repo.name.toLowerCase()
            );
            const topics = Array.isArray(repo.topics) ? repo.topics : [];

            // Collect language & topic tags for automatic skill discovery
            if (repo.language) {
              discoveredSkills.push({ name: repo.language, repo: repo.name });
            }
            topics.forEach((topic) =>
              discoveredSkills.push({ name: topic, repo: repo.name })
            );

            const tags = curated?.tags?.length
              ? [...new Set([...curated.tags, ...topics])]
              : [...new Set([repo.language, ...topics].filter(Boolean))];

            return {
              name: repo.name,
              title: curated?.title || formatRepoTitle(repo.name),
              phase: curated?.phase || 'Completed',
              description:
                curated?.description ||
                repo.description ||
                `Open-source ${repo.language || 'software'} project repository.`,
              language: curated?.language || repo.language || 'Software',
              tags,
              stars: Math.max(repo.stargazers_count || 0, curated?.stars || 0),
              html_url: repo.html_url,
              homepage: repo.homepage || curated?.homepage || null,
              reportUrl: curated?.reportUrl || null,
              reportLabel: curated?.reportLabel || null,
              badge: curated?.badge || 'Featured Project',
            };
          });

        // Append any curated projects not yet returned by GitHub API
        for (const fp of featuredProjects) {
          if (!merged.some((m) => m.name.toLowerCase() === fp.name.toLowerCase())) {
            merged.push(fp);
          }
        }

        if (isMounted) {
          setProjects(merged);
          if (onRepoSkillsDiscovered && discoveredSkills.length > 0) {
            onRepoSkillsDiscovered(discoveredSkills);
          }
        }
      } catch {
        // Fallback to curated `featuredProjects` when offline or rate-limited
      }
    }

    syncGithubProjects();
    return () => {
      isMounted = false;
    };
  }, [githubUsername, featuredProjects, onRepoSkillsDiscovered]);

  return (
    <section
      id="projects"
      className="section py-20 bg-gray-100 dark:bg-slate-800/60 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Projects & Industrial Training
        </h2>
        <div className="w-20 h-1 bg-blue-600 dark:bg-blue-300 mx-auto mb-12"></div>

        {/* Projects Grid (2 columns on desktop for 4 balanced cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const isInDev =
              (project.phase || '').toLowerCase() === 'in development';

            return (
              <div
                key={project.name}
                className="project-card bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700 flex flex-col justify-between animate-fade-in"
              >
                <div>
                  {/* Top Row: Category Badge, Project Phase Pill & Star Count */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-200/90 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                      {project.badge || 'Project'}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Project Phase Badge (Completed vs In Development) */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          isInDev
                            ? 'bg-amber-100/90 text-amber-900 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700/70'
                            : 'bg-slate-800 text-slate-50 border-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isInDev
                              ? 'bg-amber-600 dark:bg-amber-400 animate-ping'
                              : 'bg-slate-50 dark:bg-slate-900'
                          }`}
                        ></span>
                        {project.phase || 'Completed'}
                      </span>

                      <span className="px-2 py-1 bg-slate-200/70 dark:bg-slate-700 rounded text-gray-800 dark:text-gray-200 text-xs">
                        <i className="fas fa-star text-amber-500 mr-1"></i>
                        {project.stars}
                      </span>
                    </div>
                  </div>

                  {/* Project Title & Description */}
                  <h3 className="text-xl font-semibold mb-2">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-slate-800 dark:text-slate-100"
                    >
                      {project.title}
                    </a>
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Tags & External Links */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.tags?.length
                      ? project.tags
                      : [project.language]
                    ).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-slate-200/75 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-300 hover:underline text-sm font-medium"
                    >
                      View on GitHub{' '}
                      <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
                    </a>

                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:underline text-xs font-medium"
                      >
                        <i className="fas fa-globe mr-1"></i> Live Demo
                      </a>
                    )}

                    {project.reportUrl && (
                      <a
                        href={project.reportUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:underline text-xs font-medium"
                      >
                        <i className="fas fa-file-pdf mr-1"></i>
                        {project.reportLabel || 'View Report'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Experience & Industrial Training Cards */}
        {experienceAndAchievements?.length > 0 && (
          <div id="experience" className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-700/80 animate-fade-in section">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest font-semibold text-blue-600 dark:text-blue-400 mb-2 block">
                Work History & Applied Impact
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-3">
                Professional Experience & Industry Training
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Track record spanning active corporate analytics internships, intensive data pipeline engineering, and global advisory simulations.
              </p>
            </div>

            <div className="space-y-6">
              {experienceAndAchievements.map((exp) => (
                <div
                  key={exp.role}
                  className={`hover-card group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl p-6 sm:p-8 border ${
                    exp.isCurrent
                      ? 'border-blue-600/50 dark:border-blue-400/50 ring-1 ring-blue-600/20'
                      : 'border-slate-200 dark:border-slate-700'
                  } transition-all duration-300`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Left Column (Meta, Identity, Status, Metric & CTA on Desktop) */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                      <div>
                        {/* Company Logo + Org & Type */}
                        <div className="flex items-start gap-3.5">
                          {exp.logo && (
                            <div className="w-14 h-14 rounded-2xl bg-white overflow-hidden shadow-sm ring-1 ring-slate-200 dark:ring-white/10 flex items-center justify-center flex-shrink-0 p-1.5">
                              <img
                                src={exp.logo}
                                alt={exp.organization}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                              {exp.type || 'Experience'}
                            </span>
                            <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-snug truncate">
                              {exp.organization}
                            </h4>
                            {exp.location && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center">
                                <i className="fas fa-map-marker-alt mr-1.5 text-gray-400 text-[11px]"></i>
                                <span>{exp.location}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Role Title & Status */}
                        <div className="mt-4">
                          <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {exp.role}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                exp.isCurrent
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60'
                                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700/70 dark:text-slate-300 border border-slate-200/80 dark:border-slate-600/50'
                              }`}
                            >
                              {exp.isCurrent && (
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                              )}
                              {exp.period}
                            </span>
                            {exp.duration && !exp.isCurrent && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                • {exp.duration}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Key Metric / Impact Highlight Badge */}
                        {exp.keyMetric && (
                          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-600/60 flex items-start gap-2.5">
                            <i
                              className={`${
                                exp.metricIcon || 'fas fa-chart-line'
                              } text-blue-600 dark:text-blue-400 text-sm mt-0.5 flex-shrink-0`}
                            ></i>
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                              {exp.keyMetric}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Desktop CTA Link */}
                      {exp.actionUrl && (
                        <div className="hidden lg:block pt-2">
                          <a
                            href={exp.actionUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                          >
                            <i className={exp.actionIcon || 'fas fa-external-link-alt'}></i>
                            <span>{exp.actionText || 'View Deliverable'}</span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Right Column (Highlights Deliverables & Skill Chips) */}
                    <div className="lg:col-span-7 lg:border-l lg:border-slate-200 dark:lg:border-slate-700/80 lg:pl-8 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                          <i className="fas fa-list-check text-blue-600 dark:text-blue-400"></i>
                          <span>Key Deliverables & Applied Scope</span>
                        </div>

                        {/* Bullet highlights with stylish icons */}
                        <ul className="space-y-2.5">
                          {exp.highlights.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                            >
                              <span className="mt-1 mr-2.5 flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px]">
                                <i className="fas fa-check"></i>
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills & Mobile CTA */}
                      <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-700/70">
                        {exp.skills && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mr-1">
                              Competencies:
                            </span>
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600/40"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Mobile CTA Link */}
                        {exp.actionUrl && (
                          <div className="block lg:hidden mt-4 pt-2">
                            <a
                              href={exp.actionUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-500 shadow-sm transition-all duration-200"
                            >
                              <i className={exp.actionIcon || 'fas fa-external-link-alt'}></i>
                              <span>{exp.actionText || 'View Deliverable'}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Repositories Footer CTA */}
        <div className="text-center mt-12">
          <a
            href={`https://github.com/${githubUsername}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 border border-slate-800 text-slate-800 dark:border-slate-300 dark:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition font-medium"
          >
            View All Projects on GitHub{' '}
            <i className="fas fa-external-link-alt ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
