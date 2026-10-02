/**
 * Education.jsx — Academic Timeline Section
 *
 * Renders an alternating two-column vertical timeline on desktop (`md:`)
 * and a stacked card list on mobile viewports.
 */

export default function Education({ education }) {
  return (
    <section id="education" className="section py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Education</h2>
        <div className="w-20 h-1 bg-blue-600 dark:bg-blue-300 mx-auto mb-12"></div>

        <div className="relative">
          {/* Center vertical timeline divider (visible on desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-300 dark:bg-slate-700"></div>

          <div className="space-y-8 md:space-y-16">
            {education.map((item, idx) => {
              // Alternate left/right column alignment on odd-indexed entries
              const isReversed = idx % 2 === 1;

              return (
                <div key={item.degree} className="relative animate-fade-in">
                  <div className="md:flex items-center">
                    {/* Degree, Institution & Period Column */}
                    <div
                      className={`md:w-1/2 ${
                        isReversed
                          ? 'md:pl-12 md:order-last'
                          : 'md:pr-12 md:text-right'
                      }`}
                    >
                      <h3 className="text-xl font-semibold">{item.degree}</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {item.institution}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold mt-1">
                        {item.period}
                      </p>
                    </div>

                    {/* Timeline Node Dot */}
                    <div className="hidden md:flex justify-center md:w-1/12">
                      <div className="w-5 h-5 rounded-full bg-teal-600 dark:bg-teal-400 border-4 border-offwhite dark:border-charcoal ring-2 ring-copper/50 z-10 shadow"></div>
                    </div>

                    {/* Highlights Card Column */}
                    <div
                      className={`md:w-1/2 mt-4 md:mt-0 ${
                        isReversed ? 'md:pr-12 md:order-first' : 'md:pl-12'
                      }`}
                    >
                      <div className="hover-card bg-gray-50 dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                          {item.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
