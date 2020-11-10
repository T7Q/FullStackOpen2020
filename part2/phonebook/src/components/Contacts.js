import React from 'react';
import OneContact from './OneContact';

const Contacts = ({ persons, filter }) => {
    const filteredPersons =
        filter === ''
            ? persons
            : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            {filteredPersons.map((person, index) => (
                <OneContact key={index} person={person} />
            ))}
        </div>
    );
};

export default Contacts;
