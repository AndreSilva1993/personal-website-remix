import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';

import { initI18next } from './i18n/i18n';

startTransition(() => {
  initI18next().then(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
});
