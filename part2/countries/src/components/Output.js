import React from 'react';

import Countries from './Countries';
import CountryProfile from './CountryProfile';

const Output = ({ filteredCountries, handleShow }) => {
    return (
        <div>
            {filteredCountries.length > 10 ? (
                <div>Too many matches, specify another filter</div>
            ) : filteredCountries.length === 1 ? (
                <CountryProfile country={filteredCountries[0]} />
            ) : (
                <Countries countries={filteredCountries} handleShow={handleShow}/>
            )}
        </div>
    );
};

export default Output;
