import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { enableLatestRenderer } from 'react-native-maps';

import { requestLocationPermission } from '../helpers/permissions';
import {
  PermissionStatus,
  PermissionsAction,
} from '../../static/types/permissions';
import Color from '../../static/types/colors';

import Map from '../components/Map';
import BottomPanel from '../components/BottomPanel';

const App: React.FC = () => {
  enableLatestRenderer();

  const dispatch = useDispatch();
  const dispatchSetLocationPermission = (permission: PermissionStatus) =>
    dispatch({
      type: PermissionsAction.SET_LOCATION_PERMISSION,
      payload: { permission },
    });

  useEffect(() => {
    (async () => {
      const locationPermission = await requestLocationPermission();
      dispatchSetLocationPermission(locationPermission);
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>YEGO - Technical Test</Text>
            <Map />
            <BottomPanel />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Color.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  sectionContainer: {
    marginVertical: 16,
    paddingHorizontal: 24,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Color.BLACK,
    padding: 20,
    height: '8%',
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default App;
