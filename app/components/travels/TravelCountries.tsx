import styles from "./TravelCountries.module.css";

import { useTranslation } from "react-i18next";

interface TravelCountriesProps {
  countries: string[];
  selectedCountries: string[];
}

export function TravelCountries({ countries, selectedCountries }: TravelCountriesProps) {
  const { t } = useTranslation();

  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <li className={styles.country} key={country}>
          <img
            className={styles.countryImage}
            alt={t(`travels.countries.${country}`) || ""}
            src={`/images/travels/flags/${country}.svg`}
          />
          {selectedCountries.includes(country) && <div className={styles.countryBorder} />}
        </li>
      ))}
    </ul>
  );
}
