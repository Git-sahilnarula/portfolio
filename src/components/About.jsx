/**
 * About.jsx — Professional Summary, Honors & Social Profiles Section
 *
 * Features:
 * - Renders bio paragraphs, domain skill badges, and hackathon/leadership honors.
 * - Displays LinkedIn summary card with direct connect & resume links.
 * - Fetches live GitHub profile statistics (`followers`, `following`, `public_repos`)
 *   and embeds a live GitHub contribution chart in Dark Charcoal (#222222).
 */

import { useEffect, useState } from 'react';

export default function About({ about, personal, linkedinSync }) {
  const syncedHeadline = linkedinSync?.headline || personal.headline;

  // Default fallback stats used if GitHub API is offline or rate-limited
  const [githubProfile, setGithubProfile] = useState({
    avatar_url: `https://github.com/${personal.githubUsername}.png`,
    name: personal.name,
    bio: syncedHeadline,
    followers: 3,
    following: 3,
    public_repos: 3,
  });

  // Fetch live GitHub user profile metadata on mount
  useEffect(() => {
    fetch(`https://api.github.com/users/${personal.githubUsername}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setGithubProfile((prev) => ({
          avatar_url: data.avatar_url || prev.avatar_url,
          name: personal.name,
          bio: data.bio || syncedHeadline,
          followers: data.followers ?? prev.followers,
          following: data.following ?? prev.following,
          public_repos: data.public_repos ?? prev.public_repos,
        }));
      })
      .catch(() => {
        // Keep initial fallback state when offline
      });
  }, [personal.githubUsername, personal.name, syncedHeadline]);

  return (
    <section
      id="about"
      className="section py-20 bg-gray-100 dark:bg-slate-800/60 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">About Me</h2>
        <div className="w-20 h-1 bg-blue-600 dark:bg-blue-300 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Bio Paragraphs, Domain Badges & Leadership Honors */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">{about.heading}</h3>

            {about.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm md:text-base"
              >
                {paragraph}
              </p>
            ))}

            {/* Highlight Badges */}
            <div className="flex flex-wrap gap-2.5 mt-6 mb-8">
              {about.badges.map((badge) => (
                <span
                  key={badge.label}
                  className="px-4 py-1.5 rounded-full text-xs md:text-sm font-medium bg-slate-200/90 text-slate-800 dark:bg-slate-700 dark:text-slate-100 border border-slate-300 dark:border-slate-600"
                >
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Hackathons, Honors & Campus Leadership */}
            {about.leadershipAndHonors && (
              <div className="hover-card bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md p-5 border border-slate-200 dark:border-slate-700">
                <h4 className="text-base font-semibold mb-3 flex items-center">
                  <i className="fas fa-medal text-blue-600 dark:text-blue-300 mr-2"></i>
                  Honors, Hackathons & Leadership
                </h4>
                <div className="space-y-3">
                  {about.leadershipAndHonors.map((item) => (
                    <div key={item.title} className="flex items-start">
                      {item.logo ? (
                        <div className="w-6 h-6 rounded-md bg-white overflow-hidden shadow-sm ring-1 ring-black/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <img
                            src={item.logo}
                            alt={item.org}
                            className="w-full h-full object-contain p-0.5"
                          />
                        </div>
                      ) : (
                        <i
                          className={`${item.icon} mt-1 mr-3 w-4 text-center text-blue-600 dark:text-blue-300`}
                        ></i>
                      )}
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                            {item.title}
                          </p>
                          {item.period && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium">
                              {item.period}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.org}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: LinkedIn & GitHub Profile Cards */}
          <div className="animate-fade-in space-y-6">
            {/* LinkedIn Card */}
            <div className="hover-card bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <i className="fab fa-linkedin text-blue-600 dark:text-blue-300 mr-2 text-2xl"></i>
                  LinkedIn Profile
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono">
                  in/{personal.linkedinHandle}
                </span>
              </div>

              <div className="flex items-center mb-4">
                <img
                  src={personal.portraitImage || personal.heroImage}
                  alt={personal.name}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-slate-800 dark:border-slate-200 object-cover object-top"
                />
                <div>
                  <h4 className="font-semibold text-lg">{personal.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                    {syncedHeadline}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <i className="fas fa-university mr-1"></i> Chandigarh Group
                    of Colleges (CGC), Landran
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-slate-50 dark:bg-slate-100 dark:text-slate-900 text-sm font-medium rounded-lg hover:opacity-90 transition shadow-sm"
                >
                  <i className="fab fa-linkedin-in mr-2"></i> Connect on LinkedIn
                </a>
                <a
                  href={personal.resumeUrl}
                  download="Sahil_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition"
                >
                  <i className="fas fa-file-pdf mr-2"></i> View Resume
                </a>
              </div>
            </div>

            {/* GitHub Profile & Contribution Graph Card */}
            <div className="hover-card bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <i className="fab fa-github mr-2 text-2xl"></i>
                  GitHub Profile
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono">
                  @{personal.githubUsername}
                </span>
              </div>

              <div className="flex items-center mb-5">
                <img
                  src={githubProfile.avatar_url}
                  alt="GitHub Avatar"
                  className="w-14 h-14 rounded-full mr-4 border-2 border-slate-800 dark:border-slate-200 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{githubProfile.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm line-clamp-2">
                    {githubProfile.bio}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span>
                      <i className="fas fa-users mr-1"></i>
                      <strong>{githubProfile.followers}</strong> followers
                    </span>
                    <span>
                      <i className="fas fa-user-plus mr-1"></i>
                      <strong>{githubProfile.following}</strong> following
                    </span>
                    <span>
                      <i className="fas fa-code-branch mr-1"></i>
                      <strong>{githubProfile.public_repos}</strong> public repos
                    </span>
                  </div>
                </div>
              </div>

              {/* Live GitHub Contribution Calendar in Deep Teal (#0D5C63) */}
              <div className="mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 overflow-x-auto">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  GitHub Contribution Graph
                </p>
                <img
                  src={`https://ghchart.rshah.org/0D5C63/${personal.githubUsername}`}
                  alt={`${personal.githubUsername}'s GitHub Contributions`}
                  className="w-full min-w-[400px]"
                  loading="lazy"
                />
              </div>

              <a
                href={`https://github.com/${personal.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-300 hover:underline font-medium text-sm"
              >
                View full GitHub profile{' '}
                <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
