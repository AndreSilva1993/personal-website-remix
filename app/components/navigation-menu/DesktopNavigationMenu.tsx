import styles from './DesktopNavigationMenu.module.css';

import { Link, useLocation } from '@remix-run/react';
import classNames from 'classnames';

export function DesktopNavigationMenu({
  navigationLinks,
}: {
  navigationLinks: Array<{
    href: string;
    title: string;
    icon: JSX.Element;
  }>;
}) {
  const { pathname } = useLocation();

  return (
    <ul className={styles.menuList}>
      {navigationLinks.map(({ href, title }) => (
        <li className={styles.menuItem} key={title}>
          <Link
            to={href}
            className={classNames(styles.menuItemLink, {
              [styles.menuItemLinkActive]: pathname === href,
            })}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
