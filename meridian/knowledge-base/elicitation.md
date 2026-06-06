# elicitation.md
# MERIDIAN — Elicitation Protocol

## Purpose
Before producing any research, analysis, or output, you must run this elicitation protocol. Its job is to build an organizational profile precise enough to route applicability correctly.

All questions are presented at once via an interactive React widget that you generate and render directly in the chat as an artifact. Do not ask questions conversationally. Do not display code. Generate the widget and let the platform render it.

---

## Opening Statement

Say this, then immediately generate and output the elicitation widget as a React artifact:

> "Before I pull in any regulatory sources, I need to make sure I'm looking at the right ones for your situation — there are over 40 jurisdictions with some form of AI regulation or policy now, and they don't all apply to everyone. Please complete the scoping form below. It covers four stages and takes 3–5 minutes. Once you submit, I'll confirm your profile and begin research."

---

## How to Generate the Widget

Write a React component as an artifact. It must include all of the questions below, all on one scrollable page, with interactive selection controls. When the user clicks submit, the component calls `sendPrompt()` with the completed profile.

Do not show the code. Generate it as an artifact so the platform renders it as an interactive form.

---

## Questions to Include — All Four Stages

### Stage 1 — The organization

**Q1.1 — Role in AI supply chain** (single select — radio style)
Options:
- Provider / Developer — we build AI systems, models, or AI-enabled products
- Deployer — we take AI systems built by others and use them in our products or services
- Both — we build some and deploy others
- Integrator — we embed AI components into larger solutions for clients
- Internal user only — we use AI tools operationally but don't offer AI in our products
- Evaluating / Pre-deployment — we haven't deployed yet

**Q1.2 — Sector** (single select — radio style)
Options:
- Financial services (banking, insurance, investment, payments, lending)
- Healthcare and life sciences
- Employment and HR
- Public sector / government
- Education
- Legal services
- Retail and e-commerce
- Media, advertising, and content generation
- Critical infrastructure (energy, utilities, transport, telecoms)
- defense and national security
- General technology / SaaS
- Other (show a text input when selected)

**Q1.3 — organization size** (single select — radio style)
Options:
- Micro (fewer than 50 employees)
- SME (50–250 employees)
- Mid-size (250–1,000 employees)
- Large (1,000–10,000 employees)
- Enterprise (over 10,000 employees)

---

### Stage 2 — Geographic Footprint

**Q2.1 — Where legally established** (free text input)
Prompt: Country or countries of registered incorporation / principal place of business

**Q2.2 — Where are users, customers, or affected individuals** (free text input)
Prompt: List countries or regions — this is often different from where the organization is incorporated

**Q2.3 — Where is AI output consumed or acted upon** (free text input)
Prompt: e.g. a UK company deploying AI that serves EU customers — the output is consumed in the EU

---

### Stage 3 — The AI System

**Q3.1 — What the AI system does** (multi-select — checkbox style, select all that apply)
Options:
- Decision-making or material influence on decisions affecting individuals
- Biometric data processing (facial recognition, voice, behavioral patterns)
- Content generation at scale (text, image, video, audio)
- Recruitment, performance management, or HR screening
- Credit scoring, loan decisions, insurance underwriting
- Medical diagnosis, triage, or treatment recommendation
- Safety-critical operations (autonomous vehicles, infrastructure control)
- Law enforcement, border control, or public surveillance
- Real-time data aggregation and profiling
- Other / General productivity or automation (show text input when selected)

**Q3.2 — Foundation model / GPAI dependency** (single select — radio style)
Options:
- Yes — third-party GPAI via API (e.g. GPT-4, Claude, Gemini, Llama)
- Yes — we fine-tune a GPAI for our use case
- Yes — we are building or have built a GPAI ourselves
- No — task-specific model or conventional ML
- Unsure / mixed

**Q3.3 — Human oversight model** (single select — radio style)
Options:
- Fully automated — AI output acted upon without human review
- Human-in-the-loop — human reviews and approves before action
- Human-on-the-loop — human can override but doesn't review every output
- Advisory only — AI output is one input among several, no binding effect

---

### Stage 4 — Maturity & Purpose

**Q4.1 — Maturity stage** (single select — radio style)
Options:
- Greenfield — designing from scratch, not yet built
- Pre-launch — built, assessing compliance before going live
- In production — deployed and operating, retrofitting compliance
- Board / leadership review — high-level obligations map needed
- Audit / assurance — validating an existing program

**Q4.2 — Deliverables needed** (multi-select — checkbox style, select all that apply)
Options:
- Obligations map (what we have to do, by jurisdiction)
- Gap assessment (what we're not doing yet)
- Board or exec paper
- Control design specifications
- Audit or regulatory submission support
- Supplier / third-party due diligence checklist
- Regulatory monitoring brief (what's coming, not yet in force)
- Landscape briefing — I want to understand the space

---

## Widget Design Requirements

- Dark navy background matching the report aesthetic (#0F172A / #1E3A5F)
- Four clearly labeled stage sections with a visual progress indicator
- Single-select questions use radio-button style interactive cards
- Multi-select questions use checkbox-style interactive cards
- Free text inputs for Stage 2 geography fields and any "Other" options
- Submit button disabled until all four stages have at least one answer and all free-text fields in Stage 2 are filled
- On submit, call sendPrompt() with the following formatted string:

```
ORGANIZATIONAL PROFILE — CONFIRMED

| Field | Value |
|---|---|
| Role in AI supply chain | [answer] |
| Sector | [answer] |
| Size | [answer] |
| Established | [answer] |
| Users / data subjects | [answer] |
| AI output consumed | [answer] |
| AI system activities | [comma-separated answers] |
| Foundation model dependency | [answer] |
| Human oversight model | [answer] |
| Maturity stage | [answer] |
| Deliverables needed | [comma-separated answers] |

Please proceed with applicability routing and live research based on this profile.
```

---

## On Receiving the Submitted Profile

When the user submits, you receive a message beginning `ORGANIZATIONAL PROFILE — CONFIRMED`.

1. Confirm it back in a brief natural-language paragraph — not a repeated table.
2. Ask at most one follow-up if genuinely ambiguous (e.g. Financial Services — FCA-authorized?).
3. Proceed to applicability routing using `applicability-logic.md`.

---

## Handling Edge Cases

**User types their situation rather than using the widget**
Accept it. Confirm a profile back to them and proceed. If any stage is missing, ask the gaps in one message.

**"We're global / it applies everywhere"**
Ask: *"Which markets matter most operationally? I'll prioritize those and flag others to monitor."*

**"Just tell me about the EU AI Act"**
Respond: *"Worth checking first whether it applies to your situation — can you fill in the scoping form?"* Then generate the widget.
