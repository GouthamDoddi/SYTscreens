import React, { useState } from 'react';
import { Text, View, Image, StyleSheet,
  TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
// import axios from 'axios';
import qs from 'querystring';

import Header from '../../Component/Header';
import DropDown from '../../Component/DropDown';
import Input2 from '../../Component/Input2';
import DatePicker from '../../Component/DataPicker';

import { pickUp, drop, pickUpDate, packageWeight,
  packageSpace, entireTruck, receivingPersonName,
  receivingPersonNum } from '../../Redux/actions/packageDetails';
import { allTripIdsNTruckNos, noOfTripsFound, allTruckDetails, allTruckSpaceNWeight } from '../../Redux/actions/tripsAvailable';
import { getListOfTruckIds } from '../../utils/formData';
import { axios, configToken } from '../../utils/axios';
import AppStatusBar from '../../Component/StatusBar';


const CustomerAddPackage = ({ navigation }) => {
  // vars and redux
  const pickUpPointSelector = useSelector(state => state.PickUp);
  const dropPointSelector = useSelector(state => state.Drop);
  const dateSelector = useSelector(state => state.PickUpDate);
  const entireTruckSelector = useSelector(state => state.EntireTruck);
  const receivingPersonNameSelector = useSelector(state => state.ReceivingPersonName);
  const packageSpaceSelector = useSelector(state => state.PackageSpace);
  const packageWeightSelector = useSelector(state => state.PackageWeight);
  const receivingPersonNumSelector = useSelector(state => state.ReceivingPersonNum);
  const customerTokenSelector = useSelector(state => state.CustomerToken);
  const allTruckDetailsSelector = useSelector(state => state.AllTruckDetails);
  const noOfTripsSelector = useSelector(state => state.NoOfTrips);
  const allTripDataSelector = useSelector(state => state.AllTripIdsNTruckNos);


  const dispatch = useDispatch();
  const CustomerFullName = useSelector(state => `${state.CustomerFirstName} ${state.CustomerLastName}`);

  // intigrating API

  const params = `${qs.stringify({
    pickUpPoint: pickUpPointSelector,
    dropPoint: dropPointSelector,
    entireTruck: entireTruckSelector,
    receivingPersonName: receivingPersonNameSelector,
    receivingPersonNo: receivingPersonNumSelector,
    packageSpace: packageSpaceSelector,
    packageWeight: packageWeightSelector,
  })}&date=${dateSelector}`;

  const params2 = `${qs.stringify({
    source: pickUpPointSelector,
    destination: dropPointSelector,
  })}&startDate=${dateSelector}`;

  const onSubmit = async () => {
    console.log(params);
    console.log(dateSelector);
    const truckSpaceNWeight = [];
    const truckDetails = [];

    // some mean logic here below!
    try {
      // first call register the package

      // get trips wich match that of the package details
      await axios.post('/getTrip', params2, configToken(customerTokenSelector))
        .then(async res => {
          if (res.data.statusCode === 400) {
            console.log(`2nd api call failed ${JSON.stringify(res.data)}`);
            dispatch(noOfTripsFound(0));

            return res.data;
          }
          console.log(`inside 2nd api call. trips = ${res.data.message.numberOfTrip}`);
          dispatch(noOfTripsFound(res.data.message.numberOfTrip));
          const listOfData = getListOfTruckIds(res.data.message.tripDetails);

          dispatch(allTripIdsNTruckNos(listOfData));

          console.log(`listOfData = ${listOfData}`);
          // since the data is dispatched we can use it
          // in the next page to render trips details


          // loop through each of the trip found in the earlier api call
          // then get the details of the truck involved in the trip

          for (const truck of listOfData) {
            console.log(`this is truckNo = ${truck.truckNo}`);
            const { truckNo } = truck;
            const x = await axios.post('/getTruck', qs.stringify({ truckNo }), configToken(customerTokenSelector))
              .then(res => {
                const y = res.data.message[0];
                const { rc, license, ...details } = y;

                return details;
              })
              .catch(error => console.log(error));

            truckDetails.push(x);
          }
          dispatch(allTruckDetails(truckDetails));

          // loop through each trip in the total trips that matched.
          // then take the truck no from the trip details and get
          // info about the space and weight available in the truck
          for (const truck of listOfData) {
            console.log(`this is truckNo = ${truck.truckNo}`);
            const { truckNo } = truck;
            const x = await axios.post('/getAvailableSpace', qs.stringify({ truckNo }), configToken(customerTokenSelector))
              .then(res => {
                const y = res.data;
                const { ipAddress, statsCode, ...details } = y;

                return details;
              })
              .catch(error => console.log(error));

            truckSpaceNWeight.push(x);
          }
          dispatch(allTruckSpaceNWeight(truckSpaceNWeight));
          console.log(`truck space is ${JSON.stringify(truckSpaceNWeight)}`);

          navigation.navigate('CustomerTruckAvailable');

          return 1;
        })
        .catch(error => console.log(`this error accured in getTrips API call ${error}`));
    } catch (err) {
      console.log(err);
    }
  };

  // functions

  const fulltruck = () => {
    dispatch(entireTruck());
  };

  const addDate = date => {
    console.log('addDate called');
    dispatch(pickUpDate(date));
  };

  const pickUpDispatch = data => dispatch(pickUp(data));
  const dropDispatch = data => dispatch(drop(data));

  // form data
  const PackageWeightInput = {
    label: '',
    placeholder: 'Package Weight (.KG)',
    onChangeText (e) {
      dispatch(packageWeight(e));
    },
  };
  const PackageSpacetInput = {
    label: '',
    placeholder: 'Package Space (.Ft)',
    onChangeText (e) {
      dispatch(packageSpace(e));
    },
  };
  const ReceivingPersonNameInput = {
    label: '',
    placeholder: 'Package receiving Person Name',
    onChangeText (e) {
      dispatch(receivingPersonName(e));
    },
  };
  const ReceivingPersonNumInput = {
    label: '',
    placeholder: 'Receiving Person Mobile Number',
    onChangeText (e) {
      dispatch(receivingPersonNum(e));
    },
  };

  const HeaderData = {
    onSubmit () {
      console.log('onSubmit called');
    },
  };

  return (
    <View style={styles.container}>
      <Header data = {HeaderData}/>
      <View style={styles.block}>
        <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>{CustomerFullName} !</Text></Text>
        <TouchableOpacity>
          <Text style={styles.add}>Add a Package +</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#FFFFFF', borderWidth: 0.3, marginBottom: '2.1%', paddingBottom: '2.5%' }}>
          <View style={styles.search}>
            <Text style={styles.searchT}>Search for the Truck</Text>
            <Image
              style={styles.img}
              source={require('../../Images/yellowtruck.jpg')}
            />
          </View>
          <View style={{ marginVertical: '1.2%', marginHorizontal: '2.7%' }}>
            <DropDown action={pickUpDispatch}/>
            <DropDown action={dropDispatch}/>
            <DatePicker action={ addDate } />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '10%' }}>
              <View style={{ width: '48.8%', marginRight: '1.2%' }}>
                <Input2 data={PackageSpacetInput} />
              </View>
              <View style={{ width: '48.8%', marginLeft: '1.2%' }}>
                <Input2 data={PackageWeightInput} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '2.1%', marginLeft: '2.7%' }}>
              <CheckBox
                onValueChange={fulltruck}
              />
              <Text style={styles.book}>Book Entire Truck</Text>
            </View>
            <Input2 data={ReceivingPersonNameInput} />
            <Input2 data={ReceivingPersonNumInput} />
            <TouchableOpacity onPress={onSubmit} style={styles.searchtruck}>
              <Text style={styles.searchtruckt}>Search Truck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    // marginTop: StatusBar.currentHeight,

  },
  backarrow2: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 45,
    marginTop: '1.6%',
    marginLeft: '2.8%',
  },
  img2: {
    width: 35,
    height: 35,
    marginTop: '-13.2%',
    marginLeft: '28%',
  },
  container2: {
    borderColor: '#000000',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0.5,
    alignItems: 'flex-start',
    paddingBottom: 5,
  },
  block: {
    paddingHorizontal: '6.1%',
  },
  ntext: {
    color: '#000000',
    marginTop: '1%',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  add: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
    marginTop: '2.1%',
    marginBottom: '2.2%',
  },
  search: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,159,0,0.10)',
    marginBottom: '1.1%',
  },
  searchT: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
    marginTop: '1.7%',
    marginBottom: '1.8%',
    marginLeft: '4.3%',
    width: '75%',

  },
  img: {
    width: 45,
    height: 26.7,
    marginTop: '1.7%',
    marginBottom: '1.3%',
  },
  drop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#979797',
    marginBottom: '1.2%',
  },
  dropt: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginVertical: '2%',
    marginLeft: '5.6%',
  },
  dropt2: {
    fontSize: 30,
    marginRight: '2%',
    marginTop: '-2%',
  },
  calender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#979797',
    marginBottom: '1.2%',
  },
  calimg: {
    height: 22.9,
    width: 25,
  },
  box: {
    height: 22,
    width: 22,
    color: '#979797',
    borderWidth: 1,
    borderRadius: 2,
  },
  book: {
    marginTop: '2.4%',
    color: '#141414',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginLeft: '2.4%',
  },
  searchtruck: {
    backgroundColor: '#FF8200',
    // backgroundColor:'#DFDFDF',
    height: 24,
    width: '30.3%',
    alignSelf: 'flex-end',
    paddingVertical: '1.2%',
    marginTop: '1.6%',
  },
  searchtruckt: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginTop: '0.6%',
    textAlign: 'center',
  },
});

export default CustomerAddPackage;
