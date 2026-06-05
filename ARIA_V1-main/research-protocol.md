# research-protocol.md
# ARIA — Live Research Protocol

## The Core Mandate

You do not produce regulatory analysis from training data. Training data has a knowledge cutoff, contains errors, and cannot reflect regulatory changes that occurred after it was compiled. Every session must fetch from primary sources before producing any output.

This protocol governs how that happens: what you fetch, in what order, how you detect novel developments not anticipated by the jurisdiction briefs, and how you capture and source those discoveries.

---

## Rule Zero

**Before producing any obligation, citing any regulatory position, or populating any section of the HTML output: fetch the primary sources defined in the jurisdiction brief.**

There are no exceptions. "I already know this regulation" is not a valid reason to skip fetching. The regulation may have been amended. New implementing guidance may have been issued. An enforcement decision may have changed how a provision is interpreted. You do not know what has changed since training. Fetch and find out.

---

## The Research Loop

Execute this loop for every jurisdiction assigned Tier 1 or Tier 2 by applicability-logic.md.

### Step 1 — Load the jurisdiction brief

Read the jurisdiction file (e.g. jurisdictions/eu.md). Identify:
- Primary source URLs to fetch
- Verification queries to run
- Structural baseline (what obligations are expected and in what form)
- Staleness signals to watch for
- Novel detection triggers

The brief is a research plan, not an answer sheet.

### Step 2 — Fetch primary sources

For each URL listed in the brief's `## Primary sources to fetch` section:

```
web_fetch [URL]
→ Extract: current text of relevant provisions
→ Extract: publication date / last amended date
→ Extract: any amendment markers or revision notices
→ Compare against: structural baseline in the brief
→ Flag any divergence
```

If a URL returns an error or the page structure has changed significantly, log it in the session discoveries under `## Fetch failures` and attempt an alternative source from sources.md for that jurisdiction.

### Step 3 — Run verification queries

For each query listed in the brief's `## Verification queries` section:

```
web_search [query]
→ Review top results for Tier 1 and Tier 2 sources only (per sources.md)
→ Look for: amendments, new guidance, enforcement actions, court decisions, consultations
→ Check publication dates — prioritise anything newer than the brief's `last verified` date
→ For each finding: assess whether it changes any obligation in the baseline
```

Filter aggressively: Tier 3 sources corroborate but do not establish. Denied sources are ignored regardless of what they say.

### Step 4 — Run novel detection queries

For each jurisdiction, run the standard novel detection query set:

```
"[jurisdiction] AI regulation [current year]" — new legislation or major policy shift
"[jurisdiction] AI enforcement action [current year]" — regulator activity
"[jurisdiction] AI [sector] guidance [current year]" — sector-specific developments
"[jurisdiction] AI regulation amendment" — changes to existing law
"[jurisdiction] AI consultation [current year]" — forthcoming changes in pipeline
```

Replace [jurisdiction] with the specific regulator or jurisdiction name (e.g. "EU AI Office", "FCA artificial intelligence", "CFPB automated decision").

Assess every result against the Novel Discovery Protocol below before incorporating it.

### Step 5 — Synthesise from what was found

Build the obligations content from the live fetch results, not from the brief's baseline. The baseline is for comparison only.

Where the live content matches the baseline: mark as [SETTLED], cite the live source.
Where the live content diverges from the baseline: flag the divergence, mark the affected obligation as [UNDER REVIEW] or [CONTESTED] as appropriate, note what changed.
Where novel content was found: apply the Novel Discovery Protocol.

---

## Novel Discovery Protocol

A novel discovery is any regulatory development found during live research that was not anticipated by the jurisdiction brief. This includes:

- New legislation or regulation passed or enacted
- New implementing measure, delegated act, or secondary legislation
- New regulatory guidance or supervisory statement
- Significant enforcement action establishing or clarifying interpretation
- Court or tribunal decision with regulatory implications
- New consultation paper signalling forthcoming obligations
- Withdrawal or revocation of existing guidance
- Regulatory policy reversal (e.g. enforcement posture shift)

### When a novel item is detected

**1. Verify it before acting on it**

A single search result is not confirmation. A novel regulatory development must be confirmed by at least one Tier 1 source before being incorporated into the obligations output. Run:

```
web_fetch [primary source URL for the novel item]
→ Confirm: document is authentic (issued by the regulator/legislator)
→ Confirm: publication date and current status (in force, draft, consulted)
→ Confirm: scope (does it apply to this organisation's profile?)
```

If you cannot verify via a Tier 1 source, mark as [UNVERIFIED — REQUIRES CONFIRMATION] and include in Session Discoveries with the available evidence and recommended verification step.

**2. Find corroborating sources**

Once confirmed via Tier 1, search for Tier 2 corroboration:

```
web_search "[novel item name] [regulator] [year] analysis"
→ Filter for: specialist law firms (see sources.md Tier 2 list), Big 4 publications, think tanks
→ Objective: find substantive legal analysis of the novel item
→ This establishes interpretation context, not the existence of the obligation
```

**3. Assess applicability**

Apply applicability-logic.md scope triggers to the novel item:
- Does this apply to this organisation's role (provider/deployer/integrator)?
- Does this apply to this sector?
- Does this apply to this geographic footprint?
- Is it in force, pending, or consultative?

Assign an applicability tier and confidence flag before incorporating.

**4. Incorporate into output**

Novel discoveries appear in two places:

**In the relevant Obligations tab section** — as a new obligation card, clearly marked:
```
[NEW — DISCOVERED THIS SESSION] badge
Obligation ID: [jurisdiction]-N[sequential number]
Source: [Tier 1 source with date]
Confidence: [appropriate flag]
```

**In Session Discoveries** — the standalone capture document (see format below).

**5. Do not overweight a single novel finding**

A single enforcement action does not settle a contested question. A single consultation paper does not create a current obligation. Apply the same confidence framework to novel findings as to baseline obligations. Novel findings that represent a clear shift in regulatory position are [UNDER REVIEW] until a pattern of enforcement or formal guidance confirms them.

---

## Session Discoveries Document

At the end of every research session where novel discoveries were made, produce a Session Discoveries document. This is a separate output from the HTML report — it is the mechanism by which the folder's knowledge base stays current.

Format:

```markdown
# Session Discoveries — [Organisation Name] — [Date]

## Summary
[Number] novel items discovered across [jurisdictions]. [Number] verified to Tier 1. [Number] pending verification.

## Novel Discoveries

### [JURI-N01] — [Short title]
**Jurisdiction:** [Name]
**Type:** New legislation | New guidance | Enforcement action | Consultation | Revocation
**Source:** [Tier 1 source name and URL]
**Publication date:** [Date]
**Verified:** Yes / Pending
**Corroborating source:** [Tier 2 source if found]
**Applicability to this organisation:** [Yes / Conditional / No — with one-sentence reason]
**Confidence:** [Flag]
**Summary:** [2–3 sentences on what it says and why it matters]
**Recommended action:** [What the organisation should do in response]
**Recommended brief update:** [Which jurisdiction file should be updated and what should change]

---

## Fetch Failures
[Any sources that could not be fetched, with alternative sources attempted]

## Staleness Flags
[Any jurisdiction brief sections flagged as potentially stale based on what was found]

## Recommended Brief Updates
[List of jurisdiction files that should be updated, what should change, and who should verify]
```

This document should be saved to the Claude Project's knowledge base as `session-discoveries-[YYYY-MM-DD].md` so it accumulates over time and informs future sessions.

---

## Staleness Detection

Each jurisdiction brief contains a `last verified` date. At the start of every session, check:

```
Current date — brief's last verified date = staleness gap
```

| Gap | Protocol |
|---|---|
| < 30 days | Standard fetch — verify key provisions only |
| 30–90 days | Full fetch loop — run all queries |
| 90–180 days | Full fetch loop + extended novel detection — treat brief as potentially stale baseline |
| > 180 days | Flag brief as [STALE] at session start. Treat all obligations as [UNDER REVIEW] until confirmed by live fetch. Do not present stale content as current. |

A brief that has not been verified in over 6 months should carry a visible warning in the output:

> "⚠ The [jurisdiction] reference brief has not been verified against live sources since [date]. Obligations in this section reflect the position as of that date. The live fetch conducted during this session found [summary of what was confirmed / what changed / what could not be verified]."

---

## Handling Fetch Limitations

Sometimes a primary source cannot be fetched — the regulator's website is restructured, the URL has changed, the document is behind a portal. When this happens:

1. Try the regulator's homepage and navigate from there
2. Search for the document title directly: `web_search "[document title] [regulator name] site:[regulator domain]"`
3. Check whether a Tier 2 source (law firm, Big 4) has quoted or reproduced the relevant provision
4. If all else fails: mark the obligation as [UNVERIFIED — SOURCE UNAVAILABLE] and note the fetch attempt in Session Discoveries

Do not present an obligation as [SETTLED] if you could not confirm it against a live source this session.

---

## Confidence Flags for Live Research

The confidence flags used in html-template.md carry additional meaning in the context of live research:

| Flag | Meaning in live research context |
|---|---|
| [SETTLED] | Confirmed against live Tier 1 source this session. Content matches brief baseline. |
| [CONTESTED] | Live sources found multiple positions. Brief baseline may reflect only one. Named the dispute. |
| [PENDING] | Confirmed via Tier 1 this session — legislation in progress. Verified current status. |
| [SOFT-LAW] | Confirmed via Tier 1 this session — voluntary framework, no enforcement. |
| [UNDER REVIEW] | Live fetch found divergence from brief baseline, or novel item affects this area. |
| [UNVERIFIED] | Could not confirm against Tier 1 this session. Do not include in obligations output. Include in Session Discoveries only. |

---

## What Good Live Research Looks Like

A session that runs this protocol properly will:

- Fetch 3–8 primary sources per Tier 1 jurisdiction
- Run 4–6 verification queries per jurisdiction
- Run the standard novel detection query set for each jurisdiction
- Produce obligations content built from what was actually found, not from the brief's pre-written content
- Carry genuine confidence flags reflecting live verification status
- Surface any novel items with sources, applicability assessment, and recommended actions
- Produce a Session Discoveries document if anything new was found
- Complete faster for jurisdictions where nothing has changed, and take longer where significant developments were found — that asymmetry is correct and expected

A session that does not fetch, runs no queries, and presents pre-written content as current is not research. It is retrieval. This protocol exists to prevent that.
