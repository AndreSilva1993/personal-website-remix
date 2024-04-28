import globalStyles from '~/styles/global-styles.css?url';
import globalStylesVariables from '~/styles/global-styles-variables.css?url';

import { json, type LinksFunction } from '@vercel/remix';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';

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

export const loader = () => {
  return json({
    ENV: {
      STADIA_MAP_API_KEY: import.meta.env.VITE_STADIA_MAP_API_KEY,
    },
  });
};

export default function App() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(loaderData.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
