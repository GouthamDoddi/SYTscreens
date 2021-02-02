import { combineReducers } from 'redux';
import { CustomerFirstName, CustomerLastName,
  CustomerMobileNum, CustomerOtp, CustomerToken } from './customerInfo';
import { PickUp, Drop, PickUpDate, EntireTruck,
  PackageWeight, PackageSpace, ReceivingPersonName,
  ReceivingPersonNum } from './packageDetails';
import { NoOfTripsFound, AllTripIdsNTruckNos, AllTruckDetails, AllTruckSpaceNWeight } from './tripsAvailable';

const allReducers = combineReducers({
  CustomerFirstName,
  CustomerLastName,
  CustomerMobileNum,
  CustomerOtp,
  PickUp,
  Drop,
  PickUpDate,
  EntireTruck,
  PackageWeight,
  PackageSpace,
  ReceivingPersonNum,
  ReceivingPersonName,
  CustomerToken,
  NoOfTripsFound,
  AllTripIdsNTruckNos,
  AllTruckDetails,
  AllTruckSpaceNWeight,
});

export default allReducers;
