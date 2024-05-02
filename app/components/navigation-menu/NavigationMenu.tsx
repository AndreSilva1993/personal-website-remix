import styles from './NavigationMenu.module.css';

import { useTranslation } from 'react-i18next';

import { DesktopNavigationMenu } from './DesktopNavigationMenu';
import { MobileNavigationMenu } from './MobileNavigationMenu';

import { LocationOnIcon } from '~/icons/LocationOnIcon';
import { MusicNoteIcon } from '~/icons/MusicNoteIcon';
import { PersonIcon } from '~/icons/PersonIcon';
import { PhotoAlbumIcon } from '~/icons/PhotoAlbumIcon';

export function NavigationMenu() {
  const { t } = useTranslation();

  const navigationLinks = [
    { href: '/', title: t('navigation.about'), icon: <PersonIcon /> },
    { href: '/portfolio', title: t('navigation.portfolio'), icon: <PhotoAlbumIcon /> },
    { href: '/travels', title: t('navigation.travels'), icon: <LocationOnIcon /> },
    { href: '/music', title: t('navigation.music'), icon: <MusicNoteIcon /> },
  ];

  return (
    <nav className={styles.navigationMenu}>
      <MobileNavigationMenu navigationLinks={navigationLinks} />
      <DesktopNavigationMenu navigationLinks={navigationLinks} />
    </nav>
  );
}
