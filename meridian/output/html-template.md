# html-template.md
# MERIDIAN — HTML Output Specification

## Purpose

When a user requests a research output, you generate a single self-contained HTML file. This file is the deliverable — the user downloads it, opens it in a browser, and uses it as their obligations reference. It must work offline after load.

Your job is to populate the `RESEARCH_DATA` object defined below. The HTML, CSS, and JavaScript framework is fixed. Do not modify the rendering logic. Do not invent new tabs or sections. Populate the data schema accurately and completely.

---

## Technology Stack (Do Not Modify)

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
```

Tailwind for layout and typography. Plotly.js for the world map choropleth. Vanilla JavaScript for tab switching and rendering. No other external dependencies.

---

## Design System

Apply these values consistently throughout the output.

### Tier Colours

| Tier | Label | Background | Border / Accent | Badge text |
|---|---|---|---|---|
| 1 | Directly Applicable | #FEE2E2 | #DC2626 (red) | #991B1B |
| 2 | Indirectly Applicable | #FEF3C7 | #D97706 (amber) | #92400E |
| 3 | Soft-Law Alignment | #DBEAFE | #2563EB (blue) | #1E40AF |
| 4 | Monitor / Pending | #EDE9FE | #7C3AED (violet) | #5B21B6 |
| 5 | Not Applicable | #F3F4F6 | #9CA3AF (grey) | #4B5563 |

### Confidence Badge Colours

| Flag | Background | Text |
|---|---|---|
| [SETTLED] | #D1FAE5 | #065F46 |
| [CONTESTED] | #FEF3C7 | #92400E |
| [PENDING] | #DBEAFE | #1E40AF |
| [SOFT-LAW] | #F3F4F6 | #374151 |
| [UNDER REVIEW] | #FEE2E2 | #991B1B |

### Typography
- Font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- Header background: `#0F172A` (slate-900)
- Body background: `#F9FAFB` (gray-50)
- Primary text: `#111827` (gray-900)
- Secondary text: `#6B7280` (gray-500)

---

## RESEARCH_DATA Schema

This is the object you populate. Every field is required unless marked optional.

```javascript
const RESEARCH_DATA = {

  // ── Organisation profile (from elicitation confirmation) ──
  organisation: {
    name: "string — organisation name or descriptor",
    role: "string — Provider | Deployer | Both | Integrator | Internal user",
    sector: "string — e.g. Financial services — FCA-authorised lender",
    size: "string — e.g. 500 employees (SME)",
    established: "string — e.g. United Kingdom",
    usersIn: ["string array — countries/regions where users/data subjects are"],
    outputConsumedIn: ["string array — where AI output is acted upon"],
    aiActivity: "string — what the AI system does",
    foundationModelDependency: "boolean",
    humanOversight: "string — Automated | Human-in-loop | Human-on-loop | Advisory",
    maturity: "string — e.g. In production, retrofitting compliance",
    deliverable: "string — e.g. Obligations map and gap assessment"
  },

  // ── Report metadata ──
  generatedDate: "string — ISO date, e.g. 2025-05-27",
  freshnessWarning: "string — narrative caveat about rate of regulatory change",

  // ── Jurisdiction matrix ──
  // One entry per relevant jurisdiction. Tier 5 (not applicable) entries omitted unless user asked.
  jurisdictions: [
    {
      code: "string — ISO 3166-1 alpha-3 for countries, or region code: 'EU', 'INT'",
      plotlyCode: "string — ISO 3166-1 alpha-3 for Plotly choropleth (e.g. GBR, DEU, USA)",
      // For supranational (EU, INT): list all member/signatory codes in memberCodes array
      memberCodes: ["optional — array of alpha-3 codes for Plotly rendering of supranationals"],
      name: "string — display name, e.g. European Union — AI Act",
      tier: "integer 1–5",
      tierLabel: "string — from tier table above",
      triggerReason: "string — one sentence explaining why this tier was assigned",
      confidence: "string — SETTLED | CONTESTED | PENDING | SOFT-LAW | UNDER REVIEW",
      keyDates: [
        {
          date: "string — e.g. February 2025",
          event: "string — what comes into force or is expected"
        }
      ],
      primarySources: [
        {
          name: "string — source name",
          citation: "string — specific article/section where possible",
          url: "string — canonical URL"
        }
      ],
      obligations: [
        {
          id: "string — unique, e.g. EU-001",
          title: "string — short obligation title",
          requirement: "string — what must be done, in plain language",
          who: "string — which role this applies to (Provider / Deployer / Both)",
          inForce: "string — date or status",
          consequence: "string — optional — what non-compliance risks",
          confidence: "string — confidence flag for this specific obligation",
          source: "string — Tier and source name",
          actionNeeded: "string — what this organisation specifically needs to do"
        }
      ],
      gaps: ["optional — string array of identified gaps for this jurisdiction"],
      notes: "string — optional — any jurisdiction-specific framing note"
    }
  ],

  // ── Cross-cutting themes ──
  // Obligations or patterns that appear across multiple jurisdictions
  crossCutting: [
    {
      theme: "string — e.g. Automated decision-making transparency",
      description: "string — what the pattern is",
      jurisdictionsAffected: ["string array — jurisdiction names"],
      conservativeApproach: "string — recommended approach that satisfies the most demanding applicable standard",
      conflicts: "string — optional — where jurisdictions impose conflicting obligations on this theme"
    }
  ],

  // ── Action plan ──
  actionPlan: [
    {
      priority: "integer — 1 (highest) upward",
      action: "string — specific action",
      rationale: "string — why this priority",
      jurisdictions: ["string array — which obligations this addresses"],
      effortSizing: "string — Low | Medium | High | Very High",
      suggestedOwner: "string — e.g. 1LOD Compliance, 2LOD Risk, DPO, Legal",
      deadline: "string — regulatory deadline or recommended timing",
      dependency: "string — optional — what must be done first"
    }
  ],

  // ── Sources and confidence register ──
  sourcesRegister: [
    {
      obligationId: "string — links to obligation id above",
      claim: "string — the specific claim being sourced",
      source: "string — source name",
      tier: "integer — 1, 2, or 3",
      citation: "string — article, section, paragraph",
      url: "string",
      confidence: "string — confidence flag",
      verifiedDate: "string — when this was last verified"
    }
  ],

  // ── Unknown and unverified register ──
  unknowns: [
    {
      topic: "string — what is unknown or unverified",
      reason: "string — why it is unknown (unsettled law, missing facts, pending guidance)",
      recommendation: "string — what to do about it"
    }
  ]

};
```

---

## Tab Structure and Content Rules

### Tab 1 — Overview
**Purpose:** Director-readable in 60 seconds.

Must contain:
- Organisation profile summary (compact, one paragraph)
- Top 5 obligations ranked by urgency — each as a single-line card showing: jurisdiction, obligation title, deadline, confidence badge
- Jurisdiction matrix as a scannable table: jurisdiction name | tier badge | trigger reason | key date | confidence badge
- Freshness warning in a styled callout

Must NOT contain: full obligation detail, source citations, methodology.

### Tab 2 — Map
**Purpose:** Visual orientation — where does regulation apply and at what intensity?

Implementation:
- Plotly.js choropleth map, projection `'natural earth'`
- Countries coloured by tier using the tier colour system above
- For supranationals (EU): shade all member state codes at the tier colour
- On country click: side panel renders that jurisdiction's name, tier, trigger reason, key dates, and obligation count
- Below map: jurisdiction list as coloured cards, one per Tier 1 and Tier 2 jurisdiction with key dates

Map trace specification:
```javascript
// Build one trace per tier so each tier gets a discrete colour
// locations: ISO alpha-3 country codes
// z: uniform value per tier (1, 2, 3, 4, 5)
// Use colorscale anchored to that tier's colour
// showscale: false
// Combine into data array and call Plotly.newPlot('map-container', data, layout)
```

Layout:
```javascript
{
  geo: {
    showframe: false,
    showcoastlines: true,
    coastlinecolor: '#CBD5E1',
    showland: true,
    landcolor: '#F1F5F9',
    showocean: true,
    oceancolor: '#EFF6FF',
    showlakes: false,
    projection: { type: 'natural earth' }
  },
  margin: { l: 0, r: 0, t: 0, b: 0 },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)'
}
```

### Tab 3 — Obligations
**Purpose:** Full obligation detail for compliance managers.

Structure:
- One section per Tier 1 and Tier 2 jurisdiction, in tier order
- Section header: jurisdiction name, tier badge, confidence flag
- Each obligation as a collapsible card:
  - Collapsed state: ID | title | in-force date | confidence badge | who it applies to
  - Expanded state: full requirement text | action needed | source | consequence (if any)
- At bottom of each jurisdiction section: identified gaps (if any)

Do not summarise obligations — render the full `requirement` and `actionNeeded` fields.

### Tab 4 — Cross-Cutting
**Purpose:** Themes that span jurisdictions — where to build once rather than per-jurisdiction.

Structure:
- One card per cross-cutting theme
- Theme title, description, affected jurisdictions as pills, conservative approach recommendation
- Where conflicts exist: render as a two-column comparison

### Tab 5 — Action Plan
**Purpose:** Prioritised sequence for the compliance team.

Structure:
- Numbered cards in priority order (1 = highest)
- Each card: action title | effort badge | owner | deadline | jurisdiction pills | rationale
- Group by deadline horizon: Immediate (within 3 months) | Near-term (3–12 months) | Medium-term (12–24 months) | Monitor

### Tab 6 — Sources & Confidence
**Purpose:** Every claim traceable. Audit-ready.

Structure:
- Two sections: Sources Register and Unknowns Register
- Sources Register: table with columns — Obligation ID | Claim | Source | Tier | Citation | Confidence | Verified Date
- Unknowns Register: cards showing topic, reason, and recommendation
- Freshness callout: "This report reflects regulatory positions as of [generatedDate]."

---

## HTML Generation Instructions

When producing the output HTML:

1. Copy the base HTML structure (header, nav, tab panels, script block) exactly.
2. Populate `RESEARCH_DATA` with the researched content — this is the only section you modify.
3. Do not hardcode content outside the `RESEARCH_DATA` object. All rendered content must derive from the data.
4. Ensure every `obligationId` in `sourcesRegister` matches an `id` in a jurisdiction's `obligations` array.
5. Include the `<meta name="freshness" content="[generatedDate]">` tag in the head.
6. Title the document: `AI Regulation Report — [organisation.name] — [generatedDate]`.
7. Set the legal disclaimer in the header: "This report is research output, not legal advice. Regulatory positions should be confirmed with qualified legal counsel in each jurisdiction before use in live compliance programmes."

---

## Quality Checks Before Outputting

Before generating the HTML, verify:

- [ ] Every Tier 1 obligation has at least one Tier 1 source in `sourcesRegister`
- [ ] Every confidence flag is one of the five permitted values
- [ ] All ISO alpha-3 country codes in `plotlyCode` and `memberCodes` are valid
- [ ] `actionPlan` priorities are sequential integers starting at 1
- [ ] No obligation appears in the report without an `actionNeeded` field
- [ ] `unknowns` register is populated — a report with no unknowns is not credible
- [ ] `freshnessWarning` explicitly names which jurisdictions have [PENDING] or [UNDER REVIEW] positions
