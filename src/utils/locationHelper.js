export const getLocationFromCoordinates = async (coords) => {
  const geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: coords }, (result, status) => {
      if (status === "OK") {
        resolve([coords?.lng, coords?.lat]);
      } else {
        reject(new Error("Geocoder failed due to: " + status));
      }
    });
  });
};

export const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const res = await getLocationFromCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      if (res) {
        resolve(res);
      } else {
        reject(new Error("Failed to get current location"));
      }
    });
  });
};
