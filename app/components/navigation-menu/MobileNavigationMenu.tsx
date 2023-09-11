import styles from './MobileNavigationMenu.module.css';

import { Link, useLocation } from '@remix-run/react';
import { useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { MenuIcon } from '~/icons/MenuIcon';

export function MobileNavigationMenu({
  navigationLinks,
}: {
  navigationLinks: Array<{
    href: string;
    title: string;
    icon: JSX.Element;
  }>;
}) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MenuIcon onClick={() => setMenuOpen(true)} className={styles.navigationMenuIcon} />

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              initial={{ x: '100%' }}
              className={styles.navigationMenu}
            >
              <ul className={styles.navigationMenuList}>
                {navigationLinks.map(({ href, title, icon }) => (
                  <li className={styles.navigationMenuListItem} key={href}>
                    <Link
                      to={href}
                      key={title}
                      onClick={() => setMenuOpen(false)}
                      className={classNames(styles.navigationMenuListItemLink, {
                        [styles.navigationMenuListItemLinkSelected]: pathname === href,
                      })}
                    >
                      {icon}
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.navigationMenuBackdrop}
              onClick={() => setMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
