import React from 'react';
import { StatusBar, SafeAreaView, Text, View, Image, StyleSheet,
  TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'querystring';
import axios from 'axios';


import { customerMobileNum, customerOtp, customerToken, customerFirstName, customerLastName } from '../../Redux/actions/customerInfo';
import { loginFailed } from '../../Redux/actions/other';
import { localAxios } from '../../utils/axios';
import Input from '../../Component/input';
import AppStatusBar from '../../Component/StatusBar';


function CustomerLogin ({ navigation }) {
  // vars and selectors
  const dispatch = useDispatch();

  const CustomerMobileNum = useSelector(state => state.CustomerMobileNum);
  const LoginFailed = useSelector(state => state.LoginFailed);


  // functions

  const backPage = () => {
    navigation.navigate('Welcome');
  };

  const registerRedirect = () => navigation.navigate('CustomerRegister');


  const onSubmit = async () => {
    const config = {
      mode: 'cors',
      crossDomain: true,
      'Access-Control-Allow-Origin': 'http://localhost:3000/SMSLogin',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };

    // api call
    await axios(localAxios('/SMSLogin', qs.stringify({
      mobileNum: CustomerMobileNum,
    })))
      .then(response => {
        if (response.data.message === 'Error! User is not found.') {
          console.log(`failed! = ${JSON.stringify(response.data)}`);
          dispatch(loginFailed());
        }

        console.log(response);
        dispatch(customerOtp(response.data.otp));
        dispatch(customerToken(response.data.token));
        dispatch(customerLastName(response.data.customerDetails[0].last_name));
        dispatch(customerFirstName(response.data.customerDetails[0].first_name));

        navigation.navigate('CustomerOtp');
      })
      .catch(err => {
        console.log(err);
      });
  };

  // from data
  const MobileNumData = {
    label: 'Mobile Number',
    placeholder: 'Mobile Number',
    updateValue: e => dispatch(customerMobileNum(e)),
    defaultValue: CustomerMobileNum,
    touched: '',
    restInput: '',
    disabled: false,
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar />
      <ScrollView>
        <TouchableOpacity onPress={backPage}>
          <Image
            style={styles.leftarrowing}
            source={require('../../Images/left-arrow.png')}
          />
        </TouchableOpacity>
        <View style={styles.form}>
          <Image
            style={styles.img}
            source={require('../../Images/logowhite.jpg')}
          />
          <Text style={styles.headText}>Enter the 4-Digit Mobile Verification Code </Text>
          <Text style={styles.headText}>You shall recive the code to your Number</Text>
          <View>
            <Text style={styles.mainText}>Verification Code</Text>
            <TouchableOpacity onPress={registerRedirect}>
              <Text style={styles.loginText}>Not registerd? Please <Text
                style={styles.underline}></Text>Register</Text>
            </TouchableOpacity>
            <Input componentData={ MobileNumData } />
          </View>
          <View>
            <TouchableOpacity onPress={onSubmit}>
              <Text style={styles.arrow}>&#x2794;</Text>
            </TouchableOpacity>
            <View>
              { LoginFailed
                ? <Text style={styles.error}>The number you have entered is not registered yet! Please Register first.</Text>
                : <Text></Text>
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CustomerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8200',
    height: '100%',
    width: '100%',
  },
  leftarrowing: {
    tintColor: '#FFFFFF',
    width: 25,
    height: 18,
    marginTop: '1.6%',
    marginLeft: '1.8%',
  },
  form: {
    paddingHorizontal: '8.8%',
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
    fontFamily: 'Poppins_400Regular',
    marginTop: '0.9%',
  },
  bold: {
    fontWeight: 'bold',
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 0.86,
    fontFamily: 'Poppins_400Regular',
    marginTop: '4.7%',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: 'Poppins_400Regular',
    marginTop: '0.4%',
    marginBottom: '1.6%',
  },
  error: {
    color: '#FF0000',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: 'Poppins_400Regular',
    marginTop: '0.4%',
    marginBottom: '1.6%',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 45,
    letterSpacing: 1.37,
    fontFamily: 'Poppins_400Regular',
    marginTop: '5.9%',
    marginBottom: '3%',
    textAlign: 'right',
  },
});
