import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    __loadAnalytics?: () => void;
    __gtagLoaded?: boolean;
  }
}

export default function useGtagPageView() {
  const location = useLocation();

  useEffect(() => {
    async function ensureAnalytics() {
      if (typeof window.gtag !== "function") {
        if (typeof window.__loadAnalytics === "function") {
          window.__loadAnalytics();
          // wait a short time for script to load
          await new Promise((r) => setTimeout(r, 600));
        }
      }
    }

    void (async () => {
      await ensureAnalytics();
      try {
        if (typeof window.gtag === "function") {
          window.gtag("event", "page_view", {
            page_path: location.pathname + location.search,
            page_location: typeof window !== "undefined" ? window.location.href : undefined,
            page_title: document.title,
          });
        }
      } catch (e) {
        // ignore analytics errors
      }
    })();
  }, [location.pathname, location.search, location.hash]);
}
