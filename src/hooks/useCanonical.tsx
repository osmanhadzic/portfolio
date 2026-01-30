import { useEffect } from "react";

const BASE_URL = "https://osman-hadzic.com";

/**
 * Hook to set the canonical URL for the current page
 * @param path - The path relative to the base URL (e.g., "/blog" or "/blog/hello-world")
 */
export function useCanonical(path: string) {
  useEffect(() => {
    // Remove any existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Create and add new canonical link
    const canonicalUrl = `${BASE_URL}${path}`;
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = canonicalUrl;
    document.head.appendChild(link);

    // Cleanup function to remove the canonical link when component unmounts
    return () => {
      const currentCanonical = document.querySelector('link[rel="canonical"]');
      if (currentCanonical && currentCanonical.getAttribute("href") === canonicalUrl) {
        currentCanonical.remove();
      }
    };
  }, [path]);
}
