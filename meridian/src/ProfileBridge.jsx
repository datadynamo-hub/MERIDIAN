const FONT = "'Source Sans 3', 'DM Sans', 'Segoe UI', system-ui, sans-serif";

const ROLE_LABELS = {
  provider:   "Provider / Developer",
  deployer:   "Deployer",
  both:       "Provider & Deployer",
  integrator: "Integrator",
  internal:   "Internal user only",
  evaluating: "Evaluating / Pre-deployment",
};

const SIZE_LABELS = {
  micro:      "Micro — fewer than 50 employees",
  sme:        "SME — 50–250 employees",
  mid:        "Mid-size — 250–1,000 employees",
  large:      "Large — 1,000–10,000 employees",
  enterprise: "Enterprise — over 10,000 employees",
};

const GPAI_LABELS = {
  "third-party-api": "Third-party GPAI via API",
  "fine-tune":       "Fine-tuned GPAI",
  building:          "Building own GPAI",
  no:                "No GPAI dependency",
  unsure:            "Unsure / mixed",
};

const OVERSIGHT_LABELS = {
  automated: "Fully automated",
  "in-loop": "Human-in-the-loop",
  "on-loop": "Human-on-the-loop",
  advisory:  "Advisory only",
};

const BIOMETRIC_LABELS = {
  yes:    "Yes — biometric data processed",
  no:     "No special category data",
  unsure: "Unsure — may qualify",
};

const MATURITY_LABELS = {
  greenfield:  "Greenfield",
  "pre-launch":"Pre-launch",
  production:  "In production",
  board:       "Board / leadership review",
  audit:       "Audit / assurance",
};

const DELIVERABLE_LABELS = {
  obligations: "Obligations map",
  gap:         "Gap assessment",
  board:       "Board briefing",
  audit:       "Audit preparation",
  unsure:      "Help me understand the landscape",
};

function getCallout(biometric) {
  if (biometric === "yes") return {
    headline: "Pre-built scenario loaded: SignalPath Technologies",
    body: "Biometric processing profile, multi-jurisdiction exposure. This scenario shares your key risk triggers — biometric data processing, EU Annex III high-risk classification, and human oversight requirements.",
  };
  if (biometric === "no") return {
    headline: "Pre-built scenario loaded: SignalPath Technologies",
    body: "Multi-jurisdiction compliance profile. This scenario illustrates MERIDIAN's full applicability analysis across US, EU, and UK regulatory frameworks — the same architecture applies to your profile.",
  };
  return {
    headline: "Pre-built scenario loaded: SignalPath Technologies",
    body: "Uncertain biometric exposure profile. This scenario applies the most cautious interpretation — voice and behavioural data treated as biometric identifiers, triggering EU Annex III and US state biometric law obligations.",
  };
}

function Field({ label, value, highlight }) {
  if (!value) return null;
  return (
    <div style={{ borderBottom: "1px solid #F1F5F9", paddingBottom: 10 }}>
      <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 3 }}>{label}</div>
      <div style={{
        fontSize: 14, fontWeight: 500,
        color: highlight === "danger" ? "#DC2626" : "#0F172A",
      }}>
        {highlight === "danger" && (
          <span style={{ marginRight: 5 }}>⚠</span>
        )}
        {value}
      </div>
    </div>
  );
}

export default function ProfileBridge({ formData, onView, onBack }) {
  const callout = getCallout(formData.biometric);
  const sector = formData.sector === "Other" && formData.sectorOther
    ? formData.sectorOther
    : formData.sector;

  const activities = formData.aiActivities
    .map(a => a.replace(" / General-purpose productivity or automation", " / Other"))
    .join(", ");

  const deliverables = formData.deliverables
    .map(d => DELIVERABLE_LABELS[d] || d)
    .join(", ");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      fontFamily: FONT,
      padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: "#1D4ED8",
        padding: "20px 32px 18px",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#DBEAFE", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>
              MERIDIAN
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
              Organization profile confirmed
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 14px", fontSize: 13, color: "white", fontWeight: 600 }}>
              4 / 4 stages
            </div>
            {onBack && (
              <button onClick={onBack} style={{
                fontSize: 13, color: "rgba(255,255,255,0.8)", background: "none",
                border: "1px solid rgba(255,255,255,0.3)", borderRadius: 6,
                padding: "5px 12px", cursor: "pointer", fontFamily: FONT,
              }}>
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 32px 0" }}>

        <p style={{ fontSize: 15, color: "#64748B", margin: "0 0 20px" }}>
          Based on your responses, here is the profile MERIDIAN will analyze.
        </p>

        {/* Profile card */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E6EAF1",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 20,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px 32px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}>
          <Field label="Role in AI supply chain"  value={ROLE_LABELS[formData.role]} />
          <Field label="Sector"                   value={sector} />
          <Field label="Organization size"        value={SIZE_LABELS[formData.size]} />
          <Field label="GPAI dependency"          value={GPAI_LABELS[formData.gpai]} />
          <Field label="Legally established"      value={formData.established} />
          <Field label="User jurisdictions"       value={formData.users} />
          <Field
            label="Biometric / sensitive data"
            value={BIOMETRIC_LABELS[formData.biometric]}
            highlight={formData.biometric === "yes" ? "danger" : null}
          />
          <Field label="Oversight model"          value={OVERSIGHT_LABELS[formData.oversight]} />
          {activities && (
            <div style={{ gridColumn: "1 / -1", borderBottom: "1px solid #F1F5F9", paddingBottom: 10 }}>
              <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 3 }}>AI activities</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#0F172A" }}>{activities}</div>
            </div>
          )}
          {deliverables && (
            <div style={{ gridColumn: "1 / -1", paddingBottom: 2 }}>
              <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 3 }}>Output needed</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#0F172A" }}>{deliverables}</div>
            </div>
          )}
        </div>

        {/* Scenario callout */}
        <div style={{
          background: "#DBEAFE",
          border: "1px solid #3B82F6",
          borderRadius: 10,
          padding: "14px 18px",
          marginBottom: 24,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>ℹ</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1E40AF", marginBottom: 4 }}>
              {callout.headline}
            </div>
            <div style={{ fontSize: 13, color: "#1D4ED8", lineHeight: 1.6 }}>
              {callout.body}
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onView}
          style={{
            width: "100%", padding: "16px 24px",
            background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
            border: "none", borderRadius: 10, cursor: "pointer",
            fontSize: 17, fontWeight: 700, color: "white",
            letterSpacing: "0.01em", transition: "opacity 0.2s",
            fontFamily: FONT,
          }}
          onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
          onMouseOut={e => e.currentTarget.style.opacity = "1"}
        >
          View compliance output →
        </button>

        <p style={{ fontSize: 12, color: "#94A3B8", textAlign: "center", marginTop: 12 }}>
          Output reflects the SignalPath Technologies scenario. Regulatory positions as of June 2026.
        </p>
      </div>
    </div>
  );
}
