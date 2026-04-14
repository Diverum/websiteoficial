import { Workflow } from "lucide-react";
import { useInView } from "../hooks/useInView";

export default function Process({ t, p }) {
  const [ref, visible] = useInView(0.08);

  return (
    <section id="process" ref={ref} className={`fade-section ${visible ? "visible" : ""}`}>
      <div style={{ background: p.bgAlt, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="tag" style={{ margin: "0 auto 16px" }}>
              <Workflow size={14} /> {t.process.tag}
            </div>
            <h2 className="section-title">{t.process.headline}</h2>
            <p className="section-sub">{t.process.sub}</p>
          </div>

          <div className="steps-grid">
            {t.process.steps.map((step, i) => (
              <div key={i} className="step-card">
                <span className="step-bg-num">{step.num}</span>
                <div className="step-num">{step.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: p.primary }}>{step.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: p.textMuted }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}