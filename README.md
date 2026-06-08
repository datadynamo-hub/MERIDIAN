# MERIDIAN

**Multi-jurisdictional Regulatory Intelligence and Decision Infrastructure for AI Navigation.**

> *"Knowing the EU AI Act exists is not compliance. Understanding which parts of it apply to you, and why, is."*

[![View Live Demo](https://img.shields.io/badge/View%20Live%20Demo-%230070f3?style=for-the-badge&logo=vercel&logoColor=white)](https://meridian-one-weld.vercel.app)

---

## From Framework to Case Study

MERIDIAN was built on [BenjBruce's](https://github.com/BenjBruce) regulatory intelligence framework [ARIA_V1](https://github.com/BenjBruce/ARIA_V1). His architecture was the starting point. This is the build.

Changed by design:

- **Generic sample organization:** replaced with SignalPath Technologies, a fictional Deaf accessibility company in the Video Relay Service industry. A regulatory intelligence tool is only as useful as the domain it's applied to.
- **Intake questions:** resequenced to surface biometric data and high-risk AI triggers earlier. The EU AI Act and GDPR classification decision happens at intake, not at output.
- **Output format:** rebuilt as a structured HTML compliance report with freshness warnings, unknowns register, and jurisdiction-level confidence flags. A governance deliverable needs to be audit-ready, not just readable.
- **Knowledge base:** extended with FCC Part 64, ADA Title IV, Illinois BIPA, and California CPRA obligations. SignalPath's regulatory exposure doesn't stop at the EU border.

Extending a strong framework with a real domain problem is a deliberate choice. The architecture was his. The case study is mine.

---

## What This Is

Two components. One output.

**The React app** is a client-side portfolio demo deployed on Vercel. A 4-stage intake form scopes the organization: role in the AI supply chain, sector, geography, AI activity, biometric data exposure, oversight model, and maturity. It generates a 6-tab interactive compliance report covering jurisdiction applicability, obligations, cross-cutting themes, an action plan, and a full sources register. No backend. No external API calls. Client-side only.

**The MERIDIAN Knowledge Base** is the intelligence layer. Ten structured markdown files: a researcher identity, 12 operating rules, a branching intake protocol, a jurisdiction routing engine, a six-stage research methodology, a live source fetching protocol, a tiered source allowlist, and worked calibration examples. When connected, MERIDIAN runs the full intake scoping, applies applicability logic across 40+ frameworks in 15 jurisdictions, fetches primary sources in real time, and produces citable, tiered compliance output. The React app shows what that output looks like. The knowledge base delivers it with live research.

The demo report is hardcoded to a realistic scenario: SignalPath Technologies. That scenario was chosen deliberately. More on it below.

---

## The Scenario

**Organization:** SignalPath Technologies. Fictional accessibility technology company providing real-time communication services for Deaf and hard-of-hearing communities. 5,000+ employees. This is not a hypothetical industry. It mirrors the current operating reality of the dominant player in US deaf accessibility, including the regulatory exposure that comes with it.

**The AI system:** Real-time speech and sign language recognition, automated captioning, biometric voice and gesture processing. Deployed via third-party GPAI API. Certified human captioners on-the-loop.

**The compliance question:** What regulatory obligations apply to a US company processing biometric data from Deaf users across four jurisdictions, and what is the enforcement exposure if it gets this wrong?

The answer: Illinois BIPA with live class action risk. EU AI Act Annex III high-risk classification triggered by biometric processing. FCC CVAA captioning accuracy obligations. UK GDPR Article 9 special category data. Colorado AI Act in force February 2026. Canada CPPA approaching.

A standard fintech credit scoring scenario would have been easier to build and less instructive to read. SignalPath was chosen because the biometric processing is purpose-essential. Removing it eliminates the product entirely. The organization cannot reduce its compliance burden by removing the trigger. That constraint surfaces obligations most demo scenarios never reach.

---

## Application Flow

```
Landing  →  Organization Scoping (4 stages)  →  Generate Report  →  Interactive Report (6 tabs)
```

### Intake Form — 4 Stages

| Stage | What It Captures |
|-------|-----------------|
| **Your Organization** | Role in AI supply chain (provider / deployer / both), sector, size |
| **Where Your Users and Outputs Land** | Country of incorporation, user jurisdictions, where AI output is consumed |
| **The AI System** | Activity type, biometric and sensitive data processing, GPAI dependency, human oversight model |
| **Maturity and Purpose** | Deployment stage, deliverable needed (obligations map / gap assessment / board briefing / audit preparation) |

The biometric data question in Stage 3 is a deliberate design choice. It is the single highest-impact trigger in the current regulatory landscape. EU AI Act Annex III, Illinois BIPA, UK GDPR Article 9, and Canada CPPA all turn on it. Undersurfacing it produces materially incomplete output.

### Report — 6 Tabs

| Tab | Content |
|-----|---------|
| **Overview** | Organization profile, top priority obligations, jurisdiction matrix |
| **Map** | Interactive jurisdiction map. Click any region to see tier, trigger, and penalty |
| **Obligations** | Expandable obligation cards with requirement text, action steps, and source citations |
| **Cross-Cutting** | Themes that appear across multiple jurisdictions with a conservative approach that satisfies all simultaneously |
| **Action Plan** | Prioritized compliance roadmap by horizon: immediate (0–3 months), near-term (3–12 months), medium-term (12–24 months) |
| **Sources and Confidence** | Full sources register with tier, citation, and confidence flag. Unknowns register with open legal questions |

---

## The MERIDIAN Knowledge Base

The `meridian/knowledge-base/` directory contains the markdown intelligence layer. These files are not imported into the React app. They govern how MERIDIAN operates as a live research assistant.

```
meridian/knowledge-base/
├── identity.md              # Researcher identity, domain scope, honesty standards
├── rules.md                 # 12 operating rules, non-negotiables
├── elicitation.md           # Branching intake protocol
├── applicability-logic.md   # Jurisdiction routing engine
├── methodology.md           # Six-stage investigative research loop
├── research-protocol.md     # Live source fetching and novel discovery protocol
├── sources.md               # Global tiered source allowlist and denylist
├── examples.md              # Three worked examples across different org profiles
├── jurisdictions/           # Per-jurisdiction regulatory summaries (15 jurisdictions)
├── sectoral/                # Sector-specific obligation overlays
└── output/                  # HTML report schema and cross-jurisdiction synthesis rules
```

Rule 0: MERIDIAN never produces regulatory output from training data alone. Every analysis is built from live-fetched primary sources: legislation, implementing regulations, and enforcement guidance, cited to article and provision. If live fetching is unavailable, MERIDIAN says so. It does not silently substitute training data.

AI regulation moves fast enough that six-month-old training data is a compliance liability. That is the reason for the rule.

---

## Repository Structure

```
MERIDIAN/
├── README.md
├── .gitignore
└── meridian/
    ├── src/
    │   ├── App.jsx                  # Landing page and routing
    │   ├── ElicitationWidget.jsx    # 4-stage intake form
    │   ├── DemoReport.jsx           # 6-tab interactive report
    │   └── main.jsx                 # React entry point
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── knowledge-base/
        ├── CLAUDE.md                # AI operating instructions
        ├── identity.md
        ├── rules.md
        ├── elicitation.md
        ├── applicability-logic.md
        ├── methodology.md
        ├── research-protocol.md
        ├── sources.md
        ├── examples.md
        ├── jurisdictions/
        ├── sectoral/
        └── output/
```

---

## Stack

- React 18 + Vite
- Client-side only. No backend. No external API calls in the demo
- Inline styles throughout. No Tailwind, no CSS modules
- Deployed on Vercel from GitHub. Auto-deploys on push to main

---

## Frameworks Covered

`EU AI Act` `UK GDPR / ICO` `US Federal (FCC · FTC · ADA)` `Illinois BIPA` `Colorado AI Act` `Canada CPPA / AIDA` `Australia` `Singapore` `Brazil` `China` `Japan` `UAE` `Saudi Arabia` `NIST AI RMF` `ISO/IEC 42001`

---

## About

This build: Jonathan Khan, Data Infrastructure and AI Governance Professional. Built because most AI compliance tools tell you what regulations exist, not which ones apply to you. Building publicly.

Follow the build on LinkedIn: [Jonathan Khan](https://www.linkedin.com/in/jonathan-k-184393120/)

Related project: [Deaf-Accessibility-AI-Governance](https://github.com/datadynamo-hub/Deaf-Accessibility-AI-Governance)
