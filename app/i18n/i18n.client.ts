import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import translations from "./translations/en.json";

export async function initI18next() {
  const i18nInstance = createInstance();

  await i18nInstance.use(initReactI18next).init({
    lng: "en",
    defaultNS: "translations",
    resources: { en: { translations } },
  });

  return i18nInstance;
}
