import React, { useEffect, useRef } from "react";
import "./mapcomponent.css";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: latitude, lng: longitude },
            zoom: 12,
          });

          // Aquí puedes agregar cualquier funcionalidad adicional del mapa

          // Ejemplo: Agregar un marcador
          const marker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: "Mi ubicación",
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  return  <div className="map-container">
            <div ref={mapRef} style={{ width: "75%", height: "300px" }} />
          </div>;
};

export default MapComponent;