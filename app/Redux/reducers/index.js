import { combineReducers } from 'redux';
import { CustomerFirstName, CustomerLastName,
  CustomerMobileNum, CustomerOtp, CustomerToken } from './customerInfo';
import { PickUp, Drop, PickUpDate, EntireTruck,
  PackageWeight, PackageSpace, ReceivingPersonName,
  ReceivingPersonNum, PackageId } from './packageDetails';
import { NoOfTripsFound, AllTripIdsNTruckNos, AllTruckDetails,
  AllTruckSpaceNWeight, SelectedTruckData } from './tripsAvailable';
import { LoginFailed, TruckRegisterFailed } from './other';
import { OwnerFullName, OwnerOtp, OwnerToken, OwnerMobileNum } from './TruckOwnerInfo';
import { TruckNo, TruckModel, TotalWeight, TotalSpace } from './ownerTruckInfo';

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
  // truck Owner
  TruckNo,
  TruckModel,
  TotalSpace,
  TotalWeight,
  OwnerFullName,
  OwnerOtp,
  OwnerToken,
  OwnerMobileNum,
  TruckRegisterFailed,
});

export default allReducers;
