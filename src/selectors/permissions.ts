import { RootState } from '../configureStore';

export const selectLocationPermission = (state: RootState) =>
  state.permissions.locationPermission;
