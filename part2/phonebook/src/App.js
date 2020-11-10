import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: "39-44-5323523" }]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const addContact = (event) => {
        event.preventDefault();
        const newPerson = { name: newName, number: newNumber };

        if (persons.filter((person) => person.name === newPerson.name).length > 0) {
            alert(newPerson.name + ' is already added to phonebook');
        } else {
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('');
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
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
            <h2>Numbers</h2>
            {persons.map((person, index) => (
                <div key={index}>{person.name} {person.number}</div>
            ))}
        </div>
    );
};

export default App;
