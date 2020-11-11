import React from 'react';

import Countries from './Countries';
import CountryProfile from './CountryProfile';

const Output = ({ filteredCountries, filtered }) => {
    return (
        <div>
            {filteredCountries.length > 10 ? (
                <div>Too many matches, specify another filter</div>
            ) : filteredCountries.length === 1 ? (
                <CountryProfile country={filteredCountries[0]} />
            ) : (
                <Countries countries={filteredCountries} filtered={filtered} />
            )}
        </div>
    );
};

export default Output;
