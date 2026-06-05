# canada.md
# Jurisdiction Brief: Canada

## Brief type
RESEARCH BRIEF. Fetch before concluding. Last verified: May 2025. Staleness threshold: 60 days.

## Applicability Triggers
Tier 1: Organisation collects or processes personal data of Canadians through AI (PIPEDA); organisation operates in Quebec with automated profiling (Quebec Law 25).
Tier 4 (Monitor): AIDA (federal AI-specific legislation) — pending, not in force.
Plotly code: CAN

## Primary Sources to Fetch

FETCH-CA-01: https://www.parl.ca/legisinfo/en/bill/44-1/c-27
Extract: Current status of Bill C-27 (includes AIDA); whether passed, in committee, or stalled
Look for: Any amendments to AIDA provisions; expected timeline; whether Bill has progressed since last session

FETCH-CA-02: https://priv.gc.ca/en/privacy-topics/artificial-intelligence/
Extract: OPC guidance on AI and PIPEDA; recommendations on AI governance
Look for: New OPC guidance, investigations involving AI, updated positions

FETCH-CA-03: https://www.cai.gouv.qc.ca/
Extract: Quebec Law 25 implementation guidance; AI-specific positions from CAI (Commission d'accès à l'information)
Look for: Enforcement actions; guidance on automated profiling obligations under Law 25 ss.12, 22, 23

## Verification Queries

QUERY-CA-01: "Canada AIDA Bill C-27 2025 status" — legislative progress?
QUERY-CA-02: "Canada PIPEDA AI guidance 2025" — OPC updated position?
QUERY-CA-03: "Quebec Law 25 AI enforcement 2025" — CAI enforcement activity?
QUERY-CA-04: "Canada AI voluntary code generative AI" — voluntary code update or expansion?
QUERY-CA-05: "Canada AI governance 2025 ISED" — ISED policy developments?

## Novel Detection Triggers

NOVEL-CA-01: "Canada AI law passed 2025" — AIDA or replacement legislation enacted?
NOVEL-CA-02: "OPC AI investigation 2025" — significant OPC enforcement establishing precedent
NOVEL-CA-03: "Quebec AI regulation 2025" — Quebec-specific AI measures beyond Law 25

## Structural Baseline

### PIPEDA (federal, in force)
Applies to commercial collection/use of personal data including AI processing. Key for AI: accountability principle (document AI decisions); accuracy principle (AI outputs affecting individuals); transparency; individual access rights. OPC has issued AI guidance recommending privacy-by-design in AI systems.

### Quebec Law 25 (in force, phased — AI provisions effective Sept 2023)
Most stringent Canadian privacy regime. Articles 12, 22, 23 specifically address AI:
- Art.12: Privacy impact assessment required before automated processing creating a profile
- Art.22: Right to know when decision based solely on automated processing
- Art.23: Right to have a person review an automated decision; right to present observations

### AIDA (pending — Bill C-27)
Would create obligations for developers and deployers of "high-impact AI systems" — risk assessment, mitigation, transparency, incident reporting. Bill faced delays and political uncertainty. If passed as drafted: major compliance trigger for Canadian and non-Canadian organisations with Canadian market presence.

## Confidence Baseline

| Area | Baseline |
|---|---|
| PIPEDA AI application | [SETTLED] |
| Quebec Law 25 AI provisions | [SETTLED] |
| AIDA | [PENDING] — uncertain timeline |
