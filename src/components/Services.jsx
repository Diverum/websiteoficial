import { Zap, Workflow, Layers, Brain, Eye, MapPin, ShieldCheck } from "lucide-react";
import { useInView } from "../hooks/useInView";

const iconMap = { Workflow, Layers, Brain, Eye, MapPin, ShieldCheck };

export default function Services({ t, p }) {
  const [ref, visible] = useInView(0.08);

  return (
    <section id="services" ref={ref} className={`fade-section ${visible ? "visible" : ""}`}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="tag" style={{ margin: "0 auto 16px" }}>
            <Zap size={14} /> {t.services.tag}
          </div>
          <h2 className="section-title">{t.services.headline}</h2>
          <p className="section-sub">{t.services.sub}</p>
        </div>

        <div className="services-grid">
          {t.services.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={i} className="card">
                <div className="card-icon">
                  {Icon && <Icon size={22} color={p.accent} />}
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}