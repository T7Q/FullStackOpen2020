import React, { useState } from 'react';

import services from '../services/services';

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const addContact = (event) => {
        event.preventDefault();
        const newPerson = { name: newName, number: newNumber };
        if (newPerson.name === '' || newPerson.number === '') {
            alert('Please enter name and number');
        } else if (persons.filter((person) => person.name === newPerson.name).length > 0) {
            if (
                window.confirm(
                    `${newPerson.name} already added to phonebook, replace the old number with a new one?`
                )
            ) {
                const sameContact = persons.filter((person) => person.name === newName)[0];
                services
                    .updateContact({ ...sameContact, number: newPerson.number })
                    .then((response) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === sameContact.id ? response : person
                            )
                        );
                        setNewName('');
                        setNewNumber('');
                    })
                    .catch(() => {
                        alert('Contact does not exist');
                    });
            }
        } else {
            services.addPerson(newPerson).then((response) => {
                setPersons(persons.concat(newPerson));
                setNewName('');
                setNewNumber('');
            });
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    return (
        <form onSubmit={addContact}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
