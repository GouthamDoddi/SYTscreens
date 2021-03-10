import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import Input3 from '../../Component/input3';
import { useSelector, useDispatch } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import axios from 'axios';
import qs from 'querystring';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';

import { companyName, contactNumber, noOfVehicals } from '../../Redux/actions/transportCompanyInfo';
import { ownerMobileNum, ownerOtp, ownerToken } from '../../Redux/actions/ownerInfo';
import { localAxios, localAxiosToken } from '../../utils/axios';
import TruckRegisterComponent from '../../Component/truckRegisterComponent';
import { totalSpace, totalWeight, truckM0del, truckN0 } from '../../Redux/actions/ownerTruckInfo';
import AppStatusBarU from '../../Component/StatusBarU';


function TransportRegister ({ navigation }) {
  // vars and selectors
  const [ registered, setRegistered ] = useState(false);
  const [ truckComponentData, setTruckComponentData ] = useState([]);
  const [ trucks, setTrucks ] = useState(1);
  const [ selectTruck, setSelectTruck ] = useState(0);
  const dispatch = useDispatch();
  const CompanyName = useSelector(state => state.CompanyName);
  const NoOfVehicals = useSelector(state => state.NoOfVehicals);
  const ContactNumber = useSelector(state => state.ContactNumber);
  const [ rc, setrc ] = useState(0);
  const [ lc, setlc ] = useState(0);
  const OwnerMobileNum = useSelector(state => state.OwnerMobileNum);
  const truckNo = useSelector(state => state.TruckNo);
  const truckModel = useSelector(state => state.TruckModel);
  const capacityInSpace = useSelector(state => state.TotalSpace);
  const capacityInKgs = useSelector(state => state.TotalWeight);
  const OwnerToken = useSelector(state => state.OwnerToken);

  const formdata = new FormData();

  console.log(ContactNumber);

  // functions

  const getRC = async () => {
    // function to get rc document
    const rce = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [ 4, 3 ],
      // base64: true,
      quality: 1,
    });

    if (rce.uri) {
      // const rcByte = Buffer.from(rce.base64, 'base64');
      const localUri = rce.uri;
      const filename = localUri.split('/').pop();
      // Infer the type of the image
      const match = /\.(\w+)$/.exec(filename);
      const type = match
        ? `image/${match[1]}`
        : 'image';

      setrc({ uri: localUri, name: filename, type });
    }
  };

  const getLicence = async () => {
    // function to get licence
    const lce = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [ 4, 3 ],
      // base64: true,
      quality: 1,
    });

    if (lce.uri) {
      // const lcByte = Buffer.from(lce.base64, 'base64');

      const localUri = lce.uri;
      const filename = localUri.split('/').pop();
      // Infer the type of the image
      const match = /\.(\w+)$/.exec(filename);
      const type = match
        ? `image/${match[1]}`
        : 'image';

      setlc({ uri: localUri, name: filename, type });
    }
  };

  // api calls
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
        setTrucks(NoOfVehicals);
        dispatch(ownerOtp(res.data.otp));
        dispatch(ownerToken(res.data.token));
        truckRegister(NoOfVehicals, registered);
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
          <TouchableOpacity onPress={ () => setSelectTruck(1) }>
            <Text style={ styles.truckText }>Truck</Text>
          </TouchableOpacity>
        </View>,
      );
    }

    setTruckComponentData(truckList);
  }

  // API Calls

  function registerTruck () {
    formdata.append('truckNo', truckNo);
    formdata.append('truckModel', truckModel);
    formdata.append('capacityInKgs', capacityInKgs);
    formdata.append('capacityInSpace', capacityInSpace);
    formdata.append('rc', rc);
    formdata.append('license', lc);
    // formdata.append('mobileNum', OwnerMobileNum);
    formdata.append('companyMobileNum', ContactNumber);
    formdata.append('companyName', CompanyName);

    axios(localAxiosToken('/truckRegister', formdata, OwnerToken))
      .then(res => {
        if (res.data.statusCode === 201) {
          dispatch(noOfVehicals(NoOfVehicals - 1));
          setSelectTruck(selectTruck + 1);
          setRegistered(true);
          console.log(res.data);
          console.log(selectTruck);
        }
        setRegistered(false);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }


  // form data

  const companyNameData = {
    label: 'Company Name',
    // placeholder: 'Company Name',
    onChangeText: e => dispatch(companyName(e)),
    touched: '',
    restInput: '',
    disabled: false,
    // color: '#808080',
  };

  const vechileName = {
    label: 'Vechile Name',
    placeholder: 'Vechile Name',
    onChangeText: e => dispatch(truckM0del(e)),
    touched: '',
    restInput: '',
    disabled: false,
    color: '#808080',
  };

  const truckNoField = {
    label: 'Register plate Number',
    placeholder: 'Truck Number',
    onChangeText: e => dispatch(truckN0(e)),
    touched: '',
    restInput: '',
    disabled: false,
    color: '#808080',
  };

  const totalWeightField = {
    label: 'Weight Support in Kgs.',
    placeholder: 'Weight in Kgs.',
    onChangeText: e => dispatch(totalSpace(e)),
    touched: '',
    restInput: '',
    disabled: false,
    color: '#808080',
  };

  const totalSpaceField = {
    label: 'Space of Truck in ft.',
    placeholder: 'Space in ft.',
    onChangeText: e => dispatch(totalWeight(e)),
    touched: '',
    restInput: '',
    disabled: false,
    color: '#808080',
  };


  const contactNumberData = {
    label: 'Contact Number',
    // placeholder: 'Contact Number',
    onChangeText: e => dispatch(contactNumber(e)),
    touched: '',
    restInput: '',
    disabled: false,
    // color: '#808080',
  };

  const TruckMobileNum = {
    label: 'Truck Mobile Number',
    placeholder: 'Driver Number',
    onChangeText: e => dispatch(ownerMobileNum(e)),
    touched: '',
    restInput: '',
    disabled: false,
    color: '#808080',
  };

  const noOfVehicalsData = {
    label: 'Number of Vehicles',
    // placeholder: 'Number of Vehicles',
    onChangeText: e => {
      dispatch(noOfVehicals(e));
    },
    touched: '',
    restInput: '',
    disabled: false,
    // color: '#808080',
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
      <AppStatusBarU />

      <ScrollView>
        <TouchableOpacity onPress={backPage}>
          <Text style={styles.backarrow}>&#x2190;</Text>
        </TouchableOpacity>
        <Image
          style={styles.img}
          source={require('../../Images/logoblack.png')}
        />
        <Text style={styles.headText}>Want to be a <Text style={styles.bold}>Transportation Delivery Partner?</Text></Text>
        {
          selectTruck && NoOfVehicals
            ? <View>
              <TouchableOpacity onPress={() => setSelectTruck(0)}>
                <Text style={styles.backarrow}>&#x2190;</Text>
              </TouchableOpacity>
              <View style={styles.box}>
                <Text style={styles.mainText2}>Vehical Information No { selectTruck }</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <View style={{ width: '100%', marginRight: '1%' }}>
                    <Input3 componentData={vechileName} />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '10%' }}>
                  <View style={{ width: '48.8%', marginRight: '1.2%' }}>
                    <Input3 componentData={totalWeightField} />
                  </View>
                  <View style={{ width: '48.8%', marginLeft: '1.2%' }}>
                    <Input3 componentData={totalSpaceField} />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <View style={{ width: '48.8%', marginTop: '10%', marginLeft: '1.2%' }}>
                    <Input3 componentData={truckNoField} />
                  </View>
                  <View style={{ width: '48.8%', marginTop: '10%', marginLeft: '1.2%' }}>
                    <Input3 componentData={TruckMobileNum} />
                  </View>
                </View>
                <View>
                  <Text style={styles.bar}></Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: '10%' }}>
                      <Text style={styles.attachText}>Attach RC</Text>
                      <TouchableOpacity onPress={getRC}>
                        <Image
                          style={styles.link}
                          source={require('../../Images/box.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: '45%' }}>
                      <Text style={styles.attachText2}>Licence</Text>
                      <TouchableOpacity onPress={getLicence}>
                        <Image
                          style={styles.link}
                          source={require('../../Images/box.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonCancel}>
                      <Button color='#808080'
                        title='Cancel'
                      />
                    </View>
                    <View style={ styles.buttonDone } >
                      <Button color='black'
                        title='Done'
                        onPress={registerTruck}
                      />
                    </View>
                    {/* {
                      registered
                        ? <Text></Text>
                        : <Text>Registration failed</Text>
                    } */}
                  </View>
                </View>
                {/* { TruckRegisterFailed
                ? <Text>Truck registration failed.</Text>
                : <Text></Text>
              } */}
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '50%', height: 100 }}/>
                  <View style={{ width: '50%', height: 100 }}/>
                </View>
                {/* <TouchableOpacity onPress={onSubmit}>
                <Image
                  style={styles.arrow}
                  source={require('../../Images/right-arrow.png')}
                />
              </TouchableOpacity> */}
              </View>
            </View>
            : <View>
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
            </View>
        }
      </ScrollView>
    </View>
  // {/* // </View> */}
  );
}

export default TransportRegister;


const styles = StyleSheet.create({
  box: {
    paddingLeft: '8.8%',
    paddingRight: '8.5%',
    backgroundColor: 'white',
    borderRadius: 9,
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
    marginTop: '1%',
    alignSelf: 'flex-end',
    marginRight: '2%',
    width: 35,
    height: 30,
  },
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
  driver: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: 1.37,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
});
