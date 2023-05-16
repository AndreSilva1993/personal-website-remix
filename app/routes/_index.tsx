import type {
  LinksFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";

import { AboutPage } from "~/components/About/AboutPage";
import { initI18next } from "~/i18n/i18n.server";

export const loader: LoaderFunction = async ({ request }) => {
  const i18nInstance = await initI18next();
  const t = i18nInstance.getFixedT("en");

  return json({
    seoTitle: t("about.title"),
    seoDescription: t("about.description"),
  });
};

export const meta: V2_MetaFunction = ({ data }) => {
  return [
    { title: data.seoTitle },
    { name: "description", content: data.seoDescription },
  ];
};

export const links: LinksFunction = () => [
  { rel: "preload", href: "/images/about/about.jpeg", as: "image" },
];

export default function Index() {
  return <AboutPage />;
}
