import axios from "axios";
import { useEffect, useState } from "react";

const TravelGuide = () => {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const API_URL =
      process.env.NODE_ENV === "production"
        ? `https://weather-api-acj3.onrender.com/weather`
        : `http://localhost:8080/weather`;

    const fetchAllData = async () => {
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const latLonResponse = await axios.get(
          `${API_URL}/ip/${ipResponse.data.ip}`,
        );
        const stationResponse = await axios.get(
          `${API_URL}/ll/${latLonResponse.data.lat},${latLonResponse.data.lon}`,
        );
        setLocation({
          city: stationResponse.data.city,
          state: stationResponse.data.state,
        });
        const weatherResponse = await axios.get(
          `${stationResponse.data.grid.forecast}`,
        );
        setWeather(weatherResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const loadPage = async () => {
      await fetchAllData();
    };
    loadPage();
  }, []);

  return (
    <div>
      <h1>
        Weather for{" "}
        {location && location.city
          ? `${location.city}, ${location.state}`
          : `loading`}
      </h1>
      {weather && weather.properties
        ? // JSON.stringify(weather.properties)
          weather.properties.periods.map((period, i) => {
            return (
              <div key={i}>
                {period.name}: {period.detailedForecast}
              </div>
            );
          })
        : `loading`}
    </div>
  );
};

export default TravelGuide;
