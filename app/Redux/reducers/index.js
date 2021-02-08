import { combineReducers } from 'redux';
import { CustomerFirstName, CustomerLastName,
  CustomerMobileNum, CustomerOtp, CustomerToken } from './customerInfo';
import { PickUp, Drop, PickUpDate, EntireTruck,
  PackageWeight, PackageSpace, ReceivingPersonName,
  ReceivingPersonNum, PackageId } from './packageDetails';
import { NoOfTripsFound, AllTripIdsNTruckNos, AllTruckDetails,
  AllTruckSpaceNWeight, SelectedTruckData } from './tripsAvailable';
import { LoginFailed } from './other';
import * as OwnerInfo from './TruckOwner';
import * as ownerTruckInfo from './ownerTruckInfo';

const allReducers = combineReducers({
  CustomerFirstName,
  CustomerLastName,
  CustomerMobileNum,
  CustomerOtp,
  LoginFailed,
  PickUp,
  Drop,
  PackageId,
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
  SelectedTruckData,
  OwnerInfo,
  ownerTruckInfo,
});

export default allReducers;
