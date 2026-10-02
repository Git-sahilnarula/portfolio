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
            <h2 className="text-3xl font-bold text-center mb-4 text-slate-800 dark:text-slate-100">
              Professional Experience & Industry Training
            </h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-300 mx-auto mb-12"></div>

            <div className="relative">
              {/* Center vertical timeline divider (visible on desktop) */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-300 dark:bg-slate-700"></div>

              <div className="space-y-8 md:space-y-16">
                {experienceAndAchievements.map((item, idx) => {
                  // Alternate left/right column alignment on odd-indexed entries
                  const isReversed = idx % 2 === 1;

                  return (
                    <div key={item.role} className="relative animate-fade-in">
                      <div className="md:flex items-center">
                        {/* Role, Organization, Location & Period Column */}
                        <div
                          className={`md:w-1/2 ${
                            isReversed
                              ? 'md:pl-12 md:order-last'
                              : 'md:pr-12 md:text-right'
                          }`}
                        >
                          <div
                            className={`flex items-center gap-3 mb-2 ${
                              isReversed ? 'md:justify-start' : 'md:justify-end'
                            }`}
                          >
                            {item.logo && (
                              <div
                                className={`w-11 h-11 rounded-xl bg-white dark:bg-slate-800 p-1.5 shadow-sm ring-1 ring-black/10 dark:ring-white/10 flex items-center justify-center flex-shrink-0 ${
                                  isReversed ? 'order-first' : 'md:order-last'
                                }`}
                              >
                                <img
                                  src={item.logo}
                                  alt={item.organization}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                            <div>
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                                {item.type || 'Experience'}
                              </span>
                              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
                                {item.role}
                              </h3>
                            </div>
                          </div>

                          <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                            {item.organization}
                          </p>

                          {item.location && (
                            <p
                              className={`text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1 ${
                                isReversed ? 'md:justify-start' : 'md:justify-end'
                              }`}
                            >
                              <i className="fas fa-map-marker-alt text-[11px]"></i>
                              <span>{item.location}</span>
                            </p>
                          )}

                          <div
                            className={`mt-2 flex items-center gap-2 ${
                              isReversed ? 'md:justify-start' : 'md:justify-end'
                            }`}
                          >
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                item.isCurrent
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60'
                                  : 'bg-slate-200/80 text-slate-700 dark:bg-slate-700/70 dark:text-slate-300'
                              }`}
                            >
                              {item.isCurrent && (
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                              )}
                              {item.period}
                            </span>
                            {item.duration && !item.isCurrent && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                • {item.duration}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Center Timeline Node Dot */}
                        <div className="hidden md:flex justify-center md:w-1/12">
                          <div
                            className={`w-5 h-5 rounded-full border-4 border-slate-50 dark:border-slate-900 z-10 shadow ${
                              item.isCurrent
                                ? 'bg-emerald-500 ring-4 ring-emerald-500/20'
                                : 'bg-blue-600 dark:bg-blue-300'
                            }`}
                          ></div>
                        </div>

                        {/* Highlights Card Column */}
                        <div
                          className={`md:w-1/2 mt-4 md:mt-0 ${
                            isReversed ? 'md:pr-12 md:order-first' : 'md:pl-12'
                          }`}
                        >
                          <div className="hover-card bg-gray-50 dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                            {item.keyMetric && (
                              <div className="mb-3 px-3 py-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-700/60 border border-slate-300/70 dark:border-slate-600/70 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <i
                                  className={`${
                                    item.metricIcon || 'fas fa-chart-line'
                                  } text-blue-600 dark:text-blue-400 text-sm flex-shrink-0`}
                                ></i>
                                <span>{item.keyMetric}</span>
                              </div>
                            )}

                            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                              {item.highlights.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>

                            {item.skills && (
                              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                                {item.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-200/75 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}

                            {item.actionUrl && (
                              <div className="mt-3.5 pt-2">
                                <a
                                  href={item.actionUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-300 hover:underline"
                                >
                                  <i
                                    className={`${
                                      item.actionIcon || 'fas fa-external-link-alt'
                                    } mr-1.5`}
                                  ></i>
                                  {item.actionText || 'View Deliverable'}
                                  <span aria-hidden="true" className="ml-1">
                                    &rarr;
                                  </span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
