import React from 'react';
import OneContact from './OneContact';

const Contacts = ({ persons, filtered }) => {
    const filteredPersons =
        filtered === ''
            ? persons
            : persons.filter((person) => person.name.toLowerCase().includes(filtered.toLowerCase()));

    return (
        <div>
            {filteredPersons.map((person, index) => (
                <OneContact key={index} person={person} />
            ))}
        </div>
    );
};

export default Contacts;
