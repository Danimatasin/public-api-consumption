import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherComponent from './weather';
import MapComponent from './map';
      

function App() {
  const [data, setData] = useState([]);

  const map_key = 'AIzaSyBgeVhb0ig9sfy5O8iXR2-yrUwQo0W46js';
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    fetchData();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=85f84309b548416586b3e8d837e5020a');
      if (Array.isArray(response.data.articles)) {
        setData(response.data.articles);
      } else {
        console.error('La respuesta de la API no es un arreglo:', response.data.articles);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
        <WeatherComponent/>
        <h1>Mapa de Mi Ubicación</h1>
        <MapComponent/>
      <h1 className="text-center mt-2">NEWS</h1>
      <div className="row mb-4">
        {data.map((item, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card h-100 my-4 shadow rounded">
              <img src={item.urlToImage} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="card-text">{item.description}</p>
                <a href={item.url} className="btn btn-primary">
                  Leer más
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;