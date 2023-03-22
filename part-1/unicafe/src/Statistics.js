import React from 'react';
import StatisticLine from './StatisticLine';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;

  const average = () => (good - bad) / total;

  const positive = () => (good / total) * 100 + ' %';

  return total > 0 ? (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average()} />
        <StatisticLine text="total" value={positive()} />
      </tbody>
    </table>
  ) : (
    <p>No feedback given yet!</p>
  );
};

export default Statistics;
