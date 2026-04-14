import { useState } from "react";
import { content, paletteLight, paletteDark } from "./content";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import WhyDiverum from "./components/WhyDiverum";
import BookCall from "./components/BookCall";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("light");

  const t = content[lang];
  const p = theme === "dark" ? paletteDark : paletteLight;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        color: p.text,
        background: p.bg,
        minHeight: "100vh",
        transition: "background 0.3s, color 0.3s",
        /* CSS variables for elements styled in App.css */
        "--c-bg": p.bg,
        "--c-bg-alt": p.bgAlt,
        "--c-surface": p.surface,
        "--c-primary": p.primary,
        "--c-accent": p.accent,
        "--c-accent-light": p.accentLight,
        "--c-text": p.text,
        "--c-text-muted": p.textMuted,
        "--c-border": p.border,
        "--c-nav-bg": p.navBg,
      }}
    >
      <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} scrollTo={scrollTo} p={p} />
      <Hero t={t} scrollTo={scrollTo} p={p} />
      <Services t={t} p={p} />
      <Process t={t} p={p} />
      <WhyDiverum t={t} p={p} />
      <BookCall t={t} p={p} lang={lang} />
      <Footer t={t} p={p} />
    </div>
  );
}

export default App;