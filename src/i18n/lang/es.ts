import type { UIStrings } from "../types";

export default {
  nav: {
    home: "Inicio",
    posts: "Investigaciones",
    tags: "Etiquetas",
    contact: "Contacto",
    archives: "Archivo",
    search: "Buscar",
  },

  post: {
    publishedAt: "Publicado el",
    updatedAt: "Actualizado",
    sharePostIntro: "Compartir esta investigación:",
    sharePostOn: "Compartir en {{platform}}",
    sharePostViaEmail: "Compartir por correo electrónico",
    tagLabel: "Etiquetas",
    backToTop: "Volver arriba",
    tableOfContents: "Índice de contenidos",
    goBack: "Volver",
    editPage: "Editar página",
    previousPost: "Investigación anterior",
    nextPost: "Siguiente investigación",
  },

  pagination: {
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
  },
  home: {
    specialties: [
      "Investigador de ciberseguridad",
      "Pruebas de penetración",
      "Ingeniería inversa",
    ],

    titleStart: "Investigación. Explotación.",
    titleEnd: "Conocimiento.",

    description:
      "Análisis de vulnerabilidades, seguridad ofensiva y desarrollo de herramientas. Un espacio para documentar investigaciones, comprender tecnologías y compartir conocimiento técnico.",

    subtitle: "Investigación de ciberseguridad y seguridad ofensiva.",
    intro:
      "Bienvenido a mi espacio de investigación en ciberseguridad. Aquí comparto análisis técnicos de vulnerabilidades, investigaciones sobre tecnologías web, técnicas de pentesting y desarrollo de herramientas de seguridad.",
    purpose:
      "El objetivo es documentar investigaciones, comprender el funcionamiento de las tecnologías y compartir conocimientos con la comunidad de seguridad informática.",

    socialLinks: "Redes sociales",
    featured: "Investigaciones destacadas",
    recentPosts: "Investigaciones recientes",
    allPosts: "Todas las investigaciones",
  },
  footer: {
    copyright: "Derechos de autor",
    allRightsReserved: "Todos los derechos reservados.",
  },

  pages: {
    contact: {
      title: "Contacto",
      description:
        "Perfil profesional y formas de contactar con Roberto Lázaro Ramos Pereiro.",
      profileTitle: "Perfil",
      profile:
        "Soy especialista en ciberseguridad y estudiante de cuarto año de Ingeniería en Ciberseguridad en la UCI. Trabajo en pruebas de penetración web e infraestructura, análisis de malware e ingeniería inversa. También desarrollo herramientas y automatizaciones con Python y Bash.",
      experienceTitle: "Experiencia",
      experience:
        "Actualmente trabajo en la seguridad de KMCERO en Tecnomatica y administro infraestructura de red en Doña Alicia SRL. Antes realicé evaluaciones independientes de seguridad web y bug bounty. En este blog documento investigaciones, técnicas y herramientas que pueden ser útiles para otros profesionales.",
      highlightsTitle: "Formación y logros",
      highlights: [
        "Certificación eJPT y formación en Ingeniería en Ciberseguridad (UCI), en curso.",
        "Primer lugar en Cyberdrill Cuba 2025 y MetaRed regional 2025.",
        "Vicecapitán de Onicoders-UciTeam y premio al mérito científico de la UCI en segundo y tercer año.",
      ],
      ctfTeam: "Ver el equipo Onicoders-UciTeam en CTFtime y sus resultados",
      contactTitle: "Hablemos",
      location: "La Habana, Cuba",
      phone: "Teléfono",
      email: "Correo electrónico",
    },
    tagTitle: "Etiqueta",
    tagDesc: "Todas las investigaciones con la etiqueta",

    tagsTitle: "Etiquetas",
    tagsDesc: "Todas las etiquetas utilizadas en las investigaciones.",

    postsTitle: "Investigaciones",
    postsDesc: "Todas las investigaciones publicadas.",

    archivesTitle: "Archivo",
    archivesDesc: "Historial de investigaciones publicadas.",

    searchTitle: "Buscar",
    searchDesc: "Busca entre las investigaciones publicadas...",
  },

  a11y: {
    languageSwitcher: "Idioma",
    spanish: "Español",
    english: "Inglés",
    rssFeed: "Suscribirse al RSS",
    skipToContent: "Ir al contenido",
    skipTableOfContents: "Omitir índice de contenidos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    toggleTheme: "Cambiar tema",
    searchPlaceholder: "Buscar investigaciones...",
    noResults: "No se encontraron resultados",
    goToPreviousPage: "Ir a la página anterior",
    goToNextPage: "Ir a la página siguiente",
  },

  notFound: {
    title: "404 - Página no encontrada",
    message: "La página que buscas no existe.",
    goHome: "Volver al inicio",
  },
} satisfies UIStrings;
