import { useState } from 'react';

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const generateNUmber = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const num = Math.max(...points);
  const index = points.findIndex((index) => index === num);

  const handleVote = () => {
    const copyArr = [...points];
    copyArr[selected] += 1;
    setPoints(copyArr);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p
        style={{
          height: '40px',
          margin: '0',
          padding: '0',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {anecdotes[selected]}
      </p>
      <p style={{ marginBottom: '10px', padding: '0' }}>
        has {points[selected]} {points[selected] === 1 ? 'vote' : 'votes'}
      </p>
      <button style={{ marginRight: '10px' }} onClick={handleVote}>
        vote
      </button>
      <button onClick={generateNUmber}>next anecdote</button>
      {num > 0 && (
        <>
          <Header text="Anecdote with most votes" />
          <p className="wining anecdote">{anecdotes[index]}</p>
          <p style={{ marginBottom: '10px', padding: '0' }}>
            has {points[index]} {points[index] === 1 ? 'vote' : 'votes'}
          </p>
        </>
      )}
    </div>
  );
}

export default App;
