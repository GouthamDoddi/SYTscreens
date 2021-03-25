/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'querystring';

import { localAxiosToken } from '../utils/axios';
import { allTripIdsNTruckNos, deliveryRequests, tripDetails } from '../Redux/actions/tripsAvailable';


function TripComponent ({ TripHistory, navigation }) {
  // vars and selectors
  const dispatch = useDispatch();
  const OwnerToken = useSelector(state => state.OwnerToken);
  const TruckNo = useSelector(state => state.TruckNo);

  // functions
  const realDate = date => JSON.stringify(date).slice(1, 11);

  const addTrip = (tripId, truckNo, startDate) => {
    dispatch(tripDetails({ tripId,
      truckNo,
      startDate }));

    navigation.navigate('OwnerAddDelivery');
  };

  function tripPacakages (tripId, page) {
    const params = qs.stringify({ tripId });

    axios(localAxiosToken('/getTripPackages', params, OwnerToken))
      .then(res => {
        console.log(params);

        console.log(res.data);
        dispatch(deliveryRequests(res.data.packageDetails[0]));
        if (page === 'CheckList')
          return navigation.navigate('OwnerCheckList');

        return navigation.navigate('OwnerDeliveryRequests');

      // const checklist = res.data;
      })
      .catch(err => console.log(err));
  }

  const onClickDR = tripId => {
    const data = qs.stringify({ truckNo: TruckNo });

    console.log(data);
    tripPacakages(tripId, 'DR');


    // axios(localAxiosToken('/getPackageByTruckNo', data, OwnerToken))
    //   .then(res => {
    //     console.log(res.data);
    //     if (res.data.statusCode !== 400) {
    //       dispatch(deliveryRequests(res.data.packageDetails));
    //       navigation.navigate('OwnerDeliveryRequests');
    //     }
    //   })
    //   .catch(error => console.log(error));
  };

  // const viewTrip = index => {
  //   listOfButtons[index] = !listOfButtons[index];
  // };

  const checkList = tripId => {
    console.log('checklist called');

    dispatch(allTripIdsNTruckNos(tripId));

    tripPacakages(tripId, 'CheckList');
  };

  if (TripHistory) {
    const totalTrips = TripHistory.length;


    return (
      <View>
        <ScrollView>

          { TripHistory.reverse().map((data, index) =>
            <View key={`item${index}`} style={styles.box}>
              <View style={styles.search}>
                <Text style={styles.searchT}>Trip {totalTrips - index}</Text>
                <View style={styles.search2}>
                  <Text style={styles.searchD}>Miximise</Text>
                  <TouchableOpacity >
                    <Image
                      style={styles.searchM}
                      source={require('../Images/plus-icon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row', marginVertical: '0%', marginLeft: '5%' }}>
                <View style={{ width: '65%' }}>
                  <View style={styles.dash}>
                    <Text style={styles.dropt0}>Delivery Start Point</Text>
                    <Text style={styles.dropt1}>{data.source}</Text>
                  </View>
                  <View style={styles.dash}>
                    <Text style={styles.dropt0}>Delivery End Point</Text>
                    <Text style={styles.dropt1}>{data.destination}</Text>
                  </View>
                  <View style={styles.dash}>
                    <Text style={styles.dropt0}>Date Time</Text>
                    <Text style={styles.dropt1}>{ realDate(data.start_date) }</Text>
                  </View>
                </View>
                <View style={{ width: '35%' }}>
                  <Text style={styles.sea}>Delivered</Text>
                  <Text style={styles.sea}>Packages</Text>
                  <Text style={styles.number}>{data.delivered_packages}</Text>
                </View>
              </View>
              {
                data.trip_duration_in_hours
                  ? <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.searchDelete}>Delete Trip</Text>
                    <TouchableOpacity>
                      <Image
                        style={styles.img}
                        source={require('../Images/dustbin.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  : <View>
                    <TouchableOpacity onPress={() => checkList(data.trip_id)}>
                      <Text style={styles.checkList}>Check List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => addTrip(data.trip_id, data.truck_no, data.start_date)}>
                      <Text>+ Add Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.last1} onPress={() => onClickDR(data.trip_id)} >
                      <Text style={styles.deliveryRequest}>Delevery Requests &#62;</Text>
                    </TouchableOpacity>
                  </View>

              }
            </View>)}
        </ScrollView>

      </View>
      // </View>
    );
  }

  return (
    <Text>No trip history.</Text>
  );
}

export default TripComponent;

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
    marginTop: '1.6%',
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
    letterSpacing: -0,
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
  last1: {
    marginLeft: '55.5%',
    marginTop: '-5%',
  },
  deliveryRequest: {
    color: '#FF8200',
  },
  checkList: {
    color: '#FF8200',
  },
});

