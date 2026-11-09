import type { UIStrings } from "./types";

export { tplStr } from "./format";

const modules = import.meta.glob<{ default: UIStrings }>("./lang/*.ts", {
  eager: true,
});

const translations: Record<string, UIStrings> = {};
for (const [path, mod] of Object.entries(modules)) {
  const locale = path.slice("./lang/".length, -".ts".length);
  translations[locale] = mod.default;
}

type ResolvedStrings = { [K in keyof UIStrings]: Required<UIStrings[K]> };

/**
 * Returns UI strings for the given locale, falling back to Spanish. Labels that
 * are optional until v8 fall back one by one.
 */
export function useTranslations(locale: string = "es"): ResolvedStrings {
  const t = translations[locale] ?? translations["es"];
  return {
    ...t,
    post: {
      tableOfContents: translations["es"].post.tableOfContents!,
      ...t.post,
    },
    a11y: {
      skipTableOfContents: translations["es"].a11y.skipTableOfContents!,
      ...t.a11y,
    },
  };
}
