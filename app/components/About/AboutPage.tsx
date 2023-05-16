import styles from "./AboutPage.module.css";

import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { TechnologyProgressBar } from "./TechnologyProgressBar";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import { MainContainer } from "~/components/MainContainer/MainContainer";

export function AboutPage() {
  const { t } = useTranslation();

  const technologiesData = [
    { image: "react.svg", name: "ReactJS", value: 100 },
    { image: "typescript.svg", name: "TypeScript", value: 100 },
    { image: "javascript.svg", name: "JavaScript", value: 100 },
    { image: "css.svg", name: "CSS", value: 100 },
    { image: "html.svg", name: "HTML 5", value: 100 },
    { image: "next.svg", name: "Next.js", value: 100 },
    { image: "node.svg", name: "Node.js", value: 80 },
    { image: "jest.svg", name: "Jest", value: 80 },
    { image: "polymer.svg", name: "Polymer", value: 70 },
    { image: "rails.svg", name: "Rails", value: 60 },
    { image: "php.svg", name: "PHP", value: 50 },
    { image: "postgresql.svg", name: "PostgreSQL", value: 50 },
    { image: "mysql.svg", name: "MySQL", value: 50 },
    { image: "angular.svg", name: "Angular", value: 40 },
  ];

  return (
    <MainContainer>
      <PageContainer className={styles.pageContainer}>
        <h1 className={styles.title}>{t("about.title")}</h1>
        <div className={styles.imageWrapper}>
          <img src="/images/about/about.jpeg" />
        </div>

        <div className={styles.titleWrapper}>
          <h2 className={styles.subTitle}>{t("about.about-me")}</h2>
          <div className={styles.socialWrapper}>
            <a
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              href={process.env.NEXT_PUBLIC_GITHUB_URL}
            >
              <img
                width={25}
                height={25}
                src="/images/about/github.svg"
                alt="GitHub"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
            >
              <img
                width={25}
                height={25}
                src="/images/about/linkedin.svg"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
        <p className={styles.descriptionWrapper}>{t("about.description")}</p>

        <h2 className={styles.subTitle}>{t("about.technologies")}</h2>

        <div className={styles.technologiesGridWrapper}>
          {technologiesData.map(({ name, image, value }, index) => (
            <Fragment key={index}>
              <img
                alt={name}
                width={30}
                height={30}
                src={`/images/about/${image}`}
                loading="eager"
              />
              <div className={styles.technologyGridItem}>{name}</div>
              <div className={styles.technologyGridItem}>
                <TechnologyProgressBar
                  className={styles.progressBar}
                  value={value}
                  delay={0.5 + 0.1 * index}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </PageContainer>
    </MainContainer>
  );
}
