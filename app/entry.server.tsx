import { RemixServer } from '@remix-run/react';
import { handleRequest, type EntryContext } from '@vercel/remix';
import { createInstance } from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import { i18n } from './i18n/i18n.server';
import { i18nextOptions } from './i18n/i18nextOptions';

export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const i18nInstance = createInstance();

  const language = await i18n.getLocale(request);
  const namespace = i18n.getRouteNamespaces(remixContext);

  await i18nInstance.use(initReactI18next).init({
    ...i18nextOptions,
    ns: namespace,
    lng: language,
  });

  const remixServer = (
    <I18nextProvider i18n={i18nInstance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );

  return handleRequest(request, responseStatusCode, responseHeaders, remixServer);
}
