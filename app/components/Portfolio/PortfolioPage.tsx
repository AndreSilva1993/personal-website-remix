import styles from "./PortfolioPage.module.css";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { PortfolioItem } from "~/components/Portfolio/PortfolioItem";
import { PortfolioModal } from "~/components/Portfolio/PortfolioModal";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import { MainContainer } from "../MainContainer/MainContainer";

export interface IPortfolioItem {
  name: string;
  images: string[];
  mainImage: any;
  logoImage: string;
  description: string;
}

const PORTFOLIO_ITEMS: IPortfolioItem[] = [
  {
    name: "Docker",
    description: "portfolio.items.docker",
    logoImage: "/images/portfolio/docker/logo.svg",
    mainImage: "/images/portfolio/docker/1.png",
    images: [
      "/images/portfolio/docker/2.png",
      "/images/portfolio/docker/3.png",
      "/images/portfolio/docker/4.png",
      "/images/portfolio/docker/5.png",
    ],
  },
  {
    name: "Burberry",
    description: "portfolio.items.burberry",
    logoImage: "/images/portfolio/burberry/logo.svg",
    mainImage: "/images/portfolio/burberry/1.webp",
    images: [
      "/images/portfolio/burberry/1.webp",
      "/images/portfolio/burberry/2.webp",
      "/images/portfolio/burberry/3.webp",
      "/images/portfolio/burberry/4.webp",
      "/images/portfolio/burberry/5.webp",
    ],
  },
  {
    name: "Tankey",
    description: "portfolio.items.tankey",
    logoImage: "/images/portfolio/tankey/logo.webp",
    mainImage: "/images/portfolio/tankey/1.webp",
    images: [
      "/images/portfolio/tankey/1.webp",
      "/images/portfolio/tankey/2.webp",
    ],
  },
  {
    name: "TOConline",
    description: "portfolio.items.toconline",
    logoImage: "/images/portfolio/toconline/logo.webp",
    mainImage: "/images/portfolio/toconline/1.webp",
    images: [
      "/images/portfolio/toconline/1.webp",
      "/images/portfolio/toconline/2.webp",
    ],
  },
];

export function PortfolioPage() {
  const { t } = useTranslation();

  const [modalActiveItem, setModalActiveItem] = useState<IPortfolioItem>();

  function handlePortfolioItemClick(index: number) {
    setModalActiveItem(PORTFOLIO_ITEMS[index]);
  }

  return (
    <MainContainer>
      <PageContainer className={styles.pageContainer}>
        <h1 className={styles.title}>{t("portfolio.title")}</h1>
        <div className={styles.gridWrapper}>
          {PORTFOLIO_ITEMS.map(({ name, mainImage, logoImage }, index) => (
            <PortfolioItem
              key={name}
              name={name}
              index={index}
              image={mainImage}
              logoImage={logoImage}
              onClick={handlePortfolioItemClick}
            />
          ))}
        </div>

        <PortfolioModal
          open={!!modalActiveItem}
          item={modalActiveItem}
          onClose={() => setModalActiveItem(undefined)}
        />
      </PageContainer>
    </MainContainer>
  );
}
