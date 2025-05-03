import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // load translations using HTTP (e.g., from /public or /src)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass i18n to react-i18next
  .init({
    supportedLngs: ['en', 'fr','hi'],
    fallbackLng: 'en',
    debug: false,

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
