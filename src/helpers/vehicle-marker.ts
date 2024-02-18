import { VehicleStatus } from '../../static/types/vehicles';
import {
  blackScooterIcon,
  greenScooterIcon,
  orangeScootericon,
  redScooterIcon,
} from '../../static/images';

export const getVehicleIcon = (selected: boolean, status: VehicleStatus) => {
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
