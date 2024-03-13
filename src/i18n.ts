import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationTR from "../public/locales/tr/translation.json";
import translationEN from "../public/locales/en/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        resources: {
            en: {
                translation: translationEN,
            },
            tr: {
                translation: translationTR,
            },
        },
        debug: false,
        defaultNS: "translation",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        load: "all",
        react: {
            useSuspense: true,
        },
    });

export default i18n;
