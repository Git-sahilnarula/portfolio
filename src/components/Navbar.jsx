/**
 * Navbar.jsx — Responsive Fixed Top Navigation Bar
 *
 * Features:
 * - Smooth-scroll anchor links to each portfolio section.
 * - Light (#f5f2eb) / Dark (#222222) theme toggle button.
 * - Collapsible mobile drawer menu for smaller viewports.
 */

import { useState } from 'react';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ darkMode, toggleTheme, name }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const themeIcon = darkMode ? 'fa-sun text-amber-400' : 'fa-moon text-gray-800';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-50/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Brand Logo / Name */}
        <a
          href="#home"
          className="text-xl font-bold text-blue-600 dark:text-blue-300 tracking-tight"
        >
          {name}
        </a>

        {/* Desktop Links & Theme Switcher */}
        <div className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 font-medium transition"
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-full hover:bg-slate-200/70 dark:hover:bg-slate-700 transition"
          >
            <i className={`fas ${themeIcon} text-lg`}></i>
          </button>
        </div>

        {/* Mobile Controls (Theme Toggle + Hamburger Button) */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full hover:bg-slate-200/70 dark:hover:bg-slate-700"
          >
            <i className={`fas ${themeIcon}`}></i>
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Open Menu"
            className="p-2 rounded-md text-gray-800 dark:text-gray-200"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-50 dark:bg-slate-800 shadow-lg border-t border-slate-200 dark:border-slate-700 px-2 pt-2 pb-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-slate-200/60 dark:hover:bg-slate-700"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
