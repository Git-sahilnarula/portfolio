/**
 * netlify/functions/linkedin-sync.js — Serverless LinkedIn Skills & Certifications Sync
 *
 * Endpoint: `/.netlify/functions/linkedin-sync`
 *
 * Automatically fetches Sahil's latest LinkedIn skills and certifications when
 * either `PROXYCURL_API_KEY` or `APIFY_TOKEN` is configured in Netlify environment variables.
 * Note: Profile photos are intentionally NOT overwritten so the crisp local portrait is preserved.
 */

const LINKEDIN_HANDLE = 'sahilnarula06skn';
const LINKEDIN_URL = `https://www.linkedin.com/in/${LINKEDIN_HANDLE}/`;

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Cache-Control': 'public, max-age=180',
};

/** Maps raw skill strings or objects into the portfolio's standard skill format */
function normalizeSkills(rawSkills) {
  if (!Array.isArray(rawSkills)) return null;
  return rawSkills
    .map((s) => (typeof s === 'string' ? s : s?.title || s?.name))
    .filter(Boolean)
    .map((name) => ({
      name,
      category: 'LinkedIn Synced',
      source: 'LinkedIn Profile',
      verified: true,
      level: 88,
    }));
}

/** Maps raw certification objects into the portfolio's standard certification format */
function normalizeCerts(rawCerts) {
  if (!Array.isArray(rawCerts)) return null;
  return rawCerts.map((c) => {
    const issuer =
      c.authority || c.issuer || c.companyName || 'LinkedIn Verified';
    const license = c.license_number || c.credentialId;

    return {
      title: c.name || c.title || 'LinkedIn Certification',
      issuer,
      description:
        c.description ||
        (license
          ? `Verified Credential (ID: ${license}) issued by ${issuer}.`
          : `Official certification issued by ${issuer}.`),
      url: c.url || c.credentialUrl || LINKEDIN_URL,
      badge:
        c.issueDate ||
        c.timePeriod ||
        (c.starts_at?.year ? `Issued: ${c.starts_at.year}` : 'Verified'),
    };
  });
}

export async function handler() {
  try {
    // Option 1: Proxycurl LinkedIn API
    if (process.env.PROXYCURL_API_KEY) {
      const res = await fetch(
        `https://nubela.co/proxycurl/api/v2/linkedin?url=${encodeURIComponent(
          LINKEDIN_URL
        )}&skills=include`,
        {
          headers: { Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify({
            source: 'proxycurl-live',
            lastSynced: new Date().toISOString(),
            headline: data.headline || null,
            linkedinSkills: normalizeSkills(data.skills),
            linkedinCertifications: normalizeCerts(data.certifications),
          }),
        };
      }
    }

    // Option 2: Apify LinkedIn Profile Scraper
    if (process.env.APIFY_TOKEN) {
      const res = await fetch(
        `https://api.apify.com/v2/acts/dev_fusion~linkedin-profile-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileUrls: [LINKEDIN_URL] }),
        }
      );

      if (res.ok) {
        const [profile] = await res.json();
        if (profile) {
          const certsRaw =
            profile.licenseAndCertificates ||
            profile.certifications ||
            profile.certificates;

          return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({
              source: 'apify-live',
              lastSynced: new Date().toISOString(),
              headline: profile.headline || null,
              linkedinSkills: normalizeSkills(profile.skills),
              linkedinCertifications: normalizeCerts(certsRaw),
            }),
          };
        }
      }
    }

    // Default fallback: client uses `/linkedin-profile.json`
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        source: 'local-json',
        lastSynced: new Date().toISOString(),
      }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ source: 'fallback', error: error.message }),
    };
  }
}
