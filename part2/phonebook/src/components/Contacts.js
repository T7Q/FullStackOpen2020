import React from 'react';
import OneContact from './OneContact';

const Contacts = ({ persons, filtered, setPersons, snackbar }) => {
    const filteredPersons =
        filtered === ''
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().includes(filtered.toLowerCase())
              );

    return (
        <div>
            {filteredPersons.map((person, index) => (
                <OneContact
                    key={index}
                    persons={persons}
                    person={person}
                    setPersons={setPersons}
                    snackbar={snackbar}
                />
            ))}
        </div>
    );
};

export default Contacts;
