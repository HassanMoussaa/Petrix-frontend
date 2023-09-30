import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import getAPIBaseURL from "../../APIBaseURL";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";

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
    if (map) {
      map.panTo({ lat: location.lat, lng: location.lng });
      map.setZoom(15);
    }
  };

  const getDocotrNearYou = async (userLocation) => {
    if (userLocation) {
      const lat = userLocation[0];
      const lng = userLocation[1];
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
        <Grid
          elevation={4}
          style={{
            position: "absolute",
            top: "150px",
            left: "16px",
            width: "250px",
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 0)",
            padding: "16px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {/* <h2 className="LocationsHead">Locations</h2> */}
          <List>
            {doctorsNearUser.map((doctor) => (
              <Card
                key={doctor.id}
                onClick={() =>
                  handleLocationClick({
                    lat: parseFloat(doctor.latitude),
                    lng: parseFloat(doctor.longitude),
                  })
                }
                style={{ cursor: "pointer", marginBottom: "8px" }}
                sx={{ width: "200px" }}
              >
                <CardContent
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <img
                    src={doctor.doctor.photoUrl}
                    alt={`${doctor.doctor.firstName} ${doctor.doctor.lastName}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    {doctor.doctor.firstName} {doctor.doctor.lastName}
                  </div>
                </CardContent>
              </Card>
            ))}
          </List>
        </Grid>
      </div>
    </LoadScript>
  );
};

export default DoctorLocations;
