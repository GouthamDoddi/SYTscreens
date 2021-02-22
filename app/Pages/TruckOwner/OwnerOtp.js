import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import qs from 'querystring';
import axios from 'axios';

import Input from '../../Component/input';
import { localAxios, localAxiosToken } from '../../utils/axios';
import { tripHistory } from '../../Redux/actions/ownerTruckInfo';


function OwnerOTP ({ navigation }) {
  let TruckNo = useSelector(state => state.TruckNo);
  const OwnerToken = useSelector(state => state.OwnerToken);
  const [ input, setInput ] = useState('');

  const dispatch = useDispatch();

  const OwnerOtp = useSelector(state => state.OwnerOtp);

  console.log(OwnerOtp);

  // functions
  const onSubmit = () => {
    // check if the input matches the real otp
    if (input === OwnerOtp) {
      // logged in
      console.log(`${OwnerOtp} == ${input}`);

      // TruckNo = 'AP31EJ700';
      const data = qs.stringify({ truckNo: TruckNo });

      console.log(`token = ${OwnerToken}`);

      axios(localAxiosToken('/getTripByTruckNo', data, OwnerToken))
        .then(resp => {
          console.log(resp.data);
          const tripDetails = resp.data.message.tripDetails
            ? resp.data.message.tripDetails
            : 0;

          console.log(`my condolences ${JSON.stringify(tripDetails)}`);

          dispatch(tripHistory(tripDetails));
        })
        .catch(err => console.log(err));
      navigation.navigate('OwnerTripRegister');
      console.log('logged in');
    } else {
      console.log("'didn't match");
    }
  };


  const backPage = () => {
    navigation.navigate('OwnerRegister');
  };

  // formData

  const OtpData = {
    label: '',
    placeholder: '',
    updateValue: e => setInput(e),
    touched: '',
    restInput: input,
    disabled: false,
  };


  // loading fonts
  const [ isLoaded ] = useFonts({
    Poppins_400Regular,
  });

  if (!isLoaded)
    return <AppLoading />;

  return (
    // <View style={styles.responsiveBox}>
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={backPage}>
          <Text style={styles.backarrow}>&#x2190;</Text>
        </TouchableOpacity>
        <Image
          style={styles.img}
          source={require('../../Images/logowhite.jpg')}
        />
        <Text style={styles.headText}>Enter the 4-Digit Mobile Verification Code You shall recive the code to your Number</Text>
        <Text style={styles.mainText}>Verification Code</Text>
        <Input componentData={ OtpData } />
        <TouchableOpacity>
          <Text style={styles.loginText}>Resend Verification Code</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.arrow}>&#x2794;</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>
          Hint! Your otp is {OwnerOtp} .
          </Text>
        </View>
      </ScrollView>
    </View>
    // {/* // </View> */}
  );
}


// css styles below.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8200',
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
    fontFamily: '',
    marginTop: '0.9%',
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 0.86,
    fontFamily: '',
    marginTop: '8.4%',
    marginBottom: '2.3%',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: '',
    marginTop: '1.4%',
    marginBottom: '1.6%',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 45,
    letterSpacing: 1.37,
    fontFamily: '',
    marginTop: '14.5%',
    marginBottom: '3%',
    textAlign: 'right',
  },
});


export default OwnerOTP;
