import { Zap, ShieldCheck } from "lucide-react";
import { palette } from "../content";

export default function Footer({ t }) {
  return (
    <footer
      style={{
        borderTop: `1px solid ${palette.border}`,
        padding: "32px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: palette.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={13} color="#fff" />
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 16,
                color: palette.primary,
              }}
            >
              Diverum
            </span>
          </div>
          <span style={{ fontSize: 13, color: palette.textMuted }}>
            {t.footer.copy}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: palette.accent,
              fontWeight: 600,
            }}
          >
            <ShieldCheck size={14} /> {t.footer.hipaa}
          </div>
          <span
            style={{ fontSize: 13, color: palette.textMuted, cursor: "pointer" }}
          >
            {t.footer.privacy}
          </span>
          <span
            style={{ fontSize: 13, color: palette.textMuted, cursor: "pointer" }}
          >
            {t.footer.terms}
          </span>
        </div>
      </div>
    </footer>
  );
}