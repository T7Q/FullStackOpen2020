import React from 'react';

import services from '../services/services';

const OneContact = ({ persons, person, setPersons, snackbar }) => {
    const handleDelete = (id) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            services
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== id));
                    snackbar(`${person.name} has been successfully removed from server`, 'success');
                })
                .catch(() => {
                    snackbar(`${person.name} has been already removed from server`, 'error');
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
