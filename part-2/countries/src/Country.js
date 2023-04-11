import React, { useEffect, useState } from 'react';

const Country = ({ country, filteredCountries }) => {
  const [weather, setWeather] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const API_KEY = process.env.REACT_APP_API_KEY;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  useEffect(() => {
    if (filteredCountries.length === 1) {
      fetchCountries();
    }
  }, [country]);

  const handleClick = (countryName) => {
    fetchCountries();
    setShowDetails(true);
  };

  const fetchCountries = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => setWeather(res));
  };

  const countryDetails = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 15 }}>
        <p style={{ fontSize: '28px' }}>{country.name.common}</p>
        {filteredCountries.length > 1 && (
          <button
            style={{ marginLeft: 15 }}
            onClick={() => setShowDetails(false)}
          >
            close
          </button>
        )}
      </div>

      <p>
        <strong>capital:</strong> {country.capital}
      </p>
      <p>
        <strong>area:</strong>
        {country.area}
      </p>
      <p>
        <strong>population:</strong> {numberWithCommas(country.population)}
      </p>
      <h4>languages</h4>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => {
          return <li key={key}>{value}</li>;
        })}
      </ul>
      <img
        style={{ border: '1px solid gray' }}
        alt="flag"
        src={country.flags.png}
      />
      <p style={{ fontSize: '32px' }}>Weather in {country.name.common}</p>
      <strong>temperature: </strong>
      <span>{weather?.main?.temp} Celsius</span>
      {weather && (
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="img"
        />
      )}

      <p>wind: {weather?.wind?.speed} m/s</p>
    </div>
  );

  return (
    <li>
      {filteredCountries.length > 1 && !showDetails ? (
        <>
          {country.name.common}
          <button onClick={() => handleClick(country)}>show</button>
        </>
      ) : (
        countryDetails
      )}
    </li>
  );
};

export default Country;
