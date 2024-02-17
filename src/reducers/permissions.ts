import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  PermissionStatus,
  PermissionsAction,
} from '../../static/types/permissions';

interface PermissionsState {
  locationPermission: PermissionStatus;
}

interface setPermissioPayload {
  permission: PermissionStatus;
}

const setLocationPermission = createAction<setPermissioPayload>(
  PermissionsAction.SET_LOCATION_PERMISSION,
);

const initialState = {
  locationPermission: PermissionStatus.PENDING,
} as PermissionsState;

const permissionsReducer = createReducer(initialState, builder => {
  builder.addCase(setLocationPermission, (state, action) => {
    state.locationPermission = action.payload.permission;
  });
});

export default permissionsReducer;
