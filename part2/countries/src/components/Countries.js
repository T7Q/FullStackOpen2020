import React from 'react';

const Countries = ({ countries, filtered }) => {
    return (
        <div>
            {countries.map((country, index) => (
                <div key={index}>{country.name}</div>
            ))}
        </div>
    );
};

export default Countries;
