/**
 * App.jsx — Root Portfolio Component
 *
 * Responsibilities:
 * 1. Manages Light / Dark theme state persisted in localStorage.
 * 2. Loads skills & certifications from `/linkedin-profile.json` (and optional Netlify live sync).
 * 3. Appends newly discovered GitHub repository languages/topics into the skills directory.
 * 4. Renders all portfolio sections in order.
 */

import { useCallback, useEffect, useState } from 'react';
import { portfolioData } from './data/portfolioData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * Merges incoming items into a base array without case-insensitive duplicates on `field`.
 */
function mergeUniqueByField(baseList = [], incomingList = [], field = 'name') {
  if (!Array.isArray(incomingList) || incomingList.length === 0) return baseList;
  const merged = [...baseList];
  for (const item of incomingList) {
    const val = (item?.[field] || '').toLowerCase();
    if (val && !merged.some((existing) => (existing?.[field] || '').toLowerCase() === val)) {
      merged.unshift(item);
    }
  }
  return merged;
}

export default function App() {
  // Initialize theme (defaults to Soft Beige/Cream #f5f2eb with Dark Charcoal #222222 text)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('portfolio_theme_charcoal') === 'dark'
  );
  const [linkedinSync, setLinkedinSync] = useState(null);

  // Sync Tailwind's `dark` class on <html> and persist user preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('portfolio_theme_charcoal', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Fetch synced skills & certifications on mount
  useEffect(() => {
    let isMounted = true;

    async function loadSkillsAndCerts() {
      try {
        const localRes = await fetch(`/linkedin-profile.json?t=${Date.now()}`);
        const baseData = localRes.ok ? await localRes.json() : {};

        // Optional serverless live sync when deployed on Netlify
        try {
          const liveRes = await fetch('/.netlify/functions/linkedin-sync');
          if (liveRes.ok) {
            const liveData = await liveRes.json();
            baseData.linkedinSkills = mergeUniqueByField(
              baseData.linkedinSkills,
              liveData.linkedinSkills,
              'name'
            );
            baseData.linkedinCertifications = mergeUniqueByField(
              baseData.linkedinCertifications,
              liveData.linkedinCertifications,
              'title'
            );
          }
        } catch {
          // Offline or local Vite dev server: use /linkedin-profile.json directly
        }

        if (isMounted) setLinkedinSync(baseData);
      } catch (err) {
        console.warn('Portfolio sync fallback used:', err);
      }
    }

    loadSkillsAndCerts();
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Callback invoked by <Projects /> when live GitHub repositories are fetched.
   * Automatically adds any new repo languages/topics into the Skills Directory.
   */
  const handleRepoSkillsDiscovered = useCallback((discovered) => {
    setLinkedinSync((prev) => {
      if (!prev?.linkedinSkills) return prev;
      const updated = [...prev.linkedinSkills];
      let changed = false;

      for (const { name, repo } of discovered) {
        const clean = (name || '').trim();
        if (clean.length < 2) continue;

        const exists = updated.some(
          (s) =>
            s.name.toLowerCase().includes(clean.toLowerCase()) ||
            clean.toLowerCase().includes(s.name.toLowerCase())
        );

        if (!exists) {
          updated.push({
            name: clean,
            category: 'Web & Engineering',
            source: `Project: ${repo}`,
            verified: true,
            level: 84,
          });
          changed = true;
        }
      }

      return changed ? { ...prev, linkedinSkills: updated } : prev;
    });
  }, []);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        name={portfolioData.personal.name}
      />

      <main>
        <Hero personal={portfolioData.personal} />
        <About about={portfolioData.about} personal={portfolioData.personal} />
        <Skills skills={portfolioData.skills} linkedinSync={linkedinSync} />
        <Projects
          featuredProjects={portfolioData.featuredProjects}
          experienceAndAchievements={portfolioData.experienceAndAchievements}
          githubUsername={portfolioData.personal.githubUsername}
          onRepoSkillsDiscovered={handleRepoSkillsDiscovered}
        />
        <Education education={portfolioData.education} />
        <Certifications
          certifications={portfolioData.certifications}
          linkedinSync={linkedinSync}
          resumeUrl={portfolioData.personal.resumeUrl}
        />
        <Contact personal={portfolioData.personal} />
      </main>

      <Footer personal={portfolioData.personal} />
    </div>
  );
}
