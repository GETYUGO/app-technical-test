import haversine from 'haversine-distance';
import { LatLng } from 'react-native-maps';
import { Vehicle, VehicleStatus } from '../../static/types/vehicles';
import { sortByKey } from '../utils/array';

export const filterAvailableVehicles = (vehicles: Vehicle[]) =>
  vehicles.filter(vehicle => vehicle.status === VehicleStatus.AVAILABLE);

export const addDistanceFromCoordinate = (vehicles: Vehicle[], coord: LatLng) =>
  vehicles.map(vehicle => ({
    ...vehicle,
    distance: Number(
      haversine(coord, {
        latitude: vehicle.lat,
        longitude: vehicle.lng,
      }).toFixed(1),
    ),
  }));

export const filterByDistance = (vehicles: Vehicle[], maxDistance: number) =>
  vehicles.filter(
    vehicle => vehicle?.distance && vehicle.distance <= maxDistance,
  );

export const sortByDistance = (vehicles: Vehicle[]) =>
  sortByKey(vehicles, 'distance') as Vehicle[];

export const getIds = (vehicles: Vehicle[]) =>
  vehicles.map(vehicle => vehicle.id);
