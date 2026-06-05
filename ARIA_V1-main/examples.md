# examples.md
# ARIA — Worked Examples

These three examples show what the elicitation, applicability routing, live research, and output look like for different organisation profiles. They are the benchmark for what "good" looks like from this researcher.

---

## Example 1 — UK Fintech Credit Lender with EU Users

### Elicitation exchange

**Researcher:** Before pulling in regulatory sources, I want to make sure I'm looking at the right ones for your situation. I'll ask a few scoping questions.

*What does your organisation do in relation to AI?*

**User:** We deploy AI built by a third party for credit decisioning. We're the lender, not the model builder.

**Researcher:** Got it — you're a deployer. *What sector?*

**User:** Financial services — we're FCA-authorised, consumer lending.

**Researcher:** *Where is the organisation established, and where are your borrowers?*

**User:** Incorporated in the UK. Borrowers in the UK and Germany mainly, some Netherlands.

**Researcher:** *Where is the AI output consumed — where do credit decisions take effect?*

**User:** UK and EU — our German and Dutch customers get decisions through the same model.

**Researcher:** *Does the AI make the decision autonomously, or does a human review it?*

**User:** Human-on-the-loop. Someone can override but doesn't review every decision.

**Researcher:** *Are you using a third-party GPAI model like GPT-4 or Claude as part of this?*

**User:** Yes, we call a third-party API for part of the assessment.

**Researcher:** *Where are you in the process — pre-launch or already live?*

**User:** Live in production. We need to understand what we have to retrofit.

**Researcher:** *What do you need from this — an obligations map, a gap assessment, or both?*

**User:** Both, focused on what we have to do and by when.

**Confirmed profile:**

| Field | Value |
|---|---|
| Role | Deployer |
| Sector | Financial services — FCA-authorised consumer lender |
| Established | United Kingdom |
| Users / output consumed | UK, Germany, Netherlands (EU) |
| AI type | Credit decisioning — automated, GPAI dependency, human-on-the-loop |
| Maturity | In production, retrofitting compliance |
| Deliverable | Obligations map and gap assessment |

### Applicability routing

- **EU AI Act — Tier 1:** Deployer with EU users; credit decisioning explicitly listed in Annex III §5(b) as high-risk AI. Deployer obligations in force Aug 2026; prohibited practices audit required NOW.
- **UK — Tier 1:** FCA-authorised deployer; FCA Consumer Duty applies; ICO UK GDPR Art.22 automated decision-making applies now; PRA SS1/23 model risk management applies.
- **US Federal — Tier 1 (sectoral):** Third-party GPAI provider is US-based; CFPB adverse action requirements apply to any US-nexus credit decisions; check for US customer exposure.
- **International — Tier 3:** ISO/IEC 42001, NIST AI RMF as procurement and governance baselines.

Sectoral overlays: financial-services.md.

### What live research should find and flag

After fetching:
- EUR-Lex Art.27 — FRIA scope for private credit deployers [CONTESTED] — flag, Commission guidance pending
- FCA Consumer Duty multi-firm review on AI outcomes — [SETTLED] if published, check FCA website
- CFPB adverse action AI guidance — [SETTLED], verify current status post-administration change

Novel detection query `"EU AI Act credit decisioning guidance 2025"` should be run — if EU AI Office has issued sector-specific guidance for credit AI, capture as novel discovery.

### What good output looks like

**Overview tab:** Organisation is subject to 3 directly applicable frameworks. Top obligation: EU AI Act prohibited practices audit (in force NOW). Second: FCA Consumer Duty outcomes review for AI credit model (Q3 2025). Third: CFPB adverse action explanation design (ongoing). Human-on-the-loop oversight model requires strengthening — FCA Consumer Duty sets a higher bar than EU Art.14 structural requirement alone.

**Cross-cutting:** Automated decision-making transparency is the dominant theme — EU Art.26(6), UK GDPR Art.22, and CFPB adverse action all require disclosure and explanation. Build one disclosure framework calibrated to the most demanding standard (UK GDPR Art.22 right to explanation and human review) and apply it across all jurisdictions.

**Gap identified:** GPAI dependency is not currently disclosed to borrowers. EU Art.13 requires transparency about AI system use, including third-party model involvement. This is a pre-deployment obligation under Art.5 transparency requirements and an Aug 2026 deployer obligation. Gap requires design change.

---

## Example 2 — US-Only HR Technology Company

### Confirmed profile

| Field | Value |
|---|---|
| Role | Provider (builds AI HR screening tools) |
| Sector | General technology — HR software |
| Established | United States (Delaware, HQ California) |
| Users / customers | US employers in multiple states; their employees and job applicants in those states |
| AI type | CV screening, candidate ranking, video interview analysis |
| GPAI dependency | Yes — fine-tunes open-source model |
| Maturity | Greenfield — assessing compliance before launch |
| Deliverable | Obligations map for product design |

### Applicability routing

- **US Federal — Tier 1 (sectoral):** EEOC Title VII disparate impact applies to AI hiring tools used by employer customers; FTC unfair/deceptive practices if AI claims are misleading. Provider obligations flow through to employer customers.
- **US States — Tier 1:** NYC Local Law 144 (bias audit for AEDT used in NYC hiring — this company's employer customers must comply; provider must facilitate audit); Illinois AI Video Interview Act (employer customers must notify, explain, consent — provider must enable); Colorado AI Act (if employer customers have Colorado employees — high-risk AI in employment from Feb 2026).
- **EU AI Act — Tier 2:** If any employer customers are EU-based or hire EU-based applicants, EU AI Act high-risk employment obligations flow through supply chain. Provider must supply conformity documentation contractually.
- **International — Tier 3:** NIST AI RMF bias testing profile relevant to US procurement.

Sectoral overlay: employment.md.

### What live research should find and flag

Novel detection query `"HR AI software regulation new state 2025"` — state AI employment laws are the fastest-moving area. Any new state law enacted after May 2025 affecting AI in hiring must be captured as a novel discovery. Illinois, New York, Maryland, and Washington have all had active AI employment bills.

### What good output looks like

**Overview:** Five US states with active AI employment obligations. NYC Local Law 144 is live — employer customers in NYC must have bias audits. Provider cannot be audit-ready without building audit-facilitation into the product. This is a product design requirement, not just a compliance checklist item.

**Action plan item 1:** Build bias audit data export capability into the product. NYC LL 144 requires employers to use an independent auditor — that auditor needs historical outcome data. Without an export function, every employer customer is non-compliant. Design this before launch.

**Novel discovery format (if found):** "AEDT-AEDT-N01 — Illinois AEDT Bill enacted [date]. [Source: ilga.gov, Tier 1]. This organisation's employer customers with Illinois applicants would face new disclosure and audit obligations from [effective date]. Recommend adding Illinois to compliance scope and updating customer contractual terms."

---

## Example 3 — Global SaaS Platform with EU, UK, US, Singapore, UAE Users

### Confirmed profile

| Field | Value |
|---|---|
| Role | Provider and deployer (builds and deploys its own AI features) |
| Sector | General technology — B2B SaaS (project management / productivity) |
| Established | United States (Delaware, US HQ) |
| Users / output consumed | EU (France, Germany, Spain), UK, US, Singapore, UAE |
| AI type | Content generation, document summarisation, meeting transcription and analysis, task prioritisation recommendations |
| GPAI dependency | Yes — uses third-party GPAI API |
| Human oversight | Advisory only — AI output is one input, no binding decisions on individuals |
| Maturity | In production, first compliance review |
| Deliverable | Obligations map — board-level paper |

### Applicability routing

- **EU AI Act — Tier 1:** Provider placing AI features on EU market. However: use case (productivity, content generation, task recommendations) is unlikely to meet high-risk classification under Annex III. Prohibited practices audit still required (subliminal manipulation check relevant for engagement-optimising features). GPAI: company uses GPAI — obligations flow to the GPAI provider, not to deployer. Transparency obligations apply if AI interacts with individuals. [CONTESTED] — boundary between general-purpose AI system and high-risk AI for this use case requires confirmation.
- **UK — Tier 1:** ICO guidance on generative AI and transparency; UK GDPR data processing obligations; no binding AI-specific law.
- **US Federal — Tier 3:** NIST AI RMF. No sectoral triggers for productivity software.
- **Singapore — Tier 1:** PDPA applies to personal data in meeting transcriptions. MAS FEAT not applicable (not financial services).
- **UAE — Tier 1:** DIFC data protection if UAE operations are DIFC-based; federal personal data law otherwise.
- **International — Tier 3:** ISO/IEC 42001, OECD principles for AI governance programme.

### What live research should find and flag

This is the example where the "significant risk" [CONTESTED] flag matters most. The agent must fetch EU AI Office guidance on what qualifies as high-risk under the productivity software use case. If no definitive guidance exists, the output must say so and recommend sandbox engagement. It must NOT quietly resolve the uncertainty by saying "this is not high-risk."

Novel detection: `"EU AI Act GPAI transparency general purpose 2025"` — if EU AI Office has issued guidance specifically on deployers of GPAI in productivity software, that changes the obligations landscape significantly. Surface it if found.

### What good output looks like

**Overview (board paper calibration):** Three jurisdictions impose binding obligations. EU AI Act: prohibited practices audit required now; high-risk classification uncertain for this use case — [CONTESTED], recommend EU AI Office sandbox. UK: ICO transparency obligations for generative AI in processing employee/customer data. Singapore: PDPA obligations for meeting transcription data. NIST AI RMF alignment recommended as governance baseline across all markets.

**Key finding to surface prominently:** The GPAI dependency shifts the main EU AI Act obligations to the GPAI provider (OpenAI, Anthropic, etc.). The company's obligations are as a deployer — primarily transparency to users, data governance, and ensuring it does not use GPAI beyond provider-specified purposes. This is materially less burdensome than if the company were the GPAI provider. Board should understand this distinction.

**Unknown to register:** EU AI Act classification for productivity AI featuring content generation is [CONTESTED]. The company should monitor EU AI Office guidance and consider voluntary EU AI Act sandbox engagement to get clarity before Aug 2026 obligations apply.

---

## What These Examples Demonstrate

1. **Elicitation shapes everything.** The same EU AI Act applies very differently to a UK credit lender (deployer, Annex III confirmed), a US HR software company (provider, supply chain obligations), and a global SaaS (deployer, classification uncertain). The elicitation drives the routing drives the output.

2. **Uncertainty is not papered over.** All three examples carry [CONTESTED] flags where the law is genuinely unsettled. The researcher does not resolve uncertainty with confident language.

3. **Novel discovery is embedded.** Each example includes a novel detection query and what a discovery would look like — because in a live session, something may have changed since the brief was last verified.

4. **Output is calibrated to the deliverable.** Example 2 produces product design requirements. Example 3 is calibrated as a board paper. Same underlying research, different synthesis.
