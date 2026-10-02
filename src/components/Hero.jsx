/**
 * Hero.jsx — Landing / Introduction Section
 *
 * Features:
 * - Syncs headline directly from LinkedIn (`linkedinSync.headline || personal.headline`).
 * - Automatically splits pipe-separated (`|`) LinkedIn headline segments into the
 *   animated typewriter headlines so changes on LinkedIn automatically update the Hero.
 * - Primary CTAs (View Projects, Download Resume PDF, Contact Me) and social links.
 * - Circular head-and-shoulders portrait (`personal.heroImage`).
 */

import { useEffect, useMemo, useState } from 'react';

export default function Hero({ personal, linkedinSync }) {
  // Active LinkedIn headline (synced from LinkedIn JSON / serverless endpoint or fallback)
  const syncedHeadline = linkedinSync?.headline || personal.headline;

  // Derive typewriter headline segments directly from the synced LinkedIn headline
  const headlineSegments = useMemo(() => {
    if (syncedHeadline) {
      const parts = syncedHeadline
        .split('|')
        .map((part) => part.trim())
        .filter(Boolean);
      if (parts.length > 0) return parts;
    }
    return personal.roles || ['BCA Student'];
  }, [syncedHeadline, personal.roles]);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter animation loop cycling through LinkedIn headline segments
  useEffect(() => {
    const currentSegment = headlineSegments[roleIndex % headlineSegments.length];
    const typingSpeed = isDeleting ? 35 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentSegment) {
        // Pause at full headline segment before deleting
        setTimeout(() => setIsDeleting(true), 1400);
      } else if (isDeleting && displayedText === '') {
        // Advance to the next LinkedIn headline segment
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % headlineSegments.length);
      } else {
        // Step character forward or backward
        const nextLength = displayedText.length + (isDeleting ? -1 : 1);
        setDisplayedText(currentSegment.substring(0, nextLength));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, headlineSegments]);

  return (
    <section id="home" className="section min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Highlighted Name, Synced LinkedIn Headlines, Tagline & CTAs */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-xs font-semibold bg-slate-200/80 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-copper mr-2 animate-ping"></span>
              {headlineSegments[0]}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-slate-800 dark:text-slate-100">
              Hi, I'm{' '}
              <span className="inline-block px-3 py-0.5 rounded-lg bg-teal-600 text-offwhite shadow-sm">
                {personal.name}
              </span>
            </h1>

            {/* Typewriter cycling through each segment of the LinkedIn Headline */}
            <div className="text-xl md:text-2xl font-semibold mb-3 text-gray-700 dark:text-gray-200 min-h-[2.25rem]">
              <span>{displayedText}</span>
              <span className="animate-pulse ml-0.5">|</span>
            </div>

            {/* Full Synced LinkedIn Headline Bar */}
            <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
              {syncedHeadline}
            </p>

            <p className="text-base md:text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
              {personal.tagline}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-offwhite rounded-lg transition shadow-md font-medium"
              >
                View Projects
              </a>
              <a
                href={personal.resumeUrl}
                download="Sahil_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-charcoal text-offwhite hover:bg-charcoal/85 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border dark:border-slate-700 rounded-lg transition shadow-md font-medium inline-flex items-center"
              >
                <i className="fas fa-download mr-2"></i> Resume
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-charcoal/80 text-charcoal dark:border-beige/80 dark:text-offwhite rounded-lg hover:bg-beige/40 dark:hover:bg-charcoal/60 transition font-medium"
              >
                Contact Me
              </a>
            </div>

            {/* Social Profile Icons */}
            <div className="mt-8 flex space-x-5">
              {personal.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-300 transition text-2xl"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Circular Profile Photo with Deep Teal Accent Ring */}
          <div className="animate-fade-in flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-teal-600/25 dark:bg-teal-400/20 blur-lg opacity-80 animate-pulse"></div>
              <img
                src={personal.heroImage}
                alt={personal.name}
                className="relative z-10 w-full h-full rounded-full object-cover object-top border-4 border-teal-600 dark:border-teal-400 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
