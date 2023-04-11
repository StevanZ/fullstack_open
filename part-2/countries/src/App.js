import { useState, useEffect } from 'react';
import Countries from './Countries';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((res) => setCountries(res));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(inputValue.toLowerCase())
  );

  console.log('filtered', filteredCountries);

  return (
    <div className="App">
      <label>
        find countries:
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      {inputValue && <Countries filteredCountries={filteredCountries} />}
    </div>
  );
}

export default App;
