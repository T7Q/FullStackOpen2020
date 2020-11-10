import React, { useState,useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Contacts from './components/Contacts';
import Title from './components/Title';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filtered, setFilter] = useState('');

    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
      }, [])

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
            <Contacts persons={persons} filtered={filtered} />
        </div>
    );
};

export default App;
