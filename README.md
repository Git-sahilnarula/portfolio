# Sahil — Personal Developer & Data Analytics Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live_Website-cgcian--sahil.netlify.app-222222?style=for-the-badge&logo=netlify&logoColor=white)](https://cgcian-sahil.netlify.app/)
[![React](https://img.shields.io/badge/React-18.3-222222?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-222222?style=for-the-badge&logo=vite&logoColor=646CFF)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-222222?style=for-the-badge&logo=tailwindcss&logoColor=38B2AC)](https://tailwindcss.com/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sahilnarula06skn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sahilnarula06skn/)

> 🌐 **Live Portfolio:** **[https://cgcian-sahil.netlify.app/](https://cgcian-sahil.netlify.app/)**

A modern, responsive personal portfolio built with **React 18**, **Vite**, and **Tailwind CSS** for **Sahil** — Final-Year Bachelor of Computer Applications (BCA) student at **Chandigarh Group of Colleges (CGC), Landran, Mohali (8.09 CGPA)** specializing in **Data Analytics (Python, SQL, Power BI)**, **AI & n8n Workflow Automation**, and **Full-Stack Web Development (FastAPI, React, TypeScript)**.

---

## ✨ Key Features

### 1. Tri-Tone Color System (Deep Teal `#0D5C63` & Dark Charcoal `#222222` on Soft Beige `#f5f2eb`)
- **Light Mode**: Soft Beige / Cream background (`#f5f2eb`) with warm cream cards (`#faf8f3`), authoritative Deep Teal (`#0D5C63`) primary interactive accents/badges/buttons, and Dark Charcoal (`#222222`) typography.
- **Dark Mode**: Inverted Dark Charcoal (`#181818` / `#222222`) surfaces with luminous teal accents (`#2DD4BF` / `#5EEAD4`) and Soft Beige (`#f5f2eb`) typography, persisted in `localStorage`.
- **Interactive Card Micro-Interactions**: Smooth cubic-bezier elevation lift (`translateY(-6px)`), deepened shadow, and Deep Teal border highlight across every card on the site.

### 2. Automated LinkedIn & GitHub Sync Pipeline
- **Synced LinkedIn Headlines**: Pipe-separated (`|`) segments from the LinkedIn headline automatically drive the Hero badge, animated typewriter effect, and About LinkedIn card.
- **Live GitHub Repository & Skill Discovery**: Fetches public repositories from [`@Git-sahilnarula`](https://github.com/Git-sahilnarula) at runtime, merges them with curated project metadata and **Project Phase badges** (`Completed` vs `In Development`), and automatically appends newly discovered repository languages/topics into the Skills Directory.
- **Scheduled GitHub Action & Serverless Function**: Includes a daily GitHub Actions workflow (`.github/workflows/auto-sync-portfolio.yml`), a Netlify serverless endpoint (`netlify/functions/linkedin-sync.js`), and a CLI utility (`scripts/sync-linkedin.mjs`).

### 3. Compact Dropdown + Scroll-Wheel Skills Directory
- Displays **3 Core Competency Progress Cards** alongside an interactive **Complete Skills Directory (35+ skills)**.
- Equipped with a **Category Filter Dropdown (`<select>`)**, **Show/Hide toggle**, and a custom-styled **Scroll-Wheel container (`max-h-56 overflow-y-auto`)** to keep vertical page height compact.

### 4. App-Icon Certifications Grid
- Showcases **9 verified certifications** with the **original issuing organization logos** (`LinkedIn Learning`, `Deloitte`, `n8n Academy`, `SortIQ Solutions`, `OneRoadmap`, `Lernx`, `UniAthena / CIQ`, `be10X`) formatted as uniform `48×48` iOS/macOS-style app icons (`public/logos/`), plus direct links to PDF certificates and online verification URLs.

### 5. 3-Tier Direct Email Delivery (No Third-Party SDK)
- **Tier 1 (Primary)**: Sends formatted HTML table emails directly to `sahilnarula076@gmail.com` via the **FormSubmit AJAX API**.
- **Tier 2 (Secondary)**: Captures submissions in **Netlify Forms** (`data-netlify="true"`).
- **Tier 3 (Fallback)**: Automatically opens a pre-filled `mailto:` compose window if the user is offline.

---

## 🚀 Featured Projects & Phase Status

| Project | Tech Stack | Phase | Links |
| :--- | :--- | :---: | :--- |
| **Uber Ride Bookings Data Analysis (150K+ Rows)** | Python, Pandas, Seaborn, SQLite3, Power BI, DAX | `Completed` | [GitHub Repo](https://github.com/Git-sahilnarula/uber-analysis-project) • [5-Page Power BI PDF](./public/Uber_Analysis_Dashboard.pdf) |
| **Outreach IQ — AI Job Discovery & Multi-Channel Outreach** | FastAPI, React 18, TypeScript, PostgreSQL, Ollama, n8n, Docker | `Completed` | [GitHub Repo](https://github.com/Git-sahilnarula/outreach-iq) |
| **KAIROS — Agentic AI Opportunity Research & Decision Engine** | n8n (12 Workflows), PostgreSQL, pgvector RAG, Ollama, Docker | `In Development` | [GitHub Repo](https://github.com/Git-sahilnarula/kairos) |
| **Personal Developer & Data Analytics Portfolio** | React 18, Vite, Tailwind CSS, Netlify Functions, GitHub API | `Completed` | [GitHub Repo](https://github.com/Git-sahilnarula/portfolio) • [Live Site](https://cgcian-sahil.netlify.app/) |

---

## 📂 Project Architecture

```text
portfolio/
├── .github/workflows/
│   └── auto-sync-portfolio.yml    # Scheduled GitHub Action for automated repo & profile sync
├── legacy/
│   └── index.html                 # 1:1 archival backup of the original single-file portfolio
├── netlify/functions/
│   └── linkedin-sync.js           # Serverless endpoint for live LinkedIn headline/skills/certs sync
├── public/
│   ├── logos/                     # Original organization logos formatted as app icons
│   │   ├── linkedin.svg           # LinkedIn Learning official icon
│   │   ├── deloitte.png           # Deloitte official icon
│   │   ├── n8n.png                # n8n Academy official icon
│   │   ├── sortiq.png             # SortIQ Solutions official web logo (sortiqsolutions.com)
│   │   ├── oneroadmap.png         # OneRoadmap official icon
│   │   ├── lernx.png              # Lernx official icon
│   │   ├── uniathena.png          # UniAthena / CIQ official icon
│   │   └── be10x.png              # be10X official icon
│   ├── linkedin-profile.json      # Synced LinkedIn headline, 35+ skills & 9 certifications
│   ├── sahil_passport.jpg         # Cropped head-and-shoulders circular Hero portrait
│   ├── sahil_portrait.jpg         # About section LinkedIn profile portrait
│   ├── Sahil_Narula_Resume.pdf    # Official Resume PDF
│   ├── Uber_Analysis_Dashboard.pdf# 5-Page Power BI Executive Dashboard Report
│   └── *.pdf / *.png              # Verified certificate PDFs & images
├── scripts/
│   └── sync-linkedin.mjs          # CLI script to sync GitHub repo skills & update LinkedIn data
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Fixed responsive navigation bar & Light/Dark theme switcher
│   │   ├── Hero.jsx               # Synced LinkedIn typewriter headlines, CTAs & circular portrait
│   │   ├── About.jsx              # Bio, Honors/SIH 4th Rank, LinkedIn card & live GitHub chart
│   │   ├── Skills.jsx             # Core progress bars + Dropdown & Scroll-Wheel Skills Directory
│   │   ├── Projects.jsx           # Live GitHub repo merger, phase badges & industrial training
│   │   ├── Education.jsx          # Alternating vertical academic timeline
│   │   ├── Certifications.jsx     # App-icon organization logos & certificate verification links
│   │   ├── Contact.jsx            # 3-tier direct email delivery form & contact cards
│   │   └── Footer.jsx             # Dynamic copyright & tech credits
│   ├── data/
│   │   └── portfolioData.js       # Central single source of truth for all portfolio content
│   ├── App.jsx                    # Root state management (theme persistence & data syncing)
│   ├── index.css                  # Tailwind directives, custom scrollbar & universal .hover-card rules
│   └── main.jsx                   # React DOM entry point
├── index.html                     # HTML shell with SEO/OpenGraph tags & Netlify Form definition
├── netlify.toml                   # Netlify build & serverless functions configuration
├── package.json                   # Scripts & dependencies
├── tailwind.config.js             # Custom #222222 Charcoal & #f5f2eb Soft Beige color scales
└── vite.config.js                 # Vite bundler configuration
```

---

## 🛠️ Getting Started (Local Development)

### Prerequisites
- **Node.js** `>= 18.x` and **npm** `>= 9.x`

### 1. Clone the Repository
```bash
git clone https://github.com/Git-sahilnarula/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🔄 Updating Content & Running the Sync CLI

All static portfolio content lives in **[`src/data/portfolioData.js`](./src/data/portfolioData.js)** and **[`public/linkedin-profile.json`](./public/linkedin-profile.json)**.

You can also use the built-in CLI utility (`scripts/sync-linkedin.mjs`) to sync new GitHub repository skills or add new LinkedIn headlines, skills, and certifications from the terminal:

```bash
# Scan @Git-sahilnarula public repos and add any newly discovered languages/topics
npm run sync:linkedin

# Update your synced LinkedIn headline across Hero and About sections
npm run sync:linkedin -- --headline "Final-Year BCA @ CGC Landran (8.09 CGPA) | Data Analytics | AI Automation"

# Add a new skill to the Skills Directory
npm run sync:linkedin -- --add-skill "Power Automate" --category "AI & Automation"

# Add a new certification
npm run sync:linkedin -- --add-cert "AWS Cloud Practitioner" --issuer "Amazon Web Services" --url "https://..."
```

---

## 🌐 Deployment (Netlify)

This repository is pre-configured for zero-config deployment on **Netlify** via [`netlify.toml`](./netlify.toml):
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Functions Directory**: `netlify/functions`

Every `git push origin main` automatically triggers a fresh production build on **[https://cgcian-sahil.netlify.app/](https://cgcian-sahil.netlify.app/)**.

---

## 📬 Connect with Sahil

- **Portfolio**: [https://cgcian-sahil.netlify.app/](https://cgcian-sahil.netlify.app/)
- **LinkedIn**: [linkedin.com/in/sahilnarula06skn](https://www.linkedin.com/in/sahilnarula06skn/)
- **GitHub**: [@Git-sahilnarula](https://github.com/Git-sahilnarula)
- **Email**: [sahilnarula076@gmail.com](mailto:sahilnarula076@gmail.com)
