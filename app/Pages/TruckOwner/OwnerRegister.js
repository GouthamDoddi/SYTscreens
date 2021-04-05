import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet,
  TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'querystring';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import axios from 'axios';
import { Buffer } from 'buffer';

import { ownerFullName, ownerToken, ownerOtp, ownerMobileNum } from '../../Redux/actions/ownerInfo';
import { truckM0del, truckN0, totalSpace, totalWeight } from '../../Redux/actions/ownerTruckInfo';
import { truckRegisterFailed } from '../../Redux/actions/other';

// import { getImgBlob } from '../../utils/formData';
import { localAxios, localAxiosFormData, localAxiosToken } from '../../utils/axios';
import Input from '../../Component/input';

function OwnerRegister ({ navigation }) {
  // vars and selectors

  const [ rc, setrc ] = useState(0);
  const [ lc, setlc ] = useState(0);

  let login = true;

  const dispatch = useDispatch();
  const OwnerFullName = useSelector(state => state.OwnerFullName);
  const OwnerMobileNum = useSelector(state => state.OwnerMobileNum);
  const truckNo = useSelector(state => state.TruckNo);
  const truckModel = useSelector(state => state.TruckModel);
  const capacityInSpace = useSelector(state => state.TotalSpace);
  const capacityInKgs = useSelector(state => state.TotalWeight);
  const TruckRegisterFailed = useSelector(state => state.TruckRegisterFailed);


  console.log(OwnerFullName);

  const truckOwnerData = qs.stringify({
    fullName: OwnerFullName,
    mobileNum: OwnerMobileNum,
  });

  const formdata = new FormData();


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

  const backPage = () => navigation.navigate('Welcome');

  const onSubmit = async () => {
    console.log('Onsubmit called!');
    // const path = rc.uri.replace('file://', '');

    // const path2 = lc.uri.replace('file://', '');


    // const rcBlob = {
    //   name: 'rc',
    //   filename: `${OwnerFulName}/rc.jpg`,
    //   buffer: rc.base64,
    // };
    // const lcBlob = {
    //   name: 'licence',
    //   filename: `${OwnerFulName}/licence.jpg`,
    //   buffer: lc.base64,
    // };

    formdata.append('truckNo', truckNo);
    formdata.append('truckModel', truckModel);
    formdata.append('capacityInKgs', capacityInKgs);
    formdata.append('capacityInSpace', capacityInSpace);
    formdata.append('rc', rc);
    formdata.append('license', lc);
    formdata.append('mobileNum', OwnerMobileNum);
    formdata.append('truckDriver', OwnerFullName);

    // formdata.append('image', rc.base64);

    try {
      await axios(localAxios('/truckOwnerRegister', truckOwnerData))
        .then(async resp => {
          console.log(truckOwnerData);
          if (resp.data.statusCode !== 201) {
            console.log(`login faild data here ${JSON.stringify(resp.data)}`);
            // using login since the register send's otp anyway. So no need to login again.
            // dispatch(loginFailed('Failed'));
            login = false;

            return 0;
          }

          console.log(`register data here ${JSON.stringify(resp.data)}`);
          dispatch(ownerOtp(resp.data.otp));
          dispatch(ownerToken(resp.data.token));

          const { token } = resp.data;

          login = true;
          // truck register

          await axios(localAxiosFormData('/truckRegister', formdata, token))
            .then(res => {
              console.log(res);
              if (res.data.statusCode !== 200) {
                dispatch(truckRegisterFailed('Failed'));
                console.log(`register failed ${JSON.stringify(res)}`);
              }
              navigation.navigate('OwnerOtp');
              console.log(JSON.stringify(res.data));
            })
            .catch(err => {
              console.log(err);
              dispatch(truckRegisterFailed('Failed'));
            });
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const loginRedirect = () => navigation.navigate('OwnerLogin');

  // form data

  const fullName = {
    // label: 'Full Name',
    placeholder: 'Full Name',
    updateValue: e => {
      dispatch(ownerFullName(e));
    },
    touched: '',
    restInput: '',
    disabled: false,
  };

  const mobileNum = {
    // label: 'Mobile Number',
    placeholder: 'Mobile Number',
    updateValue: e => dispatch(ownerMobileNum(e)),
    touched: '',
    restInput: '',
    disabled: false,
  };

  const vechileName = {
    // label: 'Vechile Name',
    placeholder: 'Vechile Name',
    updateValue: e => dispatch(truckM0del(e)),
    touched: '',
    restInput: '',
    disabled: false,
  };

  const truckNoField = {
    // label: 'Register plate Number',
    placeholder: 'Register plate Number',
    updateValue: e => dispatch(truckN0(e)),
    touched: '',
    restInput: '',
    disabled: false,
  };

  const totalWeightField = {
    // label: 'Weight Support in Kgs.',
    placeholder: 'Weight Support in Kgs.',
    updateValue: e => dispatch(totalSpace(e)),
    touched: '',
    restInput: '',
    disabled: false,
  };

  const totalSpaceField = {
    // label: 'Space of Truck in ft.',
    placeholder: 'Space of Truck in ft.',
    updateValue: e => dispatch(totalWeight(e)),
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
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor='#FF8200' />
      <ScrollView>
        <View style={styles.box}>
          <TouchableOpacity onPress={backPage}>
            <Image
              style={styles.leftarrowimg}
              source={require('../../Images/left-arrow.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.img}
            source={require('../../Images/logowhite.jpg')}
          />
          <Text style={styles.headText}>Want to be an <Text style={styles.bold}>Individual Delivery Partner?</Text></Text>
          <View>
            <Text style={styles.mainText}>Register</Text>
            <TouchableOpacity onPress={loginRedirect}>
              <Text style={styles.loginText}>Already registered? Please <Text style={styles.underline}>Login</Text></Text>
            </TouchableOpacity>
            <Input componentData={fullName} />
            <Input componentData={mobileNum} />
          </View>
        </View>
        <Text style={styles.border}>—————————————————————————————————————————————————————————————————</Text>
        <View style={styles.box}>
          <Text style={styles.mainText2}>Vehical Information</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: '49%', marginRight: '1%' }}>
              <Input componentData={vechileName} />
            </View>
            <View style={{ width: '49%', marginLeft: '1%' }}>
              <Input componentData={truckNoField} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ width: '48.8%', marginRight: '1.2%' }}>
              <Input componentData={totalWeightField} />
            </View>
            <View style={{ width: '48.8%', marginLeft: '1.2%' }}>
              <Input componentData={totalSpaceField} />
            </View>
          </View>
          <View>
            <Text style={styles.bar}></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={styles.attachText}>Attach RC</Text>
                <TouchableOpacity onPress={getRC}>
                  <Image
                    style={styles.link}
                    source={require('../../Images/link.jpg')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={styles.attachText}>Attach Licence</Text>
                <TouchableOpacity onPress={getLicence}>
                  <Image
                    style={styles.link}
                    source={require('../../Images/link.jpg')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          { TruckRegisterFailed
            ? <Text>Truck registration failed.</Text>
            : <Text></Text>
          }
          { login
            ? <Text></Text>
            : <Text>Truck registration failed.</Text>
          }
          {/* { image
            ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            : <View></View>
          } */}
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '50%', height: 100 }}/>
            <View style={{ width: '50%', height: 100 }}/>
          </View>
          <TouchableOpacity onPress={onSubmit}>
            <Image
              style={styles.arrow}
              source={require('../../Images/right-arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


export default OwnerRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8200',
    height: '100%',
    width: '100%',
  },
  leftarrowimg: {
    tintColor: '#FFFFFF',
    width: 30,
    height: 20,
    marginTop: '3%',
    marginLeft: '-2.4%',
  },
  box: {
    paddingLeft: '8.8%',
    paddingRight: '8.5%',
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0.37,
    fontFamily: 'Poppins_400Regular',
    marginTop: '0.2%',
  },
  link: {
    height: 30,
    width: 35,
    marginTop: -8,
    marginLeft: 15,
  },
  arrow: {
    tintColor: '#FFFFFF',
    marginTop: '1%',
    alignSelf: 'flex-end',
    marginRight: '2%',
    width: 35,
    height: 30,
  },
});
