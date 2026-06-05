# applicability-logic.md
# ARIA — Applicability Logic

## Purpose
This file is the routing engine. After elicitation produces a confirmed organisational profile, this file determines which jurisdictions are relevant and at what tier. It governs what gets loaded, what gets prioritised, and what gets set aside.

You must apply this logic before generating any research output. Do not present regulations that don't apply. Do not omit regulations that do.

---

## Applicability Tiers

Every jurisdiction is assigned one of five tiers for this organisation:

| Tier | Label | Meaning |
|---|---|---|
| 1 | **Directly Applicable** | Legal obligations exist. Non-compliance carries enforcement risk. Load full jurisdiction file. |
| 2 | **Indirectly Applicable** | Obligations flow through supply chain, contractual relationships, or cross-border data flows. Load jurisdiction file, flag indirect nature. |
| 3 | **Soft-Law Alignment Recommended** | No binding obligations but voluntary frameworks carry regulatory expectation, procurement weight, or litigation risk. Load jurisdiction file, frame as alignment not compliance. |
| 4 | **Monitor — Pending or Emerging** | Legislation in progress or policy developing. Not yet in force. Flag trajectory, key dates, likely obligations. |
| 5 | **Not Applicable** | No meaningful nexus. Do not load. Note briefly why if user asks. |

---

## Core Applicability Principles

Apply these before consulting jurisdiction-specific triggers.

**Extraterritoriality principle**
Most modern AI regulations follow a market-access model, not an establishment model. If your AI system's output is consumed by or affects people in a jurisdiction, that jurisdiction's law may apply regardless of where the organisation is incorporated. This is explicit in the EU AI Act, China's Generative AI Measures, and implicit in many others. Always test Q2.2 (users) and Q2.3 (output consumed) as well as Q2.1 (establishment).

**Supply chain cascade principle**
Being a downstream deployer of an AI system does not insulate you from obligations. Under the EU AI Act, deployers of high-risk systems carry obligations directly. Under most data protection regimes, processing personal data via AI triggers controller or processor obligations regardless of who built the model. Always apply the role distinction from Q1.1.

**Sector overlay principle**
Sector-specific regulation stacks on top of, and sometimes overrides, horizontal AI regulation. A financial services firm deploying AI in credit decisioning must comply with both AI-specific law (where applicable) and financial services regulation (always applicable). Sector overlays are never optional — load relevant sectoral files alongside jurisdiction files.

**Uncertainty principle**
Where law is unsettled, pending, or subject to contested interpretation, say so explicitly. Do not present a probable position as settled. Use the confidence flags: [SETTLED], [CONTESTED], [PENDING], [SOFT-LAW], [UNDER REVIEW].

---

## Jurisdiction Routing Rules

### European Union — EU AI Act (Regulation 2024/1689)

**In force:** August 2024. Phased application through August 2026 (prohibited practices: February 2025; GPAI: August 2025; high-risk systems: August 2026; some high-risk categories: 2027).

**Tier 1 triggers (any one sufficient):**
- Organisation places an AI system on the EU market
- Organisation puts an AI system into service in the EU
- Output of AI system is used in the EU (deployer in EU, even if provider is outside EU)
- Organisation is a provider of a GPAI model made available in EU
- Organisation is an importer or distributor of an AI system for the EU market

**Tier 2 triggers:**
- Organisation provides AI components to an EU-market deployer (supply chain obligation flows upstream via contract)
- Organisation processes data from EU data subjects through AI (interacts with EU GDPR)

**Not applicable if:**
- AI system is exclusively used for military, national security, or defence purposes by EU Member State
- Personal/non-professional use with no commercial element
- Pure R&D with no market release in EU

**High-risk classification — check these use cases explicitly:**
Biometric identification; critical infrastructure management; education and vocational training; employment/worker management; essential private and public services (credit, benefits); law enforcement; migration and border control; administration of justice; AI in safety-critical components of products already regulated (medical devices, aviation, machinery).

**GPAI-specific obligations (if Q3.2 = yes, building GPAI):**
Technical documentation, copyright policy, training data summary. If systemic risk designation applies (>10^25 FLOPs): adversarial testing, incident reporting, cybersecurity obligations, report to EU AI Office.

**Confidence flag:** [SETTLED] for structure and prohibited practices; [CONTESTED] for precise scope of "placing on market" for API-only providers; [PENDING] for delegated acts on specific high-risk categories.

---

### United Kingdom

**Tier 1 triggers:**
- Organisation is FCA, PRA, or other sector regulator-authorised and uses AI in regulated activities → sector regulator AI expectations apply (see sectoral/financial-services.md)
- Organisation processes UK personal data through AI → UK GDPR Article 22 (automated decision-making) applies
- Organisation uses AI in ways the ICO has issued guidance on (employment, recruitment, generative AI, biometrics)

**Tier 3 (Soft-Law Alignment Recommended) for horizontal AI governance:**
- UK Government's pro-innovation principles (safety, security, fairness, accountability, transparency, contestability, redress) are not yet statutory — they are cross-sector expectations with sector regulators as interpreters
- DSIT AI Safety Institute output informs regulatory posture but is not binding

**Tier 4 (Monitor):**
- AI (Regulation) Bill — government position as of 2025 is sector-led regulation, but political direction can shift. Monitor for primary legislation. DSIT has indicated a statutory duty of care may follow voluntary phase.

**Key distinction from EU AI Act:**
UK explicitly chose not to mirror the EU AI Act. Do not apply EU AI Act risk classifications to UK entities unless they also have EU market exposure. UK approach is sector-specific, outcomes-based, proportionate. Frame separately.

**Confidence flag:** [SETTLED] for UK GDPR and sector regulator expectations; [SOFT-LAW] for cross-sector AI principles; [PENDING] for primary AI legislation.

---

### United States — Federal

**No horizontal federal AI regulation in force as of 2025.**

**Tier 1 triggers (sector-specific):**
- Financial services: CFPB guidance on AI in credit (adverse action explanations, ECOA/Reg B); OCC model risk management (SR 11-7); SEC no-action letters and proposed rules on AI in investment advice; FINRA AI guidance
- Healthcare: FDA oversight of AI/ML-based Software as Medical Device (SaMD); OCR guidance on AI and HIPAA
- Employment: EEOC guidance on AI in hiring (Title VII disparate impact); NLRB emerging position on AI monitoring
- Federal contractors: OMB Memo M-24-10 on AI governance in federal agencies; Federal AI Risk Management requirements under EO 14110 (note: EO 14110 was revoked January 2025; monitor for replacement posture)

**Tier 3:**
- NIST AI Risk Management Framework (AI RMF 1.0) — voluntary but de facto baseline for enterprise AI governance; increasingly referenced in procurement and litigation
- NIST AI RMF Generative AI Profile (NIST AI 600-1) — specific to GPAI
- White House AI principles — aspirational, not enforceable, but shape agency interpretation

**Critical note on federal posture shift:**
Executive Order 14110 (Biden AI Safety EO) was revoked in January 2025. The current administration's AI policy direction emphasises AI competitiveness over precautionary governance. NIST AI Safety Institute mandate was restructured. Monitor NIST, OMB, and sector agency guidance carefully — enforcement posture is in flux. [UNDER REVIEW]

**Confidence flag:** [SETTLED] for sector-specific rules pre-2025; [UNDER REVIEW] for federal-level AI governance posture; [SOFT-LAW] for NIST AI RMF.

---

### United States — State Level

**Load us-states.md if any of the following:**
- Organisation has employees, operations, or customers in Colorado, California, Texas, Illinois, New York City, Utah, Tennessee, Virginia, or Maryland
- Product involves automated employment decisions affecting individuals in any US state

**Key state provisions:**
- **Colorado AI Act (SB 24-205)** — in force February 2026. Applies to developers and deployers of "high-risk AI systems" (consequential decisions on consumers in education, employment, financial services, healthcare, housing). Risk assessment, impact assessment, disclosure, and appeal rights required. Tier 1 if Colorado customers.
- **NYC Local Law 144** — automated employment decision tools used in hiring/promotion of NYC employees must have annual bias audits by independent auditor; disclosure to candidates. Tier 1 if NYC employment.
- **Illinois BIPA** — biometric data including facial geometry. Strict liability, private right of action. Tier 1 if biometric processing of Illinois residents.
- **California** — CPRA/CCPA automated decision-making regulations under development by CPPA; existing rules on profiling opt-out. AB 2930 (AI accountability bill) passed 2024, vetoed by governor — reintroduction likely. Tier 4 for legislation, Tier 1 for CPRA compliance.
- **Utah, Tennessee, Virginia, Maryland** — consumer AI disclosure and transparency obligations for certain AI interactions. Tier 1 where nexus exists.

---

### China

**Tier 1 triggers (any nexus to users in mainland China):**
- Providing AI-generated content (text, image, audio, video, code) to users in China → Generative AI Measures (2023) apply: content compliance, security assessment, algorithm filing
- Operating recommendation algorithms serving Chinese users → Algorithmic Recommendation Provisions (2022): transparency, user control, labelling requirements
- Processing or generating deepfake/synthetic media → Deep Synthesis Provisions (2022): watermarking, consent, security measures
- Providing AI services classified as "important data" processing → Cybersecurity Law, Data Security Law, PIPL overlay

**Tier 2:**
- Operating outside China but with upstream data or model relationships with Chinese entities may trigger cross-border data transfer rules under PIPL

**Critical note:**
China's AI regulatory framework is administered by the Cyberspace Administration of China (CAC) and is enforcement-active. Non-compliance for organisations with China market presence is not a theoretical risk. However, for organisations with no China nexus, these regulations do not apply extraterritorially in the same way EU law does.

**Confidence flag:** [SETTLED] for current provisions; [PENDING] for draft Basic AI Law (comprehensive horizontal framework in development).

---

### Canada

**Tier 1 (in force):**
- Processing personal data through AI for commercial purposes → PIPEDA applies (and provincial equivalents: Quebec Law 25 is most stringent — mandatory privacy impact assessments for automated profiling)
- AI-generated content and automated decisions affecting individuals → Quebec Law 25 Articles 12, 22, and 23 (automated decision-making transparency and challenge rights)

**Tier 4 (Monitor):**
- **AIDA (Artificial Intelligence and Data Act)** — tabled under Bill C-27, not yet passed as of 2025. Has faced delays and political uncertainty. If passed, would create Tier 1 obligations for "high-impact AI systems." Monitor Parliament.ca for progress.
- Quebec Law 25 AI provisions largely in force — treat as Tier 1 for Quebec-nexus organisations.

**Confidence flag:** [SETTLED] for PIPEDA and Quebec Law 25; [PENDING] for AIDA.

---

### Brazil

**Tier 1:**
- Processing personal data of Brazilian residents through AI → LGPD (Lei Geral de Proteção de Dados): automated decision-making transparency (Article 20), right to explanation, right to human review

**Tier 4:**
- Brazilian AI Bill (PL 2338/2023) — passed Senate 2024, under review in Chamber of Deputies. Proposes risk-based classification aligned broadly to EU AI Act model. If enacted: Tier 1 for organisations with Brazilian market presence.

**Confidence flag:** [SETTLED] for LGPD; [PENDING] for AI Bill.

---

### South Korea

**Tier 1:**
- Processing personal data through AI → Personal Information Protection Act (PIPA) as amended 2023: automated decision-making provisions, right to explanation, right to opt-out for decisions with "significant effect"
- Operators of AI-generated content services with Korean users → AI-Generated Content labelling guidance from KCC

**Tier 4:**
- AI Basic Act — under legislative development. South Korea has been active in AI governance globally (hosted AI Seoul Summit 2024). Likely to produce binding framework.

**Confidence flag:** [SETTLED] for PIPA provisions; [PENDING] for AI Basic Act.

---

### Japan

**Tier 3 (Soft-Law):**
- Japan's AI governance approach is voluntary, principle-based. METI AI Governance Guidelines (1.2, 2024) and the Hiroshima AI Process (G7) are the operative frameworks.
- No binding horizontal AI law in force. Diet has not passed AI-specific legislation.
- For regulated sectors (finance, healthcare): sector regulator guidance applies.

**Tier 4:**
- Cabinet Office and METI exploring regulatory options post-G7 and post-Seoul. Watch for legislative signals in 2025–2026.

**Important framing note:** Japan explicitly positions itself as a pro-innovation jurisdiction. Do not frame the absence of binding law as a compliance gap — frame it as a lower regulatory burden with alignment to voluntary international norms recommended.

**Confidence flag:** [SOFT-LAW] throughout; [PENDING] for legislative development.

---

### Singapore

**Tier 1:**
- Processing personal data through AI → PDPA 2012 as amended: automated decisions, data portability, accountability obligations
- Financial services sector: MAS FEAT Principles (Fairness, Ethics, Accountability, Transparency) — mandatory for MAS-regulated firms using AI in financial services

**Tier 3:**
- IMDA Model AI Governance Framework (2020, updated 2023) — voluntary but widely adopted; referenced in procurement
- AI Verify testing toolkit — voluntary but signals PDPC regulatory posture

**Tier 4:**
- Singapore Advisory Council on Ethical Use of AI developing updated governance framework. Watch for PDPA amendments and potential AI-specific provisions.

**Confidence flag:** [SETTLED] for PDPA and MAS FEAT; [SOFT-LAW] for IMDA framework; [PENDING] for legislative development.

---

### Australia

**Tier 1:**
- Processing personal data through AI → Privacy Act 1988 (as amended): Australian Privacy Principles apply; Privacy Commissioner has issued AI guidance; automated decision-making subject to notification obligations
- Financial services: APRA CPS 230 (operational risk) and ASIC guidance on AI in financial advice

**Tier 3:**
- Department of Industry DISR Voluntary AI Safety Standard (2024) — 10 voluntary guardrails for organisations deploying AI in high-risk settings. Referenced in government procurement.

**Tier 4:**
- Privacy Act reform — ongoing, Attorney-General's review recommending stronger automated decision-making provisions. Monitor.
- Potential Technology Safeguards Act provisions covering AI — in discussion.

**Confidence flag:** [SETTLED] for Privacy Act and sector regulator guidance; [SOFT-LAW] for DISR guardrails; [PENDING] for reform.

---

### India

**Tier 1:**
- Processing personal data through AI affecting Indian data principals → Digital Personal Data Protection Act 2023 (DPDPA): automated processing obligations, consent requirements, right to explanation developing through rules
- DPDPA Rules under development by MeitY — specific AI provisions expected

**Tier 3:**
- MeitY AI Advisory (March 2024) — required platforms to label AI-generated content and obtain government approval before deploying "unreliable" AI. Partially walked back; current posture is advisory. Treat with caution. [UNDER REVIEW]
- NASSCOM AI framework — voluntary industry guidance

**Tier 4:**
- India National AI Strategy and potential AI-specific regulatory framework — government has signalled preference for light-touch initially. Watch for evolution.

**Confidence flag:** [SETTLED] for DPDPA; [UNDER REVIEW] for MeitY advisory posture; [PENDING] for AI-specific legislation.

---

### UAE

**Tier 1:**
- Operating in Dubai International Financial Centre (DIFC): DIFC Data Protection Law and AI governance guidance from DIFC Commissioner apply
- Operating in Abu Dhabi Global Market (ADGM): ADGM data protection framework
- AI providers in UAE government context: UAE AI Office governance requirements apply

**Tier 3:**
- UAE National AI Strategy 2031 — aspirational, not binding. But TDRA (regulator) has issued voluntary AI ethics principles
- UAE AI Office responsible AI guidelines — soft guidance, influential in government and semi-government procurement

**Tier 4:**
- UAE exploring binding AI regulation in line with international norms. Watch for TDRA legislative development.

**Confidence flag:** [SETTLED] for DIFC/ADGM; [SOFT-LAW] for national framework; [PENDING] for legislation.

---

### Saudi Arabia

**Tier 1:**
- Processing personal data through AI → PDPL (Personal Data Protection Law, 2022, amended 2023): data subject rights, automated processing restrictions apply
- AI in fintech: SAMA AI principles (Saudi Central Bank) — apply to licensed financial institutions

**Tier 3:**
- SDAIA (Saudi Data and Artificial Intelligence Authority) AI Ethics Principles — voluntary but SDAIA is the de facto AI governance body and is expanding its mandate
- National AI Strategy targets are influential in government procurement and licensing

**Tier 4:**
- Binding AI regulatory framework expected — SDAIA mandate is expanding. Watch for development in 2025–2026.

**Confidence flag:** [SETTLED] for PDPL and SAMA; [SOFT-LAW] for SDAIA ethics principles; [PENDING] for comprehensive framework.

---

### International and Cross-Jurisdictional Frameworks

Load international.md when any of the following apply (they are not binding but create alignment obligations and shape regulatory expectations):

**Council of Europe Framework Convention on AI (CETS 225)**
— Opened for signature May 2024. Binding on signatories (UK, US, Israel, Andorra, Georgia, Iceland, Norway among early signatories; EU to follow). Obligations on parties to ensure AI activities within their jurisdiction meet human rights, democracy, and rule of law standards. First binding international AI treaty.
— Tier 2 for organisations in signatory countries: governments must impose downstream obligations on private actors through national implementation.

**OECD AI Principles**
— 46 countries adopted including all G20. Voluntary but form the backbone of most national frameworks (including EU AI Act recitals). Tier 3 globally.

**G7 Hiroshima AI Process and Code of Conduct for GPAI**
— Voluntary, 11 principles for advanced AI developers. Tier 3 for any organisation developing or deploying GPAI with G7 market presence.

**UN AI Advisory Body Interim Report and Global Digital Compact**
— Non-binding. UN Secretary-General's AI governance proposals. Tier 3 for multinational organisations; monitor for treaty development.

**ISO/IEC 42001:2023 — AI Management System Standard**
— Not law, but increasingly referenced in procurement, contracts, and regulatory submissions. Certifiable. Treat as Tier 3 operational baseline for any serious AI governance programme.

**IEEE standards on AI ethics and transparency**
— Technical standards, voluntary. Relevant for GPAI providers and AI product developers.

---

## Sectoral Overlay Routing

After jurisdiction routing, apply the relevant sectoral file(s):

| Sector (from Q1.2) | Load file |
|---|---|
| Financial services | sectoral/financial-services.md |
| Healthcare / life sciences | sectoral/healthcare.md |
| Employment / HR | sectoral/employment.md |
| Public sector | sectoral/public-sector.md |
| Critical infrastructure | sectoral/critical-infrastructure.md |
| All others | No sectoral file — note this explicitly |

Sectoral files carry their own source lists. They always load alongside, never instead of, jurisdiction files.

---

## Output of This Logic

Once routing is complete, produce a **Jurisdiction Matrix** as the first element of the HTML output. Format:

| Jurisdiction | Tier | Trigger Reason | Primary Sources | Confidence | Key Dates |
|---|---|---|---|---|---|
| EU AI Act | 1 — Directly Applicable | Deployer with EU users | EUR-Lex 2024/1689; EU AI Office | [SETTLED] / [CONTESTED] | Feb 2025; Aug 2025; Aug 2026 |
| UK | 1 — Directly Applicable | FCA-authorised deployer | FCA PS24/x; ICO AI guidance | [SETTLED] | Ongoing |
| US Federal | 3 — Soft-Law | NIST AI RMF baseline | NIST AI 100-1 | [SOFT-LAW] | Monitor |
| Colorado | 1 — Directly Applicable | Colorado customers | Colorado SB 24-205 | [SETTLED] | Feb 2026 |

This matrix populates the HTML map and obligations tabs. Do not generate any tab content before this matrix is confirmed.

---

## Rules for Applying This Logic

1. **Never assign Tier 1 without a specific nexus.** Wishful compliance or "to be safe" assignments inflate the output and reduce trust.
2. **Never assign Tier 5 without stating why.** If the user is surprised by a non-applicable jurisdiction, they should be able to understand the reasoning.
3. **Always separate law from guidance.** Binding obligations get a different treatment from voluntary frameworks. Never present soft-law as a compliance requirement.
4. **Flag where advice is needed.** When an applicability determination is contested or depends on facts you don't have (e.g. exact volume of EU users), note it: *"This determination should be confirmed with qualified legal counsel in [jurisdiction]."*
5. **Date everything.** AI regulation is moving fast. Every tier assignment should carry the date of the regulation's current status. An output produced today may need to be revisited in six months.
