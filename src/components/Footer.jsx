/**
 * Footer.jsx — Site Footer Component
 *
 * Displays dynamic copyright year and technology credits in Dark Charcoal (#222222).
 */

export default function Footer({ personal }) {
  return (
    <footer className="bg-charcoal text-offwhite py-8 border-t border-slate-700/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
        <p className="text-sm mt-2 text-slate-300">
          Built with{' '}
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-teal-300 transition-colors"
          >
            React
          </a>
          ,{' '}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-teal-300 transition-colors"
          >
            Tailwind CSS
          </a>{' '}
          and{' '}
          <a
            href="https://fontawesome.com/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-teal-300 transition-colors"
          >
            Font Awesome
          </a>
          . Portfolio by{' '}
          <a
            href={`https://github.com/${personal.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-teal-300 transition-colors"
          >
            {personal.name}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
