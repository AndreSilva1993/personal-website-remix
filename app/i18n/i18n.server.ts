import { RemixI18Next } from 'remix-i18next/server';

import { i18nextOptions } from './i18nextOptions';

export const i18n = new RemixI18Next({
  detection: {
    fallbackLanguage: i18nextOptions.fallbackLng,
    supportedLanguages: i18nextOptions.supportedLngs,
  },
  i18next: i18nextOptions,
});
