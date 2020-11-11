import React from 'react';

import services from '../services/services';

const OneContact = ({ persons, person, setPersons }) => {
    const handleDelete = (id) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            services
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== id));
                })
                .catch(() => {
                    alert('record does not exist');
                });
        };
    };
    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
    );
};

export default OneContact;
