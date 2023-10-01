import axios from "axios";
import React from "react";
import { useState } from "react";
import "./styles.css";
import visibilityImg from "../../Assets/visibility.svg";
import humidityImg from "../../Assets/humidity.svg";
import windImg from "../../Assets/wind.svg";
import WeatherImmg from "./icons/weather.svg";

const Weather = () => {
  const [temperature, setTemperature] = useState("");
  const [city, setCity] = useState("istanbul");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [windspeed, setWineSpeed] = useState("");
  const [wicon, setWicon] = useState("");
  const [error, setError] = useState(false);
  const getWeatherData = () => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e203317f0df5474c05874e35b030eda3`,
    })
      .then((response) => {
        setTemperature(Math.round(response.data.main.temp - 273.15));
        setDesc(response.data.weather[0].description);
        setName(response.data.name);
        setHumidity(response.data.main.humidity);
        setVisibility(response.data.visibility / 1000);
        setWineSpeed(response.data.wind.speed);
        setWicon(response.data.weather[0].icon);
        console.log(response);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div
      onLoad={() => {
        getWeatherData(city);
      }}
      className="background"
    >
      <div className="weatherss">Weather in your city</div>
      <div className="search-div">
        <div className="search">
          <input
            placeholder="Search..."
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => {
              getWeatherData(city);
            }}
          >
            Go
          </button>
        </div>
      </div>
      <div className="container">
        {error ? (
          <div>Not found</div>
        ) : (
          <div id="card" className="weather">
            <div className="details">
              <div className="temp">
                {temperature}
                <span>&deg;</span>
              </div>
              <div className="right">
                <div id="summary">{desc}</div>
                <div style={{ fontWeight: "bold", marginTop: "4px" }}>
                  {name}
                </div>
              </div>
            </div>
            <img className="weatherimg" alt="image1" src={WeatherImmg} />
            <div className="infos">
              <img
                alt="humidity1"
                className="humidityimg"
                style={{ width: "5", height: "5" }}
                src={humidityImg}
              ></img>
              <div className="humidity">Humidity {humidity}%</div>
              <img
                alt="visibility1"
                className="visibilityimg"
                style={{ width: "5", height: "5" }}
                src={visibilityImg}
              ></img>
              <div className="visibility">Visibility {visibility} km</div>
              <img
                alt="windspeed1"
                className="windimg"
                style={{ width: "5", height: "5" }}
                src={windImg}
              ></img>
              <div className="windspeed">Wind Speed {windspeed} km</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
