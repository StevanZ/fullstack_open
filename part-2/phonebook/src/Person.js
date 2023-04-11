const Person = ({ person, deletePerson }) => {
  return (
    <li>
      <p>
        {person.name} - {person.number}{' '}
        <button
          onClick={() => deletePerson(person.id)}
          style={{
            color: '#fff',
            background: '#ff435f',
            border: 'none',
            borderRadius: '3px',
            padding: '3px 5px'
          }}
        >
          delete
        </button>
      </p>
    </li>
  );
};

export default Person;
