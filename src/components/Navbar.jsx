import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, X } from "lucide-react";
import LogoIcon from "./LogoIcon";

export default function Navbar({ t, lang, theme, setTheme, scrollTo, p }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const homePath = lang === "en" ? "/en" : "/";
  const isHome = location.pathname === "/" || location.pathname === "/en";

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNav = (id) => {
    setMobileOpen(false);

    if (isHome) {
      // On homepage — just scroll
      setTimeout(() => scrollTo(id), 100);
    } else {
      // On another page — navigate home, then scroll after mount
      navigate(homePath, { state: { scrollTo: id } });
    }
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const navLinks = [
    ["services", t.nav.services],
    ["process", t.nav.process],
    ["why", t.nav.why],
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: p.navBg,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${p.border}`,
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <a
            href={homePath}
            onClick={(e) => {
              e.preventDefault();
              navigate(homePath);
            }}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: p.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
              }}
            >
              <LogoIcon size={22} color="#fff" strokeWidth={28} />
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 20,
                color: p.primary,
              }}
            >
              Diverum
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="nav-desktop">
            {navLinks.map(([id, label]) => (
              <button key={id} onClick={() => handleNav(id)} className="nav-link">
                {label}
              </button>
            ))}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
            </button>

            <button
              className="btn-primary"
              onClick={() => handleNav("book")}
              style={{ padding: "10px 24px", fontSize: 14 }}
            >
              {t.nav.book}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="nav-mobile">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            >
              <div style={{ width: 20, height: 2, background: p.text, marginBottom: 5, borderRadius: 2 }} />
              <div style={{ width: 20, height: 2, background: p.text, marginBottom: 5, borderRadius: 2 }} />
              <div style={{ width: 20, height: 2, background: p.text, borderRadius: 2 }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? "mobile-overlay--open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Mobile Slide-in Panel (left → right, 75vw) */}
      <aside
        className={`mobile-panel ${mobileOpen ? "mobile-panel--open" : ""}`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        style={{
          background: p.bg,
          borderRight: `1px solid ${p.border}`,
        }}
      >
        {/* Panel Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: `1px solid ${p.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: p.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
              }}
            >
              <LogoIcon size={20} color="#fff" strokeWidth={28} />
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 18,
                color: p.primary,
              }}
            >
              Diverum
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: p.textMuted,
              padding: 4,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Panel Links */}
        <nav style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "14px 16px",
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 500,
                color: p.text,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = p.bgAlt)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Panel CTA */}
        <div style={{ padding: "0 24px 24px", marginTop: "auto" }}>
          <button
            className="btn-primary"
            onClick={() => handleNav("book")}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "14px 24px",
              fontSize: 15,
            }}
          >
            {t.nav.book}
          </button>
        </div>
      </aside>
    </>
  );
}