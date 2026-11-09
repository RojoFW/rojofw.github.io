
import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://rojofw.github.io/",
    title: "A Cracker's Blog",
    description:
      "Investigaciones de ciberseguridad, análisis de vulnerabilidades, pentesting, seguridad ofensiva y desarrollo de herramientas.",
    author: "Roberto Lazaro Ramos Pereiro",
    profile: "https://github.com/rojofw",
    ogImage: "default-og.jpg",
    lang: "es",
    timezone: "America/Havana",
    dir: "ltr",
  },

  posts: {
    perPage: 4,
    perIndex: 4,
  },

  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: false,
    showBackButton: true,

    editPost: {
      enabled: false,
    },

    search: "pagefind",
    toc: true,
  },

  socials: [
    {
      name: "github",
      url: "https://github.com/rojofw",
    },
    {
      name: "gmail",
      url:  "mailto:robertoramospereiro0412@gmail.com"
    },
    {
      name: "telegram",
      url:  "https://t.me/+5352483300"
    },
    {
      name: "linkedin",
      url: "https://linkedin.com/in/roberto-ramos"
    }
  ],

  shareLinks: [
    {
      name: "whatsapp",
      url: "https://wa.me/?text=",
    },
    {
      name: "facebook",
      url: "https://www.facebook.com/sharer.php?u=",
    },
    {
      name: "x",
      url: "https://x.com/intent/post?url=",
    },
    {
      name: "telegram",
      url: "https://t.me/share/url?url=",
    },
    {
      name: "pinterest",
      url: "https://pinterest.com/pin/create/button/?url=",
    },
    {
      name: "mail",
      url: "mailto:?subject=See%20this%20post&body=",
    },
  ],
});
