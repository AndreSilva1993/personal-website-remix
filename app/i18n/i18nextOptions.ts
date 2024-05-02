import type { InitOptions } from 'i18next';

import translations from './translations/en.json';

export const i18nextOptions = {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en'],
  defaultNS: 'translations',
  resources: { en: { translations } },
} satisfies InitOptions;
