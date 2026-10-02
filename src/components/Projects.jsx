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

        {/* Industrial Training & Virtual Experience Cards */}
        {experienceAndAchievements?.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Training & Virtual Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experienceAndAchievements.map((exp) => (
                <div
                  key={exp.role}
                  className="hover-card bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                      {exp.role}
                    </h4>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200/90 text-slate-800 dark:bg-slate-700 dark:text-slate-200 font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    <i className="fas fa-building mr-1.5 text-gray-500"></i>
                    {exp.organization}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
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
