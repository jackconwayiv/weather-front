import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({});

  const fetchWeather = async () => {
    const fetchedWeather = await axios.get(
      `${process.env.API_URL}/33.5268,-112.0844`,
    );
    setWeather(fetchedWeather.data);
  };
  return (
    <div className="App">
      <h1>The World's Greatest Weather App</h1>
      <p>Coming soon: get your OWN weather.</p>
      <button
        onClick={() => {
          fetchWeather();
        }}
      >
        fetch mine weather
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
}

export default App;
