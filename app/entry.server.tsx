import type { EntryContext } from '@remix-run/cloudflare';
import { RemixServer } from '@remix-run/react';
import { createInstance } from 'i18next';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { i18n } from './i18n/i18n.server';
import { i18nextOptions } from './i18n/i18nextOptions';

export default async function handleRequest(
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

  const body = await renderToReadableStream(
    <I18nextProvider i18n={i18nInstance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get('user-agent') || '')) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
