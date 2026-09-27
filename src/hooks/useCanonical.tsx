import { useEffect } from "react";

const BASE_URL = "https://osman-hadzic.com";

/**
 * Hook to set the canonical URL for the current page
 * @param pathOrUrl - Either a path relative to the base URL ("/blog") or a full URL ("https://example.com/foo")
 */
export function useCanonical(pathOrUrl: string) {
  useEffect(() => {
    // Prefer updating an existing canonical link to avoid duplicates and
    // race conditions between the inline `index.html` script and React.
    // If the caller passed a full URL, use it as-is. Otherwise normalize
    // the path (keep "/" for root, strip trailing slashes) and prepend base.
    const canonicalUrl = /^(https?:)?\/\//i.test(pathOrUrl)
      ? pathOrUrl
      : (() => {
          const normalizedPath = pathOrUrl === "/" ? "/" : pathOrUrl.replace(/\/+$/, "");
          return normalizedPath === "/" ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;
        })();

    // Try to find an existing canonical link. If found, update href.
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (link) {
      link.href = canonicalUrl;
    } else {
      // If not present, create and append a single canonical link with an id
      // so other code can reliably find and update it.
      link = document.createElement("link");
      link.setAttribute("id", "site-canonical-link");
      link.rel = "canonical";
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }

    // Cleanup: remove only the canonical link we created (if it still matches).
    return () => {
      const current = document.getElementById("site-canonical-link") as HTMLLinkElement | null;
      if (current && current.getAttribute("href") === canonicalUrl) {
        current.remove();
      }
    };
  }, [pathOrUrl]);
}
