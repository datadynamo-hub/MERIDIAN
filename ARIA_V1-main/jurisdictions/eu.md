# eu.md
# Jurisdiction: European Union — AI Act (Regulation 2024/1689)

## Scope Triggers
See applicability-logic.md for full routing rules. Load this file when the organisation is assigned Tier 1 or Tier 2 for the EU AI Act.

**Plotly country codes for map rendering:**
AUT, BEL, BGR, CYP, CZE, DEU, DNK, EST, ESP, FIN, FRA, GRC, HRV, HUN, IRL, ITA, LTU, LUX, LVA, MLT, NLD, POL, PRT, ROU, SVK, SVN, SWE
*(Plus EEA: ISL, LIE, NOR — apply when EEA transposition confirmed)*

---

## Implementation Timeline

| Date | Milestone | Confidence |
|---|---|---|
| 1 August 2024 | Regulation enters into force | [SETTLED] |
| 2 February 2025 | Chapter II (prohibited practices) applies | [SETTLED] |
| 2 August 2025 | GPAI model obligations apply; governance provisions apply | [SETTLED] |
| 2 August 2026 | High-risk AI system obligations apply (Annex III) | [SETTLED] |
| 2 August 2027 | High-risk AI systems embedded in existing product law | [SETTLED] |

---

## Prohibited Practices — In Force February 2025
**[SETTLED]** Article 5. Applies to all providers and deployers with EU market nexus.
Violations: up to €35 million or 7% of global annual turnover.

| ID | Prohibition | Who | Action needed |
|---|---|---|---|
| EU-P01 | Subliminal or manipulative techniques causing harm | Providers and deployers | Audit AI systems for behavioural influence mechanisms operating below conscious awareness |
| EU-P02 | Social scoring by public authorities | Public authorities or those acting on their behalf | Confirm no AI system contributes to general population scoring for a public authority |
| EU-P03 | Real-time remote biometric identification in public spaces | All — narrow law enforcement exemptions only | Any biometric identification AI in publicly accessible spaces requires legal basis assessment |
| EU-P04 | Emotion recognition in workplace and education | Providers and deployers | Audit HR and productivity AI tools claiming to infer employee emotional state |
| EU-P05 | Biometric categorisation to infer protected characteristics | Providers and deployers | Review profiling AI for inference of race, political opinion, religion, union membership, sexual orientation, health |
| EU-P06 | Untargeted facial image scraping for recognition databases | Providers and deployers | Confirm no training pipeline involves untargeted facial image collection |

---

## High-Risk Classification — Apply Before Loading Obligations

An AI system is high-risk under Annex III if it falls within a listed use case **and** poses significant risk to health, safety, or fundamental rights.

**Listed use cases relevant to most regulated organisations:**
- Biometric identification and categorisation
- Critical infrastructure components (energy, transport, water, digital)
- Education — access decisions, assessment, student evaluation
- Employment — recruitment screening, performance monitoring, promotion, termination decisions, task allocation
- Essential private and public services — **credit scoring and creditworthiness assessment explicitly listed**; insurance risk; benefits eligibility
- Law enforcement — risk assessment, evidence evaluation, predictive policing
- Migration and border control
- Administration of justice

**[CONTESTED]** The "significant risk" qualifier under Article 6(3) is subject to active interpretive dispute. The Commission is drafting guidance. Conservative approach: treat any Annex III use case as high-risk unless EU AI Office guidance confirms otherwise.

---

## High-Risk Obligations — In Force August 2026

### Deployer Obligations

| ID | Obligation | Requirement summary | Source | Confidence |
|---|---|---|---|---|
| EU-D01 | Conformity verification | Verify CE marking and Declaration of Conformity before deployment | Art. 26(1) | [SETTLED] |
| EU-D02 | Fundamental rights impact assessment | Conduct FRIA before deploying in credit, insurance, employment, or essential services | Art. 27 | [SETTLED] |
| EU-D03 | Human oversight | Assign competent individuals with authority and tools to understand, override, and halt the system | Art. 26(2), Art. 14 | [SETTLED] |
| EU-D04 | Monitoring and logging | Monitor operation per provider instructions; retain logs minimum 6 months | Art. 26(5), Art. 12 | [SETTLED] |
| EU-D05 | Individual transparency | Notify individuals that they are subject to a high-risk AI system; provide meaningful information about logic | Art. 26(6), Art. 13 | [SETTLED] |
| EU-D06 | Input data governance | Ensure inputs are appropriate; do not use beyond provider-specified purpose | Art. 26(3)–(4) | [SETTLED] |
| EU-D07 | EU database registration | Register before deploying high-risk AI in public interest or essential services contexts | Art. 49 | [SETTLED] |
| EU-D08 | Incident reporting | Report serious incidents to provider and relevant national authority | Art. 73 | [SETTLED] |

**Action needed for all EU-D obligations:** Establish a pre-deployment conformity checklist. Contractually bind providers to supply technical documentation, conformity declarations, and incident notification pathways. Integrate FRIA with existing DPIA processes under GDPR. Define internal roles for oversight, logging, and incident response.

### Provider Obligations (if organisation also places AI on EU market)

Key additional obligations for providers: risk management system (Art. 9); technical documentation (Art. 11); data governance (Art. 10); transparency and instructions for use (Art. 13); human oversight design (Art. 14); accuracy, robustness, cybersecurity (Art. 15); quality management system (Art. 17); conformity assessment (Art. 43); CE marking (Art. 48). Load full provider obligations from EU AI Act text for provider-mode organisations.

---

## GPAI Model Obligations — In Force August 2025

Applies if the organisation trains, fine-tunes, or makes available a General-Purpose AI model.
**[SETTLED]** Chapter V, Articles 51–56.

| ID | Obligation | Requirement | Confidence |
|---|---|---|---|
| EU-G01 | Technical documentation | Training methodology, data, capabilities, limitations, evaluations | [SETTLED] |
| EU-G02 | Copyright policy | Policy complying with EU copyright law including DSM Directive; publicly available | [SETTLED] |
| EU-G03 | Training data summary | Sufficiently detailed public summary of training data | [SETTLED] |
| EU-G04 | Systemic risk — adversarial testing | Red-teaming and safety evaluations if model exceeds 10^25 FLOPs | [SETTLED] threshold; [CONTESTED] methodology |
| EU-G05 | Systemic risk — incident reporting | Report incidents involving systemic risk model to EU AI Office | [SETTLED] |
| EU-G06 | Systemic risk — cybersecurity | Adequate cybersecurity protection commensurate with risk level | [SETTLED] |

---

## GDPR Intersection
**[SETTLED]** The EU AI Act preserves and does not replace GDPR. For AI systems processing personal data:
- GDPR Article 22 (automated individual decision-making with legal or similarly significant effects) applies in parallel — right to explanation, right to human review, opt-out
- GDPR Article 35 DPIA obligation may be triggered independently
- EDPB Opinion 28/2024 addresses the GDPR/AI Act interface — load alongside this file for personal data use cases

---

## Enforcement

| Violation | Maximum penalty |
|---|---|
| Prohibited practices (Art. 5) | €35 million or 7% global annual turnover |
| Provider and deployer obligations | €15 million or 3% global annual turnover |
| Incorrect information to authorities | €7.5 million or 1% global annual turnover |
| GPAI-specific violations | €15 million or 3% (providers) |

Enforcement by national market surveillance authorities. EU AI Office has direct jurisdiction over GPAI providers. SME proportionality provisions apply.

---

## Primary Sources

| Source | URL |
|---|---|
| Regulation 2024/1689 full text | eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401689 |
| EU AI Office | digital-strategy.ec.europa.eu/en/policies/ai-office |
| EDPB AI guidance | edpb.europa.eu |
| EU AI Act compliance portal | ai-act.eu (Commission-linked resource) |

---

## Confidence Map

| Area | Flag |
|---|---|
| Prohibited practices | [SETTLED] |
| GPAI obligations structure | [SETTLED] |
| High-risk classification list | [SETTLED] |
| "Significant risk" qualifier scope | [CONTESTED] |
| Deployer obligations | [SETTLED] |
| FRIA scope for private deployers | [CONTESTED] |
| Systemic risk evaluation methodology | [CONTESTED] |
| Member state implementing measures | [PENDING] |

*Last verified: May 2025. Recheck before use in live compliance programmes.*
