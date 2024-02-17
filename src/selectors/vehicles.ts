import { RootState } from '../configureStore';

export const selectVehicles = (state: RootState) => state.vehicles.vehicles;

export const selectAvailableVehicles = (state: RootState) =>
  state.vehicles.availableVehicles;

export const selectSelectedVehicleId = (state: RootState) =>
  state.vehicles.selectedVehicleId;
