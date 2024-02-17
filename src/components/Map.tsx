import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

import {
  selectAvailableVehicles,
  selectSelectedVehicleId,
  selectVehicles,
} from '../selectors/vehicles';
import { getVehiclesList } from '../services/rideyego-api';
import { Vehicle, VehicleAction } from '../../static/types/vehicles';

import { selectLocationPermission } from '../selectors/permissions';
import { PermissionStatus } from '../../static/types/permissions';

import VehicleMarker from './VehicleMarker';
import {
  addDistanceFromCoordinate,
  filterAvailableVehicles,
} from '../helpers/vehicles-list';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const POSITION_UPDATE_INTERVAL = 30000; //30s;

const Map: React.FC = () => {
  const dispatch = useDispatch();
  const dispatchSetVehicles = (vehicles: Vehicle[]) =>
    dispatch({
      type: VehicleAction.SET_VEHICLES,
      payload: { vehicles },
    });
  const dispatchSetAvailableVehicles = (vehicles: Vehicle[]) =>
    dispatch({
      type: VehicleAction.SET_AVAILABLE_VEHICLES,
      payload: { vehicles },
    });

  const vehicles = useSelector(selectVehicles);
  // const availableVehicles = useSelector(selectAvailableVehicles);
  const selectedVehicleId = useSelector(selectSelectedVehicleId);
  const locationPermission = useSelector(selectLocationPermission);

  const [currentPosition, setCurrentPosition] = useState<LatLng>();
  const [selected, setSelected] = useState<Vehicle['id']>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const currentRegion = {
    latitude: currentPosition?.latitude || 0,
    longitude: currentPosition?.longitude || 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const updateCurrentPosition = () =>
    Geolocation.getCurrentPosition(
      position =>
        setCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      error => {
        console.error(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
    );

  useEffect(() => {
    if (locationPermission === PermissionStatus.ACCEPTED) {
      updateCurrentPosition();

      // const interval = setInterval(
      //   updateCurrentPosition,
      //   POSITION_UPDATE_INTERVAL,
      // );

      // return () => {
      //   clearInterval(interval);
      // };
    }
  }, [locationPermission]);

  useEffect(() => {
    (async () => {
      getVehiclesList().then(data => {
        dispatchSetVehicles(data as Vehicle[]);
      });
    })();
  }, []);

  useEffect(() => {
    if (vehicles.length && currentPosition !== undefined) {
      dispatchSetAvailableVehicles(
        addDistanceFromCoordinate(
          filterAvailableVehicles(vehicles),
          currentPosition,
        ),
      );
    }
  }, [vehicles, currentPosition]);

  if (locationPermission === PermissionStatus.REJECTED) {
    return (
      <Text style={styles.errorMessage}>
        Error: YegoTiny can't access to your location.
        {'\n'}Please check...
      </Text>
    );
  }

  if (locationPermission === PermissionStatus.ACCEPTED && currentPosition) {
    return (
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
        // region={currentRegion}
        provider={PROVIDER_GOOGLE}
        zoomControlEnabled
        showsUserLocation
        moveOnMarkerPress={false}
      >
        {vehicles.length &&
          vehicles.map(vehicle => {
            return (
              <VehicleMarker
                key={vehicle.id}
                id={vehicle.id}
                selected={vehicle.id === selectedVehicleId}
                status={vehicle.status}
                coordinate={{ latitude: vehicle.lat, longitude: vehicle.lng }}
              />
            );
          })}
      </MapView>
    );
  }

  return <Text>Loading...</Text>;
};

const styles = StyleSheet.create({
  // container: {
  //   width: '100%',
  //   height: '80%',
  //   borderColor: 'red',
  //   borderWidth: 2,
  // },
  map: {
    margin: 20,
    width: '100%',
    height: '60%',
  },
  errorMessage: {
    color: 'red',
  },
});

export default Map;
