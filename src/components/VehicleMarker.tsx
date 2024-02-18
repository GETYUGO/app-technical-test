import React from 'react';
import { useDispatch } from 'react-redux';
import { Marker, LatLng } from 'react-native-maps';

import { getVehicleIcon } from '../helpers/vehicle-marker';
import {
  Vehicle,
  VehicleAction,
  VehicleStatus,
} from '../../static/types/vehicles';

interface VehicleMarkerProps {
  id: Vehicle['id'];
  coordinate: LatLng;
  selected?: boolean;
  status: VehicleStatus;
}

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

export default VehicleMarker;
