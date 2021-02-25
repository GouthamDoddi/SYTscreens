import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet,
  TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'querystring';
import axios from 'axios';

import { ownerToken, ownerOtp, ownerMobileNum, ownerFullName } from '../../Redux/actions/ownerInfo';
import { truckN0 } from '../../Redux/actions/ownerTruckInfo';
// import { loginFailed } from '../../Redux/actions/other';
import { localAxios } from '../../utils/axios';
import Input from '../../Component/input';
import AppStatusBar from '../../Component/StatusBar';


function CustomerLogin ({ navigation }) {
  // vars and selectors
  const dispatch = useDispatch();

  let login = true;

  const OwnerMobileNum = useSelector(state => state.OwnerMobileNum);
  // const LoginFailed = useSelector(state => state.LoginFailed);
  const OwnerToken = useSelector(state => state.OwnerToken);

  // functions

  const backPage = () => {
    navigation.navigate('Welcome');
  };

  const registerRedirect = () => navigation.navigate('CustomerRegister');


  const onSubmit = async () => {
    console.log('login called!');
    const loginData = qs.stringify({ mobileNum: OwnerMobileNum });

    // api call
    await axios(localAxios('/SMSLogin', loginData))
      .then(response => {
        console.log(`respose data here ${JSON.stringify(response.data)}`);
        if (response.data.statusCode !== 400) {
          if (response.data.truckOwner) {
            console.log(response.data);
            console.log(response.data.truckDetails[0].truck_no);
            // eslint-disable-next-line function-call-argument-newline
            dispatch(ownerOtp(response.data.otp));
            dispatch(ownerMobileNum(response.data.truckOwner[0].mobile_num));
            dispatch(ownerToken(response.data.token));
            dispatch(ownerFullName(response.data.truckOwner[0].full_name));
            dispatch(truckN0(response.data.truckDetails[0].truck_no));
            // dispatch(loginFailed(false));
            login = true;
            navigation.navigate('OwnerOtp');
          }
          login = false;
        }
        // dispatch(loginFailed('Failed'));
        login = false;

        return 0;
      })
      .catch(err => {
        console.log(err);
      });

    console.log(`login = ${login}`);

    // const config = {
    //   mode: 'cors',
    //   crossDomain: true,
    //   'Access-Control-Allow-Origin': 'http://192.168.2.4:3000/SMSLogin',
    //   headers: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    // };

    // // api call
    // await axios.post('http://192.168.2.4:3000/SMSLogin', qs.stringify({
    //   mobileNum: OwnerMobileNum,
    // }), config)
    //   .then(response => {
    //     if (response.data.message === 'Error! User is not found.') {
    //       console.log(response.data);
    //       dispatch(loginFailed());
    //     }

    //     console.log(response.data);
    //     // dispatch(ownerOtp(response.data.otp));
    //     // dispatch(ownerToken(response.data.token));
    //     // navigation.navigate('OwnerOtp');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  // from data
  const MobileNumData = {
    label: 'Mobile Number',
    placeholder: 'Mobile Number',
    updateValue: e => dispatch(ownerMobileNum(e)),
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
          </View>
          <View>
            { login
              ? <Text></Text>

              : <Text style={styles.error}>The number you have entered is not registered yet! Please Register first.</Text>
            }
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
