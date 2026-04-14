import { Check, Lock, ShieldCheck, Clock, DollarSign, Activity } from "lucide-react";
import { useInView } from "../hooks/useInView";

const iconMap = { ShieldCheck, Clock, DollarSign, Activity };

export default function WhyDiverum({ t, p }) {
  const [ref, visible] = useInView(0.08);

  return (
    <section id="why" ref={ref} className={`fade-section ${visible ? "visible" : ""}`}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ margin: "0 auto 16px" }}>
            <Check size={14} /> {t.why.tag}
          </div>
          <h2 className="section-title">{t.why.headline}</h2>
          <p className="section-sub">{t.why.sub}</p>
        </div>

        <div className="why-grid">
          {t.why.points.map((point, i) => {
            const Icon = iconMap[point.icon];
            return (
              <div key={i} className="card" style={{ padding: 28 }}>
                <div className="card-icon" style={{ width: 40, height: 40 }}>
                  {Icon && <Icon size={20} color={p.accent} />}
                </div>
                <h3 className="card-title" style={{ fontSize: 17 }}>{point.title}</h3>
                <p className="card-desc" style={{ fontSize: 14 }}>{point.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Compliance Banner */}
        <div className="compliance-banner">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <Lock size={20} color={p.accent} />
            <h3 style={{ fontSize: 20, fontWeight: 600, color: p.primary }}>{t.why.compliance.title}</h3>
          </div>
          <div className="compliance-grid">
            {t.why.compliance.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>{item.flag}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6, color: p.primary }}>{item.name}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: p.textMuted }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}