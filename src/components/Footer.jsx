import { Zap, ShieldCheck } from "lucide-react";

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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}