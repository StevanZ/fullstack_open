import React, { useEffect, useState } from 'react';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = '986331237ea749aa557b5681fc6bce24';

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  useEffect(() => {
    if (country) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`
      )
        .then((res) => res.json())
        .then((res) => setWeather(res));
    }
  }, [country]);

  console.log('weather', weather);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
    >
      <p style={{ fontSize: '28px' }}>{country.name.common}</p>
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
      <p style={{ fontSize: '32px' }}>Weather in Helsinki</p>
      <strong>temperature: </strong>
      <span>{weather?.main.temp} Celsius</span>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="img"
      />
      {/* <p>
        wind: <strong>{weather?.wind.speed}</strong>
      </p> */}
    </div>
  );
};

export default Country;
