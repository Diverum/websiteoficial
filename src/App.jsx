import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import {
  content,
  paletteLight,
  paletteDark,
  countryRegulations,
  countryToLang,
  countryStories,
} from "./content";

import TurnstileGate from "./components/TurnstileGate";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import WhyDiverum from "./components/WhyDiverum";
import BookCall from "./components/BookCall";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./pages/AboutUs";
import "./App.css";

// Lee la cookie geo_country que setea el middleware de Vercel
function getGeoCountryCookie() {
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith("geo_country="));
  return match ? match.split("=")[1] : null;
}

// Hook compartido para geo + lang + theme
function useGeoLang(langOverride) {
  const [geoReady, setGeoReady] = useState(false);
  const [country, setCountry] = useState(getGeoCountryCookie() || null);
  const [lang, setLang] = useState(langOverride || "es");
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    const cookieCountry = getGeoCountryCookie();
    if (cookieCountry) {
      setCountry(cookieCountry);
      if (!langOverride) {
        setLang(countryToLang[cookieCountry] || "es");
      }
      setGeoReady(true);
      return;
    }

    fetch("https://ip-api.com/json/?fields=countryCode")
      .then((res) => res.json())
      .then((data) => {
        const code = data.countryCode || "US";
        setCountry(code);
        document.cookie = `geo_country=${code}; Path=/; SameSite=Lax; Max-Age=86400`;
        if (!langOverride) {
          setLang(countryToLang[code] || "es");
        }
        if (code === "US" && !langOverride) {
          navigate("/en", { replace: true });
        }
      })
      .catch(() => {
        setCountry("US");
        if (!langOverride) setLang("en");
      })
      .finally(() => setGeoReady(true));
  }, [langOverride, navigate]);

  const t = content[lang];
  const p = theme === "dark" ? paletteDark : paletteLight;
  const regulation = countryRegulations[country] || countryRegulations.US;
  const story = countryStories[country]?.[lang] || countryStories.US[lang];

  const tWithRegulation = {
    ...t,
    hero: {
      ...t.hero,
      tag: story.heroTag,
      sub: story.heroSub,
    },
    services: {
      ...t.services,
      items: t.services.items.map((item) =>
        item.icon === "ShieldCheck"
          ? { ...item, desc: story.complianceService }
          : item
      ),
    },
    why: {
      ...t.why,
      points: t.why.points.map((point) => {
        if (point.icon === "ShieldCheck") {
          return { ...point, title: story.privacyTitle, desc: story.privacyDesc };
        }
        if (point.icon === "Activity") {
          return { ...point, title: story.expertiseTitle, desc: story.expertiseDesc };
        }
        return point;
      }),
      compliance: {
        title: t.why.compliance.title,
        items: [
          {
            flag: regulation.flag,
            name: regulation.name,
            desc: regulation.desc[lang],
          },
        ],
      },
    },
    cta: {
      ...t.cta,
      benefits: t.cta.benefits.map((b, i) =>
        i === t.cta.benefits.length - 1 ? story.ctaBenefit : b
      ),
    },
    footer: {
      ...t.footer,
      hipaa: story.footerBadge,
    },
  };

  return { geoReady, lang, theme, setTheme, tWithRegulation, p, country };
}

function siteStyles(p) {
  return {
    fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
    color: p.text,
    background: p.bg,
    minHeight: "100vh",
    transition: "background 0.3s, color 0.3s",
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
  };
}

// ─── Homepage (with TurnstileGate) ───
function SitePage({ langOverride }) {
  const { geoReady, lang, theme, setTheme, tWithRegulation, p } = useGeoLang(langOverride);
  const location = useLocation();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle scrollTo from navigation state (coming from legal/about pages)
  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      // Wait for DOM to be ready
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      // Clean state so it doesn't re-scroll
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  if (!geoReady) return null;

  return (
    <TurnstileGate>
      <div className="site-root" style={siteStyles(p)}>
        <Navbar t={tWithRegulation} lang={lang} theme={theme} setTheme={setTheme} scrollTo={scrollTo} p={p} />
        <Hero t={tWithRegulation} scrollTo={scrollTo} p={p} />
        <Services t={tWithRegulation} p={p} />
        <Process t={tWithRegulation} p={p} />
        <WhyDiverum t={tWithRegulation} p={p} />
        <BookCall t={tWithRegulation} p={p} lang={lang} />
        <Footer t={tWithRegulation} p={p} lang={lang} />
      </div>
    </TurnstileGate>
  );
}

// ─── Legal & info pages (NO TurnstileGate) ───
function PrivacyPage({ langOverride }) {
  const { geoReady, lang, theme, setTheme, tWithRegulation, p } = useGeoLang(langOverride);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (!geoReady) return null;

  return (
    <div className="site-root" style={siteStyles(p)}>
      <Navbar t={tWithRegulation} lang={lang} theme={theme} setTheme={setTheme} scrollTo={scrollTo} p={p} />
      <PrivacyPolicy lang={lang} p={p} t={tWithRegulation} />
      <Footer t={tWithRegulation} p={p} lang={lang} />
    </div>
  );
}

function TermsPage({ langOverride }) {
  const { geoReady, lang, theme, setTheme, tWithRegulation, p } = useGeoLang(langOverride);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (!geoReady) return null;

  return (
    <div className="site-root" style={siteStyles(p)}>
      <Navbar t={tWithRegulation} lang={lang} theme={theme} setTheme={setTheme} scrollTo={scrollTo} p={p} />
      <TermsOfService lang={lang} p={p} t={tWithRegulation} />
      <Footer t={tWithRegulation} p={p} lang={lang} />
    </div>
  );
}

function AboutPage({ langOverride }) {
  const { geoReady, lang, theme, setTheme, tWithRegulation, p } = useGeoLang(langOverride);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (!geoReady) return null;

  return (
    <div className="site-root" style={siteStyles(p)}>
      <Navbar t={tWithRegulation} lang={lang} theme={theme} setTheme={setTheme} scrollTo={scrollTo} p={p} />
      <AboutUs lang={lang} p={p} t={tWithRegulation} />
      <Footer t={tWithRegulation} p={p} lang={lang} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* English routes */}
      <Route path="/en" element={<SitePage langOverride="en" />} />
      <Route path="/en/privacy" element={<PrivacyPage langOverride="en" />} />
      <Route path="/en/terms" element={<TermsPage langOverride="en" />} />
      <Route path="/en/about" element={<AboutPage langOverride="en" />} />

      {/* Spanish routes */}
      <Route path="/privacy" element={<PrivacyPage langOverride={null} />} />
      <Route path="/terms" element={<TermsPage langOverride={null} />} />
      <Route path="/about" element={<AboutPage langOverride={null} />} />

      {/* Default — Spanish / geo-detected */}
      <Route path="/*" element={<SitePage langOverride={null} />} />
    </Routes>
  );
}

export default App;