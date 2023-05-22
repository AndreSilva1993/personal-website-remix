import { json } from '@remix-run/node';
import type { V2_MetaFunction } from '@remix-run/node';

import { initI18next } from '~/i18n/i18n';
import { TravelsPage } from '~/components/travels/TravelsPage';

export const loader = async () => {
  const i18nInstance = await initI18next();
  const t = i18nInstance.getFixedT('en');

  return json({
    seoTitle: t('travels.seo.title'),
    seoDescription: t('travels.seo.description'),
  });
};

export const meta: V2_MetaFunction = ({ data }) => {
  return [{ title: data.seoTitle }, { name: 'description', content: data.seoDescription }];
};

export default function Travels() {
  return <TravelsPage />;
}
