import React, { useState } from 'react';
import Input from '../../Component/input3';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { companyName, contactNumber, allTruckData } from '../../Redux/actions/transportCompanyInfo';
import { localAxios } from '../../utils/axios';

import { useDispatch, useSelector } from 'react-redux';
import qs from 'querystring';
import axios from 'axios';
import { ownerOtp, ownerToken } from '../../Redux/actions/ownerInfo';


const TransportLogin = ({ navigation }) => {
  // vars
  const dispatch = useDispatch();
  const ContactNumber = useSelector(state => state.ContactNumber);
  const OwnerOtp = useSelector(state => state.OwnerOtp);
  const [ loginFailed, setLoginFailed ] = useState(false);

  // functions
  const mobileNumData = {
    placeholder: 'Contact number',
    onChangeText: e => dispatch(contactNumber(e)),
    touched: '',
    restInput: '',
    disabled: false,
  };

  const register = () => navigation.navigate('TransportRegister');

  // api calls
  const onSubmit = () => {
    const params = qs.stringify({ mobileNum: ContactNumber });

    axios(localAxios('/SMSLogin', params))
      .then(response => {
        console.log(response.data);
        if ( response.data.transportOwner[0] ) {
          dispatch(ownerOtp(response.data.otp));
          dispatch(companyName(response.data.transportOwner[0].company_name));
          dispatch(ownerToken(response.data.token));
          dispatch(allTruckData(response.data.truckDetails));
          navigation.navigate('TransportOtp');
        } else {
          setLoginFailed(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000000' />
      <ScrollView>
        <Image
          style={styles.img}
          source={require('../../Images/logoblack.png')}
        />
        <Text style={styles.headText}>Transportation Delivery Partnor</Text>
        <View>
          <Text style={styles.mainText}>Login</Text>
          <TouchableOpacity onPress={ register }>
            <Text style={styles.loginText}>Not registered? Please <Text style={styles.underline}>Register</Text></Text>
          </TouchableOpacity>
          <Input componentData={ mobileNumData }/>
        </View>
        <View>
          <TouchableOpacity onPress={ onSubmit }>
            <Text style={styles.arrow}>&#x2794;</Text>
          </TouchableOpacity>
        </View>
        {
          loginFailed
          ? <Text>The number you have entered is not registered!</Text>
          : <Text></Text>
        }
      </ScrollView>
    </View>);
};

export default TransportLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
    paddingHorizontal: '8.8%',
  },
  img: {
    width: 73.7,
    height: 94,
    marginTop: '5.5%',
  },
  headText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    // fontFamily: 'ArialMT',
    marginTop: '0.9%',
    fontWeight: 'bold',
  },
  mainText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 0.86,
    // fontFamily: 'ArialMT',
    marginTop: '4.2%',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    // fontFamily: 'ArialMT',
    marginTop: '0.4%',
    marginBottom: '4.6%',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 45,
    letterSpacing: 1.37,
    // fontFamily: 'ArialMT',
    marginTop: '59%',
    marginBottom: '3%',
    textAlign: 'right',
  },
});
