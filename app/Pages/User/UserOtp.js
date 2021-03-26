import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import qs from 'querystring';

import { localAxiosToken } from '../../utils/axios';
import Input from '../../Component/input';
import AppStatusBar from '../../Component/StatusBar';
import { customerPackages } from '../../Redux/actions/customerInfo';


function CustomerOtp ({ navigation }) {
  const [ input, setInput ] = useState('');
  const dispatch = useDispatch();

  const customerOtpSelector = useSelector(state => state.CustomerOtp);
  const CustomerMobileNum = useSelector(state => state.CustomerMobileNum);
  const CustomerToken = useSelector(state => state.CustomerToken);

  // console.log(CustomerToken);

  let loggedIn = 0;

  // functions
  const onSubmit = () => {
    // check if the input matches the real otp
    if (input === customerOtpSelector) {
      // logged in
      console.log(`${customerOtpSelector} == ${input}`);
      loggedIn = true;
      navigation.navigate('CustomerWelcome');
      console.log('logged in');
    } else {
      loggedIn = false;
      console.log("'didn't match");
    }
  };

  const fetchPackageData = () => {
    axios(localAxiosToken('/getCustomerPackages', qs.stringify({mobileNum: CustomerMobileNum}), CustomerToken))
    .then(res => {
      if (res.data.statusCode === 200)
        dispatch(customerPackages((res.data.packageDetails).reverse()))
    })
  }


  const backPage = () => {
    navigation.navigate('CustomerRegister');
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
      { fetchPackageData() }
      <AppStatusBar />
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
          Hint! Your otp is {customerOtpSelector} .
          </Text>
          {/* ({ loggedIn })?
          <Text> You are logged in!</Text> :
          <Text> Please try again. </Text> */}
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
  //   responsiveBox: {
  //     width: wp('100%'),
  //     height: hp('100%'),
  //   },


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


export default CustomerOtp;
