import type { UIStrings } from "../types";

export default {
  sidebar: {
    label: "RojoFW profile",
    role: "Cybersecurity Analyst",
    summary: "Web penetration testing, infrastructure security, and reverse engineering.",
    education: "Cybersecurity Engineering / EJPT",
    socialLinks: "Social and contact links",
  },
  nav: {
    home: "Home",
    posts: "Posts",
    tags: "Tags",
    contact: "Contact",
    archives: "Archives",
    search: "Search",
    searchPlaceholder: "Type to search",
  },
  post: {
    publishedAt: "Published at",
    updatedAt: "Updated",
    sharePostIntro: "Share this post:",
    sharePostOn: "Share this post on {{platform}}",
    sharePostViaEmail: "Share this post via email",
    tagLabel: "Tags",
    backToTop: "Back to top",
    tableOfContents: "Table of contents",
    goBack: "Go back",
    editPage: "Edit page",
    previousPost: "Previous Post",
    nextPost: "Next Post",
  },
  pagination: {
    prev: "Prev",
    next: "Next",
    page: "Page",
  },
  home: {
    specialties: [
      "Cybersecurity Researcher",
      "Penetration Testing",
      "Reverse Engineering",
    ],

    titleStart: "Research. Exploitation.",
    titleEnd: "Knowledge.",

    description:
      "Vulnerability analysis, offensive security and security tooling. A space to document research, understand technologies and share technical knowledge.",

    subtitle: "Cybersecurity research and offensive security.",
    intro:
      "Welcome to my cybersecurity research space. Here I share technical vulnerability analyses, research into web technologies, pentesting techniques, and security tool development.",
    purpose:
      "My goal is to document research, understand how technologies work, and share knowledge with the information security community.",

    socialLinks: "Social Links",
    featured: "Featured research",
    recentPosts: "Recent research",
    allPosts: "All research",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "All rights reserved.",
  },
  pages: {
    contact: {
      title: "Contact",
      description:
        "Professional profile and contact details for Roberto Lázaro Ramos Pereiro.",
      profileTitle: "Profile",
      profile:
        "I am a cybersecurity specialist and a fourth-year Cybersecurity Engineering student at UCI. My work covers web and infrastructure penetration testing, malware analysis, and reverse engineering. I also build security tools and automate workflows with Python and Bash.",
      experienceTitle: "Experience",
      experience:
        "I currently work on the security of KMCERO at Tecnomatica and manage network infrastructure at Doña Alicia SRL. Previously, I carried out independent web security assessments and bug bounty work. On this blog I document research, techniques, and tools for other security professionals.",
      highlightsTitle: "Education and achievements",
      highlights: [
        "eJPT certification and ongoing Cybersecurity Engineering studies at UCI.",
        "First place at Cyberdrill Cuba 2025 and regional MetaRed 2025.",
        "Vice-captain of Onicoders-UciTeam and recipient of UCI scientific merit awards in my second and third years.",
      ],
      ctfTeam: "View Onicoders-UciTeam and its results on CTFtime",
      contactTitle: "Get in touch",
      location: "Havana, Cuba",
      phone: "Phone",
      email: "Email",
    },
    tagTitle: "Tag",
    tagDesc: "All the articles with the tag",

    tagsTitle: "Tags",
    tagsDesc: "All the tags used in posts.",

    postsTitle: "Posts",
    postsDesc: "All the articles I've posted.",

    archivesTitle: "Archives",
    archivesDesc: "All the articles I've archived.",

    searchTitle: "Search",
    searchDesc: "Search any article ...",
  },
  a11y: {
    languageSwitcher: "Language",
    spanish: "Spanish",
    english: "English",
    rssFeed: "Subscribe to RSS",
    skipToContent: "Skip to content",
    skipTableOfContents: "Skip table of contents",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    searchPlaceholder: "Search posts...",
    noResults: "No results found",
    goToPreviousPage: "Go to previous page",
    goToNextPage: "Go to next page",
  },
  notFound: {
    title: "404 Not Found",
    message: "Page Not Found",
    goHome: "Go back home",
  },
} satisfies UIStrings;
