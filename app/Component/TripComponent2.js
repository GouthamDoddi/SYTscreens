/* eslint-disable no-negated-condition */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'querystring';

import { localAxiosToken } from '../utils/axios';
import { allTripIdsNTruckNos, deliveryRequests, tripDetails } from '../Redux/actions/tripsAvailable';


function TripComponent2 ({ TripHistory, navigation }) {
  // vars and selectors
  const [ minimize, setMinimize ] = useState(true);
  const [ spaceNWeight, setSpaceNweight ] = useState(0);
  const dispatch = useDispatch();
  const OwnerToken = useSelector(state => state.OwnerToken);
  const TruckNo = useSelector(state => state.TruckNo);
  const AllTruckData = useSelector(state => state.AllTruckData);

  // functions

  const addTrip = (tripId, truckNo, startDate) => {
    dispatch(tripDetails({ tripId,
      truckNo,
      startDate }));

    navigation.navigate('TransportAddDelivery');
  };

  function tripPacakages (tripId, page) {
    const params = qs.stringify({ tripId });

    axios(localAxiosToken('/getTripPackages', params, OwnerToken))
      .then(res => {
        console.log(params);

        console.log(res.data);
        dispatch(deliveryRequests(res.data.packageDetails[0]));
        if (page === 'CheckList')
          return navigation.navigate('TransportCheckList');

        return navigation.navigate('TransportDeliveryRequests');

      // const checklist = res.data;
      })
      .catch(err => console.log(err));
  }

  const onClickDR = tripId => {
    const data = qs.stringify({ truckNo: TruckNo });

    // console.log(data);
    tripPacakages(tripId, 'DR');
  };

  const checkList = tripId => {
    console.log('checklist called');

    dispatch(allTripIdsNTruckNos(tripId));

    tripPacakages(tripId, 'CheckList');
  };

  if (TripHistory) {
    const totalTrips = TripHistory.length;

    const trips = totalTrips > 1
      ? TripHistory.reverse()
      : TripHistory;


    return (
      <View>
        <ScrollView>

          { trips.map((data, index) =>

            <View key={`item${index}`} style={styles.box}>
              <View style={{ backgroundColor: '#FFFFFF', marginBottom: '2.1%', borderWidth: 0.3 }}>
                {/* { !minimize */}
                <View style={styles.search}>
                  <View style={styles.searchsubrow}>
                    <Image
                      style={styles.minus}
                      source={require('../Images/delivery-truck.png')}
                    />
                    <Text style={styles.searchT}>Truck {data.truck_no}</Text>
                  </View>
                  <TouchableOpacity onPress={ () => setMinimize(true) }>
                    <View style={styles.searchsubrow2}>
                      <Text style={styles.searchD}>Minimize</Text>
                      <TouchableOpacity>
                        <Image
                          style={styles.dimg}
                          source={require('../Images/minus-icon.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '2.1%' }}>
                  <View style={{ width: '60%' }}>
                    {
                      data.length === 2
                      ?<View style={styles.weightsubrow}>
                      <View>
                        <Text style={styles.avail}>Available Weight</Text>
                        <Text style={styles.avail2}>{ data.weight }</Text>
                      </View>
                      <View>
                        <Text style={styles.avail}>Available Space</Text>
                        <Text style={styles.avail2}>{ data.space }</Text>
                      </View>
                    </View>
                    :<View></View>
                    }
                    <View style={styles.d}>
                      <Text style={styles.dropt3}>Delivery Start Point</Text>
                      <Text style={styles.dropt}>{ data.source }</Text>
                    </View>
                    <View style={styles.d}>
                      <Text style={styles.dropt3}>Delivery End Point</Text>
                      <Text style={styles.dropt}>{ data.destination }</Text>
                    </View>
                    <View style={styles.d}>
                      <Text style={styles.dropt3}>Date &#x26; Time</Text>
                      <Text style={styles.dropt}> { data.start_date.slice(0, 10) }</Text>
                    </View>
                  </View>
                  <View style={styles.s}>
                    <Text style={styles.sea}>Packages</Text>
                    <Text style={styles.number}>{ data.delivered_packages }</Text>
                    <Text style={styles.seas}>Drop Done - <Text style={{ color: 'green' }}>0</Text></Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '2%', marginHorizontal: '4%' }}>
                  <View>
                    <Text style={styles.droptd}>Driver Name</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.droptd2}>{ data.truck_driver }</Text>
                      <Image
                        style={styles.dimg2}
                        source={require('../Images/phone.png')}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                    <Image
                      style={styles.dimg2}
                      source={require('../Images/pin.png')}
                    />
                    <TouchableOpacity>
                      <Text style={styles.droptd2}>Track The Truck</Text>
                    </TouchableOpacity>
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

              </View>
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

export default TripComponent2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  //   responsiveBox: {
  //     width: wp('100%'),
  //     height: hp('100/%'),
  //   },
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
  },
  truckrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#979797',
    paddingVertical: '0.8%',
    paddingHorizontal: '2.9%',
    marginBottom: '1.3%',
    borderRadius: 2,
  },
  truck: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
  },
  truckimage: {
    width: 21,
    height: 21,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    marginBottom: '1.7%',
    paddingLeft: '2.4%',
    paddingRight: '2%',
    justifyContent: 'space-between',
  },
  searchsubrow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '1.5%',
    paddingBottom: '1.1%',
  },
  dimg: {
    width: 20,
    height: 15,
    marginRight: '5.5%',
  },
  searchT: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
  },
  searchsubrow2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchD: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
  },
  minus: {
    tintColor: '#000000',
    width: 34,
    height: 20,
    marginLeft: '1.6%',
  },
  searchDs: {
    color: '#FF8200',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginTop: '1.7%',
    marginBottom: '1.8%',
    marginRight: '1.9%',
  },
  searchM: {
    color: '#000000',
    fontSize: 23,
    lineHeight: 27,
    letterSpacing: 0,
    marginTop: '0.4%',
    marginBottom: '1.8%',
    marginRight: '1.9%',
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
  dropt3: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginVertical: '2%',
    marginLeft: '5.6%',
    fontWeight: 'bold',
  },
  d: {
    marginBottom: '1.6%',
  },
  s: {
    // alignSelf:'center',
  },
  sea: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: 'bold',
  },
  number: {
    color: '#000000',
    fontSize: 54,
    lineHeight: 62,
    letterSpacing: 1.55,
    fontWeight: 'bold',
    marginTop: '1.1%',
    marginBottom: '2.1%',
  },
  seas: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
  },
  seaund: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: '0.6%',
  },
  last1: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  weightsubrow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '1.6%',
    alignItems: 'center',
  },
  avail: {
    color: '#000000',
    fontSize: 10,
    lineHeight: 11,
    letterSpacing: 0.29,
  },
  avail2: {
    color: '#A8A8A8',
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0,
    marginTop: '0.6%',
  },
  droptd2: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginVertical: '2%',
    marginRight: '3%',
  },
  droptd: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    fontWeight: 'bold',
  },
  dimg2: {
    width: 20,
    height: 25,
    marginLeft: 20,
    marginRight: '5.5%',
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
  search2: {
    flexDirection: 'row',
    paddingRight: '3%',
    paddingVertical: '1.2%',
    alignItems: 'center',
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
  calimg: {
    height: 22.9,
    width: 25,
  },
  searchDelete: {
    color: '#FF8200',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginRight: '3.2%',
  },
  deliveryRequest: {
    color: '#FF8200',
  },
  checkList: {
    color: '#FF8200',
  },
});

