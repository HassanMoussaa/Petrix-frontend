import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const UserLocation = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDTfjTU0uNZK4EMSuWd5vUiMi4ShwgTlFw",
  });

  const lat = parseFloat(location[1]);
  const lng = parseFloat(location[0]);

  console.log("COORDS:: ", lat, lng);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "400px",
      }}
      center={{
        lat,
        lng,
      }}
      zoom={10}
    >
      <Marker
        position={{
          lat,
          lng,
        }}
        draggable={false}
      />
    </GoogleMap>
  );
};

export default UserLocation;
