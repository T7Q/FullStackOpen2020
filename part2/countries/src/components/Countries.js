import React from 'react';

const Countries = ({ countries, handleShow }) => {
    return (
        <div>
            {countries.map((country, index) => (
                <div key={index}>
                    <span >{country.name} </span>
                    <span>
                        <button onClick={() => handleShow(country.name)}>show</button>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Countries;
