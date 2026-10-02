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
      'Business Data Analyst Intern at Vision Forge | Research & Innovation Lead at Tech Titans | Aspiring Data Scientist | AI & ML • Automation Developer • n8n • Data Analysis',
    roles: [
      'Business Data Analyst Intern @ Vision Forge Labs',
      'Research & Innovation Lead @ Tech Titans',
      'Final-Year BCA Student @ CGC Landran (8.09 CGPA)',
      'Power BI & Data Analyst',
      'AI & n8n Automation Builder',
      'SIH 2025 (4th Rank Holder)',
    ],
    tagline:
      'Detail-oriented Business Data Analyst Intern at Vision Forge Labs and Final-Year BCA undergraduate at Chandigarh Group of Colleges (CGC), Landran (8.09 CGPA). Experienced in transforming complex business data into strategic insights, building automated ETL pipelines, Power BI dashboards, and human-in-the-loop AI agent systems.',
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
      "I'm Sahil, a detail-oriented Business Data Analyst Intern at Vision Forge Labs and Final-Year Bachelor of Computer Applications (BCA) undergraduate at Chandigarh Group of Colleges (CGC), Landran, Mohali (8.09 CGPA).",
      'Equipped with industry experience across Vision Forge Labs, SortIQ Solutions Pvt. Ltd., and Deloitte Australia (Forage), I specialize in cleaning and analyzing complex business datasets using Python (Pandas, NumPy, Seaborn), SQL, and MS Excel, tracking key metrics & KPIs, researching markets & competitors, and crafting executive visual stories with Power BI.',
      'On the engineering side, I build full-stack and agentic AI systems—such as Outreach IQ (FastAPI + React + TypeScript + Ollama + n8n Webhooks) and KAIROS (12-workflow n8n + PostgreSQL/pgvector RAG decision engine). I also participated in and secured 4th Rank in the Smart India Hackathon (SIH) 2025 Internal Round at CCT Mohali and serve as the Research & Innovation Lead at the Tech Titans Club.',
    ],
    badges: [
      { label: 'Vision Forge Labs • Business Data Analyst', color: 'blue' },
      { label: 'Python • SQL • Power BI', color: 'blue' },
      { label: 'KPI Tracking • Data Cleaning', color: 'green' },
      { label: 'GenAI • n8n • RAG Agents', color: 'purple' },
      { label: 'SIH 2025 • 4th Rank', color: 'amber' },
    ],
    leadershipAndHonors: [
      {
        title: 'Research & Innovation Lead',
        org: 'Tech Titans Club, Chandigarh College of Technology (CCT)',
        period: 'Jul 2026 – Present',
        logo: '/logos/techtitans.png',
        icon: 'fas fa-lightbulb',
      },
      {
        title:
          'Participated & Secured 4th Rank — Smart India Hackathon (SIH) 2025 Internal Round',
        org: 'Chandigarh College of Technology (CCT), CGC Landran, Mohali',
        icon: 'fas fa-medal',
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
        { name: 'KPI Tracking, Data Cleaning & Business Analysis', level: 92 },
        { name: 'Power BI (DAX, Data Modeling & Storytelling)', level: 90 },
        { name: 'SQL (PostgreSQL, SQLite, MySQL)', level: 88 },
        { name: 'Advanced MS Excel (Pivot Tables, Lookups)', level: 90 },
        { name: 'Market Research & Forensic Data Analysis', level: 86 },
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
        'KPI Tracking, Trend Detection & Data-Driven Decision Making',
        'Market & Competitor Research with Cross-Functional Collaboration',
        'End-to-End ETL Pipelines & Relational Schema Design',
        'RAG (pgvector) & Human-in-the-Loop AI Agent Architecture',
        'C, C++, Data Structures & Algorithmic Problem Solving',
        'SIH 2025 Internal Round (4th Rank) & Tech Titans Club Lead',
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
      phase: 'Completed',
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
      phase: 'Completed',
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
      phase: 'In Development',
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
    {
      name: 'portfolio',
      title: 'Personal Developer & Data Analytics Portfolio',
      phase: 'Completed',
      description:
        'Modern responsive portfolio built with React 18, Vite, and Tailwind CSS featuring live GitHub repository & skill discovery, LinkedIn headline/certification syncing, interactive scroll-wheel skills directory, and 3-tier direct email delivery.',
      language: 'React 18 • Vite • Tailwind CSS',
      tags: [
        'React 18',
        'Vite',
        'Tailwind CSS',
        'Netlify Functions',
        'GitHub API',
        'Responsive UI',
      ],
      stars: 1,
      html_url: 'https://github.com/Git-sahilnarula/portfolio',
      homepage: 'https://cgcian-sahil.netlify.app/',
      badge: 'Live Web Application',
    },
  ],

  // ========================================================================
  // 5. Professional Experience & Industrial Training
  // ========================================================================
  experienceAndAchievements: [
    {
      role: 'Business Data Analyst Intern',
      organization: 'Vision Forge Labs',
      type: 'Corporate Internship',
      location: 'Mohali, Punjab • Remote',
      period: 'Oct 2026 – Present',
      duration: 'Ongoing',
      logo: '/logos/visionforge.png',
      isCurrent: true,
      tagline: 'Active corporate internship driving live telemetry analytics, executive intelligence, and anomaly detection.',
      keyMetric: 'Live KPI Monitoring & Enterprise Performance',
      metricIcon: 'fas fa-chart-line',
      stats: [
        { label: 'Domain Scope', value: 'KPI Telemetry', sub: 'Anomaly Detection' },
        { label: 'Executive BI', value: 'Power BI', sub: 'Leadership Reporting' },
        { label: 'Execution', value: 'Remote Agile', sub: 'Cross-Functional Teams' },
      ],
      skills: [
        'KPI Tracking',
        'Data Cleaning',
        'Market Research',
        'Business Analysis',
        'Power BI',
        'Data Visualization',
      ],
      highlights: [
        'Clean, structure, and analyze multi-dimensional business datasets to transform raw telemetry into high-confidence strategic insights.',
        'Engineer executive Power BI reports, operational dashboards, and visual summaries enabling cross-functional leadership to monitor performance.',
        'Conduct rigorous quantitative market research and competitor benchmarking to uncover growth vectors and structural market opportunities.',
        'Track mission-critical KPIs, detect emerging data anomalies, and flag trends that support strategic, data-driven decisions.',
        'Collaborate remotely with cross-functional product, analytics, and engineering teams to deliver real-world business outcomes.',
      ],
    },
    {
      role: 'Data Analyst Trainee',
      organization: 'SortIQ Solutions Pvt. Ltd.',
      type: 'Industrial Summer Training',
      location: 'Mohali, Punjab, India',
      period: 'Summer 2026',
      duration: '45-Day Intensive',
      logo: '/logos/sortiq.png',
      isCurrent: false,
      tagline: 'Engineered full-stack analytics on 150k+ Delhi NCR Uber ride transactions with SQLite3 and Power BI.',
      keyMetric: '150,000+ Records Analyzed • ₹52M NCR Revenue',
      metricIcon: 'fas fa-database',
      actionUrl: '/Uber_Analysis_Dashboard.pdf',
      actionText: 'View 5-Page Power BI Report',
      actionIcon: 'fas fa-file-pdf',
      stats: [
        { label: 'Volume Analyzed', value: '150,000+', sub: 'Uber NCR Bookings' },
        { label: 'Economic Scale', value: '₹52,000,000', sub: 'Gross Ride Value' },
        { label: 'BI Deliverable', value: '5-Page Suite', sub: 'Dynamic DAX Models' },
      ],
      skills: [
        'Python (Pandas)',
        'SQLite3',
        'Power BI (DAX)',
        'Seaborn',
        'EDA',
        'Relational Modeling',
      ],
      highlights: [
        'Architected an end-to-end data analytics lifecycle on 150,000+ Delhi NCR Uber ride records—handling ingestion, missing value imputation, and feature engineering.',
        'Designed a normalized SQLite3 relational schema (uber_bookings) and authored optimized SQL queries analyzing peak hour surge and cancellation bottlenecks.',
        'Built an executive 5-page Power BI dashboard suite with dynamic DAX measures, time-series revenue trends, and Seaborn statistical plots.',
      ],
    },
    {
      role: 'Virtual Experience Trainee',
      organization: 'Deloitte Australia (Issued via Forage)',
      type: 'Corporate Job Simulation',
      location: 'Sydney, Australia • Remote',
      period: 'May 2026 – July 2026',
      duration: 'Verified Program',
      logo: '/logos/deloitte.png',
      isCurrent: false,
      tagline: 'Simulated corporate forensic technology and telemetry audits for executive client advisory.',
      keyMetric: 'Credential Verified: CecbcqAqYJLYjWEcH',
      metricIcon: 'fas fa-shield-alt',
      actionUrl: '/Deloitte_Data_Analytics_Certificate.pdf',
      actionText: 'View Verified Credential',
      actionIcon: 'fas fa-certificate',
      stats: [
        { label: 'Verification', value: 'Verified', sub: 'ID: CecbcqAqYJLYjWEcH' },
        { label: 'Core Practice', value: 'Forensic Tech', sub: 'Audit Trail Telemetry' },
        { label: 'Advisory Scope', value: 'Executive Memos', sub: 'Risk Quantification' },
      ],
      skills: [
        'Data Analytics',
        'Data Modeling',
        'Forensic Tech',
        'MS Excel',
        'Client Advisory',
        'Telemetry Summary',
      ],
      highlights: [
        'Completed simulated corporate client advisory engagements in Data Analysis and Forensic Technology under Deloitte Australia mentorship.',
        'Executed data classification, telemetry modeling, and integrity audits on simulated enterprise operational datasets.',
        'Synthesized exploratory data findings into structured executive memos, translating complex telemetry into high-value strategic recommendations.',
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
