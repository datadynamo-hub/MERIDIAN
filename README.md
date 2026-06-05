# MERIDIAN

**Multi-jurisdictional Regulatory Intelligence and Decision Infrastructure for AI Navigation — built as a portfolio demonstrating what AI compliance research looks like when it's done to a professional standard.**

> *"Knowing the EU AI Act exists is not compliance. Understanding which parts of it apply to you — and why — is."*

[![View Live Demo](https://img.shields.io/badge/View%20Live%20Demo-%230070f3?style=for-the-badge&logo=vercel&logoColor=white)](https://meridian-one-weld.vercel.app)

---

## What This Is

MERIDIAN is a React application that helps organizations understand which AI regulations actually apply to them. Most AI governance tools present a wall of frameworks and leave you to figure out relevance yourself. MERIDIAN flips that: it starts with your organization, maps your specific exposure, and produces a structured compliance output scoped to your situation.

The tool has two components working together:

**The React app** — a client-side portfolio demo deployed on Vercel. A multi-stage intake form scopes the organization (type, sector, geography, AI activity), then generates an interactive tabbed report covering jurisdiction applicability, obligations, cross-cutting themes, an action plan, and a sources register. No backend. No external API calls. The demo report is hardcoded to a realistic sample case — SignalPath Technologies, a US accessibility tech company with EU, UK, and Canadian regulatory exposure — chosen because biometric processing in an accessibility context surfaces a more complex and instructive compliance profile than a generic fintech scenario.

**The Claude Project knowledge base** — a structured set of markdown files loaded into a Claude Project. This is the actual intelligence layer. When connected, MERIDIAN functions as a live regulatory research assistant: it runs the elicitation protocol, applies applicability logic across 40+ frameworks, fetches primary sources, and produces citable, tiered compliance outputs. The React app demonstrates the output format. The Claude Project delivers it with live research.

---

## The Scenario

**organization:** SignalPath Technologies — a fictional accessibility technology company providing AI-powered communication services for Deaf and hard-of-hearing communities. 680 employees. Incorporated in Delaware, headquartered in Salt Lake City. Users in the United States (nationwide), Canada, United Kingdom, and Germany.

**The AI system at the center of this analysis:** Real-time speech and sign language recognition, automated captioning, and biometric voice and gesture processing — deployed via third-party GPAI API with certified human captioners on-the-loop.

**The compliance question this demo answers:** What regulatory obligations apply to a US company that processes biometric data from Deaf users across four jurisdictions — and what is the enforcement exposure if it gets this wrong?

The answer covers Illinois BIPA (live class action risk), EU AI Act high-risk classification (biometric processing triggers Annex III), FCC CVAA captioning accuracy obligations, UK GDPR special category data, Colorado AI Act (in force February 2026), and Canada CPPA approaching. It is a harder and more instructive scenario than a standard fintech credit scoring example because the biometric processing is purpose-essential, not incidental — the organization cannot simply remove it to reduce compliance burden.

---

## Application Flow

```
Landing → organization Scoping (4 stages) → Generate Report → Interactive Report (6 tabs)
```

### Elicitation — 4 Stages

| Stage | What It Captures |
|-------|-----------------|
| **Your organization** | Role in AI supply chain (provider / deployer / both), sector, size |
| **Where Your Users & Outputs Land** | Country of incorporation, user jurisdictions, where AI output is consumed |
| **The AI System** | Activity type, biometric/sensitive data processing, GPAI dependency, human oversight model |
| **Maturity & Purpose** | Deployment stage, deliverable needed (obligations map / gap assessment / board briefing / audit preparation) |

The biometric data question in Stage 3 is a deliberate design choice. It is the single highest-impact trigger in the current regulatory landscape — EU AI Act Annex III, Illinois BIPA, UK GDPR Article 9, and Canada CPPA all turn on it. Undersurfacing it produces materially incomplete output.

### Report — 6 Tabs

| Tab | Content |
|-----|---------|
| **Overview** | organization profile, top priority obligations, jurisdiction matrix |
| **Map** | Interactive jurisdiction map — click any region to see tier, trigger, and penalty |
| **Obligations** | Expandable obligation cards with requirement text, action steps, and source citations |
| **Cross-Cutting** | Themes that appear across multiple jurisdictions with a conservative approach that satisfies all simultaneously |
| **Action Plan** | prioritized compliance roadmap by horizon: immediate (0–3 months), near-term (3–12 months), medium-term (12–24 months) |
| **Sources & Confidence** | Full sources register with tier, citation, and confidence flag; unknowns register with open legal questions |

---

## The Claude Project Knowledge Base

The `meridian/` directory contains the markdown intelligence layer that powers MERIDIAN when loaded into a Claude Project. These files are not imported into the React app — they are loaded as project knowledge and govern how MERIDIAN operates as a live research assistant.

```
meridian/
├── identity.md              # Who MERIDIAN is and what it does
├── rules.md                 # Operating rules — research discipline, source hierarchy
├── elicitation.md           # Structured intake protocol
├── applicability-logic.md   # Jurisdiction routing logic
├── methodology.md           # Research methodology and confidence framework
├── research-protocol.md     # Live source fetching protocol
├── sources.md               # Tiered source allowlist
├── examples.md              # Worked examples for calibration
├── jurisdictions/           # Per-jurisdiction regulatory summaries (15 jurisdictions)
├── sectoral/                # Sector-specific obligation overlays
└── output/                  # HTML template and synthesis rules
```

**Rule 0 of the knowledge base:** MERIDIAN never produces regulatory output from training data alone. Every analysis is built from live-fetched primary sources — legislation, implementing regulations, and enforcement guidance — cited to article and provision. If live fetching is unavailable, MERIDIAN says so rather than silently producing training-data output as though it were current research.

This matters because AI regulation is moving fast enough that six-month-old training data is a compliance liability, not an asset.

---

## Repository Structure

```
MERIDIAN/
├── README.md
├── .gitignore
└── meridian/
    ├── demo-report.jsx          # 6-tab interactive report component
    ├── elicitation-widget.jsx   # 4-stage intake form component
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── CLAUDE.md
    ├── identity.md              # Knowledge base: researcher identity
    ├── rules.md                 # Knowledge base: operating rules
    ├── elicitation.md           # Knowledge base: intake protocol
    ├── applicability-logic.md   # Knowledge base: jurisdiction routing
    ├── methodology.md           # Knowledge base: research methodology
    ├── research-protocol.md     # Knowledge base: live source protocol
    ├── sources.md               # Knowledge base: tiered source allowlist
    ├── examples.md              # Knowledge base: worked examples
    ├── jurisdictions/           # Per-jurisdiction regulatory briefs
    ├── sectoral/                # Sector-specific obligation overlays
    └── output/                  # HTML template and synthesis rules
```

---

## Stack

- React 18 + Vite
- Client-side only — no backend, no external API calls in the demo
- Inline styles throughout — no Tailwind, no CSS modules
- Deployed on Vercel from GitHub (auto-deploy on push)

---

## Frameworks Covered

`EU AI Act` `UK GDPR / ICO` `US Federal (FCC · FTC · ADA)` `Illinois BIPA` `Colorado AI Act` `Canada CPPA / AIDA` `Australia` `Singapore` `Brazil` `China` `Japan` `UAE` `Saudi Arabia` `NIST AI RMF` `ISO/IEC 42001`

---

## About

Jonathan Khan — Data Infrastructure and AI Governance Professional.

[LinkedIn](https://www.linkedin.com/in/jonathan-k-184393120/) · [SignalPath AI Governance Center](https://deaf-accessibility-ai-governance.streamlit.app/)
