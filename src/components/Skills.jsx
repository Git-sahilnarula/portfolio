/**
 * Skills.jsx — Core Competencies & Interactive Skills Directory
 *
 * Features:
 * 1. Top 3 summary cards: Data Analytics progress bars, AI/Full-Stack progress bars,
 *    and Core CS / Leadership bullet points (rendered DRY without duplicate markup).
 * 2. Compact Skills Directory with a Category Filter Dropdown (<select>),
 *    Show/Hide toggle, and a fixed-height Scroll-Wheel container (`max-h-56 overflow-y-auto`)
 *    so 35+ skills stay organized without taking up vertical page space.
 */

import { useState } from 'react';

export default function Skills({ skills, linkedinSync }) {
  const allSkills = linkedinSync?.linkedinSkills || [];

  // Build unique category list for the dropdown filter
  const categories = [
    'All Categories',
    ...new Set(allSkills.map((s) => s.category)),
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isExpanded, setIsExpanded] = useState(true);

  // Filter skills based on selected dropdown option
  const filteredSkills =
    selectedCategory === 'All Categories'
      ? allSkills
      : allSkills.filter((s) => s.category === selectedCategory);

  // Group the two progress-bar skill categories to avoid repeating card JSX
  const progressGroups = [skills.technical, skills.frameworks];

  return (
    <section id="skills" className="section py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">My Skills</h2>
        <div className="w-20 h-1 bg-blue-600 dark:bg-blue-300 mx-auto mb-12"></div>

        {/* Top 3 Core Skill Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 & 2: Technical Data Skills + AI/Full-Stack Skills */}
          {progressGroups.map((group) => (
            <div
              key={group.title}
              className="hover-card animate-fade-in bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center mb-5">
                <div className="p-3 bg-slate-200/80 dark:bg-slate-700 rounded-lg mr-4">
                  <i
                    className={`${group.icon} text-blue-600 dark:text-blue-300 text-xl`}
                  ></i>
                </div>
                <h3 className="text-xl font-semibold">{group.title}</h3>
              </div>

              <div className="space-y-4">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="skill-bar h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Card 3: Core CS, Interpersonal & Leadership Bullets */}
          <div className="hover-card animate-fade-in bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-5">
                <div className="p-3 bg-slate-200/80 dark:bg-slate-700 rounded-lg mr-4">
                  <i
                    className={`${skills.problemSolving.icon} text-blue-600 dark:text-blue-300 text-xl`}
                  ></i>
                </div>
                <h3 className="text-xl font-semibold">
                  {skills.problemSolving.title}
                </h3>
              </div>

              <div className="space-y-3">
                {skills.problemSolving.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-300 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <a
                href={skills.problemSolving.ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-300 hover:underline font-medium text-sm"
              >
                {skills.problemSolving.ctaText}{' '}
                <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Compact Category Dropdown + Scroll-Wheel Skills Directory */}
        {allSkills.length > 0 && (
          <div className="hover-card mt-10 bg-gray-50 dark:bg-slate-800 rounded-2xl shadow-md p-5 md:p-6 border border-slate-200 dark:border-slate-700 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-200/80 dark:bg-slate-700 rounded-lg">
                  <i className="fas fa-layer-group text-blue-600 dark:text-blue-300"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Complete Skills Directory ({filteredSkills.length})
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Use the dropdown or scroll wheel to browse all skills
                  </p>
                </div>
              </div>

              {/* Filter Controls: Category Select + Expand/Collapse Button */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setIsExpanded(true);
                    }}
                    aria-label="Filter skills by category"
                    className="appearance-none pl-3.5 pr-9 py-2 rounded-lg text-xs md:text-sm font-medium bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                  >
                    {categories.map((cat) => {
                      const count =
                        cat === 'All Categories'
                          ? allSkills.length
                          : allSkills.filter((s) => s.category === cat).length;
                      return (
                        <option key={cat} value={cat}>
                          {cat} ({count})
                        </option>
                      );
                    })}
                  </select>
                  <i className="fas fa-chevron-down text-xs text-gray-600 dark:text-gray-300 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-teal-600 hover:bg-teal-700 text-offwhite transition inline-flex items-center gap-1.5"
                >
                  <span>{isExpanded ? 'Hide' : 'Show'}</span>
                  <i
                    className={`fas fa-chevron-${
                      isExpanded ? 'up' : 'down'
                    } text-[10px]`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Fixed-Height Scrollable Skills Wheel */}
            {isExpanded && (
              <div className="mt-5 max-h-56 overflow-y-auto pr-2 skills-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-800 dark:hover:border-slate-300 transition-all duration-200 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs md:text-sm text-gray-800 dark:text-gray-100">
                          {skill.name}
                        </span>
                        {skill.verified && (
                          <i
                            className="fas fa-check-circle text-blue-600 dark:text-blue-300 text-xs"
                            title="Verified Credential"
                          ></i>
                        )}
                      </div>
                      {skill.source && (
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                          {skill.source}
                        </p>
                      )}
                    </div>

                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {skill.level || 88}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
