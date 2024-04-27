import styles from '~/styles/_layout.css?url';

import type { LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { NavigationMenu } from '~/components/navigation-menu/NavigationMenu';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Layout() {
  return (
    <div className="pageWrapper">
      <NavigationMenu />
      <main className="mainContent">
        <Outlet />
      </main>
    </div>
  );
}
