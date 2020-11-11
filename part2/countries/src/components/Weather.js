import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState('');
    const api = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`;
    useEffect(() => {
        axios.get(api).then((response) => {
            setWeather(response.data.current);
        });
    }, [api]);

    return (
        <div>
            <h2>Weather in {capital} </h2>
            <p>
                <strong>temperature: </strong> {weather.temperature} Celsius{' '}
            </p>
            <img
                src={weather.weather_icons}
                alt="weather icon"
                style={{ widht: '100px', height: '100px' }}
            />
            <p>
                <strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
            </p>
        </div>
    );
};

export default Weather;
