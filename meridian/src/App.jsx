import { useState } from "react";
import ElicitationWidget from "./ElicitationWidget.jsx";
import DemoReport from "./DemoReport.jsx";
import ProfileBridge from "./ProfileBridge.jsx";

const FONT = "'Source Sans 3', 'DM Sans', 'Segoe UI', system-ui, sans-serif";

const FEATURES = [
  {
    icon: "🗺",
    title: "Jurisdiction Mapping",
    desc: "Identify which AI regulations apply based on your org type, sector, and geography across 15+ frameworks."
  },
  {
    icon: "⚖",
    title: "Obligations Register",
    desc: "Structured, citable obligations with deadlines, penalties, and tailored action steps."
  },
  {
    icon: "🔍",
    title: "Cross-Cutting Analysis",
    desc: "Surface conflicts and alignments across jurisdictions. Build once, satisfy many."
  },
  {
    icon: "📋",
    title: "Action Plan",
    desc: "Prioritized compliance roadmap organized by horizon: immediate, near-term, and medium-term."
  },
];

export default function App() {
  const [view, setView] = useState("landing");
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    setFormData(data);
    setView("profile");
  };

  if (view === "widget") {
    return (
      <ElicitationWidget
        onSubmit={handleSubmit}
        onBack={() => setView("landing")}
      />
    );
  }

  if (view === "profile") {
    return (
      <ProfileBridge
        formData={formData}
        onView={() => setView("report")}
        onBack={() => setView("widget")}
      />
    );
  }

  if (view === "report") {
    return <DemoReport onBack={() => setView("landing")} />;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      fontFamily: FONT,
      color: "#0F172A",
    }}>
      {/* Nav */}
      <nav style={{
        borderBottom: "1px solid #E6EAF1",
        padding: "18px 36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <div>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", letterSpacing: "0.08em" }}>MERIDIAN</span>
          <span style={{ fontSize: 12, color: "#94A3B8", marginLeft: 10 }}>Multi-jurisdictional Regulatory Intelligence and Decision Infrastructure for AI Navigation</span>
        </div>
        <button
          onClick={() => setView("report")}
          style={{
            fontSize: 13, color: "#475569", background: "none",
            border: "1px solid #E6EAF1", borderRadius: 6,
            padding: "7px 16px", cursor: "pointer",
          }}
        >
          View Demo Report
        </button>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "80px 36px 64px", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          fontSize: 12, fontWeight: 700, color: "#1D4ED8",
          textTransform: "uppercase", letterSpacing: "0.14em",
          background: "#DBEAFE", border: "1px solid #3B82F6",
          borderRadius: 20, padding: "5px 16px", marginBottom: 30,
        }}>
          Multi-jurisdictional Regulatory Intelligence
        </div>

        <h1 style={{
          fontSize: 62, fontWeight: 800, color: "#0F172A",
          letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 22,
        }}>
          MERIDIAN
        </h1>

        <p style={{
          fontSize: 20, color: "#475569", lineHeight: 1.7,
          marginBottom: 40, maxWidth: 620, margin: "0 auto 40px",
        }}>
          Understand which AI regulations apply to your organization, map your obligations across jurisdictions, and produce a structured compliance report, in minutes.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setView("widget")}
            style={{
              padding: "16px 36px",
              background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
              border: "none", borderRadius: 10, cursor: "pointer",
              fontSize: 18, fontWeight: 700, color: "white",
              letterSpacing: "0.01em", transition: "opacity 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.88"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}
          >
            Start Assessment →
          </button>
          <button
            onClick={() => setView("report")}
            style={{
              padding: "16px 36px",
              background: "#F1F5F8",
              border: "1px solid #E6EAF1", borderRadius: 10, cursor: "pointer",
              fontSize: 18, fontWeight: 600, color: "#475569",
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#DBEAFE"}
            onMouseOut={e => e.currentTarget.style.background = "#F1F5F8"}
          >
            View Sample Report
          </button>
        </div>

        <p style={{ fontSize: 14, color: "#94A3B8", marginTop: 18 }}>
          Runs a scoping assessment then loads the SignalPath Technologies compliance scenario.
        </p>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 36px 88px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18,
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: "#FFFFFF",
              border: "1px solid #E6EAF1",
              borderRadius: 12, padding: "26px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{f.title}</div>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Frameworks badge row */}
        <div style={{ marginTop: 52, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            Frameworks covered
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["EU AI Act", "UK GDPR / ICO", "US Federal", "Colorado AI Act", "Illinois BIPA", "Canada AIDA", "NIST AI RMF", "ISO 42001", "Australia", "Singapore", "Brazil", "UAE"].map(f => (
              <span key={f} style={{
                fontSize: 13, color: "#1D4ED8",
                background: "#DBEAFE", border: "1px solid #3B82F6",
                borderRadius: 4, padding: "5px 12px",
                fontWeight: 500,
              }}>{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #E6EAF1",
        padding: "22px 36px", textAlign: "center",
        fontSize: 13, color: "#64748B",
      }}>
        MERIDIAN · AI Governance Intelligence · Research output only — not legal advice
      </div>
    </div>
  );
}
