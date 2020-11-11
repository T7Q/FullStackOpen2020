import React, { useState, useEffect } from 'react';
import services from './services/services';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Contacts from './components/Contacts';
import Title from './components/Title';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filtered, setFilter] = useState('');

    useEffect(() => {
        services.getAll().then((response) => {
            setPersons(response);
        });
    }, []);

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <Title title="Phonebook" />
            <Filter filtered={filtered} handleFilter={handleFilter} />
            <Title title="add a new" />
            <PersonForm persons={persons} setPersons={setPersons} />
            <Title title="Numbers" />
            <Contacts persons={persons} filtered={filtered} setPersons={setPersons}/>
        </div>
    );
};

export default App;
