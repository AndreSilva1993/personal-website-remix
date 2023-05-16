import styles from "./MainContainer.module.css";

import type { PropsWithChildren } from "react";

import { NavigationMenu } from "~/components/NavigationMenu/NavigationMenus";

export function MainContainer({ children }: PropsWithChildren) {
  return (
    <div className={styles.pageWrapper}>
      <NavigationMenu />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
