import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import qs from 'querystring';
import { useSelector, useDispatch } from 'react-redux';

import HeaderT from '../../Component/HeaderT';
import TripComponent2 from '../../Component/TripComponent2';
import { pickUpDate, drop, pickUp } from '../../Redux/actions/packageDetails';
import Dropdown from '../../Component/DropDown';
import DatePicker2 from '../../Component/DatePicker2';
import TruckDropDown from '../../Component/TruckDropDown';
import Input3 from '../../Component/input3';
import { localAxiosToken } from '../../utils/axios';
import { tripHistory } from '../../Redux/actions/ownerTruckInfo';
import { selectedTruck } from '../../Redux/actions/transportCompanyInfo';
import { ownerFullName, ownerMobileNum } from '../../Redux/actions/ownerInfo';


function TransportTripRegister ({ navigation }) {
  // variables
  const TripHistory = useSelector(state => state.TripHistory);
  const OwnerFullName = useSelector(state => state.OwnerFullName);
  const TruckNo = useSelector(state => state.TruckNo);
  const SelectedTruck = useSelector(state => state.SelectedTruck);
  const PickUpDate = useSelector(state => state.PickUpDate);
  const PickUpSelector = useSelector(state => state.PickUp);
  const Drop = useSelector(state => state.Drop);
  const OwnerToken = useSelector(state => state.OwnerToken);
  const CompanyName = useSelector(state => state.CompanyName);
  const dispatch = useDispatch();
  const [ addTripButton, setAddTripButton ] = useState(false);
  const [ truckDriver, setTruckDriver ] = useState(0);
  const [ truckDriverNum, setTruckDriverNum ] = useState(0);


  // const PickUpDate = useSelector(state => state.PickUpDate);

  const realDate = JSON.stringify(PickUpDate).slice(3, 13);

  // functions

  const onSubmit = () => console.log('header clicked!');

  const onClick = () => console.log('Submit called');

  const tripRegister = () => {
    // get all data
    const formData = `${qs.stringify({
      source: PickUpSelector,
      destination: Drop,
      truckNo: SelectedTruck,
      truckDriver,
      truckDriverNum,
    })}&startDate=${PickUpDate}`;


    axios(localAxiosToken('/addTrip', formData, OwnerToken))
      .then(res => {
        console.log(res.data);

        axios(localAxiosToken('/getAvailableSpace', qs.stringify({ truckNo: selectedTruck }), OwnerToken))
          .then(response => {
            console.log(response.data);
            const { availableSpace } = response.data;
            const { availableWeight } = response.data;

            const trip = res.data.details[0];

            trip.availableSpace = availableSpace;
            trip.availableWeight = availableWeight;

            if (TripHistory) {
              const tripDetails = [ ...TripHistory, trip ];

              dispatch(tripHistory(tripDetails));

              console.log(`trip history = ${JSON.stringify(tripDetails)}`);
            } else {
              dispatch(tripHistory([ trip ]));
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  const TruckNoSelecter = data => dispatch(selectedTruck(data));
  const PickUp = data => dispatch(pickUp(data));
  const destination = data => dispatch(drop(data));

  const addTrip = () => {
    setAddTripButton(!addTripButton);
  };

  // form data
  const truckDriverData = {
    label: '',
    placeholder: 'Driver Name',
    onChangeText (e) {
      dispatch(ownerFullName(e));
    },
    color: '#C0C0C0',
  };

  const truckDriverNumData = {
    label: '',
    placeholder: 'Mobile number',
    onChangeText (e) {
      dispatch(ownerMobileNum(e));
    },
    color: '#C0C0C0',
  };

  // async function getTrips () {
  // }
  return (
    <View style={styles.container}>
      {/* <AppStatusBarU /> */}
      <HeaderT data={ onSubmit }/>
      <View style={styles.block}>
        <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>{ CompanyName } !</Text></Text>
        <Text style={styles.ntext}><Text style={{ fontWeight: 'bold' }}>Driver Name : </Text>{ OwnerFullName }</Text>
        { addTripButton
          ? <View>
            <TouchableOpacity onPress={addTrip}>
              <Text style={styles.add}>Close trip -</Text>
            </TouchableOpacity>
            <View style={{ marginTop: '1.1%', marginLeft: '2.7%', marginRight: '2.1%' }}>
              <TruckDropDown action={TruckNoSelecter} />

              <Dropdown action={PickUp}/>

              <Dropdown action={destination}/>
              <View style={{ flexDirection: 'row', height: 40 }}>
                <View style={{ width: '50%' }}>
                  <DatePicker2 />
                </View>
                <View style={styles.calender}>
                  <Text style={styles.dropt}>{ realDate }</Text>
                  <TouchableOpacity>
                    <Image
                      style={styles.calimg}
                      source={require('../../Images/time.jpg')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: '47.8%', marginTop: '10%', marginLeft: '-100%', marginRight: '2%' }}>
                  <Input3 componentData={truckDriverData} />
                </View>
                <View style={{ width: '47.8%', marginTop: '10%', marginLeft: '2%' }}>
                  <Input3 componentData={truckDriverNumData} />
                </View>
              </View>
              <TouchableOpacity onPress={tripRegister} style={styles.searchtruck}>
                <Text style={styles.searchtruckt}>Save Details</Text>
              </TouchableOpacity>
            </View>
          </View>
          : <TouchableOpacity onPress={addTrip}>
            <Text style={styles.add}>Add Trip +</Text>
          </TouchableOpacity>
        }
        <View style={{ backgroundColor: '#FFFFFF', marginBottom: '2.1%', borderWidth: 0.3, marginTop: '10%' }}>
          <TripComponent2 TripHistory={useSelector(state => state.TripHistory)} navigation={navigation} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: '2.2%' }}>
          </View>
        </View>
      </View>
    </View>
  );
}

export default TransportTripRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  //   responsiveBox: {
  //     width: wp('100%'),
  //     height: hp('100%'),
  //   },
  ntext: {
    color: '#000000',
    marginTop: '1%',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    marginLeft: '6.1%',
  },
  add: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
    marginTop: '2.1%',
    marginBottom: '2.2%',
    marginLeft: '6.1%',
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.3,
    marginBottom: '2.1%',
    paddingBottom: '2.5%',
    marginLeft: '3.5%',
    marginRight: '3.2%',
    borderRadius: 2,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,159,0,0.10)',
    marginBottom: '1.1%',
    justifyContent: 'space-between',
  },
  searchT: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
    paddingTop: '1.7%',
    paddingBottom: '1.8%',
    paddingLeft: '4.3%',
  },
  search2: {
    flexDirection: 'row',
    paddingRight: '3%',
    paddingVertical: '1.2%',
    alignItems: 'center',
  },
  searchD: {
    color: '#000000',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    paddingRight: '1.9%',
  },
  searchM: {
    tintColor: '#FF8200',
    height: 20,
    width: 20,
    alignContent: 'center',
  },
  img: {
    width: 15,
    height: 13.1,
    marginTop: '2%',
    marginBottom: '2%',
    tintColor: '#FF8200',
  },
  searchtruck: {
    backgroundColor: '#FF8200',
    alignSelf: 'flex-end',
    paddingVertical: '0.6%',
    paddingHorizontal: '3.2%',
    marginTop: '15.6%',
  },
  searchtruckt: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: 'center',
  },
  dash: {
    marginBottom: '1.6%',
  },
  dropt0: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginVertical: '2%',
    fontWeight: 'bold',
  },
  dropt1: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
  },
  calender: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#979797',
    marginBottom: '1.2%',
    alignItems: 'center',
  },
  dropt: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
  },
  calimg: {
    height: 22.9,
    width: 25,
  },
  sea: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: 'bold',
  },
  number: {
    color: '#FF8200',
    fontSize: 54,
    lineHeight: 62,
    letterSpacing: 1.55,
    fontWeight: 'bold',
    marginTop: '1.1%',
    marginBottom: '2.1%',
  },
  searchDelete: {
    color: '#FF8200',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginRight: '3.2%',
  },
});

