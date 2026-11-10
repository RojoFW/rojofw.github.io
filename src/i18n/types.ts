export interface UIStrings {
  nav: {
    home: string;
    posts: string;
    tags: string;
    contact: string;
    archives: string;
    search: string;
  };
  post: {
    publishedAt: string;
    updatedAt: string;
    sharePostIntro: string;
    sharePostOn: string;
    sharePostViaEmail: string;
    tagLabel: string;
    backToTop: string;
    /** Optional until v8, so older locale files still type-check. */
    tableOfContents?: string;
    goBack: string;
    editPage: string;
    previousPost: string;
    nextPost: string;
  };
  pagination: {
    prev: string;
    next: string;
    page: string;
  };
  home: {
    subtitle: string;
    intro: string;
    purpose: string;
    socialLinks: string;
    featured: string;
    recentPosts: string;
    allPosts: string;
    specialties: string[];
    titleStart: string;
    titleEnd: string;
    description: string;
  };
  footer: {
    copyright: string;
    allRightsReserved: string;
  };
  pages: {
    contact: {
      title: string;
      description: string;
      profileTitle: string;
      profile: string;
      experienceTitle: string;
      experience: string;
      highlightsTitle: string;
      highlights: string[];
      contactTitle: string;
      location: string;
      phone: string;
      email: string;
    };
    tagTitle: string;
    tagDesc: string;

    tagsTitle: string;
    tagsDesc: string;

    postsTitle: string;
    postsDesc: string;

    archivesTitle: string;
    archivesDesc: string;

    searchTitle: string;
    searchDesc: string;
  };
  a11y: {
    languageSwitcher: string;
    spanish: string;
    english: string;
    rssFeed: string;
    skipToContent: string;
    /** Optional until v8, so older locale files still type-check. */
    skipTableOfContents?: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    searchPlaceholder: string;
    noResults: string;
    goToPreviousPage: string;
    goToNextPage: string;
  };
  notFound: {
    title: string;
    message: string;
    goHome: string;
  };
}
