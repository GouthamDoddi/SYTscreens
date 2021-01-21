import { combineReducers } from 'redux';
import { CustomerFirstName,
  CustomerLastName, CustomerMobileNum, CustomerOtp } from './customerInfo';
import { PickUp, Drop, PickUpDate, EntireTruck,
  PackageWeight, PackageSpace, ReceivingPersonName,
  ReceivingPersonNum } from './packageDetails';

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
});

export default allReducers;
