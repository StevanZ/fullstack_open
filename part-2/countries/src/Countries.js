import React from 'react';
import Country from './Country';

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <ul>
      {filteredCountries.map((country) => {
        return (
          <Country country={country} filteredCountries={filteredCountries} />
        );
      })}
    </ul>
  );
};

export default Countries;
