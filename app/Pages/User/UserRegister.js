import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../Component/input';
import { useDispatch, useSelector } from 'react-redux';
import { customerFirstName,
  customerLastName, customerMobileNum } from '../../Redux/actions/customerInfo';


// using rect hooks to intitalize vars with state
// const firstName = useSelector(state => state.CustomerFirstName);
// const lastName = useSelector(state => state.CustomerLastName);
// const mobileNum = useSelector(state => state.CustomerMobileNum);


// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FF8200',
//     height: '50%',
//     width: '50%',
//   },
// });


const UserRegister = () => {
  const dispatch = useDispatch();
  const firstNameData = {
    label: 'First Name',
    placeholder: 'First Name',
    touched: '',
    error: '',
    onChangeText: e => dispatch(customerFirstName(e.target.value)),
  };

  return (
    <View>
      <Input formData={ firstNameData } />
    </View>);
};

export default UserRegister;
