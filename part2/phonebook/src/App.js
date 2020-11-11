import React, { useState, useEffect } from 'react';
import services from './services/services';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Contacts from './components/Contacts';
import Title from './components/Title';
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filtered, setFilter] = useState('');
    const [notification, setNotification] = useState({ text: '', type: '' });

    useEffect(() => {
        services.getAll().then((response) => {
            setPersons(response);
        });
    }, []);

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    const snackbar = (newText, newType) => {
        setNotification({ text: newText, type: newType });
        setTimeout(() => setNotification({ text: '', type: '' }), 3000);
    };

    return (
        <div>
            <Title title="Phonebook" />
            <Notification notification={notification} />
            <Filter filtered={filtered} handleFilter={handleFilter} />
            <Title title="add a new" />
            <PersonForm persons={persons} setPersons={setPersons} snackbar={snackbar} />
            <Title title="Numbers" />
            <Contacts
                persons={persons}
                filtered={filtered}
                setPersons={setPersons}
                snackbar={snackbar}
            />
        </div>
    );
};

export default App;
