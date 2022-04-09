import React, { useState } from 'react'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


import './App.css'

const App = () => {

  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('')

  const apiKey = 'dd8bc8982cb725ff1d9433970a4c6049'

  const getWeather = (e) => {
    if(e.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setCity('')
      })}
    }

    const calculateWindSpeed = (speed) => {
      const kmiles = 3.6
      return Math.round(speed * kmiles)

    };

  return (
    <div className="app">
    <div className="container">
        <input
        type="text"
        placeholder="Miasto..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={getWeather}
        />
        {
          typeof weather.main != 'undefined' ?
          (
            <div className="weather-container">
              <div className="location">
              <LocationCityIcon className="city" /> {weather.name}, {weather.sys.country}
              </div>
              <div className="temp">
               <WbSunnyIcon className="sun" /> {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
               <CloudIcon className="cloud" /> {weather.weather[0].main}
                </div>
                <div className="wind">
                 <AirIcon className="windy" /> {calculateWindSpeed(weather.wind.speed)} km/h
                </div>
            </div>
            ) : (
              <div className="weather-container">
                <h1>Aplikacja pogodowa</h1>
                <p>Wpisz nazwę miasta aby sprawdzić aktualną pogodę</p>
              </div>
            )
        }
    </div>
    </div>
  )
}

export default App
