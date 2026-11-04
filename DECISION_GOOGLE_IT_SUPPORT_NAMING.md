# DECISION REQUIRED — "Google IT Support" naming (NC3UJ0LDPVND)

**Status:** open — owner decision required.
**Date observed:** 2026-11-04.
**Impact on totals:** none. The credential remains one of the 6 specializations / professional certificates, so the portfolio stays at 42 total / 42 publicly verified. Only the label and type are in question.

---

## What Coursera actually displays

Opened anonymously (`https://coursera.org/verify/specialization/NC3UJ0LDPVND` → redirects to `/account/accomplishments/specialization/NC3UJ0LDPVND`), the page renders:

```
Specialization Certificate
Google IT Support
Completed by Robert locust
February 8, 2026
…
Coursera certifies their successful completion of Google Google IT Support Specialization.
```

Two details matter:

1. The certificate heading reads **"Specialization Certificate"**, not "Professional Certificate".
2. The certification sentence names it **"Google IT Support Specialization"** (Coursera's own text contains a duplicated "Google").
3. The exact string **"Google IT Support Professional Certificate" does not appear anywhere on the page.**

## What the portfolio currently says

| Field | Value |
|---|---|
| `title` | `Google IT Support Professional Certificate` |
| `type` | `Professional Certificate` |

Coursera markets this program publicly as the *Google IT Support Professional Certificate* (it is one of the Google Career Certificates), so the portfolio's name is the program's commercial name, while the issued certificate object is a Coursera **specialization** certificate.

## Question for the owner

> Should `NC3UJ0LDPVND` keep the program's commercial name and type, or match the certificate Coursera actually issues?

## Options

| # | Title | Type | Consequence |
|---|---|---|---|
| **A (current)** | `Google IT Support Professional Certificate` | `Professional Certificate` | Matches how the program is marketed and searched; differs from the certificate page's own heading. No count change. |
| **B** | `Google IT Support Specialization` | `Specialization` | Exactly matches the page. The portfolio would then show 6 specializations and 0 professional certificates. No change to 42/42 totals. |
| **C** | `Google IT Support Professional Certificate` | `Specialization` | Keeps the familiar name, matches the certificate class. Split becomes 5 specialization + 1 "professional certificate (issued as specialization)". Slightly awkward. |

## Recommendation

**Keep option A for now** and let the verification report state plainly that Coursera renders the credential as "Google IT Support Specialization". Rationale:

- The portfolio title is the name a recruiter will search for.
- The link itself is the authority; anyone clicking it sees the page and the name Coursera uses.
- Changing it alters the credential-type breakdown for no verifiable gain.

**No change was made.** The dataset still carries option A. This file records the discrepancy so it is not lost.

## Evidence

- Anonymous Playwright render, 2026-11-04 (fresh context, no cookies, "Log In" visible in the header).
- Rendered text extract: `Specialization Certificate Google IT Support Completed by Robert locust February 8, 2026 … Coursera certifies their successful completion of Google Google IT Support Specialization.`
- Page does not contain `Google IT Support Professional Certificate` (**PROVEN** by full-text search of the rendered page).
