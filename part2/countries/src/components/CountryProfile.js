import React from 'react';
import Weather from './Weather';

const CountryProfile = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>Spoken languages</h2>
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
            <Weather capital={country.capital} />
        </div>
    );
};

export default CountryProfile;
