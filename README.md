# Robert Locust — AI & Technology Credentials Portfolio

> **Professional Training, AI Education, and Technical Development Portfolio**  
> 42 Coursera-issued specializations, professional certificates, and course credentials, each linked to Coursera's own certificate page.

---

## 🎯 Professional Direction

This portfolio is tailored for hiring managers, recruiters, and engineering leads evaluating candidates for:
- **Junior AI Engineer**
- **AI Automation Specialist**
- **AI Agent Developer**
- **AI Operations Specialist**
- **AI Implementation Specialist**
- **AI Solutions Specialist**
- **AI Systems Development**

The portfolio emphasizes practical generative AI, prompt engineering, agentic systems, and local model orchestration, backed by foundational training in IT infrastructure, computer networking, systems administration, and data analytics.

---

## 🔍 Credential Verification

Employers and recruiters do not have to rely on résumé claims. Every credential in this portfolio links to Coursera's own certificate page:

1. **Direct Verification URL** — `https://www.coursera.org/account/accomplishments/verify/<ID>` for courses, or `.../specialization/certificate/<ID>` for specializations.
2. **Public Share URL** — Coursera share link where one exists.
3. **Recipient and title** — for **36 of the 42** credentials, the linked page renders the recipient name ("Completed by Robert locust") and the credential title **without requiring a sign-in**. These were checked on 2026-11-04 against Coursera's live pages.
4. **Six specialization / professional certificates** — their certificate pages are **account-scoped**: they return HTTP 200 but do not display the recipient or title to a logged-out visitor. They are recorded as **`ACCOUNT-SCOPED`**, not as publicly verified.
5. **Institutional partner** — confirmed on each public page that rendered (Vanderbilt University, Google, IBM, NVIDIA, Meta, AWS, University of Colorado System).

**Verification is a page-level check, not a cryptographic one.** No digital-signature or blockchain validation is claimed or performed.

---

## 📊 Credential Summary & Statistics

- **Total Credentials:** 42
- **Publicly Verifiable (recipient + title visible without sign-in):** 36
- **Account-Scoped (Coursera sign-in required to view):** 6 — the specializations / professional certificate below
- **Specializations & Professional Certificates:** 6
  - Generative AI Strategic Leader *(Vanderbilt University)*
  - Google AI Essentials *(Google)*
  - Google IT Support Professional Certificate *(Google)*
  - Organizational Strategy with Generative AI & AI Agents *(Vanderbilt University)*
  - Google Prompting Essentials *(Google)*
  - Generative AI for Educators & Teachers *(Vanderbilt University)*
- **Course Credentials:** 36 (12 standalone + 24 specialization components; 3 courses are shared across two specializations and counted once)
- **Institutional Partners:** Vanderbilt University, Google, IBM, NVIDIA, Meta, Amazon Web Services, University of Colorado System.
- **Category totals:** Generative AI & LLMs 9 · IT Support 7 · Prompt Engineering 7 · Data Analytics 6 · AI Strategy 4 · AI Automation 3 · AI Agents 3 · Responsible AI 2 · Cloud 1 = **42**

---

## 📂 Repository Contents

```text
├── index.html                # Responsive web portfolio interface
├── styles.css                # Clean, recruiter-friendly modern CSS design
├── app.js                    # Client-side search, filtering, modal logic; embeds the dataset
├── credentials_master.json   # Complete machine-readable master database (JSON, 42 records)
├── credentials_master.csv    # Complete master database (CSV, 42 rows)
├── verification_report.md    # Verification method, per-credential status, and limitations
├── README.md                 # Project documentation and deployment record
└── .gitignore
```

---

## 🚀 How to Run the Portfolio Locally

The portfolio is built as a zero-dependency, ultra-fast static website.

### Option 1: Direct File Open
Simply double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Python HTTP Server
Run from the project folder:
```bash
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

---

## 🌐 Live Deployment

The portfolio is **already published** — no additional repository or deployment step is required.

| Item | Value |
|---|---|
| Repository | `https://github.com/Rob2469335/portfolio` |
| Branch | `main` (this is the deployed branch) |
| Hosting | **GitHub Pages**, source *Deploy from a branch* → `main` / `/` (root) |
| Public URL | **https://rob2469335.github.io/portfolio/** |
| Custom build step | None — static files, served directly |
| Last deployment | Automatic on push to `main` (GitHub Actions "pages build and deployment") |

> **Do not create a second repository.** `Rob2469335/credentials-portfolio` does not exist and was only an early placeholder name; all work lives in `Rob2469335/portfolio`.

### Updating the published site
```bash
git add .
git commit -m "DOCS: <what changed>"
git push origin main
```
GitHub Pages rebuilds automatically; the live site reflects the new commit within roughly one minute.

### Project file structure
```text
portfolio/
├── index.html                # Page structure and static copy
├── styles.css                # Responsive design
├── app.js                    # Search, filters, accordions, copy-ID; embeds the dataset
├── credentials_master.json   # Machine-readable dataset (42 records)
├── credentials_master.csv    # Same dataset, tabular
├── verification_report.md    # Verification method, per-credential status, limitations
├── README.md                 # This file
└── .gitignore
```

### Run locally
```bash
python -m http.server 8000
# then open http://localhost:8000
```
Opening `index.html` directly also works, except browser file-URL restrictions may affect the CSV/JSON download links.
