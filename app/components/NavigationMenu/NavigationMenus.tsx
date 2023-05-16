import styles from "./NavigationMenu.module.css";

import { PersonIcon } from "~/icons/PersonIcon";
import { MusicNoteIcon } from "~/icons/MusicNoteIcon";
import { PhotoAlbumIcon } from "~/icons/PhotoAlbumIcon";
import { LocationOnIcon } from "~/icons/LocationOnIcon";
import { MobileNavigationMenu } from "~/components/NavigationMenu/MobileNavigationMenu";
import { DesktopNavigationMenu } from "~/components/NavigationMenu/DesktopNavigationMenu";

import { useTranslation } from "react-i18next";

export function NavigationMenu() {
  const { t } = useTranslation();

  const navigationLinks = [
    { href: "/", title: t("navigation.about"), icon: <PersonIcon /> },
    {
      href: "/portfolio",
      title: t("navigation.portfolio"),
      icon: <PhotoAlbumIcon />,
    },
    {
      href: "/travels",
      title: t("navigation.travels"),
      icon: <LocationOnIcon />,
    },
    { href: "/music", title: t("navigation.music"), icon: <MusicNoteIcon /> },
  ];

  return (
    <nav className={styles.navigationMenu}>
      <MobileNavigationMenu navigationLinks={navigationLinks} />
      <DesktopNavigationMenu navigationLinks={navigationLinks} />
    </nav>
  );
}
