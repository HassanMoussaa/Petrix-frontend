import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const DoctorLocations = () => {
  const apiKey = "AIzaSyDTfjTU0uNZK4EMSuWd5vUiMi4ShwgTlFw";

  const locations = [
    { id: 1, name: "Location 1", lat: 37.7749, lng: -122.4194 },
    { id: 2, name: "Location 2", lat: 34.0522, lng: -118.2437 },
    { id: 3, name: "Location 3", lat: 40.7128, lng: -74.006 },
  ];
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={{ height: "100vh", width: "100vw" }}>
        <GoogleMap
          center={locations[0]}
          zoom={8}
          mapContainerStyle={{ height: "100%", width: "100%" }}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleLocationClick(location)}
            />
          ))}
          {selectedLocation && (
            <Marker
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // You can customize the marker icon
                scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
              }}
            />
          )}
        </GoogleMap>
        <div
          style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto",
            position: "absolute",
            top: 100,
            left: 0,
            zIndex: 100,
          }}
        >
          <h2>Locations</h2>
          <ul>
            {locations.map((location) => (
              <li
                key={location.id}
                onClick={() => handleLocationClick(location)}
                style={{ cursor: "pointer" }}
              >
                {location.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Selected Location Info */}
      {/* {selectedLocation && (
        <div>
          <h3>Selected Location: {selectedLocation.name}</h3>
          <p>Latitude: {selectedLocation.lat}</p>
          <p>Longitude: {selectedLocation.lng}</p>
        </div>
      )} */}
    </LoadScript>
  );
};

export default DoctorLocations;
