import { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import axios from 'axios';
import personsService from './services/persons';
import Notification from './Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    personsService.getAllNames().then((names) => {
      setPersons(names);
    });
  }, []);

  // add person
  const addName = (e) => {
    e.preventDefault();

    const isNameInPhonebook = persons.findIndex(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (isNameInPhonebook >= 0) {
      updatePerson();
      return;
    }

    const nameObj = {
      name: newName,
      number: newNumber
    };

    personsService
      .createName(nameObj)
      .then((savedName) => {
        setPersons(persons.concat(savedName));
        setInfoMessage('added');
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };

  // delete person
  const deletePerson = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);

    if (window.confirm('Do you really want to delete this person?')) {
      personsService
        .deleteName(id)
        .then((res) => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          setErrorMessage(`${deletedPerson.name} is already removed`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  // update person
  const updatePerson = () => {
    const findedPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const updatedPerson = { ...findedPerson, number: newNumber };

    if (
      window.confirm(
        `${newName} is already in phonebook! Do you want to update number?`
      )
    ) {
      personsService
        .updateNumber(findedPerson.id, updatedPerson)
        .then((updated) => {
          setPersons(
            persons.map((person) =>
              person.id !== findedPerson.id ? person : updated
            )
          );
          setInfoMessage('updated');
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => setErrorMessage(error.response.data.error));
    }
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

  const setInfoMessage = (action) => {
    setInfo(`${newName} is ${action} to the phonebook`);
    setTimeout(() => {
      setInfo(null);
    }, 4000);
  };

  const setErrorMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  const filteredNames = persons.filter((person) =>
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification info={info} error={error} />
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
        <Persons deletePerson={deletePerson} filteredNames={filteredNames} />
      </ul>
    </div>
  );
}

export default App;
