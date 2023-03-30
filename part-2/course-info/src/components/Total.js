const Total = ({ parts }) => {
  const exercisesPointsSum = parts.reduce((acc, cur) => {
    return (acc += cur.exercises);
  }, 0);

  return <strong>Total of {exercisesPointsSum} exercises</strong>;
};

export default Total;
