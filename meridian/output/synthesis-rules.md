# synthesis-rules.md
# MERIDIAN — Synthesis Rules

## The Problem with Aggregation

A list of jurisdictions placed side by side is not a synthesis. It forces the user to do the intellectual work of finding patterns, resolving conflicts, and prioritising across frameworks. That work is the researcher's job.

These rules define how raw jurisdiction-level research becomes a coherent, actionable output.

---

## Rule 1 — Find Cross-Cutting Patterns Before Writing Jurisdiction Sections

Before drafting any jurisdiction content, read across all Tier 1 and Tier 2 jurisdiction files loaded for this organisation. Identify:

**Universal obligations** — requirements that appear in substantially similar form across three or more jurisdictions. Examples:
- Transparency to individuals affected by automated decisions (appears in EU AI Act, UK GDPR Art.22, LGPD Art.20, PIPA, PDPA Singapore, Colorado AI Act, and others)
- Documentation and record-keeping for AI systems
- Human oversight mechanisms for consequential decisions
- Data quality requirements for AI training and operation

These become cross-cutting themes in Tab 4. Do not repeat them verbatim in every jurisdiction section — reference them and note any jurisdiction-specific variations.

**Conflicting obligations** — requirements that cannot be simultaneously satisfied at their strictest reading. Examples:
- Retention period conflicts (e.g. five years in Jurisdiction A vs three years in Jurisdiction B)
- Disclosure timing conflicts (pre-decision vs post-decision notification)
- Data localisation requirements that conflict with data transfer requirements

Conflicts must be surfaced explicitly — in Tab 4 as a conflict note, and in the action plan as a decision point requiring legal resolution.

**Gaps** — areas where some jurisdictions have clear obligations and others have none, leaving the organisation with a choice between the minimum and a conservative global standard.

---

## Rule 2 — Prioritise by Enforcement Risk, Not by Framework Prominence

The EU AI Act is not automatically the highest priority. Prioritisation is based on:

1. **In-force status** — obligations already in force outrank pending ones
2. **Regulator activity** — jurisdictions where the regulator has made public enforcement statements, opened investigations, or issued fines rank higher
3. **Nexus concentration** — where most users or most revenue is concentrated
4. **Consequence severity** — fines as percentage of global turnover, criminal liability, suspension of operations
5. **Time to compliance** — obligations requiring significant organisational change need longer lead time and therefore earlier action

Apply this ranking to produce the action plan. Do not default to EU AI Act → UK → US sequencing unless that order genuinely reflects the organisation's risk profile.

---

## Rule 3 — The Conservative Approach Default

Where multiple jurisdictions impose similar but differently calibrated obligations, identify the most demanding standard and recommend the organisation build to that standard — then document that doing so also satisfies the less demanding versions.

This is efficient: one control framework satisfying multiple jurisdictions.

Exception: where the most demanding standard is disproportionate relative to the organisation's exposure in that jurisdiction (e.g. a jurisdiction where the organisation has five users and the strictest standard requires expensive audit infrastructure), flag the trade-off explicitly and let the user decide.

---

## Rule 4 — Soft-Law Positioning

Voluntary frameworks (NIST AI RMF, OECD principles, DSIT cross-sector principles, IMDA Model Framework) are not obligations but they are not irrelevant. Position them consistently as:

- **Procurement risk:** Government and large enterprise procurement increasingly requires alignment with voluntary AI frameworks. Inability to demonstrate alignment may exclude the organisation from contracts.
- **Regulatory posture:** Regulators in soft-law jurisdictions often treat voluntary framework alignment as evidence of good faith in enforcement decisions.
- **Future-proofing:** Today's voluntary framework frequently becomes tomorrow's statutory baseline (the UK GDPR → EU GDPR trajectory is instructive).

Do not overstate. Do not say "must comply with NIST AI RMF" — say "alignment with NIST AI RMF is recommended as a procurement and regulatory posture baseline and carries no direct legal obligation."

---

## Rule 5 — Uncertainty Surfacing

The synthesis must register what is not known, not just what is. Before finalising output, answer these questions:

**What regulatory positions are contested?**
Name the dispute, the competing positions, and which way regulatory weight of authority currently leans. Do not resolve contested positions with false confidence.

**What pending developments would materially change this analysis?**
Name the legislation, the expected timeline, and what changes if it passes as drafted. Populate the `unknowns` register.

**What facts, if different, would change the applicability determination?**
E.g. "If the organisation increases its EU user base above [threshold], the GPAI systemic risk designation under EU AI Act becomes relevant." Surface these as conditional flags.

**What did you not verify?**
Be explicit. If a jurisdiction's regulatory posture could not be confirmed against a current Tier 1 source, say so and flag the claim as [UNDER REVIEW].

A report with no unknowns is not credible. A well-maintained unknowns register is a feature, not a weakness.

---

## Rule 6 — Output Calibration by Deliverable Type

The same underlying research produces different outputs depending on what the user asked for (from elicitation Q4.2):

**Obligations map** — emphasise the Obligations tab. Action plan is high level. Source register is complete.

**Gap assessment** — the `gaps` fields in each jurisdiction section are primary. Action plan maps gaps to remediation actions. The Overview tab should lead with gap count by jurisdiction.

**Board / exec paper** — Overview tab is the deliverable. Obligations and Sources tabs are appendices. Use plain language throughout — no regulatory jargon without explanation.

**Audit / assurance** — Sources & Confidence tab is primary. Every claim must have a Tier 1 or 2 citation. Unknowns register is exhaustive. Confidence flags are granular.

**Regulatory monitoring brief** — Prioritise [PENDING] and [UNDER REVIEW] flags. Action plan focuses on future obligations, not current ones. Include expected in-force dates prominently.

Calibrate the depth of each tab to the deliverable type. Not every tab needs equal depth for every request.

---

## Rule 7 — Language Precision

Use this language guide consistently across all output:

| Situation | Use | Do not use |
|---|---|---|
| Binding obligation, in force | "The [regulation] requires…" / "Organisations must…" | "Should," "may want to," "is recommended" |
| Guidance / regulatory expectation | "The [regulator] expects…" / "Regulatory guidance provides…" | "Requires," "mandates" |
| Voluntary framework | "The framework recommends…" / "Alignment is advised…" | "Requires," "must," "obligates" |
| Contested position | "Regulatory interpretation suggests… though this remains contested" | "Is settled," "clearly requires" |
| Pending obligation | "If enacted as drafted, would require…" | "Will require," "requires" (present tense for future obligations) |
| Unknown | "This has not been confirmed against a current primary source" | Silence on the gap |

Precision in this language is what separates professional regulatory analysis from content generation. Every word in the modal category (must, should, may, recommends) carries legal meaning. Use them with that awareness.
