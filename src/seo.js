import { useEffect } from "react";

const SITE_URL = "https://diverum.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const routePaths = {
  home: { es: "/", en: "/en" },
  about: { es: "/about", en: "/en/about" },
  privacy: { es: "/privacy", en: "/en/privacy" },
  terms: { es: "/terms", en: "/en/terms" },
};

const seoCopy = {
  es: {
    home: {
      title: "Diverum | Automatización para clínicas",
      description:
        "Diverum ofrece automatización operativa para clínicas con IA: agenda, admisiones administrativas, recordatorios, tareas internas, reportes y facturación sin acceso a PHI.",
      keywords:
        "Diverum, automatización para clínicas, automatización operativa clínica, IA para clínicas, automatización healthcare, sin PHI, No BAA",
      locale: "es_CO",
    },
    about: {
      title: "Nosotros | Diverum",
      description:
        "Conoce a Diverum, especialistas en automatización operativa para clínicas, integraciones con IA y flujos de salud sin acceso a PHI.",
      keywords: "Diverum, nosotros Diverum, automatización para clínicas, IA para salud",
      locale: "es_CO",
    },
    privacy: {
      title: "Política de Privacidad | Diverum",
      description:
        "Política de Privacidad de Diverum para visitantes, prospectos y clientes interesados en automatización para clínicas.",
      keywords: "Diverum privacidad, política de privacidad, datos personales, automatización para clínicas",
      locale: "es_CO",
    },
    terms: {
      title: "Términos de Servicio | Diverum",
      description:
        "Términos de Servicio de Diverum para soluciones de automatización clínica, integraciones y servicios relacionados.",
      keywords: "Diverum términos, términos de servicio, automatización clínica",
      locale: "es_CO",
    },
  },
  en: {
    home: {
      title: "Diverum | Automation for Clinics",
      description:
        "Diverum provides AI operations automation for clinics: scheduling, administrative intake, reminders, internal tasks, reporting, and billing handoffs without PHI access.",
      keywords:
        "Diverum, automation for clinics, clinic operations automation, healthcare automation, AI for clinics, no PHI, No BAA",
      locale: "en_US",
    },
    about: {
      title: "About | Diverum",
      description:
        "Learn about Diverum, a clinic automation partner focused on healthcare workflows, AI integrations, privacy, and compliance.",
      keywords: "Diverum, about Diverum, automation for clinics, healthcare AI",
      locale: "en_US",
    },
    privacy: {
      title: "Privacy Policy | Diverum",
      description:
        "Diverum Privacy Policy for visitors, prospects, and clients evaluating automation for clinics.",
      keywords: "Diverum privacy, privacy policy, clinic automation",
      locale: "en_US",
    },
    terms: {
      title: "Terms of Service | Diverum",
      description:
        "Diverum Terms of Service for clinic automation, integrations, and related services.",
      keywords: "Diverum terms, terms of service, clinic automation",
      locale: "en_US",
    },
  },
};

function absoluteUrl(path) {
  return `${SITE_URL}${path}`;
}

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export function usePageSeo(lang = "es", page = "home") {
  useEffect(() => {
    const resolvedLang = lang === "en" ? "en" : "es";
    const resolvedPage = routePaths[page] ? page : "home";
    const pageSeo = seoCopy[resolvedLang][resolvedPage];
    const paths = routePaths[resolvedPage];
    const canonical = absoluteUrl(paths[resolvedLang]);

    document.documentElement.lang = resolvedLang;
    document.title = pageSeo.title;

    upsertMeta("name", "description", pageSeo.description);
    upsertMeta("name", "keywords", pageSeo.keywords);
    upsertMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    upsertMeta("property", "og:site_name", "Diverum");
    upsertMeta("property", "og:title", pageSeo.title);
    upsertMeta("property", "og:description", pageSeo.description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("property", "og:image:alt", pageSeo.title);
    upsertMeta("property", "og:locale", pageSeo.locale);
    upsertMeta("property", "og:locale:alternate", resolvedLang === "en" ? "es_CO" : "en_US");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageSeo.title);
    upsertMeta("name", "twitter:description", pageSeo.description);
    upsertMeta("name", "twitter:image", OG_IMAGE);
    upsertMeta("name", "twitter:image:alt", pageSeo.title);

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonical });
    upsertLink('link[rel="alternate"][hreflang="es"]', {
      rel: "alternate",
      hreflang: "es",
      href: absoluteUrl(paths.es),
    });
    upsertLink('link[rel="alternate"][hreflang="en"]', {
      rel: "alternate",
      hreflang: "en",
      href: absoluteUrl(paths.en),
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: absoluteUrl(paths.es),
    });
  }, [lang, page]);
}
