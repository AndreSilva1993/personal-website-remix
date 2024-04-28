import { RemixBrowser } from '@remix-run/react';
import i18next from 'i18next';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { i18nextOptions } from './i18n/i18nextOptions';

startTransition(() => {
  i18next
    .use(initReactI18next)
    .init(i18nextOptions)
    .then(() => {
      hydrateRoot(
        document,
        <I18nextProvider i18n={i18next}>
          <StrictMode>
            <RemixBrowser />
          </StrictMode>
        </I18nextProvider>
      );
    });
});
