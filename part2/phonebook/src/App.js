import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
    const [newName, setNewName] = useState('');

    const addContact = (event) => {
        event.preventDefault();
        const newPerson = { name: newName };

        if (persons.filter(person => person.name === newPerson.name).length > 0) {
          alert(newPerson.name + " is already added to phonebook");
        } else {
          setPersons(persons.concat(newPerson));
          setNewName('');
        }
    };

    const handleChange = (event) => {
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person, index) => (
                <div key={index}>{person.name}</div>
            ))}
        </div>
    );
};

export default App;
