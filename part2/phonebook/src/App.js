import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Contacts from './components/Contacts';
import Title from './components/Title';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' },
    ]);
    const [filter, setFilter] = useState('');

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <Title title="Phonebook" />
            <Filter filter={filter} handleFilter={handleFilter} />
            <Title title="add a new" />
            <PersonForm persons={persons} setPersons={setPersons} />
            <Title title="Numbers" />
            <Contacts persons={persons} filter={filter} />
        </div>
    );
};

export default App;
