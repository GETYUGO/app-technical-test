import Geolocation from 'react-native-geolocation-service';
import { LatLng } from 'react-native-maps';

export const getCurrentPosition: () => Promise<
  LatLng | Error | undefined
> = async () => {
  var result: LatLng | Error | undefined;

  Geolocation.getCurrentPosition(
    position => {
      result = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    },
    error => {
      console.error(error.code, error.message);
      result = new Error(error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 100 },
  );

  return result;
};
