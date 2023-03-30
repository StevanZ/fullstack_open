import React from 'react';
import Person from './Person';

const Persons = ({ filteredNames }) => {
  return filteredNames.length ? (
    <ul>
      {filteredNames.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  ) : (
    <p>There is no person with that name in phonebook!</p>
  );
};

export default Persons;
