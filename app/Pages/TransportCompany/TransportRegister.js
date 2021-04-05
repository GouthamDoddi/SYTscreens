/* eslint-disable no-negated-condition */
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Input3 from '../../Component/input3';
import { useSelector, useDispatch } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import axios from 'axios';
import qs from 'querystring';

import { companyName, contactNumber, noOfVehicals, selectedTruck } from '../../Redux/actions/transportCompanyInfo';
import { truckRegisterFailed } from '../../Redux/actions/other';
import { ownerOtp, ownerToken } from '../../Redux/actions/ownerInfo';
import { localAxios } from '../../utils/axios';
import AppStatusBarU from '../../Component/StatusBarU';
import TruckRegisterComponent from '../../Component/truckRegisterComponent';


function TransportRegister ({ navigation }) {
  // vars and selectors
  const dispatch = useDispatch();
  const [ registered, setRegistered ] = useState(false);
  const CompanyName = useSelector(state => state.CompanyName);
  const NoOfVehicals = useSelector(state => state.NoOfVehicals);
  const ContactNumber = useSelector(state => state.ContactNumber);
  const TruckRegisterFailed = useSelector(state => state.TruckRegisterFailed);
  // api calls
  const otp = () => {
    const params = qs.stringify({
      companyName: CompanyName,
      noOfTrucks: NoOfVehicals.length,
      mobileNum: ContactNumber,
    });

    console.log(params);

    axios(localAxios('/transportCompanyRegister', params))
      .then(res => {
        console.log(res.data);
        if (res.data.statusCode === 201) {
          dispatch(ownerOtp(res.data.otp));
          dispatch(ownerToken(res.data.token));
          dispatch(truckRegisterFailed(true));
          setRegistered(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const backPage = () => {
    navigation.navigate('Welcome');
  };

  function onSubmit () {
    navigation.navigate('TransportLogin');
  }

  function driver () {
    console.log('on submit');
  }

  console.log(NoOfVehicals);
  const TruckList = NoOfVehicals.length
    ? NoOfVehicals.map(data =>
      <View key={data[0]} style={ styles.truck }>
        { data[1]
          ? <Text style={ styles.truckText2 }>*</Text>
          : <Text style={ styles.truckText2 }>!</Text>
        }
        <TouchableOpacity onPress={ () => {
          dispatch(selectedTruck(data[0]));
          navigation.navigate('TransportTruckRegister');
        } }>
          <Text style={ styles.truckText }>Truck</Text>
        </TouchableOpacity>
      </View>)
    : [];


  // API Calls

  // form data

  const companyNameData = {
    label: 'Company Name',
    // placeholder: 'Company Name',
    onChangeText: e => dispatch(companyName(e)),
    touched: '',
    restInput: '',
    disabled: TruckRegisterFailed,
    // color: '#808080',
  };


  const contactNumberData = {
    label: 'Contact Number',
    // placeholder: 'Contact Number',
    onChangeText: e => dispatch(contactNumber(e)),
    touched: '',
    restInput: '',
    disabled: TruckRegisterFailed,
    // color: '#808080',
  };


  const noOfVehicalsData = {
    label: 'Number of Vehicles',
    // placeholder: 'Number of Vehicles',
    onChangeText: e => {
      const listOfTrucks = [];

      for (let i = 1; i <= e; i++)
        listOfTrucks.push([ i, false ]);

      dispatch(noOfVehicals(listOfTrucks));
    },
    touched: '',
    restInput: '',
    disabled: TruckRegisterFailed,
    // color: '#808080',
  };

  console.log(NoOfVehicals);

  function nextPage () {
    const next = NoOfVehicals.map(data => {
      const ret = data[1]
        ? 1
        : 0;

      return ret;
    });
    const allTruckReg = next.reduce((a, b) => a + b, 0);

    console.log(allTruckReg);

    if (allTruckReg === NoOfVehicals.length)
      navigation.navigate('TransportOtp');
  }

  console.log(`login and registred = ${TruckRegisterFailed} and ${registered}`);

  // useEffect(() => {
  //   nextPage();
  // });

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
      <StatusBar backgroundColor='#000000' />
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
          { !TruckRegisterFailed
            ? <View>
              <View>
                <Text style={styles.mainText}>Register</Text>
                <TouchableOpacity onPress={onSubmit}>
                  <Text style={styles.loginText}>Already registered? Please <Text style={styles.underline}>Login</Text></Text>
                </TouchableOpacity>
                <Input3 componentData={ companyNameData } />
                <Input3 componentData={ contactNumberData } />
                <Input3 componentData={ noOfVehicalsData } />
              </View>
              <View>
                <TouchableOpacity onPress={otp}>
                  <Text style={styles.arrow}>&#x2794;</Text>
                </TouchableOpacity>
              </View>
            </View>
            : <Text></Text>
          }
          { TruckRegisterFailed || registered
            ? <View>
              <Text style={ styles.vi}>Vehical Information</Text>
              {/* <TouchableOpacity onPress={driver}>
                    <Text style={styles.driver}>Driver Register</Text>
                  </TouchableOpacity> */}
              <View>
                {/* {
                registered */}
                <TruckRegisterComponent truckComponents={ TruckList } />
                {/* : <Text></Text>
              } */}
              </View>
              <View>
                <TouchableOpacity onPress={nextPage}>
                  <Text style={styles.arrow}>&#x2794;</Text>
                </TouchableOpacity>
              </View>
            </View>
            : <Text></Text>
          }
        </View>
      </ScrollView>
    </View>
  // {/* // </View> */}
  );
}

export default TransportRegister;


const styles = StyleSheet.create({
  box: {
    paddingLeft: '0.8%',
    paddingRight: '0.8%',
    backgroundColor: 'white',
  },
  buttonCancel: {
    marginRight: '70%',
    marginTop: '20%',
  },
  buttonDone: {
    marginTop: '20%',
    marginRight: '50%',
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
    marginBottom: '2%',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  border: {
    // borderBottomColor:'#FFFFFF',
    // borderBottomWidth:1,
    // borderStyle: 'dotted',
    // height:'1%',
    marginTop: '2.7%',
    fontSize: 4,
    lineHeight: 10,
    letterSpacing: 3.26,
    color: '#FFFFFF',
    height: 10,

  },
  mainText2: {
    color: '#000000',
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0.69,
    fontFamily: 'Poppins_400Regular',
    marginTop: '1.6%',
    marginLeft: '1.5%',
  },
  bar: {
    borderLeftColor: '#FFFFFF',
    borderLeftWidth: 1,
    height: 17,
    marginTop: '1.7%',
    marginBottom: 0,
    alignSelf: 'center',
  },
  attachText: {
    color: 'black',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0.37,
    fontFamily: 'Poppins_400Regular',
    marginTop: '0.2%',
    marginLeft: '35%',
  },
  attachText2: {
    color: 'black',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0.37,
    fontFamily: 'Poppins_400Regular',
    marginTop: '0.2%',
    marginLeft: '50%',
  },
  link: {
    height: 30,
    width: 35,
    marginTop: -8,
    marginLeft: 20,
  },
  arrow: {
    color: '#FFFFFF',
    marginTop: '8%',
    alignSelf: 'flex-end',
    // marginRight: '2%',
    marginLeft: '2%',
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
    paddingHorizontal: '5.8%',
  },
  //   responsiveBox: {
  //     width: wp('100%'),
  //     height: hp('100%'),
  //   },
  backarrow: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 45,
    marginTop: '4.6%',
    marginBottom: 0,
    marginLeft: '2.8%',
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
  driver: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 1.37,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
});
