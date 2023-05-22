import type { LinksFunction, LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import { initI18next } from '~/i18n/i18n';
import { PortfolioPage } from '~/components/portfolio/PortfolioPage';

export const meta: V2_MetaFunction = ({ data }) => {
  return [{ title: data.seoTitle }, { name: 'description', content: data.seoDescription }];
};

export const loader: LoaderFunction = async () => {
  const i18nInstance = await initI18next();
  const t = i18nInstance.getFixedT('en');

  return json({
    seoTitle: t('portfolio.seo.title'),
    seoDescription: t('portfolio.seo.description'),
  });
};

export const links: LinksFunction = () => [
  { rel: 'preload', href: '/images/portfolio/docker/1.png', as: 'image' },
  { rel: 'preload', href: '/images/portfolio/tankey/1.webp', as: 'image' },
  { rel: 'preload', href: '/images/portfolio/burberry/1.webp', as: 'image' },
  { rel: 'preload', href: '/images/portfolio/toconline/1.webp', as: 'image' },
];

export default function Portfolio() {
  return <PortfolioPage />;
}
