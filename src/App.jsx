import React, { useState } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AirIcon from "@mui/icons-material/Air";
import CloudIcon from "@mui/icons-material/Cloud";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import CompressIcon from "@mui/icons-material/Compress";
import Image from "./components/Image";

import "./App.css";

const App = () => {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");

  const apiKey = "dd8bc8982cb725ff1d9433970a4c6049";

  const getWeather = (e) => {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setCity("");
        });
    }
  };

  const calculateWindSpeed = (speed) => {
    const kms = 3.6;
    return Math.round(speed * kms);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="weather-container">
          <h1>Aplikacja pogodowa</h1>
        </div>
        <Image />
        <input
          type="text"
          placeholder="Miasto..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={getWeather}
        />
        {typeof weather.main != "undefined" ? (
          <div className="weather-container">
            <div className="location">
              <LocationCityIcon className="city" />{" "}
              <span className="city-name">
                {weather.name}, {weather.sys.country}
              </span>
            </div>
            <div className="temp">
              <DeviceThermostatIcon className="sun" />{" "}
              <span className="sun-name">
                {Math.round(weather.main.temp)} °C /{" "}
                {Math.round(weather.main.feels_like)} °C
              </span>
            </div>
            <div className="weather">
              <CloudIcon className="cloud" />{" "}
              <span className="cloud-name">{weather.weather[0].main}</span>
            </div>
            <div className="wind">
              <AirIcon className="windy" />{" "}
              <span className="wind-name">
                {calculateWindSpeed(weather.wind.speed)} km/h
              </span>
            </div>
            <div className="pressure">
              <CompressIcon className="pressure" />{" "}
              <span className="pressure-name">{weather.main.pressure} hPa</span>
            </div>
            <div className="humid">
              <OpacityIcon className="humid" />{" "}
              <span className="humid-name">{weather.main.humidity} %</span>
            </div>
          </div>
        ) : (
          <div className="weather-container">
            <p>Wpisz nazwę miasta aby sprawdzić aktualną pogodę</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
