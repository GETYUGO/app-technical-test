import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Vehicle, VehicleAction } from '../../static/types/vehicles';
import Color from '../../static/types/colors';
import { LIMIT_DISTANCE } from '../../static/constants/distances';

import {
  selectAvailableVehicles,
  selectSelectedVehicleId,
} from '../selectors/vehicles';
import {
  filterByDistance,
  sortByDistance,
  getIds,
} from '../helpers/vehicles-list';

const BottomPanel: React.FC = () => {
  const dispatch = useDispatch();
  const dispatchSetSelectedVehicleId = (id: Vehicle['id']) =>
    dispatch({
      type: VehicleAction.SET_SELECTED_VEHICLE_ID,
      payload: { id },
    });

  const selectedVehicleId = useSelector(selectSelectedVehicleId);
  const availableVehicles = useSelector(selectAvailableVehicles);

  const [nearestAvailableVehiclesIds, setNearestAvailableVehiclesIds] =
    useState<Vehicle['id'][]>([]);
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<
    number | undefined
  >(undefined);

  const selectedVehicle = availableVehicles.find(
    vehicle => vehicle.id === selectedVehicleId,
  );

  const handlePressPrev = () => {
    if (selectedVehicleIndex === -1 && nearestAvailableVehiclesIds?.length) {
      dispatchSetSelectedVehicleId(nearestAvailableVehiclesIds[0]);
    } else if (selectedVehicleIndex !== undefined && selectedVehicleIndex > 0) {
      dispatchSetSelectedVehicleId(
        nearestAvailableVehiclesIds[selectedVehicleIndex - 1],
      );
    }
  };
  const handlePressNext = () => {
    selectedVehicleIndex !== undefined &&
      selectedVehicleIndex < nearestAvailableVehiclesIds?.length - 1 &&
      dispatchSetSelectedVehicleId(
        nearestAvailableVehiclesIds[selectedVehicleIndex + 1],
      );
  };

  useEffect(() => {
    availableVehicles?.length &&
      setNearestAvailableVehiclesIds(
        getIds(
          sortByDistance(filterByDistance(availableVehicles, LIMIT_DISTANCE)),
        ),
      );
  }, [availableVehicles]);

  useEffect(() => {
    nearestAvailableVehiclesIds?.length &&
      dispatchSetSelectedVehicleId(nearestAvailableVehiclesIds[0]);
  }, [nearestAvailableVehiclesIds]);

  useEffect(() => {
    selectedVehicleId !== undefined &&
      nearestAvailableVehiclesIds?.length &&
      setSelectedVehicleIndex(
        nearestAvailableVehiclesIds.indexOf(selectedVehicleId),
      );
  }, [nearestAvailableVehiclesIds, selectedVehicleId]);

  return (
    <View style={styles.panel}>
      <View style={styles.buttonContainer}>
        <Button
          title="<"
          disabled={selectedVehicleIndex === 0}
          onPress={handlePressPrev}
        />
      </View>
      <View style={styles.sectionContainer}>
        {selectedVehicle && (
          <>
            <Text style={styles.name}>{selectedVehicle.name}</Text>
            <Text
              style={styles.batteryLevel}
            >{`Battery level: ${selectedVehicle.battery}`}</Text>
            <Text
              style={styles.distance}
            >{`Distance: ${selectedVehicle.distance} m`}</Text>
          </>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title=">"
          disabled={
            selectedVehicleIndex === undefined ||
            selectedVehicleIndex === -1 ||
            selectedVehicleIndex >= nearestAvailableVehiclesIds?.length - 1
          }
          onPress={handlePressNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '15%',
    padding: 20,
    borderColor: Color.GREEN,
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonContainer: {},
  sectionContainer: {
    height: '100%',
    width: '80%',
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.BLUE_NAVY,
  },
  batteryLevel: {
    textAlign: 'center',
    fontSize: 18,
  },
  distance: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default BottomPanel;
