export const content = {
  en: {
    nav: {
      services: "Services",
      process: "Process",
      why: "Why Diverum",
      book: "Book a Call",
    },
    hero: {
      tag: "Healthcare Automation — HIPAA Compliant",
      headline: "Stop Losing Time on Tasks Your Clinic Shouldn't Be Doing Manually",
      sub: "We design and deploy intelligent automations for healthcare organizations in the U.S. and Colombia. Less manual work, fewer errors, full regulatory compliance.",
      cta: "Book a Free Discovery Call",
      ctaSec: "See How It Works"
    },
    services: {
      tag: "How We Help",
      headline: "Automation Services Built for Healthcare",
      sub: "From simple integrations to AI-powered systems — every solution is designed around your workflows, your compliance needs, and your growth.",
      items: [
        { icon: "Workflow", title: "Simple Integrations", desc: "Connect your existing tools with n8n or Zapier. One integration, immediate results. EHR to billing, scheduling to CRM — done in days." },
        { icon: "Layers", title: "Complex Connected Systems", desc: "Multi-step workflows with conditional logic across platforms. Patient intake, referral routing, insurance verification — all automated." },
        { icon: "Brain", title: "LLM + AI Integration", desc: "Large language models integrated into your workflows with basic training and fine-tuning. Intelligent triage, document summarization, patient communication." },
        { icon: "Eye", title: "Monitoring & Support", desc: "Visual dashboards to track every automation in real time. Proactive alerts, performance metrics, and dedicated support." },
        { icon: "MapPin", title: "Process Mapping Sessions", desc: "We sit with your team to map every workflow, find bottlenecks, and design the automation roadmap that delivers ROI fastest." },
        { icon: "ShieldCheck", title: "Compliance First", desc: "Every automation is built with HIPAA (U.S.) and Ley 1581 Habeas Data (Colombia) compliance baked in. No exceptions." },
      ],
    },
    process: {
      tag: "Our Process",
      headline: "From Chaos to Clarity in 3 Steps",
      sub: "We've simplified the path from manual overhead to fully automated operations.",
      steps: [
        { num: "01", title: "Discovery & Process Mapping", desc: "We analyze your current workflows, identify bottlenecks, and map out exactly where automation will save you the most time and money." },
        { num: "02", title: "Build & Deploy", desc: "Our team builds your custom automations, integrates them with your existing tools (EHR, CRM, billing), and deploys with zero disruption to your operations." },
        { num: "03", title: "Monitor & Scale", desc: "Real-time dashboards track performance. We continuously optimize, handle maintenance, and scale your automations as your practice grows." },
      ],
    },
    why: {
      tag: "Why Diverum",
      headline: "Built Different for Healthcare",
      sub: "We're not a generic automation agency. We understand the unique challenges, regulations, and workflows of healthcare organizations.",
      points: [
        { icon: "ShieldCheck", title: "HIPAA & Data Privacy First", desc: "Every workflow is designed with PHI protection, encryption standards, and audit trails built in from day one." },
        { icon: "Clock", title: "Save 15+ Hours per Week", desc: "Clinics using our automations redirect staff time from data entry and manual tasks to patient care." },
        { icon: "DollarSign", title: "Reduce Operational Costs", desc: "Fewer errors, faster billing cycles, and less manual labor translate directly to your bottom line." },
        { icon: "Activity", title: "Dual Market Expertise", desc: "We serve clinics in the U.S. (HIPAA) and Colombia (Ley 1581 / Habeas Data) with localized compliance knowledge." },
      ],
      compliance: {
        title: "Regulatory Compliance",
        items: [
          { flag: "🇺🇸", name: "HIPAA", desc: "Health Insurance Portability and Accountability Act — PHI protection, encryption, access controls, and audit trails." },
          { flag: "🇨🇴", name: "Ley 1581 / Habeas Data", desc: "Colombian personal data protection law — consent management, data minimization, and subject rights compliance." },
        ],
      },
    },
    cta: {
      tag: "Get Started",
      headline: "Ready to Automate Your Clinic?",
      sub: "Book a free 30-minute discovery call. We'll map your biggest time-wasters and show you exactly what we can automate — no commitment, no sales pitch.",
      formTitle: "Schedule Your Discovery Call",
      formSub: "Fill in your details and we'll reach out within 24 hours.",
      fields: {
        name: "Full Name",
        phone: "Phone Number", 
        email: "Work Email",
        company: "Clinic / Organization",
        country: "Country",
        countryOptions: ["United States", "Colombia", "Other"],
        message: "What's your biggest operational challenge?",
        submit: "Request Discovery Call",
        submitting: "Sending...",
        success: "Thank you! We'll contact you within 24 hours.",
      },
      benefits: [
        "30-minute free call",
        "Custom automation roadmap",
        "No commitment required",
        "HIPAA-compliant process",
      ],
    },
    footer: {
      copy: "© 2026 Diverum. All rights reserved.",
      hipaa: "HIPAA Compliant",
      about: "About",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      process: "Proceso",
      why: "Por Qué Diverum",
      book: "Agendar Llamada",
    },
    hero: {
      tag: "Automatización Healthcare — Cumplimiento HIPAA",
      headline: "Deja de Perder Tiempo en Tareas que Tu Clínica No Debería Hacer Manualmente",
      sub: "Diseñamos e implementamos automatizaciones inteligentes para organizaciones de salud en EE.UU. y Colombia. Menos trabajo manual, menos errores, cumplimiento regulatorio total.",
      cta: "Agenda una Llamada Gratis",
      ctaSec: "Ver Cómo Funciona",
      stats: [
        { value: "40%", label: "Tiempo promedio ahorrado" },
        { value: "99.9%", label: "Uptime en automatizaciones" },
        { value: "100%", label: "Cumplimiento HIPAA" },
      ],
    },
    services: {
      tag: "Cómo Ayudamos",
      headline: "Servicios de Automatización Diseñados para Healthcare",
      sub: "Desde integraciones simples hasta sistemas con IA — cada solución se diseña alrededor de tus flujos, tu cumplimiento normativo y tu crecimiento.",
      items: [
        { icon: "Workflow", title: "Integraciones Simples", desc: "Conecta tus herramientas con n8n o Zapier. Una integración, resultados inmediatos. EHR a facturación, agendamiento a CRM — listo en días." },
        { icon: "Layers", title: "Sistemas Conectados Complejos", desc: "Flujos multi-paso con lógica condicional entre plataformas. Admisión de pacientes, enrutamiento de referidos, verificación de seguros — todo automatizado." },
        { icon: "Brain", title: "LLM + Integración IA", desc: "Modelos de lenguaje integrados a tus flujos con entrenamiento básico y fine-tuning. Triage inteligente, resumen de documentos, comunicación con pacientes." },
        { icon: "Eye", title: "Monitoreo y Soporte", desc: "Dashboards visuales para rastrear cada automatización en tiempo real. Alertas proactivas, métricas de rendimiento y soporte dedicado." },
        { icon: "MapPin", title: "Sesiones de Mapeo de Procesos", desc: "Nos sentamos con tu equipo a mapear cada flujo, encontrar cuellos de botella y diseñar la hoja de ruta que genera ROI más rápido." },
        { icon: "ShieldCheck", title: "Cumplimiento Primero", desc: "Cada automatización se construye con cumplimiento HIPAA (EE.UU.) y Ley 1581 Habeas Data (Colombia) integrado. Sin excepciones." },
      ],
    },
    process: {
      tag: "Nuestro Proceso",
      headline: "Del Caos a la Claridad en 3 Pasos",
      sub: "Simplificamos el camino desde la carga manual hasta operaciones completamente automatizadas.",
      steps: [
        { num: "01", title: "Descubrimiento y Mapeo", desc: "Analizamos tus flujos actuales, identificamos cuellos de botella y mapeamos exactamente dónde la automatización te ahorrará más tiempo y dinero." },
        { num: "02", title: "Construcción y Despliegue", desc: "Nuestro equipo construye tus automatizaciones, las integra con tus herramientas (EHR, CRM, facturación) y despliega sin interrumpir tus operaciones." },
        { num: "03", title: "Monitoreo y Escalamiento", desc: "Dashboards en tiempo real rastrean el rendimiento. Optimizamos continuamente, manejamos mantenimiento y escalamos tus automatizaciones conforme creces." },
      ],
    },
    why: {
      tag: "Por Qué Diverum",
      headline: "Construido Diferente para Healthcare",
      sub: "No somos una agencia de automatización genérica. Entendemos los desafíos, regulaciones y flujos únicos de las organizaciones de salud.",
      points: [
        { icon: "ShieldCheck", title: "HIPAA y Privacidad Primero", desc: "Cada flujo se diseña con protección de PHI, estándares de encripción y trazabilidad desde el día uno." },
        { icon: "Clock", title: "Ahorra 15+ Horas por Semana", desc: "Clínicas usando nuestras automatizaciones redirigen tiempo de staff de tareas manuales al cuidado del paciente." },
        { icon: "DollarSign", title: "Reduce Costos Operativos", desc: "Menos errores, ciclos de facturación más rápidos y menos labor manual se traducen directo a tu resultado final." },
        { icon: "Activity", title: "Experiencia en Dos Mercados", desc: "Servimos clínicas en EE.UU. (HIPAA) y Colombia (Ley 1581 / Habeas Data) con conocimiento regulatorio localizado." },
      ],
      compliance: {
        title: "Cumplimiento Regulatorio",
        items: [
          { flag: "🇺🇸", name: "HIPAA", desc: "Health Insurance Portability and Accountability Act — protección de PHI, encripción, control de accesos y trazabilidad." },
          { flag: "🇨🇴", name: "Ley 1581 / Habeas Data", desc: "Ley colombiana de protección de datos personales — gestión de consentimiento, minimización de datos y derechos del titular." },
        ],
      },
    },
    cta: {
      tag: "Comienza Ahora",
      headline: "¿Listo para Automatizar Tu Clínica?",
      sub: "Agenda una llamada de descubrimiento gratuita de 30 minutos. Mapearemos tus mayores pérdidas de tiempo y te mostraremos exactamente qué podemos automatizar — sin compromiso.",
      formTitle: "Agenda Tu Llamada de Descubrimiento",
      formSub: "Completa tus datos y te contactaremos en 24 horas.",
      fields: {
        name: "Nombre Completo",
        phone: "Número de Teléfono",  
        email: "Correo Corporativo",
        company: "Clínica / Organización",
        country: "País",
        countryOptions: ["Estados Unidos", "Colombia", "Otro"],
        message: "Mayor desafío operativo",
        submit: "Solicitar Llamada",
        submitting: "Enviando...",
        success: "¡Gracias! Te contactaremos en 24 horas.",
      },
      benefits: [
        "Llamada gratis de 30 minutos",
        "Hoja de ruta personalizada",
        "Sin compromiso",
        "Proceso con cumplimiento HIPAA",
      ],
    },
    footer: {
      copy: "© 2026 Diverum. Todos los derechos reservados.",
      hipaa: "Cumplimiento HIPAA",
      about: "Nosotros",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
    },
  },
};

export const paletteLight = {
  bg: "#FAFBFC",
  bgAlt: "#F1F4F8",
  surface: "#FFFFFF",
  primary: "#0F2B3C",
  primaryLight: "#1A4A63",
  accent: "#0D7C66",
  accentLight: "#E8F5F1",
  text: "#0F2B3C",
  textMuted: "#546A7B",
  border: "#E2E8F0",
  navBg: "rgba(250, 251, 252, 0.92)",
};

export const paletteDark = {
  bg: "#0B1215",
  bgAlt: "#111B21",
  surface: "#1A252D",
  primary: "#E8ECF0",
  primaryLight: "#A8B8C8",
  accent: "#10B892",
  accentLight: "rgba(16, 184, 146, 0.12)",
  text: "#E8ECF0",
  textMuted: "#8A9BAA",
  border: "rgba(255, 255, 255, 0.08)",
  navBg: "rgba(11, 18, 21, 0.92)",
};

// Regulaciones por país
export const countryRegulations = {
  US: {
    code: "US",
    flag: "🇺🇸",
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    desc: {
      en: "PHI protection, encryption, access controls, and audit trails for all healthcare data.",
      es: "Protección de PHI, encripción, control de accesos y trazabilidad para datos de salud.",
    },
  },
  CO: {
    code: "CO",
    flag: "🇨🇴",
    name: "Ley 1581 / Habeas Data",
    fullName: "Ley de Protección de Datos Personales",
    desc: {
      en: "Colombian personal data protection — consent management, data minimization, and subject rights.",
      es: "Gestión de consentimiento, minimización de datos y derechos del titular de datos personales.",
    },
  },
  MX: {
    code: "MX",
    flag: "🇲🇽",
    name: "LFPDPPP",
    fullName: "Ley Federal de Protección de Datos Personales en Posesión de los Particulares",
    desc: {
      en: "Mexican data protection law — privacy notices, consent, and ARCO rights for patients.",
      es: "Avisos de privacidad, consentimiento y derechos ARCO para datos de pacientes.",
    },
  },
  ES: {
    code: "ES",
    flag: "🇪🇸",
    name: "RGPD / LOPDGDD",
    fullName: "Reglamento General de Protección de Datos + Ley Orgánica 3/2018",
    desc: {
      en: "EU GDPR plus Spain's organic law — lawful basis, DPO requirements, and data subject rights.",
      es: "RGPD europeo más ley orgánica española — base legal, DPO y derechos del interesado.",
    },
  },
  CL: {
    code: "CL",
    flag: "🇨🇱",
    name: "Ley 19.628",
    fullName: "Ley sobre Protección de la Vida Privada",
    desc: {
      en: "Chilean privacy law — personal data treatment rules, consent, and rectification rights.",
      es: "Reglas de tratamiento de datos personales, consentimiento y derecho de rectificación.",
    },
  },
  PE: {
    code: "PE",
    flag: "🇵🇪",
    name: "Ley 29733",
    fullName: "Ley de Protección de Datos Personales",
    desc: {
      en: "Peruvian data protection — data bank registration, consent, and transborder transfer rules.",
      es: "Registro de bancos de datos, consentimiento y reglas de transferencia transfronteriza.",
    },
  },
  AR: {
    code: "AR",
    flag: "🇦🇷",
    name: "Ley 25.326",
    fullName: "Ley de Protección de Datos Personales",
    desc: {
      en: "Argentine data protection — data quality, consent, database registration, and habeas data.",
      es: "Calidad de datos, consentimiento, registro de bases de datos y habeas data.",
    },
  },
  EC: {
    code: "EC",
    flag: "🇪🇨",
    name: "LOPDP",
    fullName: "Ley Orgánica de Protección de Datos Personales",
    desc: {
      en: "Ecuador's organic data protection law — consent, data minimization, and breach notification.",
      es: "Consentimiento, minimización de datos y notificación de brechas de seguridad.",
    },
  },
};

// Mapeo país → idioma por defecto
export const countryToLang = {
  US: "en",
  CO: "es",
  MX: "es",
  ES: "es",
  CL: "es",
  PE: "es",
  AR: "es",
  EC: "es",
};
