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
import FAQ from "./components/FAQ";
import BookCall from "./components/BookCall";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutUs from "./pages/AboutUs";
import { usePageSeo } from "./seo";
import "./App.css";

// Lee la cookie geo_country que setea el middleware de Vercel
function getCookie(name) {
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`));
  return match ? match.split("=")[1] : null;
}

function getGeoCountryCookie() {
  return getCookie("geo_country");
}

function hasEdgeGeoCookie() {
  return getCookie("geo_source") === "edge";
}

function setGeoCookies(country) {
  document.cookie = `geo_country=${country}; Path=/; SameSite=Lax; Max-Age=3600`;
  document.cookie = `geo_source=client; Path=/; SameSite=Lax; Max-Age=3600`;
}

function normalizeCountry(country) {
  return country?.toUpperCase() === "US" ? "US" : "CO";
}

function toEnglishPath(pathname) {
  if (pathname === "/" || pathname === "") return "/en";
  if (pathname.startsWith("/en")) return pathname;
  return `/en${pathname}`;
}

function toSpanishPath(pathname) {
  if (pathname === "/en" || pathname === "/en/") return "/";
  if (pathname.startsWith("/en/")) return pathname.replace(/^\/en/, "") || "/";
  return pathname || "/";
}

// Hook compartido para geo + lang + theme
function useGeoLang(langOverride) {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCountry = normalizeCountry(getGeoCountryCookie());
  const [geoReady, setGeoReady] = useState(false);
  const [country, setCountry] = useState(initialCountry);
  const [lang, setLang] = useState(langOverride || countryToLang[initialCountry] || "es");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let cancelled = false;

    const applyCountry = (rawCountry, { persist = false, route = true } = {}) => {
      if (cancelled) return;

      const code = normalizeCountry(rawCountry);
      const nextLang = langOverride || countryToLang[code] || "es";

      setCountry(code);
      setLang(nextLang);
      if (persist) setGeoCookies(code);

      if (route) {
        const isEnglishPath =
          location.pathname === "/en" || location.pathname.startsWith("/en/");

        if (code === "US" && !isEnglishPath) {
          navigate(toEnglishPath(location.pathname), { replace: true });
        }

        if (code !== "US" && isEnglishPath) {
          navigate(toSpanishPath(location.pathname), { replace: true });
        }
      }

      setGeoReady(true);
    };

    const edgeCountry = hasEdgeGeoCookie() ? getGeoCountryCookie() : null;

    if (edgeCountry) {
      applyCountry(edgeCountry);
      return () => {
        cancelled = true;
      };
    }

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        applyCountry(data.country_code || data.countryCode, { persist: true });
      })
      .catch(() => {
        applyCountry("CO", { persist: true });
      })
      .finally(() => {
        if (!cancelled) setGeoReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [langOverride, location.pathname, navigate]);

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
  usePageSeo(lang, "home");

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
        <FAQ t={tWithRegulation} p={p} />
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
  usePageSeo(lang, "privacy");

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
  usePageSeo(lang, "terms");

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
  usePageSeo(lang, "about");

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
