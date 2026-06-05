# financial-services.md
# Sectoral Brief: Financial Services

## Brief type
SECTORAL RESEARCH BRIEF. Load alongside jurisdiction briefs when organisation.sector = financial services. Last verified: May 2025.

## Scope
Applies to: banks, insurers, investment managers, consumer lenders, payment institutions, fintechs, and their AI vendors operating in regulated financial services.

## Primary Sources to Fetch

FETCH-FS-01: https://www.fca.org.uk/firms/innovation/ai
Extract: FCA AI strategy, Consumer Duty AI guidance, model risk expectations

FETCH-FS-02: https://www.bankofengland.co.uk/prudential-regulation/publication/2023/september/model-risk-management-principles-ss
Extract: PRA SS1/23 model risk management — AI applications

FETCH-FS-03: https://www.consumerfinance.gov/about-us/blog/tag/artificial-intelligence/
Extract: CFPB AI in credit, adverse action requirements, fair lending

FETCH-FS-04: https://www.mas.gov.sg/development/fintech/ai-in-financial-services
Extract: MAS FEAT Principles, updated MAS AI guidance for financial services

FETCH-FS-05: https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/artificial-intelligence/
Extract: FSB AI in financial services — latest report and recommendations

## Verification Queries

QUERY-FS-01: "FCA AI Consumer Duty enforcement 2025" — enforcement signals?
QUERY-FS-02: "CFPB AI fair lending enforcement 2025" — enforcement actions in credit AI?
QUERY-FS-03: "model risk management AI banking 2025" — SR 11-7 update or replacement?
QUERY-FS-04: "FSB AI financial stability 2025" — new systemic risk concerns raised?
QUERY-FS-05: "AI credit scoring discrimination 2025" — regulatory action on algorithmic bias?
QUERY-FS-06: "insurance AI pricing regulation 2025" — insurance-specific AI guidance?

## Novel Detection Triggers

NOVEL-FS-01: "financial services AI regulation new 2025" — sector-specific AI rules?
NOVEL-FS-02: "AI credit scoring banned regulator 2025" — specific practice prohibited?
NOVEL-FS-03: "central bank AI guidance 2025" — new central bank AI governance expectations?

## Key Cross-Jurisdictional Obligations

### Credit decisioning AI (most common financial services use case)
- EU: Annex III explicitly lists creditworthiness assessment as high-risk AI → full deployer obligations from Aug 2026
- UK: FCA Consumer Duty requires fair outcomes; ICO Art.22 UK GDPR requires explanation and human review for automated credit decisions
- US: CFPB requires specific adverse action notices citing principal reasons even when model-based; ECOA/Reg B disparate impact applies
- Colorado: SB 24-205 applies directly to credit decisions affecting Colorado consumers from Feb 2026

### Model risk management (global baseline)
SR 11-7 (US OCC/Fed) is the most detailed model risk management framework globally. Compliance satisfies the governance intent of EU AI Act technical documentation, UK PRA SS1/23, and MAS FEAT accountability requirements. Recommended as the global baseline model governance approach for any financial services firm.

### Algorithmic fairness (universal but calibrated differently)
All major jurisdictions apply discrimination law to AI credit/insurance/employment decisions. EEOC (US), Equality Act (UK), GDPR/AI Act (EU) each have different legal mechanisms but converge on: AI outputs must not produce discriminatory outcomes on protected characteristics. Document and test for disparate impact.

## Confidence Baseline

| Area | Baseline |
|---|---|
| EU AI Act credit AI high-risk | [SETTLED] |
| UK GDPR Art.22 credit decisions | [SETTLED] |
| CFPB adverse action AI | [SETTLED] |
| SR 11-7 model risk | [SETTLED] |
| MAS FEAT binding force | [SETTLED] for MAS entities |
| Insurance AI pricing regulation | [CONTESTED] — varies by jurisdiction |
