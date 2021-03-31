import { combineReducers } from 'redux';
import { CustomerFirstName, CustomerLastName,
  CustomerMobileNum, CustomerOtp, CustomerToken, CustomerPackages,
  ReceivingPackages } from './customerInfo';
import { PickUp, Drop, PickUpDate, EntireTruck,
  PackageWeight, PackageSpace, ReceivingPersonName,
  ReceivingPersonNum, PackageId, DropPersonName, DropPersonNum } from './packageDetails';
import { NoOfTripsFound, AllTripIdsNTruckNos, AllTruckDetails,
  AllTruckSpaceNWeight, SelectedTruckData, DeliveryRequests, TripDetails, SelectedTrip } from './tripsAvailable';
import { TruckRegisterFailed, LoginFailed } from './other';
import { OwnerFullName, OwnerOtp, OwnerToken, OwnerMobileNum, OwnerCheckList } from './TruckOwnerInfo';
import { TruckNo, TruckModel, TotalWeight, TotalSpace
  , TripHistory } from './ownerTruckInfo';
import { CompanyName, NoOfVehicals, ContactNumber, SelectedTruck,
  AllTruckData } from './transportCompanyInfo';


const allReducers = combineReducers({
  CustomerFirstName,
  CustomerLastName,
  CustomerMobileNum,
  CustomerOtp,
  CustomerPackages,
  ReceivingPackages,
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
  SelectedTrip,
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
  SelectedTruck,
  AllTruckData,
});

export default allReducers;
