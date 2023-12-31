import './App.css';
import React, { useState } from 'react';
import {api} from './api';
import astro from "./assets/header-img.svg";
import { motion } from 'framer-motion';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
      })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`
  }

 
  return (
      <div className={(typeof weather.main != "undefined") ? (
        (weather.main.temp > 30) ? "app sunny" :
        (weather.main.temp < 5)  ? "app snowy" :
        (weather.weather[0].main === "Clear") ? "app clear" :
        (weather.weather[0].main === "Clouds") ? "app cloudy" :
        (weather.weather[0].main === "Rain") || (weather.weather[0].main ==="Drizzle") ? "app rainy" :
        (weather.weather[0].main === "Mist") ? "app foggy" :
        (weather.weather[0].main === "Haze") ? "app haze" :
        (weather.weather[0].main === "Snow") ? "app snowy" :
        (weather.weather[0].main === "Thunderstorm") ? "app thunderstorms" :
        (weather.weather[0].main === "Windy") ? "app windy" :
        (weather.weather[0].main === "Hail") ? "app hail" :
        (weather.weather[0].main === "Tornado") || (weather.weather[0].main === "Cyclone") ? "app tornado" :

        "app")
        
        : 'app'}>
        <main>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search Location..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyDown={search}
            />
          </div>
          {/* Conditional rendering of the welcome message */}
          {query === '' && Object.keys(weather).length === 0 && ( // Show message if query is empty and weather data is not available
            <div className="welcome-message">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                transition={{ duration: 2 }}
                whileInView={{ opacity: 1, y: 0 }}
                >
                <p>Welcome to <br/>Weather App</p>
              </motion.div>
              <img class="astro" src={astro}></img>
            </div>
            
          )}
          {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="description">{weather.weather[0].description}</div>
            </div>
          </div>
          ) : ('')}
        </main>
      </div>
    );
}
export default App;
