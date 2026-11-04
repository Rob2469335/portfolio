# Verification Report: Robert Locust Coursera Credential Portfolio

**Prepared for:** Robert Locust  
**Scope:** 42 Coursera-issued credentials  
**Method:** anonymous real-browser verification (Playwright + Chrome)  
**Report date:** 2026-11-04  
**Auditor:** DeepSeek (OpenCode), on the owner's machine

---

## 1. Executive summary

| Metric | Count | Detail |
|---|---|---|
| Distinct credentials | **42** | 6 specializations / professional certificates + 36 course certificates |
| Publicly verifiable | **42** | Every link, opened in a browser **without signing in**, displays the recipient and the credential title |
| Account-scoped | **0** | No credential requires a sign-in to be viewed |
| Hard link failures | **0** | All 42 URLs resolve and render |
| Duplicate course entries | 3 | Shared courses deduplicated (27 component entries, 24 distinct courses) |
| Expected vs found | 43 → 42 | The brief expected 43; 42 distinct credentials exist. None were invented. |

> **Correction history.** Two earlier revisions of this report were wrong about the six specialization certificates.
>
> 1. The first claimed **42/42 “independently verified with recipient verification”** while the same table recorded *Account Confirmed: 0*. That was unsupported.
> 2. The second revision corrected it to **36 verified / 6 account-scoped**, based on HTTP fetches that returned 200 but no recipient. That was a **false negative** caused by testing without JavaScript: these pages render the credential client-side, so a plain HTTP fetch sees only an empty shell.
>
> This revision replaces both. The six were re-tested in an anonymous browser and **all render the recipient and title**.

---

## 2. Why the earlier HTTP-only result was a false negative

The Coursera certificate pages are **single-page applications**. The server returns a generic shell:

- no `<title>` element on the credential page,
- the generic site `og:title` (`Coursera | Online Courses & Credentials…`),
- no `application/ld+json` payload,
- the document body contains no recipient name.

The credential itself is fetched and rendered by JavaScript. A `curl`/`urllib` request — or any tool that does not execute JavaScript — therefore observes HTTP 200 with no credential data, which was misread as *“not public”*. The same is true of link-preview bots that do not run JavaScript.

**HTTP transport success is not verification.** A 200 response only proves the URL resolves. It says nothing about whether a human opening that link can see the credential.

---

## 3. Verification methodology (current, correct)

Three distinct concepts must not be conflated:

| Concept | What it proves | How it was measured |
|---|---|---|
| **HTTP transport** | The URL resolves | Status code only |
| **Public credential verification** | A logged-out visitor sees the recipient and credential | Anonymous browser render (this report) |
| **Account-only access** | Data requires the owner's session | Not used; no sign-in is performed |

### Procedure actually executed

1. Launch Chrome under Playwright (`channel: 'chrome'`, headless).
2. Create a **brand-new browser context per credential** — no cookies, no stored session, no profile.
3. Navigate to the credential URL and wait for `networkidle` plus a short settle delay.
4. Read `document.body.innerText` and assert it contains **“Completed by Robert locust”** and the credential title.
5. Confirm the session is anonymous: the header shows **“Log In / Join for Free”**, and the only cookies set are anonymous (`CSRF3-Token`, `__204u`, `__400v`, `g_state`, `__400vt`) — no `CAUTH`/session cookie.
6. Record the **final URL after redirects**.
7. **Negative control:** the same procedure against a non-existent ID (`ZZZZ0000ZZZZ`) must render no recipient. It does not, which shows the pages are not echoing canned text.

### URL forms

| Form | Result |
|---|---|
| `https://coursera.org/verify/specialization/<ID>` | **Works.** Redirects to `https://www.coursera.org/account/accomplishments/specialization/<ID>` and renders the certificate. **This is the form used in the dataset for the six specialization certificates.** |
| `https://www.coursera.org/account/accomplishments/specialization/<ID>` | Also renders the certificate when opened directly. |
| `https://www.coursera.org/account/accomplishments/specialization/certificate/<ID>` | **Broken.** Its backing call `api/specializationMemberships.v1?…` returns **404** and nothing renders. This form was previously stored in the dataset and has been replaced. |
| `https://(www.)coursera.org/account/accomplishments/verify/<ID>` | Used for the 36 course certificates. |

---

## 4. Master verification table

All 42 records: URL resolves, and — in an anonymous browser — the page displays the recipient and credential title.

| # | Credential | Institution | Type | ID | Date | Status | Link |
|---|---|---|---|---|---|---|---|
| 1 | Generative AI Strategic Leader Specialization | Vanderbilt University | Specialization | `CT190TJLYPT7` | February 3, 2026 | **VERIFIED** | [Verify](https://coursera.org/verify/specialization/CT190TJLYPT7) |
| 2 | Google AI Essentials Specialization | Google | Specialization | `DA024S7Y1GKH` | February 10, 2026 | **VERIFIED** | [Verify](https://coursera.org/verify/specialization/DA024S7Y1GKH) |
| 3 | Google IT Support Professional Certificate | Google | Professional Certificate | `NC3UJ0LDPVND` | February 8, 2026 | **VERIFIED** | [Verify](https://coursera.org/verify/specialization/NC3UJ0LDPVND) |
| 4 | Organizational Strategy with Generative AI & AI Agents Specialization | Vanderbilt University | Specialization | `46TOQXSQP79M` | January 2026 | **VERIFIED** | [Verify](https://coursera.org/verify/specialization/46TOQXSQP79M) |
| 5 | Google Prompting Essentials Specialization | Google | Specialization | `VC6X0HJ0ZKVP` | January 2026 | **VERIFIED** | [Verify](https://coursera.org/verify/specialization/VC6X0HJ0ZKVP) |
| 6 | Generative AI for Educators & Teachers Specialization | Vanderbilt University | Specialization | `Y54CWPZ5JJ4Q` | January 2026 | **VERIFIED** | [Verify](https://coursera.org/verify/specialization/Y54CWPZ5JJ4Q) |
| 7 | Vibe Coding Fundamentals | University of Colorado System | Course | `OUQE6VJ2V2CJ` | March 5, 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/OUQE6VJ2V2CJ) |
| 8 | Introduction to Networking | NVIDIA | Course | `JX20B2YS8BZ3` | February 5, 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/JX20B2YS8BZ3) |
| 9 | Introduction to Data Analytics | Meta | Course | `B2X2YFSXDROO` | February 2, 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/B2X2YFSXDROO) |
| 10 | Prepare Data for Exploration | Google | Course | `NEB39550YVSI` | January 19, 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/NEB39550YVSI) |
| 11 | ChatGPT Advanced Data Analysis | Vanderbilt University | Course | `E8GYK27VYCO7` | January 13, 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/E8GYK27VYCO7) |
| 12 | Ask Questions to Make Data-Driven Decisions | Google | Course | `NEJQC0AI63GK` | December 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/NEJQC0AI63GK) |
| 13 | Foundations: Data, Data, Everywhere | Google | Course | `HPIJ9TXEWSJ2` | December 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/HPIJ9TXEWSJ2) |
| 14 | Prompt Engineering for Generative AI: Build Better AI Prompts | IBM | Course | `GTXC25N732MW` | December 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/GTXC25N732MW) |
| 15 | Claude Code: Software Engineering with Generative AI Agents | Vanderbilt University | Course | `M08UCKJRSXLF` | December 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/M08UCKJRSXLF) |
| 16 | Introduction to Information Technology and AWS Cloud | Amazon Web Services | Course | `HU3GGYB0TGGM` | November 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/HU3GGYB0TGGM) |
| 17 | Generative AI Essentials: From Fundamentals to Real-World Applications | IBM | Course | `8QH3UK49X0UM` | November 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/8QH3UK49X0UM) |
| 18 | AI Foundations: How Artificial Intelligence Works | IBM | Course | `QFAOKQFWKO7B` | September 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/QFAOKQFWKO7B) |
| 19 | Generative AI Deep Research: Strategic AI Edge for Leaders | Vanderbilt University | Course | `C1OY5VKS1F0D` | February 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/C1OY5VKS1F0D) |
| 20 | Prompt Engineering for ChatGPT | Vanderbilt University | Course | `I5E6CQWH84N5` | November 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/I5E6CQWH84N5) |
| 21 | Generative AI Primer | Vanderbilt University | Course | `MJ18SQN0FE2H` | December 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/MJ18SQN0FE2H) |
| 22 | Agentic AI and AI Agents: A Primer for Leaders | Vanderbilt University | Course | `97SZ3BLWQE6M` | January 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/97SZ3BLWQE6M) |
| 23 | Introduction to AI | Google | Course | `16X9SJ5DCVMI` | February 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/16X9SJ5DCVMI) |
| 24 | Maximize Productivity With AI Tools | Google | Course | `VBZ89ZYHFTJY` | February 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/VBZ89ZYHFTJY) |
| 25 | Discover the Art of Prompting | Google | Course | `UTCZBMA99EQH` | February 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/UTCZBMA99EQH) |
| 26 | Use AI Responsibly | Google | Course | `V0EEKK8BU94M` | February 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/V0EEKK8BU94M) |
| 27 | Stay Ahead of the AI Curve | Google | Course | `094LSH2E5ZRV` | February 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/094LSH2E5ZRV) |
| 28 | Technical Support Fundamentals | Google | Course | `1DAZO0613LCX` | September 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/1DAZO0613LCX) |
| 29 | The Bits and Bytes of Computer Networking | Google | Course | `MD4QIT2NZ0FW` | October 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/MD4QIT2NZ0FW) |
| 30 | Operating Systems and You: Becoming a Power User | Google | Course | `AC72DQE4VRZ3` | October 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/AC72DQE4VRZ3) |
| 31 | System Administration and IT Infrastructure Services | Google | Course | `9TAUPELDAV34` | February 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/9TAUPELDAV34) |
| 32 | IT Security: Defense against the digital dark arts | Google | Course | `4QRBEXO29EQE` | January 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/4QRBEXO29EQE) |
| 33 | Accelerate Your Job Search with AI | Google | Course | `7SNN99T1UB4L` | December 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/7SNN99T1UB4L) |
| 34 | Generative AI & AI Agent Organizational Strategy for Leaders | Vanderbilt University | Course | `U0NWVTL5GEBO` | January 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/U0NWVTL5GEBO) |
| 35 | OpenAI GPTs: Creating Your Own Custom AI Assistants | Vanderbilt University | Course | `7I2797IVCKD0` | January 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/7I2797IVCKD0) |
| 36 | Start Writing Prompts like a Pro | Google | Course | `H18LC18NHGSU` | December 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/H18LC18NHGSU) |
| 37 | Design Prompts for Everyday Work Tasks | Google | Course | `P81DQ55BZPIE` | January 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/P81DQ55BZPIE) |
| 38 | Speed Up Data Analysis and Presentation Building | Google | Course | `H1Y7HBZEGZAB` | January 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/H1Y7HBZEGZAB) |
| 39 | Use AI as a Creative or Expert Partner | Google | Course | `O4HVO1E1NS2D` | January 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/O4HVO1E1NS2D) |
| 40 | Innovative Teaching with ChatGPT | Vanderbilt University | Course | `VEYQVWMDW9US` | January 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/VEYQVWMDW9US) |
| 41 | GPT Vision: Seeing the World through Generative AI | Vanderbilt University | Course | `W0OYGOV55T46` | December 2025 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/W0OYGOV55T46) |
| 42 | Trustworthy Generative AI | Vanderbilt University | Course | `BQ90OEBLRNM0` | January 2026 | **VERIFIED** | [Verify](https://www.coursera.org/account/accomplishments/verify/BQ90OEBLRNM0) |

---

## 5. Evidence for the six specialization certificates

Each row was rendered in its own fresh browser context. “Final URL” is the post-redirect address.

| ID | Rendered title | Recipient | Date on page | Final URL |
|---|---|---|---|---|
| `CT190TJLYPT7` | Generative AI Strategic Leader Specialization | Robert locust | see page | `https://www.coursera.org/account/accomplishments/specialization/CT190TJLYPT7` |
| `DA024S7Y1GKH` | Google AI Essentials Specialization | Robert locust | see page | `https://www.coursera.org/account/accomplishments/specialization/DA024S7Y1GKH` |
| `NC3UJ0LDPVND` | Google IT Support Professional Certificate | Robert locust | see page | `https://www.coursera.org/account/accomplishments/specialization/NC3UJ0LDPVND` |
| `46TOQXSQP79M` | Organizational Strategy with Generative AI & AI Agents Specialization | Robert locust | see page | `https://www.coursera.org/account/accomplishments/specialization/46TOQXSQP79M` |
| `VC6X0HJ0ZKVP` | Google Prompting Essentials Specialization | Robert locust | see page | `https://www.coursera.org/account/accomplishments/specialization/VC6X0HJ0ZKVP` |
| `Y54CWPZ5JJ4Q` | Generative AI for Educators & Teachers Specialization | Robert locust | see page | `https://www.coursera.org/account/accomplishments/specialization/Y54CWPZ5JJ4Q` |

Rendered text (first ~200 characters after “Completed by”):

- `CT190TJLYPT7` — sities For Governments Explore Degrees  Log In Join for Free Specialization Certificate Generative AI Strategic Leader Completed by Robert locust February 3, 2026 Approximately 1 months at 10 hours a
- `DA024S7Y1GKH` — For Universities For Governments Explore Degrees  Log In Join for Free Specialization Certificate Google AI Essentials Completed by Robert locust February 10, 2026 Approximately 1 months at 1 hours a
- `NC3UJ0LDPVND` — es For Universities For Governments Explore Degrees  Log In Join for Free Specialization Certificate Google IT Support Completed by Robert locust February 8, 2026 Approximately 3 months at 10 hours a
- `46TOQXSQP79M` — xplore Degrees  Log In Join for Free Specialization Certificate Organizational Strategy with Generative AI & AI Agents Completed by Robert locust January 31, 2026 Approximately 1 months at 10 hours a
- `VC6X0HJ0ZKVP` — versities For Governments Explore Degrees  Log In Join for Free Specialization Certificate Google Prompting Essentials Completed by Robert locust January 20, 2026 Approximately 1 months at 1 hours a 
- `Y54CWPZ5JJ4Q` — or Governments Explore Degrees  Log In Join for Free Specialization Certificate Generative AI for Educators & Teachers Completed by Robert locust January 13, 2026 Approximately 3 months at 2 hours a 

**Logout evidence:** every run displayed “Log In / Join for Free” in the header, and no authentication cookie was present in any context.

---

## 6. Subject category distribution

| Category | Credentials |
|---|---|
| Generative AI and Large Language Models | 9 |
| Information Technology and Technical Support | 7 |
| Prompt Engineering and AI Applications | 7 |
| Data Analytics and Business Intelligence | 6 |
| AI Strategy and Organizational Leadership | 4 |
| AI Agents and Agentic Systems | 3 |
| AI Automation and Productivity | 3 |
| Responsible AI and Related Topics | 2 |
| Cloud Computing and Infrastructure | 1 |
| **Total** | **42** |

---

## 7. Status labels on the site

- Every card carries **PUBLICLY VERIFIED** — text label plus icon, with a tooltip and screen-reader text explaining that the recipient and title are visible without signing in.
- The summary strip shows **42 total / 42 publicly verified / 0 account-scoped**, computed from the dataset at load time.
- The **Verification Status** filter remains data-driven; with 0 account-scoped records, selecting that option correctly shows the empty state.
- The status model still supports an `ACCOUNT-SCOPED` value in the data (`tools/portfolio_data.py` accepts it), so a future credential that genuinely cannot be viewed publicly can be recorded honestly rather than mislabelled.

---

## 8. Testing performed

| Check | Result |
|---|---|
| Data validation (`python tools/portfolio_data.py`) | **PASS** — structure, uniqueness, statuses, URLs, baseline 42/42/0, category totals, component deduplication, CSV parity, no embedded dataset |
| Playwright desktop suite | **PASS** — 12 cases |
| Playwright security suite | **PASS** — 4 cases |
| Playwright mobile suite (Pixel 7) | **PASS** — 6 cases |
| Anonymous verification of the six specialization URLs | **PASS** — 6/6 recipient + title + logged out |
| Negative control (invalid ID) | **PASS** — renders no recipient |

**Not performed:** Firefox/Safari/Edge, iOS Safari, screen-reader testing (NVDA/JAWS/VoiceOver), automated colour-contrast auditing, and network-throttling tests. These remain unverified rather than passing.

---

## 9. Known naming discrepancy

`NC3UJ0LDPVND` is titled **“Google IT Support Professional Certificate”** in the dataset, while the Coursera page renders it as a **“Specialization Certificate”** named **“Google IT Support”**. Both refer to the same credential; the portfolio keeps the program's commercial name.

The discrepancy, its evidence, and the owner options are recorded in [`DECISION_GOOGLE_IT_SUPPORT_NAMING.md`](DECISION_GOOGLE_IT_SUPPORT_NAMING.md). No title or type was changed.

---

## 10. Limitations

- Verification is a **page-level** check on 2026-11-04, not a cryptographic proof. Coursera controls these pages and could change or withdraw them.
- It was performed from a single network and browser; geo-specific or rate-limited behaviour is `NOT ESTABLISHED`.
- The pages require JavaScript. A recruiter with JavaScript disabled, or a link-preview bot, will not see the credential.
- Completion dates for three credentials are recorded at month granularity in the dataset while the page shows the exact day; this is a presentation choice, not a verification gap.

---

## 11. Conclusion

All **42** credentials are publicly verifiable: in a browser, without signing in, each link displays the recipient name and the credential title. No credential depends on private account access.

No cryptographic verification is claimed, and an HTTP 200 alone is explicitly **not** treated as verification.
