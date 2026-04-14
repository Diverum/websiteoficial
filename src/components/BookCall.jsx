import { useState } from "react";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { palette } from "../content";

export default function BookCall({ t }) {
  const [ref, visible] = useInView(0.08);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    message: "",
  });
  const [formState, setFormState] = useState("idle"); // idle | sending | sent

  const handleSubmit = () => {
    if (!formData.name || !formData.email) return;
    setFormState("sending");
    // TODO: Replace with HubSpot embedded form or API call
    setTimeout(() => setFormState("sent"), 1500);
  };

  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="book"
      ref={ref}
      className={`fade-section ${visible ? "visible" : ""}`}
    >
      <div style={{ background: palette.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <div className="book-grid">
            {/* Left — Info */}
            <div>
              <div className="tag" style={{ marginBottom: 16 }}>
                <CalendarDays size={14} /> {t.cta.tag}
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 4vw, 38px)",
                  color: palette.primary,
                  marginBottom: 16,
                  lineHeight: 1.15,
                }}
              >
                {t.cta.headline}
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: palette.textMuted,
                  marginBottom: 32,
                }}
              >
                {t.cta.sub}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {t.cta.benefits.map((text, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: palette.accentLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={14} color={palette.accent} />
                    </div>
                    <span style={{ fontSize: 15, color: palette.textMuted }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="form-card">
              {formState === "sent" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: palette.accentLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <Check size={28} color={palette.accent} />
                  </div>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: palette.primary,
                    }}
                  >
                    {t.cta.fields.success}
                  </p>
                </div>
              ) : (
                <>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: palette.primary,
                      marginBottom: 6,
                    }}
                  >
                    {t.cta.formTitle}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: palette.textMuted,
                      marginBottom: 24,
                    }}
                  >
                    {t.cta.formSub}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    <input
                      placeholder={t.cta.fields.name}
                      value={formData.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder={t.cta.fields.email}
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                    <input
                      placeholder={t.cta.fields.company}
                      value={formData.company}
                      onChange={(e) => update("company", e.target.value)}
                    />
                    <select
                      value={formData.country}
                      onChange={(e) => update("country", e.target.value)}
                      style={{
                        color: formData.country
                          ? palette.text
                          : palette.textMuted,
                      }}
                    >
                      <option value="" disabled>
                        {t.cta.fields.country}
                      </option>
                      {t.cta.fields.countryOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <textarea
                      placeholder={t.cta.fields.message}
                      value={formData.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={3}
                    />
                    <button
                      className="btn-primary"
                      onClick={handleSubmit}
                      disabled={formState === "sending"}
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        marginTop: 4,
                        opacity: formState === "sending" ? 0.7 : 1,
                      }}
                    >
                      {formState === "sending"
                        ? t.cta.fields.submitting
                        : t.cta.fields.submit}
                      {formState !== "sending" && <ArrowRight size={16} />}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}