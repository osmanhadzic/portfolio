import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en/translation.json";
import bos from "./bos/translation.json";

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

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
