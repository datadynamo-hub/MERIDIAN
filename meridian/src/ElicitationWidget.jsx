import { useState } from "react";

const FONT = "'Source Sans 3', 'DM Sans', 'Segoe UI', system-ui, sans-serif";

const SECTIONS = [
  { id: "org",      stage: "Stage 1", title: "Your Organization",               color: "#1D4ED8" },
  { id: "geo",      stage: "Stage 2", title: "Where Your Users & Outputs Land", color: "#3B82F6" },
  { id: "ai",       stage: "Stage 3", title: "The AI System",                   color: "#10B981" },
  { id: "maturity", stage: "Stage 4", title: "Maturity & Purpose",              color: "#F59E0B" },
];

const AI_ROLES = [
  { value: "provider",   label: "Provider / Developer",        desc: "We build AI systems, models, or AI-enabled products" },
  { value: "deployer",   label: "Deployer",                    desc: "We use AI systems built by others in our own products or services" },
  { value: "both",       label: "Both",                        desc: "We build some and deploy others" },
  { value: "integrator", label: "Integrator",                  desc: "We embed AI components into larger solutions for clients" },
  { value: "internal",   label: "Internal user only",          desc: "We use AI tools operationally but don't offer AI in our products" },
  { value: "evaluating", label: "Evaluating / Pre-deployment", desc: "We haven't deployed yet — assessing what to build or procure" },
];

const SECTORS = [
  "Financial services (banking, insurance, investment, payments, lending)",
  "Healthcare and life sciences",
  "Employment and HR",
  "Public sector / government",
  "Education",
  "Legal services",
  "Retail and e-commerce",
  "Media, advertising, and content generation",
  "Critical infrastructure (energy, utilities, transport, telecoms)",
  "Accessibility and assistive technology",
  "Defence and national security",
  "General technology / SaaS",
  "Other",
];

const SIZES = [
  { value: "micro",      label: "Micro",      desc: "Fewer than 50 employees" },
  { value: "sme",        label: "SME",        desc: "50–250 employees" },
  { value: "mid",        label: "Mid-size",   desc: "250–1,000 employees" },
  { value: "large",      label: "Large",      desc: "1,000–10,000 employees" },
  { value: "enterprise", label: "Enterprise", desc: "Over 10,000 employees" },
];

const AI_ACTIVITIES = [
  "Decision-making or material influence on decisions affecting individuals",
  "Biometric data processing (facial recognition, voice, behavioural patterns)",
  "Content generation at scale (text, image, video, audio)",
  "Recruitment, performance management, or HR screening",
  "Credit scoring, loan decisions, insurance underwriting",
  "Medical diagnosis, triage, or treatment recommendation",
  "Safety-critical operations (autonomous vehicles, infrastructure control)",
  "Law enforcement, border control, or public surveillance",
  "Real-time data aggregation and profiling",
  "Other / General-purpose productivity or automation",
];

const GPAI_OPTIONS = [
  { value: "third-party-api", label: "Third-party GPAI via API",    desc: "e.g. GPT-4, Claude, Gemini, Llama" },
  { value: "fine-tune",       label: "Fine-tuned GPAI",             desc: "We adapt a foundation model for our use case" },
  { value: "building",        label: "Building our own GPAI",       desc: "We are training or have trained a foundation model ourselves" },
  { value: "no",              label: "No GPAI dependency",          desc: "Task-specific model or conventional ML" },
  { value: "unsure",          label: "Unsure / mixed",              desc: "Combination or unclear" },
];

const OVERSIGHT_OPTIONS = [
  { value: "automated", label: "Fully automated",        desc: "AI output is acted upon without human review" },
  { value: "in-loop",   label: "Human-in-the-loop",     desc: "A human reviews and approves before action" },
  { value: "on-loop",   label: "Human-on-the-loop",     desc: "A human can override but doesn't review every output" },
  { value: "advisory",  label: "Advisory only",         desc: "AI output is one input among several, no binding effect" },
];

const BIOMETRIC_OPTIONS = [
  { value: "yes",    label: "Yes",    desc: "The system processes biometric, health, or sensitive personal data" },
  { value: "no",     label: "No",     desc: "No special category or biometric data is processed" },
  { value: "unsure", label: "Unsure", desc: "Not certain — voice/behavioural data may qualify" },
];

const MATURITY_OPTIONS = [
  { value: "greenfield",  label: "Greenfield",               desc: "Designing from scratch, not yet built" },
  { value: "pre-launch",  label: "Pre-launch",               desc: "Built — assessing compliance before going live" },
  { value: "production",  label: "In production",            desc: "Deployed and operating, retrofitting compliance" },
  { value: "board",       label: "Board / leadership review", desc: "High-level obligations map, not implementation detail" },
  { value: "audit",       label: "Audit / assurance",        desc: "Validating an existing programme against current regulations" },
];

const DELIVERABLES = [
  { value: "obligations", label: "Obligations map",   desc: "What we have to do, by jurisdiction" },
  { value: "gap",         label: "Gap assessment",    desc: "What we're not doing yet" },
  { value: "board",       label: "Board briefing",    desc: "Executive summary for leadership" },
  { value: "audit",       label: "Audit preparation", desc: "Evidence pack for regulatory or third-party audit" },
  { value: "unsure",      label: "I'm not sure yet",  desc: "Help me understand the landscape first" },
];

// ── Shared input components ──────────────────────────────────────────────────

function SingleSelect({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {options.map((opt) => {
        const val   = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        const desc  = typeof opt === "string" ? null : opt.desc;
        const sel   = value === val;
        return (
          <button key={val} onClick={() => onChange(val)} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 14px",
            background: sel ? "#DBEAFE" : "#FFFFFF",
            border: `1.5px solid ${sel ? "#1D4ED8" : "#E6EAF1"}`,
            borderRadius: 8, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
              border: `2px solid ${sel ? "#1D4ED8" : "#CBD5E1"}`,
              background: sel ? "#1D4ED8" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {sel && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: sel ? "#1D4ED8" : "#0F172A" }}>{label}</div>
              {desc && <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{desc}</div>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function MultiSelect({ options, values, onChange }) {
  const toggle = (val) =>
    values.includes(val) ? onChange(values.filter(v => v !== val)) : onChange([...values, val]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {options.map((opt) => {
        const val   = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        const desc  = typeof opt === "string" ? null : opt.desc;
        const sel   = values.includes(val);
        return (
          <button key={val} onClick={() => toggle(val)} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 14px",
            background: sel ? "#DBEAFE" : "#FFFFFF",
            border: `1.5px solid ${sel ? "#1D4ED8" : "#E6EAF1"}`,
            borderRadius: 8, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: 4, flexShrink: 0,
              border: `2px solid ${sel ? "#1D4ED8" : "#CBD5E1"}`,
              background: sel ? "#1D4ED8" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {sel && <span style={{ color: "white", fontSize: 12, lineHeight: 1 }}>✓</span>}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: sel ? "#1D4ED8" : "#0F172A" }}>{label}</div>
              {desc && <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{desc}</div>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={2}
      style={{
        width: "100%",
        background: "#FFFFFF", border: "1.5px solid #E6EAF1",
        borderRadius: 8, padding: "11px 14px", fontSize: 15, color: "#0F172A",
        resize: "vertical", fontFamily: FONT, outline: "none",
        boxSizing: "border-box", lineHeight: 1.5,
      }}
    />
  );
}

function SectionHeader({ stage, title, color, complete, stageNum }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        background: complete ? color : "#F1F5F8",
        border: `1.5px solid ${complete ? color : "#E6EAF1"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
      }}>
        {complete
          ? <span style={{ color: "white", fontSize: 15 }}>✓</span>
          : <span style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8" }}>{stageNum}</span>
        }
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stage}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>{title}</div>
      </div>
    </div>
  );
}

function Question({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#475569", marginBottom: 5 }}>{label}</div>
      {hint && <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 11, fontStyle: "italic" }}>{hint}</div>}
      {children}
    </div>
  );
}

// ── Main widget ──────────────────────────────────────────────────────────────

export default function ElicitationWidget({ onSubmit, onBack }) {
  const [form, setForm] = useState({
    role: "", sector: "", sectorOther: "", size: "",
    established: "", users: "", outputConsumed: "",
    aiActivities: [], aiActivitiesOther: "",
    gpai: "", oversight: "", biometric: "",
    maturity: "", deliverables: [],
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const sectionComplete = {
    org:      !!(form.role && form.sector && form.size),
    geo:      !!(form.established && form.users && form.outputConsumed),
    ai:       !!(form.aiActivities.length > 0 && form.gpai && form.oversight && form.biometric),
    maturity: !!(form.maturity && form.deliverables.length > 0),
  };

  const completedCount = Object.values(sectionComplete).filter(Boolean).length;
  const allComplete    = completedCount === 4;

  const divider = <div style={{ height: 1, background: "#E6EAF1", margin: "32px 0" }} />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      fontFamily: FONT,
      padding: "0 0 60px",
    }}>
      {/* Header */}
      <div style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #E6EAF1",
        padding: "22px 32px 20px",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>
                MERIDIAN
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
                Organization Scoping
              </div>
            </div>
            {onBack && (
              <button onClick={onBack} style={{
                fontSize: 13, color: "#64748B", background: "none",
                border: "1px solid #E6EAF1", borderRadius: 6,
                padding: "6px 14px", cursor: "pointer",
              }}>
                ← Back
              </button>
            )}
          </div>
          <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5, marginBottom: 14 }}>
            Complete all four stages to generate your organizational profile. This takes 3–5 minutes and determines which of 40+ regulatory frameworks actually apply to you.
          </div>

          {/* Progress bar */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {SECTIONS.map((s, i) => {
              const done = sectionComplete[s.id];
              return (
                <div key={s.id} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{
                    height: 4, borderRadius: 2,
                    background: done ? s.color : "#E6EAF1",
                    transition: "background 0.3s",
                  }} />
                  <div style={{ fontSize: 11, color: done ? s.color : "#CBD5E1", fontWeight: 600, letterSpacing: "0.05em" }}>
                    {i + 1} of 4
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 32px 0" }}>

        {/* Stage 1 */}
        <SectionHeader stage="Stage 1" title="Your Organization" color="#1D4ED8" complete={sectionComplete.org} stageNum="1" />

        <Question label="What does your organization do in relation to AI?" hint="This determines your position in the regulatory supply chain — it changes everything downstream.">
          <SingleSelect options={AI_ROLES} value={form.role} onChange={v => set("role", v)} />
        </Question>

        <Question label="What sector does the organization operate in?">
          <SingleSelect options={SECTORS} value={form.sector} onChange={v => set("sector", v)} />
          {form.sector === "Other" && (
            <div style={{ marginTop: 8 }}>
              <TextInput value={form.sectorOther} onChange={v => set("sectorOther", v)} placeholder="Please describe your sector..." />
            </div>
          )}
        </Question>

        <Question label="How large is the organization?" hint="The EU AI Act has SME-specific provisions. Some national frameworks have size thresholds.">
          <SingleSelect options={SIZES} value={form.size} onChange={v => set("size", v)} />
        </Question>

        {divider}

        {/* Stage 2 */}
        <SectionHeader stage="Stage 2" title="Where Your Users & Outputs Land" color="#3B82F6" complete={sectionComplete.geo} stageNum="2" />

        <Question label="Where is the organization legally established?" hint="Country or countries of registered incorporation / principal place of business.">
          <TextInput value={form.established} onChange={v => set("established", v)} placeholder="e.g. United States (Delaware)..." />
        </Question>

        <Question label="Where do your users or outputs land?" hint="Most AI regulations follow a market-access model — where output is consumed matters as much as where you're incorporated. List all countries or regions.">
          <TextInput value={form.users} onChange={v => set("users", v)} placeholder="e.g. US (nationwide), Canada, UK, Germany..." />
        </Question>

        <Question label="Where is the output of the AI system consumed or acted upon?" hint="This can differ from where users are located. A model trained in the US, deployed by a US company, serving EU users — the output is consumed in the EU.">
          <TextInput value={form.outputConsumed} onChange={v => set("outputConsumed", v)} placeholder="e.g. US and EU — captioning output affects end users in Germany..." />
        </Question>

        {divider}

        {/* Stage 3 */}
        <SectionHeader stage="Stage 3" title="The AI System" color="#10B981" complete={sectionComplete.ai} stageNum="3" />

        <Question label="What does the AI system do? Select all that apply." hint="Each of these is a risk signal. Multiple signals indicate a high-risk profile regardless of jurisdiction.">
          <MultiSelect options={AI_ACTIVITIES} values={form.aiActivities} onChange={v => set("aiActivities", v)} />
          {form.aiActivities.includes("Other / General-purpose productivity or automation") && (
            <div style={{ marginTop: 8 }}>
              <TextInput value={form.aiActivitiesOther} onChange={v => set("aiActivitiesOther", v)} placeholder="Briefly describe what the AI system does..." />
            </div>
          )}
        </Question>

        <Question
          label="Does your system process biometric, health, or sensitive personal data?"
          hint="This is a key trigger for EU AI Act high-risk classification, GDPR special category obligations, US state biometric laws (e.g. Illinois BIPA), and Canada's CPPA. Voice data, facial data, health records, and behavioural profiles all qualify."
        >
          <SingleSelect options={BIOMETRIC_OPTIONS} value={form.biometric} onChange={v => set("biometric", v)} />
        </Question>

        <Question label="Is this AI built on a foundation model / general-purpose AI (GPAI)?" hint="If you are building or releasing a GPAI, EU AI Act GPAI provisions apply — a significant compliance pathway.">
          <SingleSelect options={GPAI_OPTIONS} value={form.gpai} onChange={v => set("gpai", v)} />
        </Question>

        <Question label="Does the AI make autonomous decisions, or does a human review output before it has effect?">
          <SingleSelect options={OVERSIGHT_OPTIONS} value={form.oversight} onChange={v => set("oversight", v)} />
        </Question>

        {divider}

        {/* Stage 4 */}
        <SectionHeader stage="Stage 4" title="Maturity & Purpose" color="#F59E0B" complete={sectionComplete.maturity} stageNum="4" />

        <Question label="Where is the organization in its AI journey for this use case?">
          <SingleSelect options={MATURITY_OPTIONS} value={form.maturity} onChange={v => set("maturity", v)} />
        </Question>

        <Question label="What do you need from this?">
          <MultiSelect options={DELIVERABLES} values={form.deliverables} onChange={v => set("deliverables", v)} />
        </Question>

        {/* Submit */}
        <div style={{ marginTop: 40 }}>
          {!allComplete && (
            <div style={{
              display: "flex", gap: 8, alignItems: "center",
              background: "#FEF2F2", border: "1px solid #FECACA",
              borderRadius: 8, padding: "11px 16px", marginBottom: 14,
            }}>
              <span style={{ fontSize: 14 }}>⚠</span>
              <span style={{ fontSize: 13, color: "#DC2626" }}>
                Complete all four stages before generating your report. ({completedCount}/4 complete
                {!sectionComplete.org      && " · Stage 1"}
                {!sectionComplete.geo      && " · Stage 2"}
                {!sectionComplete.ai       && " · Stage 3"}
                {!sectionComplete.maturity && " · Stage 4"}
                )
              </span>
            </div>
          )}
          <button
            onClick={() => { if (allComplete && onSubmit) onSubmit(); }}
            disabled={!allComplete}
            style={{
              width: "100%", padding: "16px 24px",
              background: allComplete
                ? "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)"
                : "#F1F5F8",
              border: `1.5px solid ${allComplete ? "#1D4ED8" : "#E6EAF1"}`,
              borderRadius: 10, cursor: allComplete ? "pointer" : "not-allowed",
              fontSize: 16, fontWeight: 700,
              color: allComplete ? "white" : "#94A3B8",
              letterSpacing: "0.01em", transition: "all 0.2s",
              fontFamily: FONT,
            }}
          >
            {allComplete ? "Generate Report →" : "Complete all stages to continue"}
          </button>
          {allComplete && (
            <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", marginTop: 12 }}>
              Demo loads a sample report for SignalPath Technologies — a US accessibility tech company with EU, UK, and Canadian exposure.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
