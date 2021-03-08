import { combineReducers } from 'redux';
import { CustomerFirstName, CustomerLastName,
  CustomerMobileNum, CustomerOtp, CustomerToken } from './customerInfo';
import { PickUp, Drop, PickUpDate, EntireTruck,
  PackageWeight, PackageSpace, ReceivingPersonName,
  ReceivingPersonNum, PackageId, DropPersonName, DropPersonNum } from './packageDetails';
import { NoOfTripsFound, AllTripIdsNTruckNos, AllTruckDetails,
  AllTruckSpaceNWeight, SelectedTruckData, DeliveryRequests, TripDetails } from './tripsAvailable';
import { TruckRegisterFailed } from './other';
import { OwnerFullName, OwnerOtp, OwnerToken, OwnerMobileNum, OwnerCheckList } from './TruckOwnerInfo';
import { TruckNo, TruckModel, TotalWeight, TotalSpace
  , TripHistory } from './ownerTruckInfo';
import { CompanyName, NoOfVehicals, ContactNumber } from './transportCompanyInfo';


const allReducers = combineReducers({
  CustomerFirstName,
  CustomerLastName,
  CustomerMobileNum,
  CustomerOtp,
  PickUp,
  Drop,
  PackageId,
  PickUpDate,
  EntireTruck,
  PackageWeight,
  PackageSpace,
  ReceivingPersonNum,
  ReceivingPersonName,
  DropPersonNum,
  DropPersonName,
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
  TripHistory,
  DeliveryRequests,
  TripDetails,
  OwnerCheckList,
  // transport company
  CompanyName,
  ContactNumber,
  NoOfVehicals,
});

export default allReducers;
