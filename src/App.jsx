import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";


import {
  content,
  paletteLight,
  paletteDark,
  countryRegulations,
  countryToLang,
  countryStories,
} from "./content";


import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import WhyDiverum from "./components/WhyDiverum";
import BookCall from "./components/BookCall";
import Footer from "./components/Footer";
import "./App.css";

// Lee la cookie geo_country que setea el middleware de Vercel
function getGeoCountryCookie() {
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith("geo_country="));
  return match ? match.split("=")[1] : null;
}

function SitePage({ langOverride }) {
  const [geoReady, setGeoReady] = useState(false);
  const [country, setCountry] = useState(getGeoCountryCookie() || null);
  const [lang, setLang] = useState(langOverride || "es");
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  // Detectar país: primero cookie de Vercel, si no, API gratuita
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

    // Fallback: API gratuita de geolocalización
    fetch("https://ip-api.com/json/?fields=countryCode")
      .then((res) => res.json())
      .then((data) => {
        const code = data.countryCode || "US";
        setCountry(code);
        // Guardar en cookie para no repetir la llamada
        document.cookie = `geo_country=${code}; Path=/; SameSite=Lax; Max-Age=86400`;
        if (!langOverride) {
          setLang(countryToLang[code] || "es");
        }
        // Si es US y no tiene langOverride, redirigir a /en
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
      sub: story.heroSub,
    },
    why: {
      ...t.why,
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
    footer: {
      ...t.footer,
      hipaa: story.footerBadge,
    },
  };

  
  const handleSetLang = (newLang) => {
    setLang(newLang);
    if (newLang === "en") {
      navigate("/en");
    } else {
      navigate("/");
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // No renderizar hasta que la geo esté lista
  if (!geoReady) return null;

  return (
    <div
      style={{
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
      }}
    >
      <Navbar t={tWithRegulation} lang={lang} setLang={handleSetLang} theme={theme} setTheme={setTheme} scrollTo={scrollTo} p={p} />
      <Hero t={tWithRegulation} scrollTo={scrollTo} p={p} />
      <Services t={tWithRegulation} p={p} />
      <Process t={tWithRegulation} p={p} />
      <WhyDiverum t={tWithRegulation} p={p} />
      <BookCall t={tWithRegulation} p={p} lang={lang} />
      <Footer t={tWithRegulation} p={p} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/en" element={<SitePage langOverride="en" />} />
      <Route path="/*" element={<SitePage langOverride={null} />} />
    </Routes>
  );
}

export default App;