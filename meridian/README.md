# MERIDIAN
**A folder-based AI research specialist for global AI governance and compliance**

Built using interpretable context methodology. Drop this folder into a Claude Project and Claude becomes a specialist AI regulation researcher — investigative, source-disciplined, and globally aware.

---

## What This Researcher Does

It researches. Not summarizes.

When you describe your organization and AI use case, this researcher:
1. Asks the right scoping questions to understand what actually applies to you
2. Fetches live primary sources — legislation, regulator websites, official guidance — before drawing any conclusions
3. Detects new regulatory developments not anticipated by its briefing files and surfaces them with proper sources
4. Produces a structured, navigable HTML report covering your obligations, mapped by jurisdiction, prioritized by urgency

It covers 15 jurisdictions and regional frameworks, 5 sectoral overlays, and international standards — and it only loads what applies to your situation.

---

## Folder Structure

```
meridian/
│
├── identity.md              — Who the researcher is and what it covers
├── rules.md                 — Operating rules including Rule Zero (always fetch)
├── elicitation.md           — Branching question protocol to scope your situation
├── applicability-logic.md   — Jurisdiction routing engine (what applies to you)
├── methodology.md           — The six-stage investigative research loop
├── research-protocol.md     — Live fetch loop, novel discovery capture, staleness detection
├── sources.md               — Global tiered source allowlist and denied sources list
├── examples.md              — Three worked examples across different org profiles
│
├── jurisdictions/
│   ├── eu.md                — EU AI Act
│   ├── uk.md                — United Kingdom
│   ├── us-federal.md        — US Federal (sectoral)
│   ├── us-states.md         — US State Level (Colorado, NYC, Illinois, California, etc.)
│   ├── china.md             — China (CAC provisions)
│   ├── canada.md            — Canada (PIPEDA, Quebec Law 25, AIDA)
│   ├── brazil.md            — Brazil (LGPD, AI Bill)
│   ├── south-korea.md       — South Korea (PIPA, AI Basic Act)
│   ├── japan.md             — Japan (soft-law, METI guidelines)
│   ├── singapore.md         — Singapore (PDPA, MAS FEAT)
│   ├── australia.md         — Australia (Privacy Act, APRA, DISR)
│   ├── india.md             — India (DPDPA)
│   ├── uae.md               — UAE (DIFC, TDRA, UAE AI Office)
│   ├── saudi-arabia.md      — Saudi Arabia (PDPL, SDAIA, SAMA)
│   └── international.md     — CoE Convention, OECD, G7, ISO 42001, FSB
│
├── sectoral/
│   ├── financial-services.md
│   ├── healthcare.md
│   ├── employment.md
│   ├── public-sector.md
│   └── critical-infrastructure.md
│
└── output/
    ├── html-template.md     — HTML output specification and data schema
    └── synthesis-rules.md   — How to synthesise across jurisdictions
```

---

## How to Set Up

### Step 1 — Create a Claude Project
Go to claude.ai → Projects → New Project. Name it something like "MERIDIAN."

### Step 2 — Upload all files
Upload every file in this folder to the Project's knowledge base. Maintain the folder structure — name files clearly so Claude can reference them by name. Upload the jurisdictions/ files individually, or zip and note the structure in the README.

### Step 3 — Enable web search
This is critical. In your Claude Project settings, ensure web search is enabled. **The researcher is designed to fetch live sources during every session. Without web search, it will tell you it cannot run as a live research session and will not produce output as though training data were current.**

### Step 4 — Add a custom instruction (optional but recommended)
In the Project's custom instructions field, add:

> "You are the MERIDIAN defined in identity.md. Follow rules.md, elicitation.md, applicability-logic.md, methodology.md, research-protocol.md, and sources.md in every session. Always fetch before concluding. Always run the Novel Discovery Protocol when live research surfaces unexpected developments. Produce output in the format specified in output/html-template.md."

### Step 5 — Start a session
Open a new chat in the Project and say: **"I need to understand what AI regulations apply to my organization."**

The researcher will run the elicitation protocol and take it from there.

---

## What a Session Looks Like

**You say:** "I need to understand what AI regulations apply to my organization."

**Researcher says:** "Before I start pulling in regulatory sources, I want to make sure I'm looking at the right ones for your situation — there are over 40 jurisdictions with some form of AI regulation or policy now, and they don't all apply to everyone. I'll ask a few scoping questions..."

*[Elicitation runs — 3–5 minutes of branching questions]*

*[Applicability routing runs — determines which jurisdictions are Tier 1/2/3]*

*[Live research loop runs — fetches primary sources for each Tier 1/2 jurisdiction, runs verification and novel detection queries]*

**Researcher produces:**
- A jurisdiction matrix showing what applies and why
- An HTML report with Overview, Map, Obligations, Cross-Cutting, Action Plan, and Sources tabs
- A Session Discoveries document if any novel regulatory developments were found
- An explicit unknowns register for anything that could not be confirmed

---

## The Novel Discovery Feature

If live research surfaces a regulatory development that was not in the briefing files — a new law, new guidance, an enforcement action establishing precedent, a consultation paper — the researcher:

1. Verifies it against a Tier 1 (primary) source before acting on it
2. Searches for Tier 2 (specialist advisory) corroboration
3. Assesses whether it applies to your specific organization profile
4. Marks it `[NEW — DISCOVERED THIS SESSION]` in the output
5. Produces a Session Discoveries document you can save back to the Project

This is how the knowledge base stays current — each session's discoveries accumulate.

---

## Source Standards

Every regulatory claim traces to a Tier 1 or Tier 2 source:

- **Tier 1:** Primary legislation, official regulatory publications, court decisions (EUR-Lex, fca.org.uk, nist.gov, cac.gov.cn, etc.)
- **Tier 2:** Specialist law firms, Big 4 advisory publications, established think tanks, recognized industry bodies
- **Tier 3:** Quality journalism (FT, Reuters, Bloomberg Law) — corroboration only, never sole basis

**Never used:** Reddit, Wikipedia, LinkedIn posts, Medium, Substack, vendor whitepapers, PR Newswire, or any social platform.

---

## Output

The researcher produces a self-contained HTML file:

| Tab | Contents |
|---|---|
| Overview | organization profile, top 5 obligations by urgency, jurisdiction matrix |
| Map | World map color-coded by applicability tier, click for jurisdiction detail |
| Obligations | Full obligation cards by jurisdiction — collapsible, with source citations |
| Cross-Cutting | Themes spanning multiple jurisdictions, conservative approach recommendations |
| Action Plan | prioritized compliance sequence with effort sizing and ownership |
| Sources & Confidence | Every claim sourced and confidence-flagged; unknowns register |

---

## Important Limitations

**This researcher produces research output, not legal advice.** Regulatory positions — even those marked [SETTLED] — should be confirmed with qualified legal counsel in each relevant jurisdiction before use in live compliance programs.

**AI regulation is evolving rapidly.** Every output includes a freshness date and a reminder to recheck [PENDING] and [UNDER REVIEW] positions. The jurisdiction briefs carry a staleness threshold — sessions run after the threshold should be treated as requiring extended verification.

**Enforcement is uneven.** A Tier 1 directly applicable obligation in a jurisdiction with active enforcement (EU, UK FCA, US CFPB) carries different practical urgency than a technically applicable obligation in a jurisdiction where enforcement is nascent. The action plan accounts for this — the obligations map does not rank by compliance difficulty, it ranks by risk.

---

## Extending the Researcher

To add a new jurisdiction:
1. Create `jurisdictions/[country].md` following the research brief structure in eu.md
2. Add its scope triggers and Plotly code to applicability-logic.md
3. Add its primary sources to sources.md under the appropriate region

To add a new sectoral overlay:
1. Create `sectoral/[sector].md` following the structure in financial-services.md
2. Add the sector to the routing table in applicability-logic.md

To update a jurisdiction brief after a major regulatory development:
1. Save the Session Discoveries document from the session that found the development
2. Update the relevant jurisdiction .md file with the new fetch targets, updated baseline, and revised confidence flags
3. Update the `last verified` date

---

## About This Folder

Built using interpretable context methodology. Each file does one job. The researcher's behavior is fully legible — every rule, source, and routing decision is readable in plain markdown. There is no hidden logic.

Domain: AI governance and regulatory compliance, global scope.
Methodology: Live source fetching → applicability routing → investigative synthesis → structured HTML output.
Source discipline: Tiered allowlist with explicit denylist. Training data never presented as current.
