import React from 'react';

const CountryProfile = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((language, index) => (
                    <li key={index}>{language.name}</li>
                ))}
            </ul>
            <img
                src={country.flag}
                alt={`flag ${country.name}`}
                style={{ widht: '100px', height: '100px' }}
            />
        </div>
    );
};

export default CountryProfile;
