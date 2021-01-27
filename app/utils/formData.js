import { useDispatch } from 'react-redux';
import { customerFirstName,
  customerLastName, customerMobileNum } from '../Redux/actions/customerInfo';

// data for components

const dispatch = useDispatch();

export const firstNameData = {
  label: 'First Name',
  placeholder: 'First Name',
  updateValue: e => dispatch(customerFirstName(e)),
  touched: '',
  restInput: '',
  disabled: false,
};
export const lastNameData = {
  label: 'Last Name',
  placeholder: 'Last Name',
  updateValue: e => dispatch(customerLastName(e)),
  touched: '',
  restInput: '',
  disabled: false,
};
export const mobileNumData = {
  label: 'Mobile Number',
  placeholder: 'mobile number',
  updateValue: e => dispatch(customerMobileNum(e)),
  touched: '',
  restInput: '',
  disabled: false,
};
