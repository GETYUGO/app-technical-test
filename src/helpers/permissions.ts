import { Platform, PermissionsAndroid } from 'react-native';
import { PermissionStatus } from '../../static/types/permissions';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (response === 'granted') {
      return PermissionStatus.ACCEPTED;
    } else {
      return PermissionStatus.REJECTED;
    }
  } else {
    // TODO: request permission for other platforms
    return PermissionStatus.REJECTED;
  }
};
