import React, { memo, useCallback, useState } from 'react';
import { Marker, LatLng } from 'react-native-maps';
import {
  Vehicle,
  VehicleAction,
  VehicleStatus,
} from '../../static/types/vehicles';
import {
  blackScooterIcon,
  greenScooterIcon,
  orangeScootericon,
  redScooterIcon,
} from '../../static/images';
import { useDispatch } from 'react-redux';

interface VehicleMarkerProps {
  id: Vehicle['id'];
  coordinate: LatLng;
  selected?: boolean;
  status: VehicleStatus;
}

const getVehicleIcon = (
  selected: VehicleMarkerProps['selected'],
  status: VehicleMarkerProps['status'],
) => {
  if (selected) {
    return greenScooterIcon;
  } else {
    switch (status) {
      case VehicleStatus.AVAILABLE:
        return orangeScootericon;
      case VehicleStatus.BOOKED:
        return blackScooterIcon;
      default:
        return redScooterIcon;
    }
  }
};

const VehicleMarker: React.FC<VehicleMarkerProps> = ({
  id,
  coordinate,
  selected = false,
  status,
}) => {
  const dispatch = useDispatch();
  const dispatchSetSelectedVehicleId = (id: Vehicle['id']) =>
    dispatch({
      type: VehicleAction.SET_SELECTED_VEHICLE_ID,
      payload: { id },
    });

  const handleOnPress = () => {
    if (status === VehicleStatus.AVAILABLE) {
      dispatchSetSelectedVehicleId(id);
    }
  };

  return (
    <Marker
      key={`marker_${id}`}
      coordinate={coordinate}
      image={getVehicleIcon(selected, status)}
      tappable={status === VehicleStatus.AVAILABLE}
      onPress={handleOnPress}
    />
  );
};

export default memo(VehicleMarker);
