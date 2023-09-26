import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const UserLocation = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDTfjTU0uNZK4EMSuWd5vUiMi4ShwgTlFw",
  });

  const lat = parseFloat(location[0]);
  const lng = parseFloat(location[1]);

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
      zoom={15}
    >
      {lat && lng && <MarkerF position={{ lat, lng }} />}
    </GoogleMap>
  );
};

export default UserLocation;
