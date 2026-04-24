import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { aboutContent } from "../about-content";
import { useInView } from "../hooks/useInView";

export default function AboutUs({ lang, p, t }) {
  const [ref, visible] = useInView(0.05);
  const d = aboutContent[lang] || aboutContent.en;
  const aboutLabel = lang === "en" ? "About" : "Nosotros";
  const backLabel = lang === "en" ? "Back to Home" : "Volver al Inicio";
  const prefix = lang === "en" ? "/en" : "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main ref={ref} className={`fade-section ${visible ? "visible" : ""}`}>
      <article style={{ maxWidth: 780, margin: "0 auto", padding: "120px 24px 80px" }}>

        {/* Back link */}
        <Link
          to={lang === "en" ? "/en" : "/"}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 14, color: p.accent, textDecoration: "none",
            fontWeight: 500, marginBottom: 32, transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>

        {/* Headline */}
        <header style={{ marginBottom: 48 }}>
          <div className="tag" style={{ marginBottom: 16 }}>{aboutLabel}</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.2,
            color: p.primary, marginBottom: 0,
          }}>
            {d.headline}
          </h1>
        </header>

        {/* Intro */}
        <Section title={d.intro.title} p={p}>
          <Prose text={d.intro.body} p={p} />
        </Section>

        {/* What we do */}
        <Section title={d.whatWeDo.title} p={p}>
          <Prose text={d.whatWeDo.body} p={p} />
        </Section>

        {/* Services */}
        <Section title={d.services.title} p={p}>
          {d.services.items.map((item, i) => (
            <div key={i} style={{ marginBottom: i < d.services.items.length - 1 ? 28 : 0 }}>
              <h3 style={{
                fontWeight: 600, fontSize: 16, color: p.primary,
                marginBottom: 8,
              }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: p.textMuted }}>
                {item.desc}
              </p>
            </div>
          ))}
        </Section>

        {/* Why us */}
        <Section title={d.whyUs.title} p={p}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {d.whyUs.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: p.accentLight, display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2,
                }}>
                  <Check size={14} color={p.accent} />
                </div>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 15, color: p.primary }}>
                    {item.title}.
                  </span>{" "}
                  <span style={{ fontSize: 15, lineHeight: 1.75, color: p.textMuted }}>
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Process */}
        <Section title={d.process.title} p={p}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: p.textMuted, marginBottom: 24 }}>
            {d.process.intro}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {d.process.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: p.accentLight, display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                  fontWeight: 700, fontSize: 14, color: p.accent,
                }}>
                  {step.num}
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: 15, color: p.primary, marginBottom: 4 }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: p.textMuted }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* International (EN only) */}
        {d.international && (
          <Section title={d.international.title} p={p}>
            <Prose text={d.international.body} p={p} />
          </Section>
        )}

        {/* Long term */}
        <Section title={d.longTerm.title} p={p}>
          <Prose text={d.longTerm.body} p={p} />
        </Section>

        {/* Contact / CTA */}
        <div style={{
          background: p.bgAlt, borderRadius: 16, padding: "36px 32px",
          marginTop: 48, textAlign: "center",
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: 24, color: p.primary, marginBottom: 20,
          }}>
            {d.contact.title}
          </h2>
          <div style={{
            display: "flex", flexDirection: "column", gap: 8,
            alignItems: "center", fontSize: 15, color: p.textMuted, marginBottom: 24,
          }}>
            <span>Email: <a href={`mailto:${d.contact.email}`} style={{ color: p.accent, textDecoration: "none" }}>{d.contact.email}</a></span>
            <span>Web: <a href={`https://${d.contact.website}`} style={{ color: p.accent, textDecoration: "none" }}>{d.contact.website}</a></span>
            <span>LinkedIn: <a href={`https://${d.contact.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: p.accent, textDecoration: "none" }}>{d.contact.linkedin}</a></span>
          </div>
          <Link
            to={`${prefix}/`}
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
            onClick={() => {
              setTimeout(() => {
                document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
          >
            {t.nav.book} <ArrowRight size={16} />
          </Link>
          <p style={{ fontSize: 14, color: p.textMuted, marginTop: 20, fontStyle: "italic" }}>
            {d.contact.tagline}
          </p>
        </div>
      </article>
    </main>
  );
}

// ─── Helper components ───

function Section({ title, p, children }) {
  return (
    <section style={{
      marginBottom: 36, paddingBottom: 36,
      borderBottom: `1px solid ${p.border}`,
    }}>
      <h2 style={{
        fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
        fontSize: 20, color: p.primary, marginBottom: 16,
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ text, p }) {
  return text.split("\n\n").map((paragraph, j) => (
    <p key={j} style={{
      fontSize: 15, lineHeight: 1.75, color: p.textMuted,
      marginBottom: 12, whiteSpace: "pre-line",
    }}>
      {paragraph}
    </p>
  ));
}