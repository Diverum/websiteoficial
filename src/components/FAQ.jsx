import { HelpCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";

export default function FAQ({ t, p }) {
  const [ref, visible] = useInView(0.08);

  return (
    <section id="faq" ref={ref} className={`fade-section ${visible ? "visible" : ""}`}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="tag" style={{ margin: "0 auto 16px" }}>
            <HelpCircle size={14} /> {t.faq.tag}
          </div>
          <h2 className="section-title">{t.faq.headline}</h2>
          <p className="section-sub">{t.faq.sub}</p>
        </div>

        <div className="faq-grid">
          {t.faq.items.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3 className="faq-question" style={{ color: p.primary }}>
                {item.question}
              </h3>
              <p className="faq-answer">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
