import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { useInView } from "../hooks/useInView";

export default function Hero({ t, scrollTo, p }) {
  const [ref, visible] = useInView(0.08);

  return (
    <section id="hero" ref={ref} className={`fade-section ${visible ? "visible" : ""}`}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 24px 80px", textAlign: "center" }}>
        <div className="tag" style={{ margin: "0 auto 24px" }}>
          <ShieldCheck size={14} /> {t.hero.tag}
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 5vw, 56px)",
            lineHeight: 1.12,
            maxWidth: 800,
            margin: "0 auto 20px",
            color: p.primary,
          }}
        >
          {t.hero.headline}
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.65, color: p.textMuted, maxWidth: 620, margin: "0 auto 40px" }}>
          {t.hero.sub}
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => scrollTo("book")}>
            {t.hero.cta} <ArrowRight size={16} />
          </button>
          <button className="btn-secondary" onClick={() => scrollTo("process")}>
            {t.hero.ctaSec} <ChevronDown size={16} />
          </button>
        </div>

        
      </div>
    </section>
  );
}