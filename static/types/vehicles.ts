export enum VehicleStatus {
  AVAILABLE = 0,
  BOOKED = 1,
  ALERT_BATTERY = 2,
  ALERT_GPS = 3,
  MAINTENANCE = 4,
  DISABLED = 5,
  TOW = 6,
}

export interface Vehicle {
  id: number;
  name: string;
  lat: number;
  lng: number;
  battery: number;
  status: VehicleStatus;
  distance?: number;
}

export enum VehicleAction {
  SET_VEHICLES = 'vehicles/setVehicles',
  SET_AVAILABLE_VEHICLES = 'vehicles/setAvailableVehicles',
  SET_SELECTED_VEHICLE_ID = 'vehicles/setSelectedVehicleId',
}
