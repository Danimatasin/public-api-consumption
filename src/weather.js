import React, { useEffect, useState } from 'react';
import getWeatherData from './weatherAPI';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const data = await getWeatherData(latitude, longitude);
      setWeatherData(data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        }, (error) => {
          // Handle error
        });
      } else {
        // Geolocation is not supported by the browser
      }
    };

    getLocation();
  }, []);

  if (!weatherData) {
    return <div>Cargando datos del clima...</div>;
  }

  // Renderizar los datos del clima

  return <div className="container mt-4">
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <h2>{weatherData.location.localtime}</h2>
          <div className="row">
          <div className="col-md-6 col-lg-3">
            <p>Temperature: {weatherData.current.temp_c}°C</p>
          </div>
          <div className="col-md-6 col-lg-3">
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
          <div className="col-md-6 col-lg-3">
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
          </div>
          <div className="col-md-6 col-lg-3">
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
        </div>
          
        </div>;
};

export default WeatherComponent;