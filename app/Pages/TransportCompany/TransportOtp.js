import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import Input from '../../Component/input3';

import { useSelector, useDispatch } from 'react-redux';
import qs from 'querystring';
import axios from 'axios';

import { localAxios, localAxiosToken } from '../../utils/axios';
import { tripHistory } from '../../Redux/actions/ownerTruckInfo';


function TransportOtp ({ navigation }) {
  const [ otp, setOtp ] = useState('');
  const OwnerOtp = useSelector(state => state.OwnerOtp);
  const OwnerToken = useSelector(state => state.OwnerToken);
  const AllTruckData = useSelector(state => state.AllTruckData);
  // const TripHistory = useSelector(state => state.TripHistory);
  const dispatch = useDispatch();
  // const [ trips, setTrips ] = useState(false);

  const otpData = {
    label: 'Company Name',
    // placeholder: 'Company Name',
    onChangeText: e => setOtp(e),
    touched: '',
    restInput: '',
    // color: '#808080',
  };

  const backPage = () => {
    navigation.navigate('TransportRegister');
  };

  // functions
  const onSubmit = () => {
    // check if the input matches the real otp
    if (otp === OwnerOtp) {
      // logged in
      console.log(`${OwnerOtp} == ${otp}`);

      navigation.navigate('TransportAddTrip')

    } else {
      console.log("'didn't match");
    }
  };

  const fetchData = () => {
    
    const requestList = [];
    const listOfTrtips = [];

    if (AllTruckData) {
      for (let truck of AllTruckData) {
        const data = qs.stringify({ truckNo: truck.truck_no });

        console.log(`token = ${OwnerToken}`);
        requestList.push(
        axios(localAxiosToken('/getTripByTruckNo', data, OwnerToken))
        .then(res => {
          if (res.data.statusCode === 200)
            listOfTrtips.push(...res.data.message.tripDetails)
        }))          
      }

      Promise.all(requestList).then(() => dispatch(tripHistory(listOfTrtips)))

    } else {
      dispatch(tripHistory(false))
    }
  }

  return (
    // <View style={styles.responsiveBox}>
    <View style={styles.container}>
      <ScrollView>
        { fetchData() }
        <TouchableOpacity onPress={backPage}>
          <Text style={styles.backarrow}>&#x2190;</Text>
        </TouchableOpacity>
        <Image
          style={styles.img}
          source={require('../../Images/logoblack.png')}
        />
        <Text style={styles.headText}>Enter the 4-Digit Mobile Verification Code You shall recive the code to your Number</Text>
        <Text style={styles.mainText}>Verification Code</Text>
        <Input componentData={otpData} />
        <TouchableOpacity>
          <Text style={styles.loginText}>Resend Verification Code</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.arrow}>&#x2794;</Text>
          </TouchableOpacity>
          <Text style={ { color: 'white' } }>Hint: OTP = {OwnerOtp}</Text>
        </View>
      </ScrollView>
    </View>
    // {/* // </View> */}
  );

}

export default TransportOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
    paddingHorizontal: '8.8%',
  },
  backarrow: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 45,
    marginTop: '1.6%',
    marginLeft: '-2.8%',
  },
  img: {
    width: 73.7,
    height: 94,
    marginTop: '3.2%',
  },
  headText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    // fontFamily: 'ArialMT',
    marginTop: '0.9%',
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 0.86,
    // fontFamily: 'ArialMT',
    marginTop: '8.4%',
  },
  box: {
    flexDirection: 'row',
    marginLeft: '-2.8%',
    marginTop: '2.3%',
    marginBottom: '1.4%',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    // fontFamily: 'ArialMT',
    marginTop: '1.4%',
    marginBottom: '1.6%',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 45,
    letterSpacing: 1.37,
    // fontFamily: 'ArialMT',
    marginTop: '14.5%',
    marginBottom: '3%',
    textAlign: 'right',
  },
});
