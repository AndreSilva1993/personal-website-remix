import { cssBundleHref } from '@remix-run/css-bundle';
import { LinksFunction, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import variables from '~/styles/variables.css';
import globalStyles from '~/styles/global-styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export const links: LinksFunction = () => [
  { rel: 'icon', href: '/favicon.png' },
  { rel: 'stylesheet', href: globalStyles },
  { rel: 'stylesheet', href: variables },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap',
  },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = () => {
  return json({
    ENV: {
      STADIA_MAP_API_KEY: process.env.STADIA_MAP_API_KEY || '',
    },
  });
};

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
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
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(loaderData.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
