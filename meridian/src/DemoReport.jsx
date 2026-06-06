import { useState } from "react";

// ── Sample data: US accessibility tech company, EU + UK + Canada exposure ──
const RESEARCH_DATA = {
  organisation: {
    name: "SignalPath Technologies",
    role: "Provider & Deployer",
    sector: "Accessibility technology — AI-powered communication services for Deaf and hard-of-hearing communities",
    size: "680 employees",
    established: "United States (Delaware — HQ: Salt Lake City, UT)",
    usersIn: ["United States (nationwide)", "Canada", "United Kingdom", "Germany"],
    aiActivity: "Real-time speech and sign language recognition; automated captioning; biometric voice and gesture processing",
    foundationModelDependency: true,
    humanOversight: "Human-on-the-loop (certified captioners can intervene in real-time)",
    maturity: "In production, retrofitting compliance",
    deliverable: "Obligations map and gap assessment",
    biometricProcessing: "Yes — voiceprints and sign language gesture data (biometric identifiers)",
  },
  generatedDate: "June 2026",
  jurisdictions: [
    {
      code: "USA",
      name: "US Federal (FCC / FTC / ADA)",
      tier: 1,
      tierLabel: "Directly Applicable",
      trigger: "FCC CVAA accuracy obligations for AI captioning; FTC AI guidance and Section 5 unfair practices; ADA Title IV relay service standards",
      confidence: "SETTLED",
      keyDates: ["Ongoing: FCC CVAA enforcement active", "Ongoing: FTC AI guidance operative", "Monitor: Federal AI legislation pipeline"],
      obligationCount: 5,
      penalty: "FCC: Up to $100,000/day per violation; FTC: Civil penalties and injunctive relief",
      countries: ["USA"]
    },
    {
      code: "EU",
      name: "EU AI Act",
      tier: 1,
      tierLabel: "Directly Applicable",
      trigger: "Biometric data processing (voiceprint and gesture recognition) = Annex III §1 high-risk; provider and deployer with users in Germany",
      confidence: "SETTLED",
      keyDates: ["Aug 2025: GPAI provider obligations", "Aug 2026: High-risk system obligations", "Ongoing: Prohibited practices in force"],
      obligationCount: 7,
      penalty: "Up to €15M or 3% global turnover (high-risk); €35M or 7% (prohibited practices)",
      countries: ["AUT","BEL","BGR","CYP","CZE","DEU","DNK","EST","ESP","FIN","FRA","GRC","HRV","HUN","IRL","ITA","LTU","LUX","LVA","MLT","NLD","POL","PRT","ROU","SVK","SVN","SWE"]
    },
    {
      code: "ILL",
      name: "Illinois BIPA",
      tier: 1,
      tierLabel: "Directly Applicable",
      trigger: "Collection and storage of voiceprints from Illinois residents without written consent; BIPA §15 obligations triggered",
      confidence: "SETTLED",
      keyDates: ["In force since 2008 — live enforcement risk", "Monitor: BIPA amendment developments"],
      obligationCount: 3,
      penalty: "$1,000 per negligent violation; $5,000 per intentional violation — statutory per-person damages",
      countries: []
    },
    {
      code: "GBR",
      name: "United Kingdom",
      tier: 1,
      tierLabel: "Directly Applicable",
      trigger: "UK GDPR Art.9 special category (biometric data); ICO guidance on AI and biometrics; users in UK",
      confidence: "SETTLED",
      keyDates: ["Ongoing: ICO biometric guidance operative", "Monitor: UK AI regulation Bill"],
      obligationCount: 4,
      penalty: "ICO: Up to £17.5M or 4% global turnover",
      countries: ["GBR"]
    },
    {
      code: "COL",
      name: "Colorado AI Act",
      tier: 1,
      tierLabel: "Directly Applicable",
      trigger: "Deployer of high-risk AI with Colorado consumers; SB 24-205 covers systems with material influence on consequential decisions",
      confidence: "SETTLED",
      keyDates: ["Feb 2026: Full obligations in force"],
      obligationCount: 3,
      penalty: "Colorado AG enforcement; civil penalties",
      countries: []
    },
    {
      code: "CAN",
      name: "Canada (CPPA / AIDA)",
      tier: 2,
      tierLabel: "Indirectly Applicable",
      trigger: "PIPEDA currently applies to Canadian users; Bill C-27 (CPPA + AIDA) approaching — biometric processing will trigger enhanced obligations once in force",
      confidence: "PENDING",
      keyDates: ["Now: PIPEDA applies to Canadian user data", "Monitor: Bill C-27 parliamentary progress"],
      obligationCount: 4,
      penalty: "PIPEDA: Up to CAD $100,000; CPPA (when in force): Up to CAD $25M or 5% global revenue",
      countries: ["CAN"]
    },
    {
      code: "INT",
      name: "International Frameworks",
      tier: 3,
      tierLabel: "Soft-Law Alignment",
      trigger: "NIST AI RMF (procurement baseline); ISO/IEC 42001 (certifiable governance); W3C accessibility standards (WCAG alignment)",
      confidence: "SOFT-LAW",
      keyDates: ["Ongoing: ISO 42001 certification available", "Ongoing: NIST AI RMF operative baseline"],
      obligationCount: 2,
      penalty: "No direct enforcement — procurement risk and reputational posture",
      countries: []
    }
  ],
  topObligations: [
    { id: "ILL-001", jurisdiction: "Illinois BIPA",       title: "Biometric data consent and retention policy",              deadline: "NOW — live enforcement risk",       confidence: "SETTLED", urgency: "critical" },
    { id: "EU-P01",  jurisdiction: "EU AI Act",            title: "Biometric system high-risk classification assessment",     deadline: "NOW — Aug 2025 GPAI obligations",   confidence: "SETTLED", urgency: "critical" },
    { id: "US-001",  jurisdiction: "FCC (US Federal)",     title: "CVAA captioning accuracy documentation and monitoring",   deadline: "Ongoing — enforce now",             confidence: "SETTLED", urgency: "high"     },
    { id: "UK-001",  jurisdiction: "UK (ICO)",             title: "DPIA for biometric AI processing",                        deadline: "Q3 2025",                           confidence: "SETTLED", urgency: "high"     },
    { id: "COL-001", jurisdiction: "Colorado AI Act",      title: "Pre-deployment risk assessment + consumer disclosure",    deadline: "Feb 2026",                          confidence: "SETTLED", urgency: "medium"   },
  ],
  crossCutting: [
    {
      theme: "Biometric data transparency and consent",
      jurisdictions: ["EU AI Act", "Illinois BIPA", "UK GDPR", "Canada CPPA"],
      conservativeApproach: "Obtain explicit written consent before any biometric data collection. Provide clear notice of purpose, retention period, and third-party sharing. Publish and enforce a biometric data destruction schedule. Build consent architecture to BIPA's strictest requirements (written consent, defined retention, documented destruction) — this satisfies GDPR Art.9 and CPPA simultaneously.",
      conflict: "BIPA requires written consent and a public retention policy before collection. EU GDPR/AI Act require consent plus a DPIA. Build to BIPA + GDPR simultaneously — they reinforce each other with no material conflict."
    },
    {
      theme: "Accessibility AI quality and accuracy obligations",
      jurisdictions: ["FCC CVAA", "EU AI Act Art.13", "UK Equality Act"],
      conservativeApproach: "Document accuracy benchmarks for captioning and sign language recognition against defined population baselines. Establish ongoing accuracy monitoring with defined thresholds triggering human captioner intervention. FCC CVAA accuracy requirements are the most prescriptive — build quality monitoring to this standard and it satisfies EU Art.13 transparency and UK Equality Act reasonable adjustment obligations.",
      conflict: "None material — CVAA is the most operationally prescriptive. Compliance satisfies overlapping EU and UK obligations."
    },
    {
      theme: "Human oversight in communication relay",
      jurisdictions: ["EU AI Act Art.14", "FCC relay service rules", "FCA Consumer Duty equivalent"],
      conservativeApproach: "Ensure certified human captioners/interpreters can intervene in real-time. Document that override capability is monitored and actually exercised, not merely available in principle. Define competence standards for override personnel. AI relay services must not degrade communication access relative to human-only baseline.",
      conflict: "FCC relay rules set a functional equivalency standard that is effectively more demanding than EU AI Act structural oversight requirements. Build to FCC — it satisfies both."
    },
  ],
  actionPlan: [
    { priority: 1, action: "Illinois BIPA compliance programme", rationale: "Live enforcement risk. Class action exposure is significant. Written consent, retention schedules, and destruction policy must be in place before any Illinois resident biometric data is processed.", jurisdictions: ["Illinois BIPA"], effort: "High", owner: "Legal / Privacy Counsel", deadline: "Immediate", horizon: "immediate" },
    { priority: 2, action: "EU AI Act biometric high-risk classification assessment", rationale: "Voiceprint and gesture recognition qualify as biometric data processing. High-risk classification under Annex III §1 triggers significant deployer obligations. GPAI obligations in force August 2025.", jurisdictions: ["EU AI Act"], effort: "Medium", owner: "Legal / DPO", deadline: "Q3 2025", horizon: "immediate" },
    { priority: 3, action: "CVAA captioning accuracy documentation and monitoring programme", rationale: "FCC enforcement active. CVAA requires documented accuracy standards and quality monitoring. Non-compliance risks enforcement action and reputational harm in the accessibility community.", jurisdictions: ["US Federal"], effort: "Medium", owner: "Product Compliance / Engineering", deadline: "Q3 2025", horizon: "immediate" },
    { priority: 4, action: "UK GDPR DPIA for biometric AI processing", rationale: "ICO guidance requires a Data Protection Impact Assessment for high-risk biometric processing before operation. UK users are currently being served without documented DPIA.", jurisdictions: ["United Kingdom"], effort: "Medium", owner: "DPO / Legal", deadline: "Q3 2025", horizon: "immediate" },
    { priority: 5, action: "Canada PIPEDA review and CPPA readiness plan", rationale: "PIPEDA applies now to Canadian user data. Bill C-27 (CPPA + AIDA) will significantly increase obligations for biometric processing. Monitor and establish readiness roadmap.", jurisdictions: ["Canada (CPPA / AIDA)"], effort: "Low", owner: "Legal / Privacy", deadline: "Q4 2025", horizon: "near" },
    { priority: 6, action: "Colorado AI Act pre-deployment risk assessment", rationale: "SB 24-205 requires risk assessment and consumer disclosure before deployment of high-risk AI in Colorado. In force February 2026.", jurisdictions: ["Colorado AI Act"], effort: "Medium", owner: "Legal / 1LOD Compliance", deadline: "Nov 2025", horizon: "near" },
    { priority: 7, action: "EU AI Act Fundamental Rights Impact Assessment (FRIA)", rationale: "Required before August 2026 for biometric AI under Art.27. Significant lead time needed — assessment must cover impact on Deaf and hard-of-hearing users specifically.", jurisdictions: ["EU AI Act"], effort: "Medium", owner: "DPO / Legal", deadline: "Q1 2026", horizon: "near" },
    { priority: 8, action: "EU AI Act high-risk deployer obligations programme", rationale: "Full Annex III obligations in force August 2026. Programme requires 12+ months lead time: conformity verification, human oversight documentation, logging infrastructure.", jurisdictions: ["EU AI Act"], effort: "Very High", owner: "Programme Office + Compliance", deadline: "Aug 2026", horizon: "medium" },
  ],
  unknowns: [
    { topic: "BIPA scope for AI-processed vs. raw biometric data", reason: "Litigation is unsettled on whether BIPA applies when biometric identifiers are extracted by AI from voice/video rather than directly collected. Recent case law cuts both ways.", recommendation: "Treat all voiceprint and gesture data as BIPA-covered pending definitive guidance. Consult Illinois specialist counsel." },
    { topic: "EU AI Act scope for assistive technology biometric systems", reason: "Uncertainty whether accessibility-purpose biometric AI receives any carve-out or reduced obligations. Commission guidance pending.", recommendation: "Treat as fully high-risk pending guidance. Engage EU AI Office regulatory sandbox if available — accessibility use cases may be prioritised." },
    { topic: "Canada AIDA timeline post-federal election", reason: "Bill C-27 parliamentary progress stalled; new government may reprioritise. AIDA may be withdrawn or significantly amended.", recommendation: "Monitor quarterly. PIPEDA obligations are certain — focus compliance effort there while tracking AIDA development." },
  ]
};

// ── Config objects — inline styles only, no Tailwind ──
const TIER_CONFIG = {
  1: { label: "Directly Applicable",   bg: "#FEE2E2", text: "#991B1B", hex: "#DC2626" },
  2: { label: "Indirectly Applicable", bg: "#FEF3C7", text: "#92400E", hex: "#D97706" },
  3: { label: "Soft-Law Alignment",    bg: "#DBEAFE", text: "#1E40AF", hex: "#2563EB" },
  4: { label: "Monitor",              bg: "#EDE9FE", text: "#5B21B6", hex: "#7C3AED" },
  5: { label: "Not Applicable",       bg: "#F1F5F9", text: "#64748B", hex: "#9CA3AF" },
};

const CONFIDENCE_CONFIG = {
  "SETTLED":      { bg: "#D1FAE5", text: "#065F46" },
  "CONTESTED":    { bg: "#FEF3C7", text: "#92400E" },
  "PENDING":      { bg: "#DBEAFE", text: "#1E40AF" },
  "SOFT-LAW":     { bg: "#F1F5F9", text: "#475569" },
  "UNDER REVIEW": { bg: "#FEE2E2", text: "#991B1B" },
};

const URGENCY_CONFIG = {
  critical: { bg: "#EF4444", label: "Critical" },
  high:     { bg: "#F97316", label: "High"     },
  medium:   { bg: "#3B82F6", label: "Medium"   },
  low:      { bg: "#9CA3AF", label: "Low"      },
};

const EFFORT_CONFIG = {
  "Low":      { bg: "#D1FAE5", text: "#065F46" },
  "Medium":   { bg: "#FEF9C3", text: "#713F12" },
  "High":     { bg: "#FFEDD5", text: "#9A3412" },
  "Very High":{ bg: "#FEE2E2", text: "#991B1B" },
};

// ── Reusable components ──────────────────────────────────────────────────────

function Badge({ label, bgColor, textColor }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 8px", borderRadius: 4,
      fontSize: 11, fontWeight: 600,
      background: bgColor, color: textColor,
    }}>
      {label}
    </span>
  );
}

function TierBadge({ tier }) {
  const c = TIER_CONFIG[tier] || TIER_CONFIG[5];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c.bg, padding: "2px 8px", borderRadius: 4,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.hex, flexShrink: 0, display: "inline-block" }} />
      <span style={{ color: c.hex, fontSize: 11, fontWeight: 700 }}>T{tier} — {c.label}</span>
    </span>
  );
}

function ConfidenceBadge({ flag }) {
  const c = CONFIDENCE_CONFIG[flag] || CONFIDENCE_CONFIG["SETTLED"];
  return <Badge label={flag} bgColor={c.bg} textColor={c.text} />;
}

// ── World Map ────────────────────────────────────────────────────────────────

function WorldMap({ jurisdictions, onSelect, selected }) {
  const regions = [
    { id: "USA", label: "USA",      x: 95,  y: 150, w: 140, h: 72,  rx: 6 },
    { id: "COL", label: "Colorado", x: 118, y: 172, w: 48,  h: 28,  rx: 4 },
    { id: "ILL", label: "Illinois", x: 172, y: 155, w: 42,  h: 26,  rx: 4 },
    { id: "EU",  label: "EU",       x: 385, y: 150, w: 88,  h: 58,  rx: 6 },
    { id: "GBR", label: "UK",       x: 340, y: 130, w: 40,  h: 30,  rx: 5 },
    { id: "CAN", label: "Canada",   x: 95,  y: 95,  w: 110, h: 48,  rx: 6 },
    { id: "INT", label: "Intl",     x: 490, y: 305, w: 58,  h: 32,  rx: 5 },
  ];

  const getJ   = (id) => jurisdictions.find(j => j.code === id);
  const getColor = (id) => { const j = getJ(id); return j ? TIER_CONFIG[j.tier].hex : "#334155"; };

  return (
    <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)", borderRadius: 12, padding: 16 }}>
      <svg viewBox="0 0 620 400" style={{ width: "100%", maxHeight: 340 }}>
        <rect x="0" y="0" width="620" height="400" fill="#0F172A" rx="8" />
        {[1,2,3,4,5].map(i => <line key={`h${i}`} x1="0" y1={i*80} x2="620" y2={i*80} stroke="#1E3A5F" strokeWidth="0.5" />)}
        {[1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*88} y1="0" x2={i*88} y2="400" stroke="#1E3A5F" strokeWidth="0.5" />)}
        <ellipse cx="165" cy="185" rx="145" ry="100" fill="#1E293B" />
        <ellipse cx="165" cy="108" rx="115" ry="52"  fill="#1E293B" />
        <ellipse cx="420" cy="172" rx="88"  ry="68"  fill="#1E293B" />
        <ellipse cx="570" cy="192" rx="90"  ry="75"  fill="#1E293B" />
        <ellipse cx="432" cy="288" rx="62"  ry="72"  fill="#1E293B" />
        <ellipse cx="212" cy="308" rx="66"  ry="70"  fill="#1E293B" />
        <ellipse cx="548" cy="318" rx="56"  ry="40"  fill="#1E293B" />

        {regions.map(r => {
          const j        = getJ(r.id);
          const color    = getColor(r.id);
          const isSel    = selected === r.id;
          return (
            <g key={r.id} onClick={() => onSelect(r.id)} style={{ cursor: "pointer" }}>
              <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx}
                fill={color} fillOpacity={isSel ? 1 : 0.82}
                stroke={isSel ? "#FFFFFF" : color} strokeWidth={isSel ? 2.5 : 1}
                style={{ filter: isSel ? "drop-shadow(0 0 8px rgba(255,255,255,0.4))" : "none" }}
              />
              <text x={r.x + r.w/2} y={r.y + r.h/2 - 4} textAnchor="middle" fill="white"
                fontSize={r.w > 60 ? 11 : 9} fontWeight="700" style={{ pointerEvents:"none" }}>
                {r.label}
              </text>
              <text x={r.x + r.w/2} y={r.y + r.h/2 + 9} textAnchor="middle"
                fill="rgba(255,255,255,0.8)" fontSize={8} style={{ pointerEvents:"none" }}>
                {j ? `T${j.tier}` : "—"}
              </text>
            </g>
          );
        })}

        {Object.entries(TIER_CONFIG).slice(0,4).map(([tier, cfg], i) => (
          <g key={tier} transform={`translate(${12 + i * 148}, 372)`}>
            <rect x="0" y="0" width="10" height="10" rx="2" fill={cfg.hex} />
            <text x="14" y="9" fill="#94A3B8" fontSize="8">{`T${tier}: ${cfg.label}`}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Tabs ─────────────────────────────────────────────────────────────────────

function OverviewTab() {
  const { organisation, topObligations, jurisdictions, generatedDate } = RESEARCH_DATA;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#FEF9C3", border: "1px solid #FDE047", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ fontSize: 16 }}>⚠</span>
        <p style={{ fontSize: 12, color: "#713F12", margin: 0 }}>
          <strong>Freshness:</strong> AI regulation changes rapidly. This report reflects positions as of {generatedDate}. Positions marked PENDING or UNDER REVIEW should be rechecked before use in live compliance programmes. This is research output, not legal advice.
        </p>
      </div>

      {/* Org profile — slightly more whitespace per spec */}
      <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", padding: "22px 22px" }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 16px" }}>Organization Profile</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 28px" }}>
          {[
            ["Role",             organisation.role],
            ["Sector",          organisation.sector],
            ["Established",     organisation.established],
            ["AI Activity",     organisation.aiActivity],
            ["Users In",        organisation.usersIn.join(", ")],
            ["Oversight Model", organisation.humanOversight],
            ["Biometric Data",  organisation.biometricProcessing],
          ].map(([k, v]) => (
            <div key={k} style={{ borderBottom: "1px solid #F8FAFC", paddingBottom: 8 }}>
              <span style={{ fontSize: 11, color: "#94A3B8", display: "block", marginBottom: 3 }}>{k}</span>
              <span style={{ fontSize: 13, color: "#1E293B", fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top obligations */}
      <div>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 10px" }}>Top Priority Obligations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {topObligations.map((ob, i) => {
            const urgency = URGENCY_CONFIG[ob.urgency];
            const conf    = CONFIDENCE_CONFIG[ob.confidence];
            return (
              <div key={i} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: urgency.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "white" }}>{i + 1}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{ob.title}</span>
                    <span style={{ fontSize: 11, color: "#64748B", background: "#F1F5F9", padding: "1px 6px", borderRadius: 4 }}>{ob.jurisdiction}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#EF4444", fontWeight: 500 }}>⏰ {ob.deadline}</span>
                </div>
                <ConfidenceBadge flag={ob.confidence} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Jurisdiction matrix */}
      <div>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 10px" }}>Jurisdiction Matrix</h3>
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  {["Jurisdiction","Tier","Trigger","Key Dates","Penalty","Confidence"].map(h => (
                    <th key={h} style={{ padding: "9px 12px", textAlign: "left", color: "#64748B", fontWeight: 600, fontSize: 11, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jurisdictions.map((j, i) => {
                  const tc = TIER_CONFIG[j.tier];
                  const cc = CONFIDENCE_CONFIG[j.confidence];
                  return (
                    <tr key={j.code} style={{ borderBottom: i < jurisdictions.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1E293B", whiteSpace: "nowrap" }}>{j.name}</td>
                      <td style={{ padding: "10px 12px" }}><TierBadge tier={j.tier} /></td>
                      <td style={{ padding: "10px 12px", color: "#475569", minWidth: 200 }}>{j.trigger}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {j.keyDates.map((d, di) => <span key={di} style={{ fontSize: 10, color: "#64748B", whiteSpace: "nowrap" }}>{d}</span>)}
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", fontSize: 11, color: "#EF4444", fontWeight: 500, minWidth: 160 }}>{j.penalty}</td>
                      <td style={{ padding: "10px 12px" }}><ConfidenceBadge flag={j.confidence} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapTab() {
  const [selected, setSelected] = useState(null);
  const selectedJ = selected ? RESEARCH_DATA.jurisdictions.find(j => j.code === selected) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Select a jurisdiction on the map to view its applicability tier, trigger reason, and key obligations. Color intensity reflects enforcement risk.</p>
      <div style={{ display: "grid", gridTemplateColumns: selectedJ ? "1fr 340px" : "1fr", gap: 16, alignItems: "start" }}>
        <WorldMap jurisdictions={RESEARCH_DATA.jurisdictions} onSelect={setSelected} selected={selected} />
        {selectedJ && (
          <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 10, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", margin: 0 }}>{selectedJ.name}</h3>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: 18 }}>×</button>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              <TierBadge tier={selectedJ.tier} />
              <ConfidenceBadge flag={selectedJ.confidence} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: "#94A3B8", display: "block", marginBottom: 3 }}>Why it applies</span>
              <p style={{ fontSize: 13, color: "#334155", margin: 0 }}>{selectedJ.trigger}</p>
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: "#94A3B8", display: "block", marginBottom: 4 }}>Key dates</span>
              {selectedJ.keyDates.map((d, i) => (
                <div key={i} style={{ fontSize: 12, color: "#475569", padding: "3px 0", borderBottom: "1px solid #F1F5F9" }}>📅 {d}</div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, background: "#F8FAFC", borderRadius: 6, padding: "8px 10px", textAlign: "center" }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#1E293B", display: "block" }}>{selectedJ.obligationCount}</span>
                <span style={{ fontSize: 10, color: "#64748B" }}>Obligations</span>
              </div>
              <div style={{ flex: 2, background: "#FEF2F2", borderRadius: 6, padding: "8px 10px" }}>
                <span style={{ fontSize: 10, color: "#991B1B", display: "block", marginBottom: 2 }}>Max penalty</span>
                <span style={{ fontSize: 11, color: "#7F1D1D", fontWeight: 600 }}>{selectedJ.penalty}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
        {RESEARCH_DATA.jurisdictions.map(j => {
          const tc = TIER_CONFIG[j.tier];
          return (
            <div key={j.code} onClick={() => setSelected(j.code === selected ? null : j.code)}
              style={{ background: "white", borderLeft: `4px solid ${tc.hex}`, border: `1.5px solid ${selected === j.code ? tc.hex : "#E2E8F0"}`, borderRadius: 8, padding: "12px 14px", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1E293B", marginBottom: 4 }}>{j.name}</div>
              <div style={{ fontSize: 11, color: tc.hex, fontWeight: 600, marginBottom: 6 }}>Tier {j.tier} — {tc.label}</div>
              <div style={{ fontSize: 11, color: "#64748B" }}>{j.obligationCount} obligations</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ObligationsTab() {
  const [openCards, setOpenCards] = useState({});
  const toggle = (id) => setOpenCards(prev => ({ ...prev, [id]: !prev[id] }));

  const obligations = [
    { id: "ILL-001", jurisdiction: "Illinois BIPA",   title: "Biometric data consent — written notice before collection",          who: "Collector",        inForce: "In force",    confidence: "SETTLED", requirement: "Obtain a written release from each individual before collecting or storing biometric identifiers. Publish a publicly available retention schedule specifying the purpose of collection and a destruction timeframe.", actionNeeded: "Implement written consent flow for all Illinois users before any voice or gesture data is collected. Publish BIPA-compliant retention policy on website. Conduct audit of existing data for consent gaps." },
    { id: "ILL-002", jurisdiction: "Illinois BIPA",   title: "Biometric data retention and destruction schedule",                  who: "Collector",        inForce: "In force",    confidence: "SETTLED", requirement: "Biometric data must be destroyed within 3 years of collection or within 1 year of the individual's last interaction with the organisation, whichever comes first.", actionNeeded: "Implement automated retention enforcement in data pipeline. Document destruction schedule in privacy policy and internal data governance records." },
    { id: "EU-P01",  jurisdiction: "EU AI Act",       title: "Biometric system high-risk classification and conformity pathway",   who: "Provider/Deployer",inForce: "Aug 2026",    confidence: "SETTLED", requirement: "AI systems that process biometric data for identification or categorisation of natural persons are high-risk under Annex III. Providers must follow conformity assessment; deployers must verify compliance before deployment.", actionNeeded: "Commission legal opinion confirming high-risk classification. Engage EU AI Act conformity assessment pathway. Contractually require provider documentation of conformity." },
    { id: "EU-D01",  jurisdiction: "EU AI Act",       title: "Human oversight — competence, authority, and real-time capability",  who: "Deployer",         inForce: "Aug 2026",    confidence: "SETTLED", requirement: "Assign oversight to individuals with competence to understand system capabilities and limitations. Override must be genuinely accessible in real-time — not merely available in principle.", actionNeeded: "Define captioner oversight roles and competence certification standards. Document that real-time intervention is operationally practiced, not nominal. Establish override rate monitoring." },
    { id: "EU-D02",  jurisdiction: "EU AI Act",       title: "Fundamental Rights Impact Assessment (FRIA)",                        who: "Deployer",         inForce: "Aug 2026",    confidence: "SETTLED", requirement: "Conduct FRIA before deploying high-risk AI in services affecting protected groups. Must specifically assess impact on disability and accessibility dimensions.", actionNeeded: "Build FRIA template incorporating disability rights analysis. Engage Deaf community advocacy groups as part of assessment process. Integrate with existing DPIA." },
    { id: "US-001",  jurisdiction: "US Federal (FCC)","title": "CVAA captioning accuracy standards and quality monitoring",        who: "Provider",         inForce: "Ongoing",     confidence: "SETTLED", requirement: "AI captioning must meet FCC accuracy thresholds and quality standards under the Communications and Video Accessibility Act. Quality monitoring and complaint handling required.", actionNeeded: "Document accuracy benchmarking methodology. Implement real-time quality monitoring with defined intervention thresholds. Establish and publish complaint handling process." },
    { id: "UK-001",  jurisdiction: "United Kingdom",  title: "DPIA for biometric AI processing under UK GDPR",                    who: "Controller",       inForce: "Ongoing",     confidence: "SETTLED", requirement: "UK GDPR Art.35 requires a DPIA before processing that is likely to result in high risk. Biometric data processing for AI systems meets this threshold per ICO guidance.", actionNeeded: "Commission UK GDPR DPIA covering voiceprint collection and sign language gesture processing. Submit to ICO if required. Integrate findings into system design." },
    { id: "COL-001", jurisdiction: "Colorado AI Act", title: "Pre-deployment risk assessment and consumer disclosure",             who: "Deployer",         inForce: "Feb 2026",    confidence: "SETTLED", requirement: "SB 24-205 requires deployers of high-risk AI to conduct a risk assessment before deployment and provide consumers with a plain-language notice that AI is being used.", actionNeeded: "Complete Colorado SB 24-205 risk assessment template. Design consumer disclosure notice for Colorado users. Ensure notice is accessible and meets plain language standards." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 14 }}>🚨</span>
          <span style={{ fontWeight: 700, fontSize: 13, color: "#991B1B" }}>Live Enforcement Risk — Illinois BIPA</span>
          <ConfidenceBadge flag="SETTLED" />
        </div>
        <p style={{ fontSize: 12, color: "#7F1D1D", margin: 0 }}>Illinois BIPA class action exposure is significant and immediate. Class actions are routinely brought for missing written consent or absent retention policies. This is not a future risk — it is operative now for any Illinois users whose voice data is processed.</p>
      </div>

      {obligations.map(ob => (
        <div key={ob.id} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, overflow: "hidden" }}>
          <div onClick={() => toggle(ob.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer" }}>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#94A3B8", background: "#F8FAFC", padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>{ob.id}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B", flex: 1 }}>{ob.title}</span>
            <span style={{ fontSize: 11, color: "#64748B", marginRight: 4 }}>{ob.who}</span>
            <ConfidenceBadge flag={ob.confidence} />
            <span style={{ fontSize: 11, color: "#64748B", background: "#F1F5F9", padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>⏰ {ob.inForce}</span>
            <span style={{ color: "#94A3B8", fontSize: 16 }}>{openCards[ob.id] ? "▲" : "▼"}</span>
          </div>
          {openCards[ob.id] && (
            <div style={{ padding: "0 14px 14px", borderTop: "1px solid #F1F5F9" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                <div>
                  <span style={{ fontSize: 11, color: "#94A3B8", display: "block", marginBottom: 4 }}>Requirement</span>
                  <p style={{ fontSize: 13, color: "#334155", margin: 0 }}>{ob.requirement}</p>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: "#94A3B8", display: "block", marginBottom: 4 }}>Action needed for SignalPath</span>
                  <p style={{ fontSize: 13, color: "#1E293B", fontWeight: 500, margin: 0 }}>{ob.actionNeeded}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CrossCuttingTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Obligations that appear across multiple jurisdictions. Building to the most demanding standard simultaneously satisfies requirements in all overlapping frameworks.</p>
      {RESEARCH_DATA.crossCutting.map((theme, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 10, padding: 18 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", margin: "0 0 10px" }}>{theme.theme}</h3>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {theme.jurisdictions.map(j => (
              <span key={j} style={{ fontSize: 11, background: "#EFF6FF", color: "#1D4ED8", padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>{j}</span>
            ))}
          </div>
          <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: "10px 12px", marginBottom: theme.conflict ? 10 : 0 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#166534", display: "block", marginBottom: 4 }}>✓ Conservative approach (satisfies all frameworks)</span>
            <p style={{ fontSize: 13, color: "#14532D", margin: 0 }}>{theme.conservativeApproach}</p>
          </div>
          {theme.conflict && (
            <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "10px 12px" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#92400E", display: "block", marginBottom: 4 }}>⚡ Conflict or variation</span>
              <p style={{ fontSize: 13, color: "#78350F", margin: 0 }}>{theme.conflict}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ActionPlanTab() {
  const horizons = [
    { key: "immediate", label: "Immediate",   subtitle: "Within 3 months",  color: "#EF4444" },
    { key: "near",      label: "Near-term",   subtitle: "3–12 months",      color: "#F59E0B" },
    { key: "medium",    label: "Medium-term", subtitle: "12–24 months",     color: "#2563EB" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {horizons.map(h => {
        const items = RESEARCH_DATA.actionPlan.filter(a => a.horizon === h.key);
        if (!items.length) return null;
        return (
          <div key={h.key}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: h.color }} />
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", margin: 0 }}>{h.label}</h3>
              <span style={{ fontSize: 12, color: "#94A3B8" }}>{h.subtitle}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map(action => {
                const effort = EFFORT_CONFIG[action.effort] || EFFORT_CONFIG["Medium"];
                return (
                  <div key={action.priority} style={{ background: "white", border: "1px solid #E2E8F0", borderLeft: `4px solid ${h.color}`, borderRadius: 8, padding: "14px 16px", display: "grid", gridTemplateColumns: "32px 1fr auto", gap: 12, alignItems: "start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: h.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>{action.priority}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#1E293B", marginBottom: 4 }}>{action.action}</div>
                      <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 8px" }}>{action.rationale}</p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {action.jurisdictions.map(j => (
                          <span key={j} style={{ fontSize: 10, background: "#F1F5F9", color: "#475569", padding: "1px 6px", borderRadius: 4 }}>{j}</span>
                        ))}
                        <span style={{ fontSize: 10, background: "#F1F5F9", color: "#475569", padding: "1px 6px", borderRadius: 4 }}>👤 {action.owner}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                      <span style={{ fontSize: 10, background: effort.bg, color: effort.text, padding: "2px 8px", borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap" }}>Effort: {action.effort}</span>
                      <span style={{ fontSize: 11, color: "#EF4444", fontWeight: 500, whiteSpace: "nowrap" }}>⏰ {action.deadline}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SourcesTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#FEF9C3", border: "1px solid #FDE047", borderRadius: 8, padding: "10px 14px" }}>
        <p style={{ fontSize: 12, color: "#713F12", margin: 0 }}>All claims in this report are sourced to Tier 1 (primary legislation) or Tier 2 (specialist advisory) sources. Tier 3 sources (quality press) are used for corroboration only. See knowledge-base/sources.md for the full allowlist.</p>
      </div>

      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 12 }}>Sources Register</h3>
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  {["Obligation","Source","Tier","Citation","Confidence","Verified"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#64748B", fontWeight: 600, fontSize: 11, borderBottom: "1px solid #E2E8F0", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["ILL-001", "Illinois BIPA — 740 ILCS 14/",     "1", "§15(a)–(b)",              "SETTLED", "June 2025"],
                  ["ILL-002", "Illinois BIPA — 740 ILCS 14/",     "1", "§15(a)",                  "SETTLED", "June 2025"],
                  ["EU-P01",  "EUR-Lex 2024/1689 (EU AI Act)",    "1", "Art. 3(33), Annex III §1", "SETTLED", "June 2025"],
                  ["EU-D01",  "EUR-Lex 2024/1689",               "1", "Art. 26(2), Art. 14",      "SETTLED", "June 2025"],
                  ["EU-D02",  "EUR-Lex 2024/1689",               "1", "Art. 27",                  "SETTLED", "June 2025"],
                  ["US-001",  "47 CFR Part 79 (FCC CVAA rules)", "1", "§79.1",                    "SETTLED", "June 2025"],
                  ["UK-001",  "UK GDPR (retained EU law)",       "1", "Art. 35; ICO AI guidance", "SETTLED", "June 2025"],
                  ["COL-001", "Colorado SB 24-205",              "1", "§§ 6-1-1701 to 1711",      "SETTLED", "June 2025"],
                ].map(([id, src, tier, cite, conf, date], i) => {
                  const cc = CONFIDENCE_CONFIG[conf];
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "9px 12px", fontFamily: "monospace", fontSize: 11, color: "#475569" }}>{id}</td>
                      <td style={{ padding: "9px 12px", color: "#1E293B", fontWeight: 500 }}>{src}</td>
                      <td style={{ padding: "9px 12px" }}><span style={{ background: "#DBEAFE", color: "#1E40AF", padding: "1px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Tier {tier}</span></td>
                      <td style={{ padding: "9px 12px", fontFamily: "monospace", fontSize: 11, color: "#64748B" }}>{cite}</td>
                      <td style={{ padding: "9px 12px" }}><ConfidenceBadge flag={conf} /></td>
                      <td style={{ padding: "9px 12px", fontSize: 11, color: "#94A3B8" }}>{date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 12 }}>Unknowns Register</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {RESEARCH_DATA.unknowns.map((u, i) => (
            <div key={i} style={{ background: "white", border: "1px solid #E2E8F0", borderLeft: "4px solid #F59E0B", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1E293B", marginBottom: 4 }}>⚠ {u.topic}</div>
              <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 6px" }}>{u.reason}</p>
              <p style={{ fontSize: 12, color: "#1D4ED8", fontWeight: 500, margin: 0 }}>→ {u.recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main report shell ─────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",    label: "Overview"            },
  { id: "map",         label: "🗺 Map"              },
  { id: "obligations", label: "Obligations"         },
  { id: "crosscutting",label: "Cross-Cutting"       },
  { id: "actionplan",  label: "Action Plan"         },
  { id: "sources",     label: "Sources & Confidence"},
];

export default function DemoReport({ onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { organisation, generatedDate, jurisdictions } = RESEARCH_DATA;
  const tier1Count = jurisdictions.filter(j => j.tier === 1).length;

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Source Sans 3', 'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)", color: "white", padding: "24px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 18 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "#DBEAFE", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>MERIDIAN</p>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>·</span>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0 }}>Multi-jurisdictional Regulatory Intelligence</p>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 5px", letterSpacing: "-0.02em" }}>{organisation.name}</h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", margin: 0 }}>{organisation.role} · {organisation.established}</p>
            </div>
            <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-end" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}>Generated {generatedDate}</p>
              <span style={{ fontSize: 12, background: "#FEF3C7", color: "#92400E", padding: "3px 10px", borderRadius: 4, fontWeight: 600 }}>⚠ Research only — not legal advice</span>
              {onBack && (
                <button onClick={onBack} style={{
                  fontSize: 13, color: "rgba(255,255,255,0.8)", background: "none",
                  border: "1px solid rgba(255,255,255,0.3)", borderRadius: 6,
                  padding: "5px 12px", cursor: "pointer",
                }}>
                  ← Back to MERIDIAN
                </button>
              )}
            </div>
          </div>

          {/* Stats pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(220,38,38,0.25)", border: "1px solid rgba(220,38,38,0.5)", color: "#FCA5A5", padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
              {tier1Count} Directly Applicable Jurisdictions
            </span>
            {jurisdictions.map(j => {
              const tc = TIER_CONFIG[j.tier];
              return (
                <span key={j.code} onClick={() => setActiveTab("map")}
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)", padding: "5px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer" }}>
                  <span style={{ color: tc.hex }}>●</span> {j.name}
                </span>
              );
            })}
          </div>
        </div>
      </header>

      {/* Tab nav */}
      <nav style={{ background: "white", borderBottom: "1px solid #E2E8F0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", display: "flex", overflowX: "auto" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "14px 18px", fontSize: 15,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? "#1D4ED8" : "#64748B",
                background: "none", border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #1D4ED8" : "2px solid transparent",
                cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
                fontFamily: "'Source Sans 3', 'DM Sans', 'Segoe UI', system-ui, sans-serif",
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px" }}>
        {activeTab === "overview"     && <OverviewTab />}
        {activeTab === "map"          && <MapTab />}
        {activeTab === "obligations"  && <ObligationsTab />}
        {activeTab === "crosscutting" && <CrossCuttingTab />}
        {activeTab === "actionplan"   && <ActionPlanTab />}
        {activeTab === "sources"      && <SourcesTab />}
      </main>

      <footer style={{ borderTop: "1px solid #E2E8F0", padding: "20px 28px", textAlign: "center", fontSize: 13, color: "#94A3B8" }}>
        MERIDIAN · AI Governance Intelligence · Research output only — not legal advice
      </footer>
    </div>
  );
}
