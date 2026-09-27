/**
 * Hero.jsx — Landing / Introduction Section
 *
 * Features:
 * - Animated typewriter effect cycling through `personal.roles`.
 * - Primary CTAs (View Projects, Download Resume PDF, Contact Me) and social links.
 * - Circular head-and-shoulders portrait (`personal.heroImage`).
 */

import { useEffect, useState } from 'react';

export default function Hero({ personal }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter animation loop for cycling through roles
  useEffect(() => {
    const roles = personal.roles || ['BCA Student'];
    const currentRole = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 40 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        // Pause at full word before deleting
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && displayedText === '') {
        // Move to next role once cleared
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        // Step character forward or backward
        const nextLength = displayedText.length + (isDeleting ? -1 : 1);
        setDisplayedText(currentRole.substring(0, nextLength));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, personal.roles]);

  return (
    <section id="home" className="section min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Headline, Typewriter, Tagline, CTAs & Socials */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-xs font-semibold bg-slate-200/80 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-slate-800 dark:bg-slate-200 mr-2 animate-ping"></span>
              CGC Landran • Final-Year BCA (8.09 CGPA)
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-slate-800 dark:text-slate-100">
              Hi, I'm{' '}
              <span className="inline-block px-3 py-0.5 rounded-lg bg-blue-600 text-slate-50 dark:bg-slate-100 dark:text-slate-900 shadow-sm">
                {personal.name}
              </span>
            </h1>

            <div className="text-2xl md:text-3xl font-semibold mb-6 text-gray-600 dark:text-gray-300 min-h-[2.25rem]">
              <span>{displayedText}</span>
              <span className="animate-pulse ml-0.5">|</span>
            </div>

            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
              {personal.tagline}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-blue-600 text-slate-50 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:opacity-90 transition shadow-md font-medium"
              >
                View Projects
              </a>
              <a
                href={personal.resumeUrl}
                download="Sahil_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-slate-700 text-slate-50 dark:bg-slate-700 dark:text-slate-100 rounded-lg hover:opacity-90 transition shadow-md font-medium inline-flex items-center"
              >
                <i className="fas fa-download mr-2"></i> Resume
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-slate-800 text-slate-800 dark:border-slate-300 dark:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition font-medium"
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
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition text-2xl"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Circular Profile Photo */}
          <div className="animate-fade-in flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-slate-300 dark:bg-slate-700 blur-md opacity-70"></div>
              <img
                src={personal.heroImage}
                alt={personal.name}
                className="relative z-10 w-full h-full rounded-full object-cover object-top border-4 border-slate-800 dark:border-slate-200 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
