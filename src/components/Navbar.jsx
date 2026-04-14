import { useState } from "react";
import { Zap, Globe, Sun, Moon } from "lucide-react";

export default function Navbar({ t, lang, setLang, theme, setTheme, scrollTo, p }) {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleNav = (id) => {
    scrollTo(id);
    setMobileMenu(false);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: p.navBg,
        backdropFilter: "blur(12px)",
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: p.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={18} color="#fff" />
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
        </div>

        {/* Desktop Nav */}
        <div className="nav-desktop">
          {[
            ["services", t.nav.services],
            ["process", t.nav.process],
            ["why", t.nav.why],
          ].map(([id, label]) => (
            <button key={id} onClick={() => handleNav(id)} className="nav-link">
              {label}
            </button>
          ))}

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Language Toggle */}
          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="lang-toggle">
            <Globe size={14} />
            {lang === "en" ? "ES" : "EN"}
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
          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="lang-toggle">
            <Globe size={13} />
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
          >
            <div style={{ width: 20, height: 2, background: p.text, marginBottom: 5, borderRadius: 2, transition: "0.2s", transform: mobileMenu ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: 20, height: 2, background: p.text, marginBottom: 5, borderRadius: 2, opacity: mobileMenu ? 0 : 1, transition: "0.2s" }} />
            <div style={{ width: 20, height: 2, background: p.text, borderRadius: 2, transition: "0.2s", transform: mobileMenu ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="mobile-dropdown">
          {[
            ["services", t.nav.services],
            ["process", t.nav.process],
            ["why", t.nav.why],
          ].map(([id, label]) => (
            <button key={id} onClick={() => handleNav(id)} className="nav-link" style={{ textAlign: "left", padding: "8px 0" }}>
              {label}
            </button>
          ))}
          <button className="btn-primary" onClick={() => handleNav("book")} style={{ marginTop: 8, justifyContent: "center" }}>
            {t.nav.book}
          </button>
        </div>
      )}
    </nav>
  );
}