import React from 'react';
import Person from './Person';

const Persons = ({ filteredNames, deletePerson }) => {
  return filteredNames.length ? (
    <ul>
      {filteredNames.map((person) => (
        <Person deletePerson={deletePerson} key={person.id} person={person} />
      ))}
    </ul>
  ) : (
    <p>There is no person with that name in phonebook!</p>
  );
};

export default Persons;
