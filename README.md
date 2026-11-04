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
├── index.html                     # Page structure and static copy
├── styles.css                     # Responsive design
├── app.js                         # Search, filters, accordions, copy-ID (no embedded data)
├── credentials_master.json        # CANONICAL dataset (42 records) — the single source of truth
├── credentials_master.csv         # Generated from the JSON (do not edit by hand)
├── verification_report.md         # Verification method, per-credential status, limitations
├── tools/portfolio_data.py        # Validate the dataset / regenerate the CSV
├── tests/browser/                 # Playwright tests (desktop, mobile, security)
├── playwright.config.js           # Browser-test configuration
├── package.json                   # Dev-only scripts (the site itself has no dependencies)
├── .github/workflows/validate.yml # CI: dataset validation + app.js syntax check
├── README.md                      # This file
└── .gitignore
```

---

## 🧭 Data model — one canonical source

**`credentials_master.json` is authoritative.** Nothing else may hold credential data.

| File | Status |
|---|---|
| `credentials_master.json` | **Canonical.** Edit this one. |
| `credentials_master.csv` | **Generated** — `python tools/portfolio_data.py --write` |
| `app.js` | Contains **no credential data**; it fetches the JSON at runtime. |

The validator enforces this: it fails if `app.js` ever regains an embedded dataset, if the CSV drifts from the JSON, or if the record counts change without the recorded baseline being updated.

### Updating credentials

```bash
# 1. edit credentials_master.json
# 2. regenerate the CSV from it
python tools/portfolio_data.py --write
# 3. validate
python tools/portfolio_data.py
```

When a credential is legitimately added or removed, the validator reports the new counts and fails against the recorded baseline. Update `BASELINE` in `tools/portfolio_data.py` in the same commit, so the change is explicit in review:

```bash
python tools/portfolio_data.py --allow-change
```

### What the validator checks

- exactly the expected number of records (baseline-compared, not hard-coded silently),
- unique credential IDs, required fields, valid `VERIFIED` / `ACCOUNT-SCOPED` statuses,
- every `direct_url` is an `https://` Coursera `account/accomplishments` URL,
- status counts sum to the total; category totals sum to the total,
- component-course IDs exist as course records (no phantom components, no double counting),
- CSV parity with JSON,
- `app.js` holds no credential data.

**Continuous integration:** `.github/workflows/validate.yml` runs the validator plus `node --check app.js` on every push and pull request, and fails if a derived file is stale.

---

## 🚀 How to Run the Portfolio Locally

The site itself is dependency-free, but it **loads `credentials_master.json` at runtime**, so it must be served over HTTP (opening `index.html` from the filesystem is blocked by browser CORS rules for local files).

```bash
python -m http.server 8000
# then open http://localhost:8000
```

### Testing

```bash
npm install                 # dev-only: installs @playwright/test
npx playwright test         # desktop, mobile and security suites (uses your installed Chrome)

npx playwright test --project=desktop
npx playwright test --project=mobile
```

The Playwright config reuses the locally installed Google Chrome (`channel: 'chrome'`), so no browser download is needed.

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
python tools/portfolio_data.py          # validate first
git add .
git commit -m "DOCS: <what changed>"
git push origin main
```

GitHub Pages rebuilds automatically; the live site reflects the new commit within roughly one minute. The `validate` workflow also runs on the push and will fail the build if derived files are stale.
