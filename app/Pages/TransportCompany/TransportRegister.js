import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Input3 from '../../Component/input3';
import { useSelector, useDispatch } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import axios from 'axios';
import qs from 'querystring';

import { companyName, contactNumber, noOfVehicals } from '../../Redux/actions/transportCompanyInfo';
import { localAxios } from '../../utils/axios';
import TruckRegisterComponent from '../../Component/truckRegisterComponent';


function TransportRegister ({ navigation }) {
  // vars and selectors
  const [ registered, setRegistered ] = useState(false);
  const [ truckComponentData, setTruckComponentData ] = useState([]);
  const [ trucks, setTrucks ] = useState(1);
  const dispatch = useDispatch();
  const CompanyName = useSelector(state => state.CompanyName);
  const NoOfVehicals = useSelector(state => state.NoOfVehicals);
  const ContactNumber = useSelector(state => state.ContactNumber);

  console.log(ContactNumber);

  // functions

  const otp = () => {
    const params = qs.stringify({
      companyName: CompanyName,
      noOfTrucks: NoOfVehicals,
      mobileNum: ContactNumber,
    });

    console.log(params);

    axios(localAxios('/transportCompanyRegister', params))
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const backPage = () => {
    navigation.navigate('Welcome');
  };

  function onSubmit () {
    console.log('on submit');
  }

  function driver () {
    console.log('on submit');
  }

  function truckRegister (n, registered) {
    const truckList = [];

    for (let i = 0; i < n; i++) {
      truckList.push(
        <View key={i} style={ styles.truck }>
          { registered
            ? <Text style={ styles.truckText2 }>*</Text>
            : <Text style={ styles.truckText2 }>!</Text>
          }
          <Text style={ styles.truckText }>Truck</Text>
        </View>,
      );
    }

    setTruckComponentData(truckList);
  }


  // form data

  const companyNameData = {
    label: 'Company Name',
    placeholder: 'Company Name',
    onChangeText: e => dispatch(companyName(e)),
    touched: '',
    restInput: '',
    disabled: false,
  };

  const contactNumberData = {
    label: 'Contact Number',
    placeholder: 'Contact Number',
    onChangeText: e => dispatch(contactNumber(e)),
    touched: '',
    restInput: '',
    disabled: false,
  };

  const noOfVehicalsData = {
    label: 'Number of Vehicles',
    placeholder: 'Number of Vehicles',
    onChangeText: e => {
      dispatch(noOfVehicals(e));
      setTrucks(e);
      truckRegister(e, registered);
    },
    touched: '',
    restInput: '',
    disabled: false,
  };

  // loading fonts
  const [ isLoaded ] = useFonts({
    Poppins_400Regular,
  });

  if (!isLoaded)
    return <AppLoading />;

  // code for the page

  return (
  // <View style={styles.responsiveBox}>
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={backPage}>
          <Text style={styles.backarrow}>&#x2190;</Text>
        </TouchableOpacity>
        <Image
          style={styles.img}
          source={require('../../Images/logoblack.png')}
        />
        <Text style={styles.headText}>Want to be a <Text style={styles.bold}>Transportation Delivery Partner?</Text></Text>
        <View>
          <Text style={styles.mainText}>Register</Text>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.loginText}>Already registered? Please <Text style={styles.underline}>Login</Text></Text>
          </TouchableOpacity>
          <Input3 componentData={ companyNameData } />
          <Input3 componentData={ contactNumberData } />
          <Input3 componentData={ noOfVehicalsData } />
        </View>
        <View style={styles.viewBorder}>
        </View>
        <Text style={ styles.vi}>Vehical Information</Text>
        {/* <TouchableOpacity onPress={driver}>
          <Text style={styles.driver}>Driver Register</Text>
        </TouchableOpacity> */}
        <View>
          <TruckRegisterComponent truckComponents= { truckComponentData } />
        </View>
        <View>
          <TouchableOpacity onPress={otp}>
            <Text style={styles.arrow}>&#x2794;</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  // {/* // </View> */}
  );
}

export default TransportRegister;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    marginBottom: 0,
    marginLeft: '-2.8%',
    marginRight: 0,
  },
  truck: { marginTop: 30,
    paddingLeft: 10,
    height: 70,
    width: 70,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ff8f35' },
  truckText: { color: 'white',
    // paddingTop: 15,
    paddingLeft: 3,
    textDecorationLine: 'underline' },
  truckText2: { color: 'white',
    paddingLeft: 3 },
  viewBorder:
  { marginTop: '7%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dotted' },

  vi: {
    color: 'white',
    fontSize: 25,
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
    marginTop: '2.2%',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: 'Poppins_400Regular',
    marginTop: '0.4%',
    marginBottom: '1.9%',
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
    marginTop: '9%',
    marginBottom: '3%',
    textAlign: 'right',
  },
  driver: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 1.37,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
});
