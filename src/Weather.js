import axios from "axios";
import { useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const API_URL =
    process.env.NODE_ENV === "production"
      ? `https://weather-api-acj3.onrender.com/weather`
      : `http://localhost:8080/weather`;

  const fetchWeather = async () => {
    const fetchedWeather = await axios.get(`${API_URL}`);
    setWeather(fetchedWeather.data);
  };

  return (
    <div>
      <h1>The World's Greatest Weather App</h1>
      <button
        onClick={() => {
          fetchWeather();
        }}
      >
        fetch thine weather
      </button>
      <div>
        {weather.city} {weather.state}
      </div>

      {weather.forecast &&
        weather.forecast.properties.periods.map((period, i) => {
          return (
            <div key={i}>
              {period.name}: {period.detailedForecast}
            </div>
          );
        })}
    </div>
  );
};

export default Weather;
