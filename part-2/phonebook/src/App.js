import { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import axios from 'axios';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data));
  }, []);

  const addName = (e) => {
    e.preventDefault();

    const isNameInPhonebook = persons.findIndex(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (isNameInPhonebook >= 0) {
      alert(`${newName} is already in phonebook!`);
      return;
    }

    const nameObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    setPersons(persons.concat(nameObj));
    setNewName('');
    setNewNumber('');
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterTerm(e.target.value);
  };

  const filteredNames = persons.filter((person) =>
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filterTerm={filterTerm} />
      <h2>Add new concat: </h2>
      <PersonForm
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
        addName={addName}
      />
      <br />
      <h2>Numbers</h2>
      <ul>
        <Persons filteredNames={filteredNames} />
      </ul>
    </div>
  );
}

export default App;
