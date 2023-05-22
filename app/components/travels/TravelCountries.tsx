import { useTranslation } from 'react-i18next';

interface TravelCountriesProps {
  countries: string[];
  selectedCountries: string[];
}

export function TravelCountries({ countries, selectedCountries }: TravelCountriesProps) {
  const { t } = useTranslation();

  return (
    <ul className="countriesList">
      {countries.map((country) => (
        <li className="country" key={country}>
          <img
            className="countryImage"
            alt={t(`travels.countries.${country}`) || ''}
            src={`/images/travels/flags/${country}.svg`}
          />
          {selectedCountries.includes(country) && <div className="countryBorder" />}
        </li>
      ))}
    </ul>
  );
}
