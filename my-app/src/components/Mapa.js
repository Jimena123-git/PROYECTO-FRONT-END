import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Estilo del contenedor del mapa
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Centro del mapa
const center = {
  lat: -34.603722, 
  lng: -58.381592,
};

// Coordenadas del marcador
const markerPosition = {
  lat: -34.603722, 
  lng: -58.381592,
};

const Mapa = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBnhGi_NXDMXYXhzC_Qlez4oH6Xv4dXjhs">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Mapa;
