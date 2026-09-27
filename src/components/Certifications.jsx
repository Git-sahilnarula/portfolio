/**
 * Certifications.jsx — Verified Certifications & Credentials Grid
 *
 * Merges synced LinkedIn certifications (`linkedinSync.linkedinCertifications`)
 * with local fallback certificates (`certifications`) without duplicates,
 * and provides direct links to PDF/image credentials and online verification URLs.
 */

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
                  <div className="p-3 bg-slate-200/80 dark:bg-slate-700 rounded-lg mr-4">
                    <i className="fas fa-certificate text-blue-600 dark:text-blue-300 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug">
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
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
