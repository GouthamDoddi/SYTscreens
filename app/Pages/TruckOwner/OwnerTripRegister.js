import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HeaderU from '../../Component/HeaderU';
import TripComponent from '../../Component/TripComponent';
import { pickUpDate, drop, pickUp } from '../../Redux/actions/packageDetails';
import Dropdown from '../../Component/DropDown';
import DatePicker2 from '../../Component/DatePicker2';
import { localAxiosToken } from '../../utils/axios';
import { DrawerActions } from '@react-navigation/drawer';

import { useSelector, useDispatch } from 'react-redux';
import { tripHistory } from '../../Redux/actions/ownerTruckInfo';
import axios from 'axios';
import qs from 'querystring';

function OwnerTripRegister ({ navigation }) {
  // variables
  const TripHistory = useSelector(state => state.TripHistory);
  const OwnerFullName = useSelector(state => state.OwnerFullName);
  const TruckNo = useSelector(state => state.TruckNo);
  const PickUpDate = useSelector(state => state.PickUpDate);
  const PickUpSelector = useSelector(state => state.PickUp);
  const Drop = useSelector(state => state.Drop);
  const OwnerToken = useSelector(state => state.OwnerToken);
  const dispatch = useDispatch();
  const [ addTripButton, setAddTripButton ] = useState(false);


  // const PickUpDate = useSelector(state => state.PickUpDate);

  const realDate = JSON.stringify(PickUpDate).slice(3, 13);

  // functions

  const onSubmit = () => DrawerActions.toggleDrawer();

  const onClick = () => console.log('Submit called');

  const tripRegister = () => {
    // get all data
    const formData = `${qs.stringify({
      source: PickUpSelector,
      destination: Drop,
      truckNo: TruckNo,
    })}&startDate=${PickUpDate}`;


    axios(localAxiosToken('/addTrip', formData, OwnerToken))
      .then(res => {
        console.log(res.data.details[0]);

        if (TripHistory === 0) {
          const tripDetails2 = [ res.data.details[0] ];

          dispatch(tripHistory(tripDetails2));
        }

        const tripDetails = [ ...TripHistory, res.data.details[0] ];

        dispatch(tripHistory(tripDetails));

        console.log(`trip history = ${tripDetails}`);
      })
      .catch(err => console.log(err));
  };

  const PickUp = data => dispatch(pickUp(data));
  const destination = data => dispatch(drop(data));

  const addTrip = () => {
    setAddTripButton(!addTripButton);
  };

  // async function getTrips () {
  // }
  return (
    <View style={styles.container}>
      {/* <AppStatusBarU /> */}
      <HeaderU data={ onSubmit }/>
      <View style={styles.block}>
        <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>Vehicle Owner Name !</Text></Text>
        <Text style={styles.ntext}><Text style={{ fontWeight: 'bold' }}>Driver Name : </Text>{ OwnerFullName }</Text>
        { addTripButton
          ? <View>
            <TouchableOpacity onPress={addTrip}>
              <Text style={styles.add}>Add Trip +</Text>
            </TouchableOpacity>
            <View style={{ marginTop: '1.1%', marginLeft: '2.7%', marginRight: '2.1%' }}>
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
        <View style={{ backgroundColor: '#FFFFFF', marginBottom: '2.1%', borderWidth: 0.3 }}>
          <TripComponent TripHistory={useSelector(state => state.TripHistory)} navigation={navigation} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: '2.2%' }}>
          </View>
        </View>
      </View>
    </View>
  );
}

export default OwnerTripRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
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
  searchtruck: {
    backgroundColor: '#FF8200',
    alignSelf: 'flex-end',
    paddingVertical: '0.6%',
    paddingHorizontal: '3.2%',
    marginTop: '1.6%',
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
});

