import styles from '~/styles/portfolio.css?url';

import { useState } from 'react';
import { json, type LinksFunction, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { initI18next } from '~/i18n/i18n';
import { PageContainer } from '~/components/page-container/PageContainer';
import { PortfolioItem } from '~/components/portfolio/PortfolioItem';
import { PortfolioModal } from '~/components/portfolio/PortfolioModal';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'preload', href: '/images/portfolio/docker/1.png', as: 'image' },
  { rel: 'preload', href: '/images/portfolio/tankey/1.webp', as: 'image' },
  { rel: 'preload', href: '/images/portfolio/burberry/1.webp', as: 'image' },
  { rel: 'preload', href: '/images/portfolio/toconline/1.webp', as: 'image' },
];

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.seoTitle }, { name: 'description', content: data?.seoDescription }];
};

export const loader = async () => {
  const i18nInstance = await initI18next();
  const t = i18nInstance.getFixedT('en');

  return json({
    seoTitle: t('portfolio.seo.title'),
    seoDescription: t('portfolio.seo.description'),
    portfolioItems: [
      {
        name: 'Docker',
        description: 'portfolio.items.docker',
        logoImage: '/images/portfolio/docker/logo.svg',
        mainImage: '/images/portfolio/docker/1.png',
        images: [
          '/images/portfolio/docker/2.png',
          '/images/portfolio/docker/3.png',
          '/images/portfolio/docker/4.png',
          '/images/portfolio/docker/5.png',
        ],
      },
      {
        name: 'Burberry',
        description: 'portfolio.items.burberry',
        logoImage: '/images/portfolio/burberry/logo.svg',
        mainImage: '/images/portfolio/burberry/1.webp',
        images: [
          '/images/portfolio/burberry/1.webp',
          '/images/portfolio/burberry/2.webp',
          '/images/portfolio/burberry/3.webp',
          '/images/portfolio/burberry/4.webp',
          '/images/portfolio/burberry/5.webp',
        ],
      },
      {
        name: 'Tankey',
        description: 'portfolio.items.tankey',
        logoImage: '/images/portfolio/tankey/logo.webp',
        mainImage: '/images/portfolio/tankey/1.webp',
        images: ['/images/portfolio/tankey/1.webp', '/images/portfolio/tankey/2.webp'],
      },
      {
        name: 'TOConline',
        description: 'portfolio.items.toconline',
        logoImage: '/images/portfolio/toconline/logo.webp',
        mainImage: '/images/portfolio/toconline/1.webp',
        images: ['/images/portfolio/toconline/1.webp', '/images/portfolio/toconline/2.webp'],
      },
    ],
  });
};

export default function Portfolio() {
  const { t } = useTranslation();
  const { portfolioItems } = useLoaderData<typeof loader>();
  const [modalActiveItem, setModalActiveItem] = useState<(typeof portfolioItems)[number]>();

  return (
    <PageContainer className="pageContainer">
      <h1 className="title">{t('portfolio.title')}</h1>
      <div className="gridWrapper">
        {portfolioItems.map(({ name, mainImage, logoImage }, index) => (
          <PortfolioItem
            key={name}
            name={name}
            index={index}
            image={mainImage}
            logoImage={logoImage}
            onClick={(index) => setModalActiveItem(portfolioItems[index])}
          />
        ))}
      </div>

      <PortfolioModal
        open={!!modalActiveItem}
        item={modalActiveItem}
        onClose={() => setModalActiveItem(undefined)}
      />
    </PageContainer>
  );
}
