import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import bos from "./bos/translation.json";

const LANGUAGE_STORAGE_KEY = "ocode_language";

type SupportedLanguage = "en" | "bos";

const getStoredLanguage = (): SupportedLanguage | null => {
  try {
    const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return value === "en" || value === "bos" ? value : null;
  } catch {
    return null;
  }
};

const getBrowserLanguage = (): SupportedLanguage => {
  try {
    const language = navigator.language?.toLowerCase() ?? "";

    // Map Bosnian language tags (e.g. bs, bs-BA) to our internal key.
    if (language === "bs" || language.startsWith("bs-")) {
      return "bos";
    }
  } catch {
    // Ignore.
  }

  return "en";
};

export const resources = {
  en: {
    translation: en,
  },
  bos: {
    translation: bos,
  },
} as const;

export type ProjectType =
  (typeof resources)["en"]["translation"]["projects"]["projects"][0];

i18next.use(initReactI18next).init({
  lng: getStoredLanguage() ?? getBrowserLanguage(),
  fallbackLng: "en",
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
