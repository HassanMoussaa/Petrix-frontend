import React from "react";
import getAPIBaseURL from "../../APIBaseURL";
import styled from "styled-components";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { getCurrentLocation } from "../../utils/locationHelper";
import { Typography } from "@mui/material";
import axios from "axios";

const GoogleMaps = ({ location, setLocation }) => {
  const [map, setMap] = React.useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDTfjTU0uNZK4EMSuWd5vUiMi4ShwgTlFw",
  });
  const lat = parseFloat(location[0]);
  const lng = parseFloat(location[1]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat,
      lng,
    });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleCurrentLocation = async () => {
    const res = await getCurrentLocation();
    saveClinicLocation(res[0], res[1]);
    console.log(res);
  };

  //function to save clinic Coordinates

  let config = {};
  let login_status = JSON.parse(localStorage.getItem("login") || "");

  const token = login_status.token;
  config = { headers: { Authorization: `Bearer ${token}` } };

  const saveClinicLocation = async (latitude, longitude) => {
    try {
      console.log("SAVE:: ", latitude, longitude);

      const response = await axios.post(
        getAPIBaseURL() + "/doctors/location",
        {
          lat: latitude,
          lng: longitude,
        },
        config
      );
      setLocation([latitude, longitude]);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  console.log("LOCATION:: ", location);

  const onMarkerDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    saveClinicLocation(lat, lng);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography>Please drag and drop to save clinic location</Typography>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        center={{
          lat,
          lng,
        }}
        zoom={15}
      >
        <CustomButton onClick={handleCurrentLocation}>
          <Typography>User current location</Typography>
        </CustomButton>
        <Marker
          position={{ lat, lng }}
          onDragEnd={(e) => onMarkerDragEnd(e)}
          draggable={true}
        />
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;

const CustomButton = styled.div`
  border: 1px solid #fff;
  border-radius: 7px;
  position: absolute;
  bottom: 0;
  z-index: 1000;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  background: #fff;
  padding: 7px;
  .location-icon {
    margin-right: 10px;
  }
`;
