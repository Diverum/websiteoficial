import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { privacyContent } from "../legal-content";
import { useInView } from "../hooks/useInView";

export default function PrivacyPolicy({ lang, p, t }) {
  const [ref, visible] = useInView(0.05);
  const data = privacyContent[lang] || privacyContent.en;
  const labels = t.privacy || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main ref={ref} className={`fade-section ${visible ? "visible" : ""}`}>
      <article
        style={{
          maxWidth: 780,
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        {/* Back link */}
        <Link
          to={lang === "en" ? "/en" : "/"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: p.accent,
            textDecoration: "none",
            fontWeight: 500,
            marginBottom: 32,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <ArrowLeft size={16} />
          {labels.backHome || "Back to Home"}
        </Link>

        {/* Header */}
        <header style={{ marginBottom: 48 }}>
          <div className="tag" style={{ marginBottom: 16 }}>
            <ShieldCheck size={14} />
            {labels.title || "Privacy Policy"}
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 42px)",
              lineHeight: 1.2,
              color: p.primary,
              marginBottom: 16,
            }}
          >
            {labels.title || "Privacy Policy"}
          </h1>
          {/* Preamble */}
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: p.textMuted,
              whiteSpace: "pre-line",
              borderLeft: `3px solid ${p.accent}`,
              paddingLeft: 16,
            }}
          >
            {data.preamble}
          </p>
        </header>

        {/* Sections */}
        {data.sections.map((section, i) => (
          <section
            key={i}
            style={{
              marginBottom: 36,
              paddingBottom: 36,
              borderBottom:
                i < data.sections.length - 1
                  ? `1px solid ${p.border}`
                  : "none",
            }}
          >
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 18,
                color: p.primary,
                marginBottom: 14,
              }}
            >
              {section.title}
            </h2>
            {section.body.split("\n\n").map((paragraph, j) => (
              <p
                key={j}
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: p.textMuted,
                  marginBottom: 12,
                  whiteSpace: "pre-line",
                }}
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}