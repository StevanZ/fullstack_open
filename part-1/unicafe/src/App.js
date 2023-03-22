import { useState } from 'react';
import Button from './Button';
import Header from './Header';
import Statistics from './Statistics';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <>
      <Header text="Give feedback: " />
      <>
        <Button text="good" handleClick={handleGood} />
        <Button text="neutral" handleClick={handleNeutral} />
        <Button text="bad" handleClick={handleBad} />
      </>
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
