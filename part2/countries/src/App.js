import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Output from './components/Output';
import Filter from './components/Filter';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filtered, setFilter] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
            setCountries(response.data);
        });
    }, []);

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };
    const filteredCountries =
        filtered === ''
            ? countries
            : countries.filter((countries) =>
                  countries.name.toLowerCase().includes(filtered.toLowerCase())
              );

    const handleShow = (country) => {
        setFilter(country);
    };

    return (
        <div>
            <Filter filtered={filtered} handleFilter={handleFilter} />
            {filtered === '' ? (
                ''
            ) : (
                <Output
                    filteredCountries={filteredCountries}
                    handleShow={handleShow}
                />
            )}
        </div>
    );
};

export default App;
