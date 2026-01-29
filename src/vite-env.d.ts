/// <reference types="vite/client" />

declare global {
  interface Window {
    __loadAnalytics?: () => void;
    __gtagLoaded?: boolean;
    __gtmLoaded?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
