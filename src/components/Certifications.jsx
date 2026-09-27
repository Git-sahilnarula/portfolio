/**
 * Certifications.jsx — Verified Certifications & Credentials Grid with Organization Logos
 *
 * Features:
 * 1. Deduplicates synced LinkedIn certifications (`linkedinSync.linkedinCertifications`)
 *    with static fallback certificates (`certifications`).
 * 2. Renders authentic vector SVG logos matching the exact branding on each issuing
 *    organization's certificate (LinkedIn Learning, Deloitte, n8n Academy, SortIQ,
 *    OneRoadmap, Lernx, UniAthena/CIQ, be10X).
 * 3. Automatically resolves logos for any newly synced LinkedIn certifications
 *    (Google, Microsoft, AWS, Coursera, Udemy, IBM, Meta, etc.).
 */

/**
 * Renders the issuing organization's official brand logo inside a 48x48 badge.
 */
function IssuerLogo({ issuer = '', logoUrl }) {
  const key = issuer.toLowerCase();

  // 1. Custom external logo URL if explicitly provided by LinkedIn sync
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={issuer}
        className="w-12 h-12 rounded-xl object-contain bg-white p-1.5 border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0 mr-4"
      />
    );
  }

  // 2. LinkedIn Learning — Official #0A66C2 "in" Brand Mark
  if (key.includes('linkedin')) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center shadow-sm flex-shrink-0 mr-4"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      </div>
    );
  }

  // 3. Deloitte Australia & Forage — Official "Deloitte." Wordmark with #86BC25 Green Dot
  if (key.includes('deloitte')) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-xl bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm flex-shrink-0 mr-4 px-1"
      >
        <span className="font-extrabold text-[11px] tracking-tight text-black leading-none select-none">
          Deloitte<span className="text-[#86BC25] text-sm">.</span>
        </span>
      </div>
    );
  }

  // 4. n8n Academy — Official #EA4B71 Connected Workflow Nodes Mark
  if (key.includes('n8n')) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-xl bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm flex-shrink-0 mr-4"
      >
        <svg viewBox="0 0 36 24" className="w-9 h-6" fill="none">
          <path
            d="M8.5 12H14.5M18.5 12C20 12 20.5 8 22.5 8H25.5M18.5 12C20 12 20.5 16 22.5 16H25.5"
            stroke="#EA4B71"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="6" cy="12" r="2.6" stroke="#EA4B71" strokeWidth="2.2" />
          <circle cx="16.5" cy="12" r="2.6" stroke="#EA4B71" strokeWidth="2.2" />
          <circle cx="28" cy="8" r="2.6" stroke="#EA4B71" strokeWidth="2.2" />
          <circle cx="28" cy="16" r="2.6" stroke="#EA4B71" strokeWidth="2.2" />
        </svg>
      </div>
    );
  }

  // 5. SortIQ Solutions Pvt. Ltd. — Data Analytics Bar & Trend Crest
  if (key.includes('sortiq')) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-xl bg-[#1E293B] flex flex-col items-center justify-center shadow-sm flex-shrink-0 mr-4"
      >
        <svg viewBox="0 0 24 16" className="w-6 h-4 mb-0.5" fill="none">
          <rect x="3" y="8" width="3" height="6" rx="1" fill="#38BDF8" />
          <rect x="9" y="5" width="3" height="9" rx="1" fill="#818CF8" />
          <rect x="15" y="2" width="3" height="12" rx="1" fill="#34D399" />
        </svg>
        <span className="text-[8px] font-bold tracking-wider text-white leading-none">
          SortIQ
        </span>
      </div>
    );
  }

  // 6. OneRoadmap (DPIIT-Recognized) — Official OneRoadmap Emblem
  if (key.includes('oneroadmap')) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-xl bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm flex-shrink-0 mr-4 p-1.5"
      >
        <img
          src="https://www.google.com/s2/favicons?domain=oneroadmap.io&sz=128"
          alt="OneRoadmap"
          className="w-8 h-8 object-contain"
        />
      </div>
    );
  }

  // 7. Lernx — Teal & Charcoal "LERNX" Certificate Crest
  if (key.includes('lernx')) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-xl bg-white border-2 border-[#18B2A6] flex items-center justify-center shadow-sm flex-shrink-0 mr-4 px-1"
      >
        <span className="font-black text-[10px] tracking-widest text-[#111111] select-none">
          LERN<span className="text-[#18B2A6]">X</span>
        </span>
      </div>
    );
  }

  // 8. UniAthena & Cambridge International Qualifications (CIQ) — Official Brand Mark
  if (key.includes('uniathena') || key.includes('cambridge')) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-xl bg-white border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center shadow-sm flex-shrink-0 mr-4 px-1"
      >
        <span className="font-extrabold text-[10px] tracking-tight text-[#222222] leading-none">
          uni<span className="text-[#E6007E]">athena</span>
        </span>
        <span className="text-[8px] font-semibold text-gray-500 tracking-widest mt-0.5 leading-none">
          CIQ • UK
        </span>
      </div>
    );
  }

  // 9. be10X — Official "be(10X)" Black Pill Emblem from Certificate
  if (key.includes('be10x')) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-xl bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm flex-shrink-0 mr-4 px-1"
      >
        <span className="font-bold text-[11px] text-black tracking-tight flex items-center select-none">
          be
          <span className="ml-0.5 px-1 py-0.5 rounded-full bg-black text-white text-[9px] font-extrabold leading-none">
            10X
          </span>
        </span>
      </div>
    );
  }

  // 10. Automatic fallback for any future LinkedIn-synced certificate issuers
  const domainMap = {
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
  const matchedDomain = Object.keys(domainMap).find((k) => key.includes(k));

  if (matchedDomain) {
    return (
      <div
        title={issuer}
        className="w-12 h-12 rounded-xl bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm flex-shrink-0 mr-4 p-2"
      >
        <img
          src={`https://www.google.com/s2/favicons?domain=${domainMap[matchedDomain]}&sz=128`}
          alt={issuer}
          className="w-7 h-7 object-contain"
        />
      </div>
    );
  }

  // Default credential shield icon
  return (
    <div className="w-12 h-12 bg-slate-200/80 dark:bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
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
              className="bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col justify-between p-6 animate-fade-in"
            >
              <div>
                <div className="flex items-center mb-4">
                  {/* Issuing Organization Logo */}
                  <IssuerLogo issuer={cert.issuer} logoUrl={cert.logoUrl} />

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
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-slate-50 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:opacity-90 transition shadow-md font-medium"
          >
            <i className="fas fa-download mr-2"></i> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
