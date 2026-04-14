import { useState } from "react";
import { content, palette } from "./content";
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
  const t = content[lang];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        color: palette.text,
        background: palette.bg,
      }}
    >
      <Navbar t={t} lang={lang} setLang={setLang} scrollTo={scrollTo} />
      <Hero t={t} scrollTo={scrollTo} />
      <Services t={t} />
      <Process t={t} />
      <WhyDiverum t={t} />
      <BookCall t={t} />
      <Footer t={t} />
    </div>
  );
}

export default App;