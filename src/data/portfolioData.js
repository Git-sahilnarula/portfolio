/**
 * portfolioData.js — Central Data Configuration
 *
 * Single source of truth for Sahil's portfolio content:
 * - personal: Contact details, social links, resume path, and local profile photos.
 * - about: Bio paragraphs, highlight badges, and hackathon/leadership honors.
 * - skills: Core skill progress bars and leadership/CS bullet points.
 * - featuredProjects: Highlighted projects (merged with live GitHub repos at runtime).
 * - experienceAndAchievements: Industrial training and virtual experience programs.
 * - education: Academic timeline items.
 * - certifications: Verified certificates and local PDF/image paths.
 */

export const portfolioData = {
  // ========================================================================
  // 1. Personal Profile & Contact Info
  // ========================================================================
  personal: {
    name: 'Sahil',
    headline:
      'Final-Year BCA Student @ CGC Landran (8.09 CGPA) | Data Analytics (Python, SQL, Power BI) | AI Automation & Full-Stack Builder (FastAPI, React, n8n)',
    roles: [
      'Final-Year BCA Student (8.09 CGPA)',
      'Data & Power BI Analyst',
      'AI & n8n Automation Builder',
      'Full-Stack Developer (FastAPI & React)',
      'SIH 2025 (4th Rank Holder)',
    ],
    tagline:
      'Detail-oriented Final-Year BCA undergraduate at Chandigarh Group of Colleges (CGC), Landran (8.09 CGPA). Certified in Generative AI (LinkedIn Learning), n8n Workflows, and Deloitte Data Analytics, building end-to-end data pipelines, Power BI dashboards, and human-in-the-loop AI agent systems.',
    heroImage: '/sahil_passport.jpg',
    portraitImage: '/sahil_portrait.jpg',
    resumeUrl: '/Sahil_Narula_Resume.pdf',
    email: 'sahilnarula076@gmail.com',
    phone: '+91 7056737762',
    phoneHref: 'tel:+917056737762',
    location: 'Preet Nagar St. No. 4, Sirsa, Haryana - 125055 / Mohali, Punjab',
    githubUsername: 'Git-sahilnarula',
    linkedinUrl: 'https://www.linkedin.com/in/sahilnarula06skn/',
    linkedinHandle: 'sahilnarula06skn',
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/sahilnarula06skn/',
        icon: 'fab fa-linkedin-in',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/Git-sahilnarula',
        icon: 'fab fa-github',
      },
      {
        name: 'Twitter / X',
        url: 'https://x.com/sahilnarula076',
        icon: 'fab fa-twitter',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/sahil_narula___?igsh=MWVnaXpsMjF3MDFmaA==',
        icon: 'fab fa-instagram',
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.com/u/chufxyx/',
        icon: 'fas fa-code',
      },
    ],
  },

  // ========================================================================
  // 2. About Section & Leadership Highlights
  // ========================================================================
  about: {
    heading: 'Professional Summary',
    paragraphs: [
      "I'm Sahil, a detail-oriented and analytical Final-Year Bachelor of Computer Applications (BCA) undergraduate at Chandigarh Group of Colleges (CGC), Landran, Mohali (8.09 CGPA).",
      'Certified in Generative AI (LinkedIn Learning) and N8N101 Essentials (n8n Academy), and equipped with industry experience as a Data Analyst Trainee at SortIQ Solutions Pvt. Ltd. and Virtual Experience Trainee at Deloitte Australia (Forage), I specialize in manipulating complex datasets using Python (Pandas, NumPy, Seaborn), SQL (SQLite, PostgreSQL, MySQL), and MS Excel, and crafting executive visual stories with Power BI.',
      'On the engineering side, I build full-stack and agentic AI systems—such as Outreach IQ (FastAPI + React + TypeScript + Ollama + n8n Webhooks) and KAIROS (12-workflow n8n + PostgreSQL/pgvector RAG decision engine). I also participated in and secured 4th Rank in the Smart India Hackathon (SIH) 2025 Internal Round at CCT Mohali and serve as the Research & Innovation Lead at the Tech Titans Club.',
    ],
    badges: [
      { label: 'Python • SQL • Power BI', color: 'blue' },
      { label: 'GenAI • n8n • RAG Agents', color: 'green' },
      { label: 'FastAPI • React • Docker', color: 'purple' },
      { label: 'SIH 2025 • 4th Rank', color: 'amber' },
    ],
    leadershipAndHonors: [
      {
        title:
          'Participated & Secured 4th Rank — Smart India Hackathon (SIH) 2025 Internal Round',
        org: 'Chandigarh College of Technology (CCT), CGC Landran, Mohali',
        icon: 'fas fa-medal',
      },
      {
        title: 'Research and Innovation Lead',
        org: 'Tech Titans Club, Chandigarh College of Technology (CCT)',
        icon: 'fas fa-lightbulb',
      },
      {
        title: 'Coordinator — Internal Smart India Hackathon (SIH)',
        org: 'CGC Landran, Mohali',
        icon: 'fas fa-users-cog',
      },
      {
        title: 'Event Manager — KAIROS (College Technical Event)',
        org: 'CGC Landran, Mohali',
        icon: 'fas fa-calendar-check',
      },
    ],
  },

  // ========================================================================
  // 3. Core Skills & Competencies
  // ========================================================================
  skills: {
    technical: {
      title: 'Data Analytics, BI & Databases',
      icon: 'fas fa-chart-pie',
      accent: 'blue',
      items: [
        { name: 'Python (Pandas, NumPy, Seaborn, EDA)', level: 92 },
        { name: 'SQL (PostgreSQL, SQLite, MySQL)', level: 88 },
        { name: 'Power BI (DAX, Data Modeling & Storytelling)', level: 88 },
        { name: 'Advanced MS Excel (Pivot Tables, Lookups)', level: 90 },
        { name: 'Forensic & Telemetry Data Analysis', level: 85 },
      ],
    },
    frameworks: {
      title: 'AI Automation & Full-Stack Dev',
      icon: 'fas fa-robot',
      accent: 'green',
      items: [
        { name: 'Generative AI, Prompt Eng. & Local LLMs (Ollama)', level: 90 },
        { name: 'n8n Workflow Automation & Webhooks', level: 88 },
        { name: 'FastAPI, REST APIs & SQLAlchemy', level: 82 },
        { name: 'React, TypeScript, HTML5/CSS3 & Tailwind CSS', level: 85 },
        { name: 'Git, GitHub, Docker & CI/CD', level: 88 },
      ],
    },
    problemSolving: {
      title: 'Core CS, Interpersonal & Leadership',
      icon: 'fas fa-award',
      accent: 'purple',
      bullets: [
        'Analytical Thinking & Consulting-Style Data Decision Making',
        'End-to-End ETL Pipelines & Relational Schema Design',
        'RAG (pgvector) & Human-in-the-Loop AI Agent Architecture',
        'C, C++, Data Structures & Algorithmic Problem Solving',
        'SIH 2025 Internal Round (4th Rank) & Hackathon Coordinator',
        'Languages: English, Hindi, Punjabi',
      ],
      ctaText: 'Connect on LinkedIn',
      ctaUrl: 'https://www.linkedin.com/in/sahilnarula06skn/',
    },
  },

  // ========================================================================
  // 4. Featured Projects (Merged with Live GitHub API Repos)
  // ========================================================================
  featuredProjects: [
    {
      name: 'uber-analysis-project',
      title: 'Uber Ride Bookings Data Analysis (NCR Region — 150K+ Rows)',
      description:
        'End-to-end data analytics & BI pipeline analyzing 150,000+ ride bookings across Delhi NCR (₹52M revenue). Built with Python (Pandas) for automated ETL & feature engineering, SQLite3 for relational modeling, and a 5-page Power BI executive dashboard.',
      language: 'Python • SQLite3 • Power BI',
      tags: ['Python', 'Pandas', 'Seaborn', 'SQLite3', 'Power BI', 'DAX', 'EDA'],
      stars: 1,
      html_url: 'https://github.com/Git-sahilnarula/uber-analysis-project',
      reportUrl: '/Uber_Analysis_Dashboard.pdf',
      reportLabel: 'View 5-Page Power BI Report (PDF)',
      badge: 'SortIQ Summer Training Project',
    },
    {
      name: 'outreach-iq',
      title: 'Outreach IQ — AI Job Discovery & Multi-Channel Outreach Platform',
      description:
        'Production-grade full-stack platform (FastAPI + React 18 + TypeScript) for startups to ingest opportunities via Gmail OAuth & n8n webhooks, score compatibility with local LLMs (Ollama), generate tailored proposals & LinkedIn Outreach Kits, and dispatch with human-in-the-loop approval.',
      language: 'FastAPI • React • TypeScript • Ollama',
      tags: [
        'FastAPI',
        'React 18',
        'TypeScript',
        'PostgreSQL',
        'Ollama LLM',
        'n8n Webhooks',
        'Docker',
      ],
      stars: 1,
      html_url: 'https://github.com/Git-sahilnarula/outreach-iq',
      badge: 'Full-Stack AI Platform',
    },
    {
      name: 'kairos',
      title: 'KAIROS — Agentic AI Opportunity Research & Decision Engine',
      description:
        'Zero-cost, n8n-orchestrated AI agent system (12 modular workflows) backed by PostgreSQL + pgvector RAG precedent reasoning and Ollama. Evaluates freelance/remote opportunities with explainable, deterministic weighted scoring and human-in-the-loop governance.',
      language: 'n8n • PostgreSQL/pgvector • RAG',
      tags: [
        'n8n (12 Workflows)',
        'PostgreSQL',
        'pgvector RAG',
        'Ollama',
        'Docker',
        'Deterministic Scoring',
      ],
      stars: 1,
      html_url: 'https://github.com/Git-sahilnarula/kairos',
      badge: 'BCA Final-Year Major Project',
    },
  ],

  // ========================================================================
  // 5. Industrial Training & Virtual Experience
  // ========================================================================
  experienceAndAchievements: [
    {
      role: 'Data Analyst Trainee (45-Day Summer Training)',
      organization: 'SortIQ Solutions Pvt. Ltd.',
      period: 'Summer 2026',
      highlights: [
        'Executed the complete data lifecycle from raw ingestion, deduplication, and imputation to Exploratory Data Analysis (EDA) on 150,000+ NCR Uber ride bookings.',
        'Designed the SQLite relational database (uber_bookings) and wrote optimized SQL queries for revenue, peak hours, and cancellation bottlenecks.',
        'Created statistical plots with Seaborn and delivered an interactive 5-page Power BI executive dashboard.',
      ],
    },
    {
      role: 'Data Analytics Job Simulation (Virtual Experience Trainee)',
      organization: 'Deloitte Australia (Issued via Forage)',
      period: 'May 2026 – July 2026',
      highlights: [
        'Completed practical client advisory tasks in Data Analysis and Forensic Technology (Verification Code: CecbcqAqYJLYjWEcH).',
        'Performed exploratory data analysis, data modeling, and telemetry classification using MS Excel and BI visualization tools.',
        'Built executive telemetry summaries translating raw operational data into actionable client recommendations.',
      ],
    },
  ],

  // ========================================================================
  // 6. Education Timeline
  // ========================================================================
  education: [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Chandigarh Group of Colleges (CGC), Landran, Mohali',
      period: 'Final Year (3rd Year) • 8.09 CGPA',
      points: [
        'Currently in Final Year (3rd Year) maintaining an 8.09 CGPA',
        'Participated and secured 4th Rank in Smart India Hackathon (SIH) 2025 Internal Round organized by CCT, Mohali',
        'Research & Innovation Lead at Tech Titans Club (CCT), SIH Internal Coordinator, and Event Manager for KAIROS',
        'Focused on Data Analytics (Python, SQL, Power BI), Generative AI & n8n Automation, DBMS, and Full-Stack Web Development',
      ],
    },
    {
      degree: 'Senior Secondary (12th Grade — CBSE Board)',
      institution:
        'G.R.G. National Girls Senior Secondary School, Sirsa, Haryana',
      period: 'Completed • 7.5 CGPA',
      points: [
        'Completed Senior Secondary education under CBSE Board with 7.5 CGPA',
        'Strong foundation in analytical problem solving and computer applications',
        'Participated in school science exhibitions and coding workshops',
      ],
    },
    {
      degree: 'Secondary School (10th Grade — CBSE Board)',
      institution:
        'G.R.G. National Girls Senior Secondary School, Sirsa, Haryana',
      period: 'Completed • 8.0 CGPA',
      points: [
        'Completed Secondary School under CBSE Board with 8.0 CGPA',
        'First exposure to computer science fundamentals and structured programming',
        'Developed passion for technology through academic projects',
      ],
    },
  ],

  // ========================================================================
  // 7. Certifications & Credentials
  // ========================================================================
  certifications: [
    {
      title: 'What Is Generative AI?',
      issuer: 'LinkedIn Learning',
      description:
        'Completed LinkedIn Learning certification covering Generative AI Tools, Artificial Intelligence (AI), and Generative AI workflows (ID: 180b39d4...16de4).',
      accent: 'blue',
      url: '/LinkedIn_Generative_AI_Certificate.pdf',
      badge: 'Issued: Jul 29, 2026',
    },
    {
      title: 'Data Analytics Job Simulation',
      issuer: 'Deloitte Australia & Forage',
      description:
        'Completed practical tasks in Data Analysis and Forensic Technology (Enrolment Code: jvyWBJAMhx3aWfYFR | Verification: CecbcqAqYJLYjWEcH).',
      accent: 'green',
      url: '/Deloitte_Data_Analytics_Certificate.pdf',
      badge: 'Issued: Jul 20, 2026',
    },
    {
      title: 'N8N101: Essentials — Your First Workflows',
      issuer: 'n8n Academy',
      description:
        'Successfully completed and received a passing grade in n8n Academy Essentials for building automated workflows and AI agent pipelines.',
      accent: 'purple',
      url: '/n8n_N8N101_Certificate.pdf',
      verifyUrl:
        'https://learn.n8n.io/certificates/bee2ad2c85f04c4c809396d2442bba12',
      badge: 'Issued: Sep 4, 2026',
    },
    {
      title: '45-Day Data Analyst Summer Training',
      issuer: 'SortIQ Solutions Pvt. Ltd.',
      description:
        'Completed intensive 45-day summer training executing end-to-end Python (Pandas, NumPy, Seaborn), SQLite, and Power BI analytics on 150K+ Uber bookings.',
      accent: 'blue',
      url: '/Uber_Analysis_Dashboard.pdf',
      badge: 'Summer 2026',
    },
    {
      title: 'Frontend Development Certification',
      issuer: 'OneRoadmap (DPIIT-Recognized)',
      description:
        'Completed comprehensive frontend development certification covering HTML5, CSS3, JavaScript, and modern responsive web interfaces.',
      accent: 'green',
      url: 'https://oneroadmap.io/skills/frontend/certificate/CERT-1E2170D1',
      badge: 'ID: CERT-1E2170D1',
    },
    {
      title: 'Python 3 Bootcamp',
      issuer: 'Lernx',
      description:
        'Completed Python 3 Bootcamp from Lernx, covering core to advanced Python programming, data structures, and scripting.',
      accent: 'blue',
      url: '/pythoncertification.png',
      badge: 'Issued: Nov 22, 2023',
    },
    {
      title: 'Basics of Python',
      issuer: 'UniAthena & Cambridge International Qualifications, UK',
      description:
        'Certified in Python programming by UniAthena in partnership with Cambridge International Qualifications, UK.',
      accent: 'green',
      url: '/Sahil_CR641_certificate_240911_180504.pdf',
      badge: 'Issued: Sep 11, 2024',
    },
    {
      title: 'React For Beginners',
      issuer: 'Lernx',
      description:
        'Completed React for Beginners course from Lernx, covering component architecture, state management, and modern SPA development.',
      accent: 'purple',
      url: '/WhatsApp Image 2025-07-19 at 00.23.47_58d087be.jpg',
      badge: 'Verified Certificate',
    },
    {
      title: 'ChatGPT & AI Tools Workshop',
      issuer: 'be10X',
      description:
        'Completed workshop on ChatGPT and AI productivity tools conducted by be10X, applying generative AI to real-world workflows.',
      accent: 'yellow',
      url: '/Certificate_240909_135022.pdf',
      badge: 'Issued: Sep 9, 2024',
    },
  ],
};
