# us-states.md
# Jurisdiction Brief: United States — State Level

## Brief type
RESEARCH BRIEF. Fetch before concluding. Last verified: May 2025. Staleness threshold: 30 days (state legislation moves quickly).

## Applicability Triggers
Load when organisation has employees, customers, or operations in: Colorado, New York City, Illinois, California, Utah, Tennessee, Virginia, Maryland, Texas.
Apply per-state triggers below — not all states apply to all organisations.

## State Applicability Matrix

| State | Trigger | In force | Plotly |
|---|---|---|---|
| Colorado | Deployer of high-risk AI with Colorado consumers (credit, employment, housing, healthcare, education) | Feb 2026 | USA |
| New York City | Automated employment decision tools used for NYC hiring/promotion | In force | USA |
| Illinois | Biometric data processing of Illinois residents; AI video interviews | BIPA in force; AIVIA in force | USA |
| California | Personal data of CA residents processed through AI; CPRA automated decision-making | CPRA in force; ADM rules developing | USA |
| Utah | AI-generated content in consumer interactions without disclosure | In force 2024 | USA |
| Tennessee | AI impersonation of voice/likeness | In force 2024 | USA |

## Primary Sources to Fetch

FETCH-USST-01: https://leg.colorado.gov/bills/sb24-205
Extract: Current text of Colorado AI Act, any amendments, implementation guidance from AG
Look for: Amendments, AG enforcement guidance, rulemaking under the Act

FETCH-USST-02: https://codelibrary.amlegal.com/codes/newyorkcity/latest/NYCadmin/0-0-0-66766
Extract: NYC Local Law 144 current text and any amendments
Look for: DCWP enforcement actions, updated bias audit requirements

FETCH-USST-03: https://ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004
Extract: Illinois BIPA current provisions
Look for: Court decisions (BIPA has active private litigation), any amendments

FETCH-USST-04: https://cppa.ca.gov/regulations/
Extract: CPPA automated decision-making regulations — current status
Look for: Whether ADM regulations have been finalised; effective date

## Verification Queries

QUERY-USST-01: "Colorado AI Act SB 24-205 2025 guidance" — AG implementation guidance published?
QUERY-USST-02: "NYC Local Law 144 enforcement bias audit 2025" — DCWP enforcement activity?
QUERY-USST-03: "Illinois BIPA lawsuit 2025" — significant court decisions affecting scope?
QUERY-USST-04: "California CPPA automated decision making final rule 2025" — ADM rules finalised?
QUERY-USST-05: "state AI legislation 2025 new" — any new state AI bills enacted?
QUERY-USST-06: "Colorado AI Act amendment 2025" — any amendments before Feb 2026 effective date?

## Novel Detection Triggers

NOVEL-USST-01: "state AI law enacted 2025" — new states passing AI-specific legislation
NOVEL-USST-02: "AI preemption federal state 2025" — federal preemption of state AI laws
NOVEL-USST-03: "Colorado AI enforcement 2025" — early enforcement signals
NOVEL-USST-04: "New York AI legislation 2025" — NY state (not just NYC) AI bill?
NOVEL-USST-05: "Texas AI law 2025" — Texas AI legislation status

## Structural Baseline

### Colorado AI Act (SB 24-205) — In force February 2026
Applies to developers and deployers of "high-risk AI systems" making consequential decisions affecting Colorado consumers in: education, employment, financial services, healthcare, housing, insurance, legal services.
Obligations: risk assessment; impact assessment; consumer disclosure; right to appeal; annual reporting to AG.
Divergence signal: If amendment narrows "high-risk" definition or delays effective date, flag immediately.

### NYC Local Law 144 — In force
Automated Employment Decision Tools used in hiring/promotion of NYC employees must have: annual independent bias audit; public summary of audit results; candidate notification before use.
Divergence signal: DCWP enforcement guidance changing audit methodology requirements.

### Illinois BIPA — In force
Strict liability for collecting/using biometric identifiers (fingerprints, facial geometry, retina scans, voiceprints) without written consent and policy. Private right of action — $1,000–$5,000 per violation.
Divergence signal: Illinois legislature amending BIPA (multiple attempts — check current status).

### California CPRA/CPPA — Partial
CPRA in force: opt-out rights for profiling, data subject rights. CPPA automated decision-making regulations: in rulemaking, not yet finalised as of May 2025.
Divergence signal: ADM regulations finalised with effective date — significant compliance trigger.

## Confidence Baseline

| Area | Baseline |
|---|---|
| Colorado AI Act structure | [SETTLED] |
| Colorado AI Act in force | [PENDING] — Feb 2026 |
| NYC Local Law 144 | [SETTLED] |
| Illinois BIPA | [SETTLED] but [CONTESTED] in litigation |
| California CPRA | [SETTLED] |
| California CPPA ADM rules | [PENDING] |
