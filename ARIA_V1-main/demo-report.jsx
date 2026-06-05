import { useState, useEffect, useRef } from "react";

// ── Sample data: UK-based fintech credit lender, EU + US users ──
const RESEARCH_DATA = {
  organisation: {
    name: "NovaCred Financial Technologies Ltd",
    role: "Deployer",
    sector: "Financial services — FCA-authorised consumer lender",
    size: "620 employees",
    established: "United Kingdom",
    usersIn: ["United Kingdom", "Germany", "Netherlands", "Colorado (US)"],
    aiActivity: "Automated credit decisioning — third-party GPAI via API, human-on-the-loop",
    foundationModelDependency: true,
    humanOversight: "Human-on-the-loop",
    maturity: "In production, retrofitting compliance",
    deliverable: "Obligations map and gap assessment"
  },
  generatedDate: "27 May 2025",
  jurisdictions: [
    {
      code: "EU",
      name: "EU AI Act",
      tier: 1,
      tierLabel: "Directly Applicable",
      trigger: "Deployer with users in Germany and Netherlands; high-risk AI system (credit decisioning, Annex III §5(b))",
      confidence: "SETTLED",
      keyDates: ["Feb 2025: Prohibited practices in force", "Aug 2025: GPAI obligations", "Aug 2026: High-risk obligations"],
      obligationCount: 8,
      penalty: "Up to €15M or 3% global turnover",
      countries: ["AUT","BEL","BGR","CYP","CZE","DEU","DNK","EST","ESP","FIN","FRA","GRC","HRV","HUN","IRL","ITA","LTU","LUX","LVA","MLT","NLD","POL","PRT","ROU","SVK","SVN","SWE"]
    },
    {
      code: "GBR",
      name: "United Kingdom",
      tier: 1,
      tierLabel: "Directly Applicable",
      trigger: "FCA-authorised deployer; UK GDPR Art.22 automated decision-making; ICO AI guidance",
      confidence: "SETTLED",
      keyDates: ["Ongoing: FCA Consumer Duty", "Ongoing: ICO Art.22 obligations", "Monitor: UK AI Bill"],
      obligationCount: 5,
      penalty: "FCA: Unlimited; ICO: Up to £17.5M or 4% global turnover",
      countries: ["GBR"]
    },
    {
      code: "USA",
      name: "US Federal (Sectoral)",
      tier: 1,
      tierLabel: "Directly Applicable",
      trigger: "CFPB adverse action requirements; ECOA/Reg B disparate impact; SR 11-7 model risk management",
      confidence: "SETTLED",
      keyDates: ["Ongoing: CFPB enforcement active", "Monitor: Federal AI governance posture post-Jan 2025"],
      obligationCount: 4,
      penalty: "CFPB: Enforcement action; civil monetary penalties",
      countries: ["USA"]
    },
    {
      code: "COL",
      name: "Colorado AI Act",
      tier: 1,
      tierLabel: "Directly Applicable",
      trigger: "Deployer of high-risk AI (credit decisioning) with Colorado consumers; SB 24-205 in force Feb 2026",
      confidence: "SETTLED",
      keyDates: ["Feb 2026: Full obligations in force"],
      obligationCount: 3,
      penalty: "Colorado AG enforcement; civil penalties",
      countries: []
    },
    {
      code: "INT",
      name: "International Frameworks",
      tier: 3,
      tierLabel: "Soft-Law Alignment",
      trigger: "NIST AI RMF (procurement baseline); ISO/IEC 42001 (certifiable); CoE Framework Convention (UK signatory)",
      confidence: "SOFT-LAW",
      keyDates: ["Ongoing: ISO 42001 certification available", "Monitor: CoE Convention national implementation"],
      obligationCount: 2,
      penalty: "No direct enforcement — procurement and posture risk",
      countries: []
    }
  ],
  topObligations: [
    { id: "EU-P04", jurisdiction: "EU AI Act", title: "Emotion recognition prohibition audit", deadline: "NOW — in force Feb 2025", confidence: "SETTLED", urgency: "critical" },
    { id: "UK-001", jurisdiction: "UK (FCA)", title: "Consumer Duty AI model review", deadline: "Q3 2025", confidence: "SETTLED", urgency: "critical" },
    { id: "US-001", jurisdiction: "US Federal", title: "CFPB adverse action explanation for AI decisions", deadline: "Ongoing — enforce now", confidence: "SETTLED", urgency: "high" },
    { id: "EU-D02", jurisdiction: "EU AI Act", title: "Fundamental Rights Impact Assessment", deadline: "Aug 2026", confidence: "SETTLED", urgency: "high" },
    { id: "COL-001", jurisdiction: "Colorado AI Act", title: "Pre-deployment risk assessment + consumer disclosure", deadline: "Feb 2026", confidence: "SETTLED", urgency: "medium" }
  ],
  crossCutting: [
    {
      theme: "Automated decision-making transparency",
      jurisdictions: ["EU AI Act", "UK GDPR", "US CFPB", "Colorado AI Act"],
      conservativeApproach: "Provide individuals with: (1) notice that an AI system was used; (2) principal factors and their weight; (3) right to request human review; (4) right to contest. UK GDPR Art.22 and Colorado SB 24-205 are the most demanding — build to these.",
      conflict: "None material — these frameworks are substantively aligned on transparency."
    },
    {
      theme: "Human oversight adequacy",
      jurisdictions: ["EU AI Act Art.14", "FCA Consumer Duty", "SR 11-7"],
      conservativeApproach: "Human-on-the-loop is insufficient where decisions have significant individual effect. Assess whether override is genuinely accessible and actioned — not merely available. Document competence of oversight individuals.",
      conflict: "FCA Consumer Duty sets a higher outcomes bar than EU AI Act structural requirements. Build to FCA standard."
    },
    {
      theme: "Model documentation and risk management",
      jurisdictions: ["SR 11-7 (US)", "EU AI Act Art.26", "ICO AI guidance"],
      conservativeApproach: "SR 11-7 model risk management framework is the most comprehensive documentation standard. Implement it globally — it satisfies EU AI Act technical documentation and ICO accountability requirements.",
      conflict: "None — SR 11-7 is more detailed than EU/UK requirements; compliance satisfies both."
    }
  ],
  actionPlan: [
    { priority: 1, action: "Prohibited practices audit", rationale: "EU AI Act Chapter II in force Feb 2025. Non-compliance risk is live.", jurisdictions: ["EU AI Act"], effort: "Low", owner: "Legal / Compliance", deadline: "Immediate", horizon: "immediate" },
    { priority: 2, action: "CFPB adverse action documentation — AI explainability", rationale: "CFPB enforcement active; credit decisions require specific adverse action notice referencing AI factors.", jurisdictions: ["US Federal"], effort: "Medium", owner: "1LOD Product Compliance", deadline: "Q3 2025", horizon: "immediate" },
    { priority: 3, action: "FCA Consumer Duty AI model outcomes review", rationale: "Consumer Duty requires fair outcomes; AI credit model must be reviewed for potential bias and consumer harm.", jurisdictions: ["United Kingdom"], effort: "High", owner: "1LOD Risk + 2LOD Compliance", deadline: "Q3 2025", horizon: "immediate" },
    { priority: 4, action: "SR 11-7 model risk management framework implementation", rationale: "Satisfies US, EU, and UK model governance requirements simultaneously.", jurisdictions: ["US Federal", "EU AI Act", "United Kingdom"], effort: "Very High", owner: "CRO / Model Risk", deadline: "Q4 2025", horizon: "near" },
    { priority: 5, action: "EU Fundamental Rights Impact Assessment", rationale: "Required before August 2026 for credit decisioning AI under Art.27; significant lead time needed.", jurisdictions: ["EU AI Act"], effort: "Medium", owner: "DPO / Legal", deadline: "Q1 2026", horizon: "near" },
    { priority: 6, action: "Colorado AI Act pre-deployment risk assessment", rationale: "SB 24-205 requires risk assessment and consumer disclosure before deployment. In force Feb 2026.", jurisdictions: ["Colorado AI Act"], effort: "Medium", owner: "Legal / 1LOD Compliance", deadline: "Nov 2025", horizon: "near" },
    { priority: 7, action: "EU AI Act high-risk deployer obligations programme", rationale: "Full Annex III obligations in force August 2026; programme needs 12+ months lead time.", jurisdictions: ["EU AI Act"], effort: "Very High", owner: "Programme Office + Compliance", deadline: "Aug 2026", horizon: "medium" }
  ],
  unknowns: [
    { topic: "EU AI Act 'significant risk' qualifier scope", reason: "Commission guidance pending. High-risk classification of credit AI is confirmed; scope of obligations may vary.", recommendation: "Treat as fully high-risk pending guidance. Engage EU AI Office sandbox if available." },
    { topic: "UK primary AI legislation timeline", reason: "Government has signalled sector-led approach but statutory duty of care remains possible.", recommendation: "Monitor DSIT consultations quarterly." },
    { topic: "Federal AI posture post-Jan 2025 executive order revocation", reason: "EO 14110 revoked; replacement framework not confirmed. NIST AI RMF remains operative baseline.", recommendation: "Monitor NIST and OMB communications; maintain NIST AI RMF alignment regardless of EO status." }
  ]
};

const TIER_CONFIG = {
  1: { label: "Directly Applicable", bg: "bg-red-100", text: "text-red-800", border: "border-red-400", dot: "bg-red-500", hex: "#DC2626" },
  2: { label: "Indirectly Applicable", bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-400", dot: "bg-amber-500", hex: "#D97706" },
  3: { label: "Soft-Law Alignment", bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-400", dot: "bg-blue-500", hex: "#2563EB" },
  4: { label: "Monitor", bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-400", dot: "bg-violet-500", hex: "#7C3AED" },
  5: { label: "Not Applicable", bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300", dot: "bg-gray-400", hex: "#9CA3AF" }
};

const CONFIDENCE_CONFIG = {
  "SETTLED": { bg: "bg-emerald-100", text: "text-emerald-800" },
  "CONTESTED": { bg: "bg-amber-100", text: "text-amber-800" },
  "PENDING": { bg: "bg-blue-100", text: "text-blue-800" },
  "SOFT-LAW": { bg: "bg-gray-100", text: "text-gray-700" },
  "UNDER REVIEW": { bg: "bg-red-100", text: "text-red-800" }
};

const URGENCY_CONFIG = {
  critical: { bg: "bg-red-500", label: "Critical" },
  high: { bg: "bg-orange-400", label: "High" },
  medium: { bg: "bg-blue-500", label: "Medium" },
  low: { bg: "bg-gray-400", label: "Low" }
};

const EFFORT_CONFIG = {
  "Low": { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Medium": { bg: "bg-yellow-100", text: "text-yellow-700" },
  "High": { bg: "bg-orange-100", text: "text-orange-700" },
  "Very High": { bg: "bg-red-100", text: "text-red-700" }
};

function Badge({ label, config }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}>
      {label}
    </span>
  );
}

function TierBadge({ tier }) {
  const c = TIER_CONFIG[tier];
  return <Badge label={`Tier ${tier} — ${c.label}`} config={{ bg: c.bg, text: c.text }} />;
}

function ConfidenceBadge({ flag }) {
  const c = CONFIDENCE_CONFIG[flag] || CONFIDENCE_CONFIG["SETTLED"];
  return <Badge label={flag} config={c} />;
}

// ── World Map using SVG paths (simplified regional blocks) ──
function WorldMap({ jurisdictions, onSelect, selected }) {
  const regions = [
    { id: "EU", label: "EU", x: 390, y: 155, w: 80, h: 55, rx: 6 },
    { id: "GBR", label: "UK", x: 345, y: 135, w: 38, h: 30, rx: 5 },
    { id: "USA", label: "USA", x: 100, y: 155, w: 130, h: 70, rx: 6 },
    { id: "COL", label: "Colorado", x: 125, y: 178, w: 45, h: 28, rx: 4 },
    { id: "INT", label: "Intl", x: 490, y: 310, w: 55, h: 30, rx: 5 },
  ];

  const getJurisdiction = (id) => jurisdictions.find(j => j.code === id);
  const getTierColor = (id) => {
    const j = getJurisdiction(id);
    return j ? TIER_CONFIG[j.tier].hex : "#E2E8F0";
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)", borderRadius: 12, padding: 16 }}>
      <svg viewBox="0 0 620 400" style={{ width: "100%", height: "100%", maxHeight: 340 }}>
        {/* Ocean background */}
        <rect x="0" y="0" width="620" height="400" fill="#0F172A" rx="8" />
        
        {/* Grid lines */}
        {[1,2,3,4,5].map(i => (
          <line key={`h${i}`} x1="0" y1={i*80} x2="620" y2={i*80} stroke="#1E3A5F" strokeWidth="0.5" />
        ))}
        {[1,2,3,4,5,6,7].map(i => (
          <line key={`v${i}`} x1={i*88} y1="0" x2={i*88} y2="400" stroke="#1E3A5F" strokeWidth="0.5" />
        ))}

        {/* Continent blobs */}
        {/* North America */}
        <ellipse cx="165" cy="190" rx="140" ry="95" fill="#1E293B" />
        {/* Europe */}
        <ellipse cx="420" cy="175" rx="85" ry="65" fill="#1E293B" />
        {/* Asia */}
        <ellipse cx="570" cy="195" rx="90" ry="75" fill="#1E293B" />
        {/* Africa */}
        <ellipse cx="430" cy="290" rx="60" ry="70" fill="#1E293B" />
        {/* South America */}
        <ellipse cx="210" cy="310" rx="65" ry="70" fill="#1E293B" />
        {/* Australia */}
        <ellipse cx="545" cy="320" rx="55" ry="40" fill="#1E293B" />

        {/* Jurisdiction blocks */}
        {regions.map(r => {
          const j = getJurisdiction(r.id);
          const color = getTierColor(r.id);
          const isSelected = selected === r.id;
          const tier = j ? j.tier : 5;
          
          return (
            <g key={r.id} onClick={() => onSelect(r.id)} style={{ cursor: "pointer" }}>
              <rect
                x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx}
                fill={color}
                fillOpacity={isSelected ? 1 : 0.85}
                stroke={isSelected ? "#FFFFFF" : color}
                strokeWidth={isSelected ? 2.5 : 1}
                style={{ filter: isSelected ? "drop-shadow(0 0 8px rgba(255,255,255,0.4))" : "none" }}
              />
              <text
                x={r.x + r.w / 2} y={r.y + r.h / 2 - 4}
                textAnchor="middle" fill="white"
                fontSize={r.w > 60 ? 11 : 9} fontWeight="700"
                style={{ pointerEvents: "none" }}
              >
                {r.label}
              </text>
              <text
                x={r.x + r.w / 2} y={r.y + r.h / 2 + 9}
                textAnchor="middle" fill="rgba(255,255,255,0.8)"
                fontSize={8}
                style={{ pointerEvents: "none" }}
              >
                {j ? `Tier ${j.tier}` : "—"}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        {Object.entries(TIER_CONFIG).slice(0,4).map(([tier, cfg], i) => (
          <g key={tier} transform={`translate(${12 + i * 148}, 370)`}>
            <rect x="0" y="0" width="10" height="10" rx="2" fill={cfg.hex} />
            <text x="14" y="9" fill="#94A3B8" fontSize="8">{`T${tier}: ${cfg.label}`}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function OverviewTab() {
  const { organisation, topObligations, jurisdictions, generatedDate } = RESEARCH_DATA;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Freshness warning */}
      <div style={{ background: "#FEF9C3", border: "1px solid #FDE047", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontSize: 16 }}>⚠</span>
        <p style={{ fontSize: 12, color: "#713F12", margin: 0 }}>
          <strong>Freshness:</strong> AI regulation changes rapidly. This report reflects positions as of {generatedDate}. Positions marked [PENDING] or [UNDER REVIEW] should be rechecked before use in live compliance programmes. This is research output, not legal advice.
        </p>
      </div>

      {/* Org profile */}
      <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", padding: 18 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 12px" }}>Organisation Profile</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          {[
            ["Role", organisation.role],
            ["Sector", organisation.sector],
            ["Established", organisation.established],
            ["AI Activity", organisation.aiActivity],
            ["Users In", organisation.usersIn.join(", ")],
            ["Oversight Model", organisation.humanOversight],
          ].map(([k, v]) => (
            <div key={k}>
              <span style={{ fontSize: 11, color: "#94A3B8", display: "block" }}>{k}</span>
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
            const conf = CONFIDENCE_CONFIG[ob.confidence];
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
                <Badge label={ob.confidence} config={conf} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Jurisdiction matrix */}
      <div>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 10px" }}>Jurisdiction Matrix</h3>
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                {["Jurisdiction", "Tier", "Trigger", "Key Dates", "Penalty", "Confidence"].map(h => (
                  <th key={h} style={{ padding: "9px 12px", textAlign: "left", color: "#64748B", fontWeight: 600, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jurisdictions.map((j, i) => {
                const tc = TIER_CONFIG[j.tier];
                const cc = CONFIDENCE_CONFIG[j.confidence];
                return (
                  <tr key={j.code} style={{ borderBottom: i < jurisdictions.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1E293B" }}>{j.name}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: tc.bg.replace("bg-",""), padding: "2px 8px", borderRadius: 4 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: tc.hex, flexShrink: 0 }} />
                        <span style={{ color: tc.hex, fontSize: 11, fontWeight: 700 }}>T{j.tier} {tc.label}</span>
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px", color: "#475569", maxWidth: 200 }}>{j.trigger}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {j.keyDates.map((d, i) => <span key={i} style={{ fontSize: 10, color: "#64748B" }}>{d}</span>)}
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: 11, color: "#EF4444", fontWeight: 500, minWidth: 140 }}>{j.penalty}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <Badge label={j.confidence} config={cc} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Select a jurisdiction on the map to view its applicability tier, trigger reason, and key obligations. Colour intensity reflects enforcement risk.</p>
      <div style={{ display: "grid", gridTemplateColumns: selectedJ ? "1fr 340px" : "1fr", gap: 16, alignItems: "start" }}>
        <WorldMap jurisdictions={RESEARCH_DATA.jurisdictions} onSelect={setSelected} selected={selected} />
        {selectedJ && (
          <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 10, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", margin: 0 }}>{selectedJ.name}</h3>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
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
                <div key={i} style={{ fontSize: 12, color: "#475569", padding: "2px 0", borderBottom: "1px solid #F1F5F9" }}>📅 {d}</div>
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

      {/* Jurisdiction cards below */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
        {RESEARCH_DATA.jurisdictions.map(j => {
          const tc = TIER_CONFIG[j.tier];
          return (
            <div key={j.code} onClick={() => setSelected(j.code === selected ? null : j.code)}
              style={{ background: "white", border: `1.5px solid ${selected === j.code ? tc.hex : "#E2E8F0"}`, borderLeft: `4px solid ${tc.hex}`, borderRadius: 8, padding: "12px 14px", cursor: "pointer", transition: "all 0.15s" }}>
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

  const euObligations = [
    { id: "EU-D01", title: "Conformity verification before deployment", who: "Deployer", inForce: "Aug 2026", confidence: "SETTLED", requirement: "Verify the high-risk AI system complies with the Regulation before putting into service. Only deploy systems bearing CE marking where required.", actionNeeded: "Establish pre-deployment conformity checklist. Contractually require providers to supply Declaration of Conformity and technical documentation.", source: "Art. 26(1) Regulation 2024/1689" },
    { id: "EU-D02", title: "Fundamental Rights Impact Assessment", who: "Deployer", inForce: "Aug 2026", confidence: "SETTLED", requirement: "Conduct a fundamental rights impact assessment before deploying high-risk AI in credit, insurance, employment, or essential services.", actionNeeded: "Build FRIA template aligned to Art. 27 requirements. Integrate with existing DPIA process under UK/EU GDPR.", source: "Art. 27 Regulation 2024/1689" },
    { id: "EU-D03", title: "Human oversight — competence and authority", who: "Deployer", inForce: "Aug 2026", confidence: "SETTLED", requirement: "Assign human oversight to individuals with competence, authority, and resources to understand AI system capabilities and limitations. Override mechanisms must be accessible.", actionNeeded: "Define oversight roles and competence requirements. Document that override is genuinely accessible, not merely available in principle.", source: "Art. 26(2), Art. 14 Regulation 2024/1689" },
    { id: "EU-D04", title: "Monitoring, logging, and retention", who: "Deployer", inForce: "Aug 2026", confidence: "SETTLED", requirement: "Monitor operation per provider instructions. Maintain logs capturing inputs, outputs, and decision parameters for a minimum of 6 months.", actionNeeded: "Implement logging infrastructure. Confirm retention period meets or exceeds FCA and CFPB requirements (likely to exceed 6-month minimum).", source: "Art. 26(5), Art. 12 Regulation 2024/1689" },
    { id: "EU-D05", title: "Individual transparency — AI notification", who: "Deployer", inForce: "Aug 2026", confidence: "SETTLED", requirement: "Notify individuals subject to high-risk AI decisions that they are interacting with or subject to an AI system. Provide meaningful information about the system's logic.", actionNeeded: "Design disclosure notices for credit application journey. Integrate into consent flows and adverse action communications.", source: "Art. 26(6), Art. 13 Regulation 2024/1689" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* EU Section */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", margin: 0 }}>EU AI Act</h3>
          <TierBadge tier={1} />
          <ConfidenceBadge flag="SETTLED" />
          <span style={{ fontSize: 11, color: "#64748B", marginLeft: "auto" }}>8 obligations | Max: €15M or 3% global turnover</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Prohibited practices notice */}
          <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 14 }}>🚫</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#991B1B" }}>Prohibited Practices — In Force NOW (Feb 2025)</span>
              <ConfidenceBadge flag="SETTLED" />
            </div>
            <p style={{ fontSize: 12, color: "#7F1D1D", margin: 0 }}>Six categories of AI practices are prohibited under Article 5. Audit required immediately: emotion recognition in workplace, subliminal manipulation, biometric social scoring. Non-compliance: up to €35M or 7% global annual turnover.</p>
          </div>

          {euObligations.map(ob => (
            <div key={ob.id} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, overflow: "hidden" }}>
              <div onClick={() => toggle(ob.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer" }}>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "#94A3B8", background: "#F8FAFC", padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>{ob.id}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1E293B", flex: 1 }}>{ob.title}</span>
                <span style={{ fontSize: 11, color: "#64748B", marginRight: 4 }}>{ob.who}</span>
                <ConfidenceBadge flag={ob.confidence} />
                <span style={{ fontSize: 11, color: "#64748B", background: "#F1F5F9", padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>⏰ {ob.inForce}</span>
                <span style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1 }}>{openCards[ob.id] ? "▲" : "▼"}</span>
              </div>
              {openCards[ob.id] && (
                <div style={{ padding: "0 14px 14px", borderTop: "1px solid #F1F5F9" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <div>
                      <span style={{ fontSize: 11, color: "#94A3B8", display: "block", marginBottom: 4 }}>Requirement</span>
                      <p style={{ fontSize: 13, color: "#334155", margin: 0 }}>{ob.requirement}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: 11, color: "#94A3B8", display: "block", marginBottom: 4 }}>Action needed for NovaCred</span>
                      <p style={{ fontSize: 13, color: "#1E293B", fontWeight: 500, margin: 0 }}>{ob.actionNeeded}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, padding: "6px 10px", background: "#F8FAFC", borderRadius: 6, fontSize: 11, color: "#64748B" }}>
                    📎 Source: {ob.source}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CrossCuttingTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>Obligations that appear across multiple jurisdictions. Building to the most demanding standard here satisfies requirements in all affected frameworks simultaneously.</p>
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
    { key: "immediate", label: "Immediate", subtitle: "Within 3 months", color: "#EF4444" },
    { key: "near", label: "Near-term", subtitle: "3–12 months", color: "#F59E0B" },
    { key: "medium", label: "Medium-term", subtitle: "12–24 months", color: "#2563EB" },
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
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: h.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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
        <p style={{ fontSize: 12, color: "#713F12", margin: 0 }}>All claims in this report are sourced to Tier 1 (primary legislation) or Tier 2 (specialist advisory) sources. Tier 3 sources (quality press) are used for corroboration only. See sources.md for the full allowlist.</p>
      </div>

      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 12 }}>Sources Register — EU AI Act</h3>
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {["Obligation", "Source", "Tier", "Citation", "Confidence", "Verified"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#64748B", fontWeight: 600, fontSize: 11, borderBottom: "1px solid #E2E8F0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["EU-D01", "EUR-Lex 2024/1689", "1", "Art. 26(1)", "SETTLED", "May 2025"],
                ["EU-D02", "EUR-Lex 2024/1689", "1", "Art. 27", "SETTLED", "May 2025"],
                ["EU-D03", "EUR-Lex 2024/1689", "1", "Art. 26(2), Art. 14", "SETTLED", "May 2025"],
                ["EU-D04", "EUR-Lex 2024/1689", "1", "Art. 26(5), Art. 12", "SETTLED", "May 2025"],
                ["EU-D05", "EUR-Lex 2024/1689", "1", "Art. 26(6), Art. 13", "SETTLED", "May 2025"],
              ].map(([id, src, tier, cite, conf, date], i) => {
                const cc = CONFIDENCE_CONFIG[conf];
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "9px 12px", fontFamily: "monospace", fontSize: 11, color: "#475569" }}>{id}</td>
                    <td style={{ padding: "9px 12px", color: "#1E293B", fontWeight: 500 }}>{src}</td>
                    <td style={{ padding: "9px 12px" }}><span style={{ background: "#DBEAFE", color: "#1E40AF", padding: "1px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Tier {tier}</span></td>
                    <td style={{ padding: "9px 12px", fontFamily: "monospace", fontSize: 11, color: "#64748B" }}>{cite}</td>
                    <td style={{ padding: "9px 12px" }}><Badge label={conf} config={cc} /></td>
                    <td style={{ padding: "9px 12px", fontSize: 11, color: "#94A3B8" }}>{date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "map", label: "🗺 Map" },
  { id: "obligations", label: "Obligations" },
  { id: "crosscutting", label: "Cross-Cutting" },
  { id: "actionplan", label: "Action Plan" },
  { id: "sources", label: "Sources & Confidence" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const { organisation, generatedDate, jurisdictions } = RESEARCH_DATA;

  const tier1Count = jurisdictions.filter(j => j.tier === 1).length;

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)", color: "white", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 10, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>AI Regulation Research Report</p>
              <h1 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{organisation.name}</h1>
              <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>{organisation.sector} · {organisation.role} · {organisation.established}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 4px" }}>Generated {generatedDate}</p>
              <p style={{ fontSize: 10, color: "#475569", margin: "0 0 6px" }}>ARIA v1.0</p>
              <span style={{ fontSize: 10, background: "#FEF3C7", color: "#92400E", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>⚠ Research only — not legal advice</span>
            </div>
          </div>
          {/* Stats pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(220,38,38,0.2)", border: "1px solid rgba(220,38,38,0.4)", color: "#FCA5A5", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
              {tier1Count} Directly Applicable Jurisdictions
            </span>
            {jurisdictions.map(j => {
              const tc = TIER_CONFIG[j.tier];
              return (
                <span key={j.code} onClick={() => setActiveTab("map")} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#CBD5E1", padding: "4px 12px", borderRadius: 20, fontSize: 12, cursor: "pointer" }}>
                  <span style={{ color: tc.hex }}>●</span> {j.name}
                </span>
              );
            })}
          </div>
        </div>
      </header>

      {/* Tab nav */}
      <nav style={{ background: "white", borderBottom: "1px solid #E2E8F0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: "12px 16px", fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? "#1D4ED8" : "#64748B", background: "none", border: "none", borderBottom: activeTab === tab.id ? "2px solid #1D4ED8" : "2px solid transparent", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px" }}>
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "map" && <MapTab />}
        {activeTab === "obligations" && <ObligationsTab />}
        {activeTab === "crosscutting" && <CrossCuttingTab />}
        {activeTab === "actionplan" && <ActionPlanTab />}
        {activeTab === "sources" && <SourcesTab />}
      </main>
    </div>
  );
}
