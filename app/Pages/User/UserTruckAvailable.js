import React, { useEffect } from 'react';
import { StatusBar, Text, View, Image, StyleSheet,
  TouchableOpacity, ScrollView }
  from 'react-native';
// import axios from 'axios';
import qs from 'querystring';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import Header from '../../Component/Header';
import TruckComponet from '../../Component/truckComponet';
import AppStatusBar from '../../Component/StatusBar';

import { allTripIdsNTruckNos, allTruckDetails, noOfTripsFound } from '../../Redux/actions/tripsAvailable';
import { localAxiosToken } from '../../utils/axios';
import { AllTruckDetails, AllTruckSpaceNWeight } from '../../Redux/reducers/tripsAvailable';
import { getListOfTruckIds } from '../../utils/formData';


function CustomerTruckAvailable ({ navigation }) {
  // vars and selectors
  const dispatch = useDispatch();
  const allTruckDetailsSelector = useSelector(state => state.AllTruckDetails);
  const allTruckSpaceNWeightSelector = useSelector(state => state.AllTruckSpaceNWeight);
  const pickUpPointSelector = useSelector(state => state.PickUp);
  const dropPointSelector = useSelector(state => state.Drop);
  const dateSelector = useSelector(state => state.PickUpDate);
  const entireTruckSelector = useSelector(state => state.EntireTruck);
  const receivingPersonNameSelector = useSelector(state => state.ReceivingPersonName);
  const packageSpaceSelector = useSelector(state => state.PackageSpace);
  const packageWeightSelector = useSelector(state => state.PackageWeight);
  const receivingPersonNumSelector = useSelector(state => state.ReceivingPersonNum);
  const customerTokenSelector = useSelector(state => state.CustomerToken);

  console.log(`this is the selector ${allTruckSpaceNWeightSelector}`);
  // const pickUpPointSelector = useSelector(state => state.PickUp);
  // const dropPointSelector = useSelector(state => state.Drop);
  const customerFullName = useSelector(state => `${state.CustomerFirstName} ${state.CustomerLastName}`);
  const SelectedTruckData = useSelector(state => state.SelectedTruckData);


  // formData

  const HeaderData = {
    onSubmit () {
      console.log('onSubmit called');
    },
  };

  // functions

  console.log(`render ${JSON.stringify(allTruckDetailsSelector)}`);


  // console.log(`spaceNweight = ${allTruckSpaceNWeightSelector}`);
  // console.log(` allData is = ${JSON.stringify(getData())}`);

  console.log(`no of trips = ${allTruckDetailsSelector.length}`);

  return (
    <View style={styles.container}>
      <Header data={HeaderData}/>
      <ScrollView>
        <View style={styles.block}>
          <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>{customerFullName} !</Text></Text>
          <Text style={styles.add}>Available Trucks</Text>
          { allTruckDetailsSelector.length
            ? <TruckComponet allData={allTruckDetailsSelector} pickUp={pickUpPointSelector}
              drop={dropPointSelector} navigation={navigation} />
            : <Text> We couldnt find any matching truck in your route. </Text>
          }
        </View>
      </ScrollView>
    </View>);
}

export default CustomerTruckAvailable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    // marginTop: StatusBar.currentHeight,
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
    marginHorizontal: '2.7%',
  },
  img: {
    width: 45,
    height: 26.7,
    marginTop: '1.1%',
    marginBottom: '1.3%',
  },
  searchD: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginTop: '1.8%',
    marginBottom: '1.8%',
    marginLeft: '3.2%',
  },
  avail: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
  },
  img2: {
    height: 15.7,
    width: 15.7,
    marginHorizontal: '1.1%',
  },
  img3: {
    width: 15,
    height: 22.5,
    marginTop: '2%',
    marginBottom: '0.7%',
  },
  bord: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    width: '100%',
  },
  loctext: {
    color: '#000000',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginBottom: '0.2%',
  },
  available: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.4,
  },
  but: {
    backgroundColor: '#FF9F00',
    borderRadius: 1,
    paddingVertical: '0.6%',
    paddingHorizontal: '3.4%',
    marginTop: '3%',
  },
  buttext: {
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

