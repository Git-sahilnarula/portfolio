/**
 * Certifications.jsx — Verified Certifications & Credentials Grid
 *
 * Features:
 * 1. Deduplicates synced LinkedIn certifications (`linkedinSync.linkedinCertifications`)
 *    with static fallback certificates (`certifications`).
 * 2. Displays the original organization logos (`/logos/*`) formatted as uniform
 *    iOS/macOS-style App Icons (`w-12 h-12 rounded-[14px] shadow-md`).
 * 3. Automatically resolves app icons via `unavatar.io` for any future LinkedIn-synced
 *    certifications (Coursera, Google, Microsoft, AWS, Udemy, Meta, IBM, etc.).
 */

const ISSUER_APP_ICONS = [
  { match: 'linkedin', src: '/logos/linkedin.svg', fullBleed: true },
  { match: 'deloitte', src: '/logos/deloitte.png', fullBleed: false },
  { match: 'n8n', src: '/logos/n8n.png', fullBleed: false },
  { match: 'sortiq', src: '/logos/sortiq.png', fullBleed: false },
  { match: 'oneroadmap', src: '/logos/oneroadmap.png', fullBleed: true },
  { match: 'lernx', src: '/logos/lernx.png', fullBleed: true },
  { match: 'uniathena', src: '/logos/uniathena.png', fullBleed: true },
  { match: 'cambridge', src: '/logos/uniathena.png', fullBleed: true },
  { match: 'be10x', src: '/logos/be10x.png', fullBleed: false },
];

const EXTERNAL_DOMAIN_FALLBACKS = {
  google: 'google.com',
  microsoft: 'microsoft.com',
  aws: 'aws.amazon.com',
  amazon: 'aws.amazon.com',
  coursera: 'coursera.org',
  udemy: 'udemy.com',
  meta: 'meta.com',
  ibm: 'ibm.com',
  forage: 'theforage.com',
};

/**
 * Renders the issuing organization's original logo fitted inside an App Icon squircle.
 */
function IssuerAppIcon({ issuer = '', logoUrl }) {
  const lower = issuer.toLowerCase();
  const localIcon = ISSUER_APP_ICONS.find((item) => lower.includes(item.match));

  // Resolve external domain fallback for newly synced LinkedIn certifications
  const matchedExternalKey = Object.keys(EXTERNAL_DOMAIN_FALLBACKS).find((k) =>
    lower.includes(k)
  );
  const resolvedSrc =
    logoUrl ||
    localIcon?.src ||
    (matchedExternalKey
      ? `https://unavatar.io/${EXTERNAL_DOMAIN_FALLBACKS[matchedExternalKey]}`
      : null);

  if (resolvedSrc) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-[14px] bg-white overflow-hidden shadow-md ring-1 ring-black/10 dark:ring-white/15 flex items-center justify-center flex-shrink-0 mr-4"
      >
        <img
          src={resolvedSrc}
          alt={issuer}
          loading="lazy"
          className={
            localIcon?.fullBleed
              ? 'w-full h-full object-cover'
              : 'w-full h-full object-contain p-1.5'
          }
        />
      </div>
    );
  }

  // Fallback app icon if an unknown issuer has no logo URL
  return (
    <div className="w-12 h-12 rounded-[14px] bg-slate-200 dark:bg-slate-700 shadow-md ring-1 ring-black/10 flex items-center justify-center flex-shrink-0 mr-4">
      <i className="fas fa-certificate text-blue-600 dark:text-blue-300 text-xl"></i>
    </div>
  );
}

export default function Certifications({
  certifications,
  linkedinSync,
  resumeUrl,
}) {
  // Deduplicate synced certifications with static portfolioData certifications
  const syncedCerts = linkedinSync?.linkedinCertifications || [];
  const mergedCerts = [...syncedCerts];

  for (const cert of certifications) {
    const exists = mergedCerts.some(
      (c) => c.title.toLowerCase() === cert.title.toLowerCase()
    );
    if (!exists) mergedCerts.push(cert);
  }

  return (
    <section
      id="certifications"
      className="section py-20 bg-gray-100 dark:bg-slate-800/60 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          My Certifications
        </h2>
        <div className="w-20 h-1 bg-blue-600 dark:bg-blue-300 mx-auto mb-12"></div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mergedCerts.map((cert) => (
            <div
              key={cert.title}
              className="hover-card group bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col justify-between p-6 animate-fade-in"
            >
              <div>
                <div className="flex items-center mb-4">
                  {/* Original Organization Logo fitted as an App Icon */}
                  <IssuerAppIcon issuer={cert.issuer} logoUrl={cert.logoUrl} />

                  <div>
                    <h3 className="text-lg font-semibold leading-snug">
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                        {cert.issuer}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Certificate Action Links & Issue Date Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <a
                    href={encodeURI(cert.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-300 hover:underline text-sm font-medium"
                  >
                    View Certificate{' '}
                    <i className="fas fa-external-link-alt ml-1.5 text-xs"></i>
                  </a>

                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:underline text-xs font-medium"
                    >
                      Verify Online
                    </a>
                  )}
                </div>

                {cert.badge && (
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {cert.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resume Download CTA */}
        <div className="text-center mt-12">
          <a
            href={resumeUrl}
            download="Sahil_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-offwhite rounded-lg transition shadow-md font-medium"
          >
            <i className="fas fa-download mr-2"></i> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
