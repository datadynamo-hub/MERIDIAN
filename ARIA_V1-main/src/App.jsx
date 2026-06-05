import { useState } from "react";
import ElicitationWidget from "./ElicitationWidget.jsx";
import DemoReport from "./DemoReport.jsx";

const FEATURES = [
  {
    icon: "🗺",
    title: "Jurisdiction Mapping",
    desc: "Identify which AI regulations apply based on your org type, sector, and geography — across 15+ frameworks."
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
    desc: "Prioritised compliance roadmap organised by horizon — immediate, near-term, and medium-term."
  },
];

export default function App() {
  const [view, setView] = useState("landing"); // 'landing' | 'widget' | 'report'

  if (view === "widget") {
    return <ElicitationWidget onSubmit={() => setView("report")} onBack={() => setView("landing")} />;
  }

  if (view === "report") {
    return <DemoReport onBack={() => setView("landing")} />;
  }

  // Landing
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0A0F1E 0%, #0F1D35 50%, #0A1628 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      color: "#E2E8F0",
    }}>
      {/* Nav */}
      <nav style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#F1F5F9", letterSpacing: "0.08em" }}>MERIDIAN</span>
          <span style={{ fontSize: 11, color: "#475569", marginLeft: 10 }}>AI Governance Intelligence</span>
        </div>
        <button
          onClick={() => setView("report")}
          style={{
            fontSize: 12, color: "#94A3B8", background: "none", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 6, padding: "6px 14px", cursor: "pointer",
          }}
        >
          View Demo Report
        </button>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "72px 32px 60px", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          fontSize: 10, fontWeight: 700, color: "#3B82F6",
          textTransform: "uppercase", letterSpacing: "0.14em",
          background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: 20, padding: "4px 14px", marginBottom: 28,
        }}>
          Multi-jurisdictional Regulatory Intelligence
        </div>

        <h1 style={{
          fontSize: 52, fontWeight: 800, color: "#F1F5F9",
          letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20,
        }}>
          MERIDIAN
        </h1>

        <p style={{
          fontSize: 17, color: "#94A3B8", lineHeight: 1.7, marginBottom: 36, maxWidth: 580, margin: "0 auto 36px",
        }}>
          Understand which AI regulations apply to your organisation, map your obligations across jurisdictions, and produce a structured compliance report — in minutes.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setView("widget")}
            style={{
              padding: "14px 32px",
              background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)",
              border: "none", borderRadius: 10, cursor: "pointer",
              fontSize: 15, fontWeight: 700, color: "white",
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
              padding: "14px 32px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, cursor: "pointer",
              fontSize: 15, fontWeight: 600, color: "#CBD5E1",
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
            onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >
            View Sample Report
          </button>
        </div>

        <p style={{ fontSize: 12, color: "#334155", marginTop: 16 }}>
          Demo loads a sample report for SignalPath Technologies — a US accessibility tech company with EU, UK, and Canadian exposure.
        </p>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px 80px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16,
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "22px 20px",
            }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9", marginBottom: 6 }}>{f.title}</div>
              <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Frameworks badge row */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
            Frameworks covered
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {["EU AI Act", "UK GDPR / ICO", "US Federal", "Colorado AI Act", "Illinois BIPA", "Canada AIDA", "NIST AI RMF", "ISO 42001", "Australia", "Singapore", "Brazil", "UAE"].map(f => (
              <span key={f} style={{
                fontSize: 11, color: "#475569",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 4, padding: "4px 10px",
              }}>{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 32px", textAlign: "center",
        fontSize: 11, color: "#334155",
      }}>
        MERIDIAN · AI Governance Intelligence · Research output only — not legal advice
      </div>
    </div>
  );
}
