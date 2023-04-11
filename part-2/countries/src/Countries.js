import React, { useState } from 'react';
import Country from './Country';

const Countries = ({ filteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const MIN_COUNTRIES_LENGTH = 1;

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  // handle select country
  const selectCountry = (country) => {
    const countryName = country.name.common;
    if (countryName === selectedCountry) {
      setSelectedCountry('');
      return;
    }
    setSelectedCountry(countryName);
  };

  return (
    <ul>
      {filteredCountries.map((country) => {
        const countryName = country.name.common;
        return (
          <li key={country.name.common}>
            {selectedCountry !== countryName &&
            filteredCountries.length > MIN_COUNTRIES_LENGTH ? (
              countryName
            ) : (
              <Country country={country} />
            )}{' '}
            {/* button */}
            {filteredCountries.length > MIN_COUNTRIES_LENGTH && (
              <button onClick={() => selectCountry(country)}>show</button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Countries;
