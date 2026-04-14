import { Zap, ShieldCheck, ExternalLink } from "lucide-react";

export default function Footer({ t, p }) {
  return (
    <footer style={{ borderTop: `1px solid ${p.border}`, padding: "32px 24px", transition: "border-color 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        {/* Left — Logo + Copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: p.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={13} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: p.primary }}>
              Diverum
            </span>
          </div>
          <span style={{ fontSize: 13, color: p.textMuted }}>{t.footer.copy}</span>
        </div>

        {/* Right — Links + Social */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: p.accent, fontWeight: 600 }}>
            <ShieldCheck size={14} /> {t.footer.hipaa}
          </div>
          <span className="footer-link">{t.footer.about}</span>
          <span className="footer-link">{t.footer.privacy}</span>
          <span className="footer-link">{t.footer.terms}</span>
          <a
            href="https://linkedin.com/company/diverum"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}