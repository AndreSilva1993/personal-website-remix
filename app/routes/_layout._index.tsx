import styles from '~/styles/about.css?url';

import {
  json,
  type LinksFunction,
  type MetaFunction,
  type LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { PageContainer } from '~/components/page-container/PageContainer';
import { i18n } from '~/i18n/i18n.server';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'preload', href: '/images/about/about.avif', as: 'image' },
  ];
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.seoTitle }, { name: 'description', content: data?.seoDescription }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await i18n.getFixedT(request);

  const socialLinks = {
    github: 'https://github.com/AndreSilva1993',
    linkedIn: 'https://linkedin.com/in/andre-emanuel',
    '500px': 'https://500px.com/p/andreemanuel1993',
  };

  const technologies = [
    { image: 'react.svg', name: 'ReactJS', value: 100 },
    { image: 'typescript.svg', name: 'TypeScript', value: 100 },
    { image: 'javascript.svg', name: 'JavaScript', value: 100 },
    { image: 'css.svg', name: 'CSS', value: 100 },
    { image: 'html.svg', name: 'HTML 5', value: 100 },
    { image: 'next.svg', name: 'Next.js', value: 100 },
    { image: 'node.svg', name: 'Node.js', value: 80 },
    { image: 'jest.svg', name: 'Jest', value: 80 },
    { image: 'polymer.svg', name: 'Polymer', value: 70 },
    { image: 'rails.svg', name: 'Rails', value: 60 },
    { image: 'php.svg', name: 'PHP', value: 50 },
    { image: 'postgresql.svg', name: 'PostgreSQL', value: 50 },
    { image: 'mysql.svg', name: 'MySQL', value: 50 },
    { image: 'angular.svg', name: 'Angular', value: 40 },
  ];

  return json({
    socialLinks,
    technologies,
    seoTitle: t('about.seo.title'),
    seoDescription: t('about.seo.description'),
  });
};

export default function AboutPage() {
  const { t } = useTranslation();
  const { socialLinks, technologies } = useLoaderData<typeof loader>();

  return (
    <PageContainer className="pageContainer">
      <h1 className="title">{t('about.title')}</h1>
      <img src="/images/about/about.avif" alt={t('about.title') || ''} className="imageWrapper" />

      <div className="titleWrapper">
        <h2 className="subTitle">{t('about.about-me')}</h2>
        <div className="socialWrapper">
          <a target="_blank" rel="noreferrer" href={socialLinks.github} className="socialLink">
            <img width={25} height={25} src="/images/about/github.svg" alt="GitHub" />
          </a>
          <a target="_blank" rel="noreferrer" href={socialLinks.linkedIn} className="socialLink">
            <img width={25} height={25} src="/images/about/linkedin.svg" alt="LinkedIn" />
          </a>
          <a target="_blank" rel="noreferrer" href={socialLinks['500px']} className="socialLink">
            <img width={50} height={25} src="/images/about/500px.svg" alt="500px" />
          </a>
        </div>
      </div>
      <p className="descriptionWrapper">{t('about.description')}</p>

      <h2 className="subTitle">{t('about.technologies')}</h2>

      <div className="technologiesGridWrapper">
        {technologies.map(({ name, image, value }, index) => (
          <Fragment key={index}>
            <img alt={name} width={30} height={30} src={`/images/about/${image}`} />
            <div className="technologyGridItem">{name}</div>
            <div className="technologyGridItem">
              <div className="progressBarWrapper">
                <motion.div
                  className="progressBar"
                  style={{ transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: value / 100 }}
                  transition={{
                    duration: 1,
                    ease: 'easeOut',
                    delay: 0.5 + 0.1 * index,
                  }}
                />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </PageContainer>
  );
}
