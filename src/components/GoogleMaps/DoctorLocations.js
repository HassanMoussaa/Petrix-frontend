import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

const DoctorLocations = () => {
  const apiKey = "AIzaSyDTfjTU0uNZK4EMSuWd5vUiMi4ShwgTlFw";

  const [map, setMap] = React.useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [doctorsNearUser, setDoctorsNearUser] = useState([]);
  const mapRef = useRef(null);

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");
  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;

    setMap(map);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log("lat", position.coords.latitude);
          console.log("lng", position.coords.longitude);
          getDocotrNearYou([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    console.log("goo", location);
    console.log("mm", mapRef.current);
    if (map) {
      map.panTo({ lat: location.lat, lng: location.lng });
      map.setZoom(15);
    }
  };

  const getDocotrNearYou = async (userLocation) => {
    console.log("jey", userLocation);
    if (userLocation) {
      const lat = userLocation[0];
      const lng = userLocation[1];
      console.log(lat, lng);

      try {
        const response = await axios.get(
          getAPIBaseURL() + "/users/doctors_near_you",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { lat, lng },
          }
        );

        setDoctorsNearUser(response.data);
      } catch (error) {
        console.error("Error fetching doctor locations:", error);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={{ height: "100vh", width: "100vw" }}>
        <GoogleMap
          onLoad={onLoad}
          center={userLocation || { lat: 0, lng: 0 }}
          zoom={15}
          mapContainerStyle={{ height: "90%", width: "100vw" }}
        >
          {/* Display user's location if available */}
          {userLocation && (
            <Marker
              position={{
                lat: userLocation.lat,
                lng: userLocation.lng,
              }}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}

          {/* Display doctors near the user */}
          {/* {doctorsNearUser.map((doctor) => (
            <Marker
              key={doctor.id}
              position={{ lat: doctor.latitude, lng: doctor.longitude }}
              onClick={() => handleLocationClick(doctor)}
            />
          ))} */}

          {selectedLocation && (
            <Marker
              position={{
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
              }}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}
        </GoogleMap>
        <Paper
          elevation={4}
          style={{
            position: "absolute",
            top: "150px",
            left: "16px",
            width: "130px",
            zIndex: 1000, // Set a higher zIndex
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
            padding: "16px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <h2 className="LocationsHead">Locations</h2>
          <List>
            {doctorsNearUser.map((doctor) => (
              <ul>
                <li
                  key={doctor.id}
                  onClick={() =>
                    handleLocationClick({
                      lat: parseFloat(doctor.latitude),
                      lng: parseFloat(doctor.longitude),
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  {doctor.doctor.firstName} {doctor.doctor.lastName}
                </li>
              </ul>
            ))}
          </List>
        </Paper>
      </div>
    </LoadScript>
  );
};

export default DoctorLocations;
