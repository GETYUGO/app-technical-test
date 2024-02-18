import { createAction, createReducer } from '@reduxjs/toolkit';
import { Vehicle, VehicleAction } from '../../static/types/vehicles';

interface VehiclesState {
  vehicles: Vehicle[];
  availableVehicles: Vehicle[];
  selectedVehicleId: Vehicle['id'] | undefined;
}

interface setVehiclesPayload {
  vehicles: Vehicle[];
}

interface setVehicleIdPayload {
  id: Vehicle['id'];
}

const setVehicles = createAction<setVehiclesPayload>(
  VehicleAction.SET_VEHICLES,
);
const setAvailableVehicles = createAction<setVehiclesPayload>(
  VehicleAction.SET_AVAILABLE_VEHICLES,
);
const setSelectedVehicleId = createAction<setVehicleIdPayload>(
  VehicleAction.SET_SELECTED_VEHICLE_ID,
);

const initialState = {
  vehicles: [],
  availableVehicles: [],
  selectedVehicleId: undefined,
} as VehiclesState;

/* eslint-disable no-param-reassign */

const vehiclesReducer = createReducer(initialState, builder => {
  builder.addCase(setVehicles, (state, action) => {
    state.vehicles = action.payload.vehicles;
  });
  builder.addCase(setAvailableVehicles, (state, action) => {
    state.availableVehicles = action.payload.vehicles;
  });
  builder.addCase(setSelectedVehicleId, (state, action) => {
    state.selectedVehicleId = action.payload.id;
  });
});

export default vehiclesReducer;
