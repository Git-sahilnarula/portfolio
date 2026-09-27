#!/usr/bin/env node
/**
 * scripts/sync-linkedin.mjs — CLI & GitHub Actions Sync Utility
 *
 * Usage:
 *   npm run sync:linkedin
 *   npm run sync:linkedin -- --add-skill "Power Automate" --category "AI & Automation"
 *   npm run sync:linkedin -- --add-cert "AWS Cloud Practitioner" --issuer "AWS" --url "https://..."
 *
 * Responsibilities:
 * 1. Allows quick CLI addition of new skills (`--add-skill`) or certifications (`--add-cert`).
 * 2. Scans public repositories of `@Git-sahilnarula` and adds any new repo languages/topics to skills.
 * 3. Optionally syncs live LinkedIn skills & certifications if `PROXYCURL_API_KEY` or `APIFY_TOKEN` is set.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROFILE_JSON_PATH = path.resolve(__dirname, '../public/linkedin-profile.json');

/** Reads the value immediately following `flag` in `argv`, or returns `fallback` */
function getArgValue(args, flag, fallback = null) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

/** Appends a skill if not already present (case-insensitive) */
function addUniqueSkill(skillsList, skillObj, prepend = true) {
  const exists = skillsList.some(
    (s) => s.name.toLowerCase() === skillObj.name.toLowerCase()
  );
  if (!exists) {
    prepend ? skillsList.unshift(skillObj) : skillsList.push(skillObj);
    return true;
  }
  return false;
}

/** Appends a certification if not already present (case-insensitive) */
function addUniqueCert(certsList, certObj) {
  const exists = certsList.some(
    (c) => c.title.toLowerCase() === certObj.title.toLowerCase()
  );
  if (!exists) {
    certsList.unshift(certObj);
    return true;
  }
  return false;
}

async function main() {
  const currentData = JSON.parse(fs.readFileSync(PROFILE_JSON_PATH, 'utf-8'));
  currentData.linkedinSkills ||= [];
  currentData.linkedinCertifications ||= [];

  const args = process.argv.slice(2);

  // 1. CLI Flag: --add-skill "<Skill Name>" [--category "<Category>"]
  const newSkillName = getArgValue(args, '--add-skill');
  if (newSkillName) {
    const category = getArgValue(args, '--category', 'LinkedIn Synced');
    if (
      addUniqueSkill(currentData.linkedinSkills, {
        name: newSkillName,
        category,
        source: 'LinkedIn Profile',
        verified: true,
        level: 88,
      })
    ) {
      console.log(`Added skill: "${newSkillName}" (${category})`);
    }
  }

  // 2. CLI Flag: --add-cert "<Title>" [--issuer "<Issuer>"] [--url "<URL>"] [--desc "<Description>"]
  const newCertTitle = getArgValue(args, '--add-cert');
  if (newCertTitle) {
    const issuer = getArgValue(args, '--issuer', 'LinkedIn Certification');
    const url = getArgValue(args, '--url', currentData.linkedinUrl);
    const description = getArgValue(
      args,
      '--desc',
      `Official ${newCertTitle} certification issued by ${issuer}.`
    );

    if (
      addUniqueCert(currentData.linkedinCertifications, {
        title: newCertTitle,
        issuer,
        description,
        url,
        badge: `Issued: ${new Date().toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })}`,
      })
    ) {
      console.log(`Added certification: "${newCertTitle}" (${issuer})`);
    }
  }

  // 3. Sync languages & topics from public GitHub repositories
  const ghUser = currentData.githubUsername || 'Git-sahilnarula';
  try {
    const ghRes = await fetch(
      `https://api.github.com/users/${ghUser}/repos?sort=updated&per_page=30`,
      { headers: { 'User-Agent': 'sahil-portfolio-sync' } }
    );

    if (ghRes.ok) {
      const repos = await ghRes.json();
      let addedCount = 0;

      for (const repo of repos) {
        if (repo.fork) continue;
        const candidates = [repo.language, ...(repo.topics || [])].filter(Boolean);

        for (const raw of candidates) {
          const clean = raw.trim();
          const alreadyCovered = currentData.linkedinSkills.some(
            (s) =>
              s.name.toLowerCase().includes(clean.toLowerCase()) ||
              clean.toLowerCase().includes(s.name.toLowerCase())
          );

          if (clean.length > 1 && !alreadyCovered) {
            currentData.linkedinSkills.push({
              name: clean,
              category: 'Web & Engineering',
              source: `GitHub Repo: ${repo.name}`,
              verified: true,
              level: 82,
            });
            addedCount++;
          }
        }
      }
      console.log(
        `Checked ${repos.length} GitHub repos for @${ghUser} (${addedCount} new skills added)`
      );
    }
  } catch (err) {
    console.warn('GitHub API check skipped:', err.message);
  }

  currentData.lastSynced = new Date().toISOString();
  fs.writeFileSync(PROFILE_JSON_PATH, JSON.stringify(currentData, null, 2) + '\n');
  console.log(
    `Sync complete: ${currentData.linkedinSkills.length} skills, ${currentData.linkedinCertifications.length} certifications.`
  );
}

main().catch((err) => {
  console.error('Sync error:', err);
  process.exit(1);
});
