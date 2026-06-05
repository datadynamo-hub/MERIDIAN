# brazil.md
# Jurisdiction Brief: Brazil

## Brief type
RESEARCH BRIEF. Fetch before concluding. Last verified: May 2025. Staleness threshold: 60 days.

## Applicability Triggers
Tier 1: Processing personal data of Brazilian data subjects through AI (LGPD Art.20).
Tier 4 (Monitor): Brazilian AI Bill (PL 2338/2023) — passed Senate, under review in Chamber.
Plotly code: BRA

## Primary Sources to Fetch

FETCH-BR-01: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l13709.htm
Extract: LGPD text — Article 20 (automated decisions) specifically
Look for: Any amendments to Art.20; implementing regulations from ANPD

FETCH-BR-02: https://www.gov.br/anpd/pt-br
Extract: ANPD guidance on automated decision-making; AI-specific publications; enforcement actions
Look for: ANPD guidance specifically on AI; any enforcement actions involving automated decisions

FETCH-BR-03: https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2336949
Extract: PL 2338/2023 current status in Chamber of Deputies
Look for: Whether bill has been voted on, amended, or returned to Senate

## Verification Queries

QUERY-BR-01: "Brazil AI law PL 2338 2025 Chamber" — legislative status?
QUERY-BR-02: "ANPD decisao automatizada 2025" — ANPD guidance on automated decisions?
QUERY-BR-03: "Brazil LGPD AI enforcement 2025" — enforcement action involving AI processing?
QUERY-BR-04: "Brazil AI regulation approved 2025" — has the AI bill been enacted?

## Novel Detection Triggers

NOVEL-BR-01: "Brazil AI law enacted 2025" — PL 2338 or alternative passed?
NOVEL-BR-02: "ANPD AI regulation 2025" — ANPD issuing AI-specific rules
NOVEL-BR-03: "Brazil AI enforcement 2025" — significant enforcement action

## Structural Baseline

### LGPD Art.20 (in force)
Right of data subjects to request review of automated decisions affecting their interests, including those based on AI. Controller must provide meaningful information about criteria and procedures used. ANPD may issue complementary standards on automated decisions.

### PL 2338/2023 (pending)
Passed Brazilian Senate June 2024. Proposes risk-based AI regulation broadly aligned to EU AI Act model. If enacted: obligations for developers and deployers of high-risk AI systems; transparency requirements; impact assessments. Timeline for Chamber vote uncertain.

## Confidence Baseline

| Area | Baseline |
|---|---|
| LGPD Art.20 automated decisions | [SETTLED] |
| Brazilian AI Bill | [PENDING] — Chamber review |
