import globalStyles from '~/styles/global-styles.css?url';
import globalStylesVariables from '~/styles/global-styles-variables.css?url';

import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';
import { json, type LinksFunction, type LoaderFunctionArgs } from '@vercel/remix';
import { useTranslation } from 'react-i18next';

import { i18n } from './i18n/i18n.server';

export const links: LinksFunction = () => {
  return [
    { rel: 'icon', href: '/favicon.png' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    { rel: 'stylesheet', href: globalStyles },
    { rel: 'stylesheet', href: globalStylesVariables },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = await i18n.getLocale(request);

  return json({
    locale,
    ENV: {
      STADIA_MAP_API_KEY: import.meta.env.VITE_STADIA_MAP_API_KEY,
    },
  });
};

export default function App() {
  const { ENV, locale } = useLoaderData<typeof loader>();

  const { i18n } = useTranslation();

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
