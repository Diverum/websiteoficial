import { useState } from "react";
import { ArrowRight, CalendarDays, Check, AlertCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";

const countryCodes = [
  { code: "+1", flag: "🇺🇸", label: "US +1" },
  { code: "+57", flag: "🇨🇴", label: "CO +57" },
  { code: "+52", flag: "🇲🇽", label: "MX +52" },
  { code: "+34", flag: "🇪🇸", label: "ES +34" },
  { code: "+56", flag: "🇨🇱", label: "CL +56" },
  { code: "+51", flag: "🇵🇪", label: "PE +51" },
  { code: "+54", flag: "🇦🇷", label: "AR +54" },
  { code: "+593", flag: "🇪🇨", label: "EC +593" },
];

const validationMessages = {
  en: {
    nameRequired: "Full name is required",
    nameMin: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    phoneRequired: "Phone number is required",
    phoneInvalid: "Phone must be 7-15 digits",
    companyRequired: "Company name is required",
    countryRequired: "Please select a country",
    messageRequired: "Please describe your challenge",
  },
  es: {
    nameRequired: "El nombre es obligatorio",
    nameMin: "El nombre debe tener al menos 2 caracteres",
    emailRequired: "El correo es obligatorio",
    emailInvalid: "Ingresa un correo electrónico válido",
    phoneRequired: "El teléfono es obligatorio",
    phoneInvalid: "El teléfono debe tener entre 7 y 15 dígitos",
    companyRequired: "El nombre de la empresa es obligatorio",
    countryRequired: "Selecciona un país",
    messageRequired: "Describe tu desafío",
  },
};

export default function BookCall({ t, p, lang = "en" }) {
  const [ref, visible] = useInView(0.08);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneCode: "+1",
    phone: "",
    company: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formState, setFormState] = useState("idle");

  const v = validationMessages[lang] || validationMessages.en;

  const validate = (data) => {
    const errs = {};
    // Name
    if (!data.name.trim()) errs.name = v.nameRequired;
    else if (data.name.trim().length < 2) errs.name = v.nameMin;
    // Email
    if (!data.email.trim()) errs.email = v.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = v.emailInvalid;
    // Phone
    const digits = data.phone.replace(/\D/g, "");
    if (!digits) errs.phone = v.phoneRequired;
    else if (digits.length < 7 || digits.length > 15) errs.phone = v.phoneInvalid;
    // Company
    if (!data.company.trim()) errs.company = v.companyRequired;
    // Country
    if (!data.country) errs.country = v.countryRequired;
    // Message
    if (!data.message.trim()) errs.message = v.messageRequired;
    return errs;
  };

  const update = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    // Clear error on type if field was touched
    if (touched[field]) {
      const newErrors = validate(newData);
      setErrors((prev) => {
        const updated = { ...prev };
        if (newErrors[field]) updated[field] = newErrors[field];
        else delete updated[field];
        return updated;
      });
    }
  };

  const handleBlur = (field, overrideData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const dataToValidate = overrideData || formData;
    const newErrors = validate(dataToValidate);
    setErrors((prev) => {
      const updated = { ...prev };
      if (newErrors[field]) updated[field] = newErrors[field];
      else delete updated[field];
      return updated;
    });
  };


  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = { name: true, email: true, phone: true, company: true, country: true, message: true };
    setTouched(allTouched);

    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormState("sending");

    // HubSpot tracking cookie
    const hutk = document.cookie
      .split("; ")
      .find((c) => c.startsWith("hubspotutk="))
      ?.split("=")[1];

    try {
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/51065610/61ebcc9d-be8c-413d-aa52-d4106308662b",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "firstname", value: formData.name.trim() },
              { objectTypeId: "0-1", name: "email", value: formData.email.trim() },
              { objectTypeId: "0-1", name: "phone", value: formData.phoneCode + formData.phone.replace(/\D/g, "") },
              { objectTypeId: "0-1", name: "company", value: formData.company.trim() },
              { objectTypeId: "0-1", name: "country", value: formData.country },
              { objectTypeId: "0-1", name: "message", value: formData.message.trim() },
            ],
            context: {
              hutk: hutk || undefined,
              pageUri: window.location.href,
              pageName: "Diverum - Book a Call",
            },
          }),
        }
      );

      if (res.ok) {
        setFormState("sent");
      } else {
        console.error("HubSpot error:", await res.text());
        setFormState("idle");
      }
    } catch (err) {
      console.error("HubSpot submit error:", err);
      setFormState("idle");
    }
  };

  const fieldStyle = (field) => ({
    border: `1.5px solid ${errors[field] && touched[field] ? "#DC3545" : p.border}`,
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 15,
    fontFamily: "inherit",
    color: p.text,
    background: p.surface,
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  });

  const ErrorMsg = ({ field }) => {
    if (!errors[field] || !touched[field]) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
        <AlertCircle size={13} color="#DC3545" />
        <span style={{ fontSize: 12, color: "#DC3545" }}>{errors[field]}</span>
      </div>
    );
  };

  return (
    <section id="book" ref={ref} className={`fade-section ${visible ? "visible" : ""}`}>
      <div style={{ background: p.bgAlt, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          <div className="book-grid">
            {/* Left */}
            <div>
              <div className="tag" style={{ marginBottom: 16 }}>
                <CalendarDays size={14} /> {t.cta.tag}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 38px)", color: p.primary, marginBottom: 16, lineHeight: 1.15 }}>
                {t.cta.headline}
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: p.textMuted, marginBottom: 32 }}>
                {t.cta.sub}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {t.cta.benefits.map((text, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: p.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={14} color={p.accent} />
                    </div>
                    <span style={{ fontSize: 15, color: p.textMuted }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="form-card">
              {formState === "sent" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: p.accentLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <Check size={28} color={p.accent} />
                  </div>
                  <p style={{ fontSize: 18, fontWeight: 600, color: p.primary }}>{t.cta.fields.success}</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: p.primary, marginBottom: 6 }}>{t.cta.formTitle}</h3>
                  <p style={{ fontSize: 14, color: p.textMuted, marginBottom: 24 }}>{t.cta.formSub}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {/* Name */}
                    <div>
                      <input
                        placeholder={t.cta.fields.name}
                        value={formData.name}
                        onChange={(e) => update("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        style={fieldStyle("name")}
                      />
                      <ErrorMsg field="name" />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        placeholder={t.cta.fields.email}
                        value={formData.email}
                        onChange={(e) => update("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        style={fieldStyle("email")}
                      />
                      <ErrorMsg field="email" />
                    </div>

                    {/* Phone */}
                    <div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <select
                          value={formData.phoneCode}
                          onChange={(e) => update("phoneCode", e.target.value)}
                          style={{
                            width: 120,
                            flexShrink: 0,
                            color: p.text,
                            background: p.surface,
                            border: `1.5px solid ${errors.phone && touched.phone ? "#DC3545" : p.border}`,
                            borderRadius: 8,
                            padding: "12px 8px",
                            fontSize: 14,
                            fontFamily: "inherit",
                            outline: "none",
                            cursor: "pointer",
                            transition: "border-color 0.2s",
                          }}
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          placeholder={t.cta.fields.phone}
                          value={formData.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          onBlur={() => handleBlur("phone")}
                          style={{ ...fieldStyle("phone"), flex: 1 }}
                        />
                      </div>
                      <ErrorMsg field="phone" />
                    </div>

                    {/* Company */}
                    <div>
                      <input
                        placeholder={t.cta.fields.company}
                        value={formData.company}
                        onChange={(e) => update("company", e.target.value)}
                        onBlur={() => handleBlur("company")}
                        style={fieldStyle("company")}
                      />
                      <ErrorMsg field="company" />
                    </div>

                    {/* Country */}
                    <div>
                      <select
                        value={formData.country}
                        onChange={(e) => {
                            const newData = { ...formData, country: e.target.value };
                            update("country", e.target.value);
                            handleBlur("country", newData);
                          }}
                        style={{
                          ...fieldStyle("country"),
                          color: formData.country ? p.text : p.textMuted,
                          cursor: "pointer",
                        }}
                      >
                        <option value="" disabled>{t.cta.fields.country}</option>
                        {t.cta.fields.countryOptions.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ErrorMsg field="country" />
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        placeholder={t.cta.fields.message}
                        value={formData.message}
                        onChange={(e) => update("message", e.target.value)}
                        onBlur={() => handleBlur("message")}
                        rows={3}
                        style={{ ...fieldStyle("message"), resize: "vertical", minHeight: 80 }}
                      />
                      <ErrorMsg field="message" />
                    </div>

                    {/* Submit */}
                    <button
                      className="btn-primary"
                      onClick={handleSubmit}
                      disabled={formState === "sending"}
                      style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
                    >
                      {formState === "sending" ? t.cta.fields.submitting : t.cta.fields.submit}
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