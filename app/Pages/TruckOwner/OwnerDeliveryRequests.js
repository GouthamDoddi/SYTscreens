import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'querystring';

import { localAxiosToken } from '../../utils/axios';
import HeaderU from '../../Component/HeaderU';

function OwnerDeliveryRequests ({ navigation }) {
  // vars and selectors

  const DeliveryRequests = useSelector(state => state.DeliveryRequests);
  const OwnerFullName = useSelector(state => state.OwnerFullName);
  const TripDetails = useSelector(state => state.TripDetails);
  const OwnerToken = useSelector(state => state.OwnerToken);

  // functions

  const onSubmit = () => console.log('header clicked');

  const goBack = () => navigation.navigate('OwnerTripRegister');

  const params2 = mappingId => qs.stringify({
    delivered: false,
    status: 'Accepted',
    mappingId,
  });

  const mapPackageToTruck = mappingId => {
    axios(localAxiosToken('/updatePackageMapping', params2(mappingId), OwnerToken))
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };

  console.log(`del = ${JSON.stringify(DeliveryRequests)}`);

  return (
    <View style={styles.container}>
      <HeaderU data={ onSubmit } />
      <ScrollView>
        <View style={styles.block}>
          <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>{OwnerFullName} !</Text></Text>
          <View style={styles.adrow}>
            <TouchableOpacity onPress={goBack}>
              <Image
                style={styles.ad}
                source={require('../../Images/left-arrow.png')}
              />
            </TouchableOpacity>
            <Text style={styles.add}>Delivery Request (Trip 30 03-05-2020)</Text>
          </View>
          <ScrollView>
            { DeliveryRequests.map((data, index) =>
              <View style={styles.searchbox} key={`delivery${index}`}>
                <View style={styles.search}>
                  <View style={styles.searchsubrow}>
                    <Image
                      style={styles.dimg}
                      source={require('../../Images/deliveryboxorange.jpg')}
                    />
                    <Text style={styles.searchT}>Package {index + 1}</Text>
                  </View>
                  <View style={styles.searchsubrow2}>
                    <Text style={styles.searchD}>Minimize </Text>
                    <TouchableOpacity>
                      <Image
                        style={styles.minus}
                        source={require('../../Images/minus-icon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.weightrow}>
                  <View style={styles.weightsubrow}>
                    <View>
                      <Text style={styles.avail}>Package Weight</Text>
                      <Text style={styles.avail2}>{data[1].package_weight}. KG</Text>
                    </View>
                    <View>
                      <Text style={styles.avail}>Package Space</Text>
                      <Text style={styles.avail2}>{data[1].package_space}. FT</Text>
                    </View>
                    <Text style={styles.avail3}>RS {data[1].package_space * 20}</Text>
                  </View>
                  <View style={styles.location}>
                    <View style={styles.locationsub}>
                      <Text style={styles.dropt3}>Drop Location</Text>
                      <Text style={styles.dropt}>{data[1].drop_point}</Text>
                      <Text style={styles.dropt3}>Customer Name</Text>
                      <Text style={styles.dropt}>{ data[1].customer_name }</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                          <Image
                            style={styles.droptimg}
                            source={require('../../Images/phone.png')}
                          />
                        </TouchableOpacity>
                        <Text style={styles.dropt3}>{data[1].customer_mobile_num}</Text>
                      </View>
                    </View>
                    <View style={styles.locationsub}>
                      <Text style={styles.dropt3}>Pickup Location</Text>
                      <Text style={styles.dropt}>{data[1].pickup_point}</Text>
                      <Text style={styles.dropt3}>Receiving person Name</Text>
                      <Text style={styles.dropt}>{data[1].package_receiving_person}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                          <Image
                            style={styles.droptimg}
                            source={require('../../Images/phone.png')}
                          />
                        </TouchableOpacity>
                        <Text style={styles.dropt3}>{data[1].receiving_person_mobile_no}</Text>
                      </View>
                    </View>
                  </View>
                  { data[1].status === 'Accepted'
                    ? <View style={styles.delivery}>
                      <TouchableOpacity style={styles.last} onPress={ () => mapPackageToTruck(data[0].mapping_id) }>
                        <Text style={styles.last2}>Delivery Done</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deliverysub}>
                        <Text style={styles.last1}>Cancel Deliver</Text>
                        <Image
                          style={styles.deimg}
                          source={require('../../Images/dustbin.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    : <View style={styles.delivery}>
                      <TouchableOpacity style={styles.deliverysub}>
                        <Text style={styles.last1}>Cancel Deliver</Text>
                        <Image
                          style={styles.deimg}
                          source={require('../../Images/dustbin.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.last} onPress={ () => mapPackageToTruck(data[0].mapping_id) }>
                        <Text style={styles.last2}>Accept Delivery</Text>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              </View>)}
          </ScrollView>
          {/* <View style={styles.searchbox}>
            <View style={styles.search}>
              <View style={styles.searchsubrow}>
                <Image
                  style={styles.dimg}
                  source={require('../../Images/deliveryboxorange.jpg')}
                />
                <Text style={styles.searchT}>Package 31-Accepted</Text>
              </View>
              <View style={styles.searchsubrow2}>
                <Text style={styles.searchD}>Minimize </Text>
                <TouchableOpacity>
                  <Image
                    style={styles.minus}
                    source={require('../../Images/minus-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.weightrow}>
              <View style={styles.weightsubrow}>
                <View>
                  <Text style={styles.avail}>Package Weight</Text>
                  <Text style={styles.avail2}>20. KG</Text>
                </View>
                <View>
                  <Text style={styles.avail}>Package Space</Text>
                  <Text style={styles.avail2}>2. FT</Text>
                </View>
                <Text style={styles.avail3}>RS 320</Text>
              </View>
              <View style={styles.location}>
                <View style={styles.locationsub}>
                  <Text style={styles.dropt3}>Drop Location</Text>
                  <Text style={styles.dropt}>Drop Location Name</Text>
                  <Text style={styles.dropt3}>Customer Name</Text>
                  <Text style={styles.dropt}>Print Name</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                      <Image
                        style={styles.droptimg}
                        source={require('../../Images/phone.png')}
                      />
                    </TouchableOpacity>
                    <Text style={styles.dropt3}>9999999999</Text>
                  </View>
                </View>
                <View style={styles.locationsub}>
                  <Text style={styles.dropt3}>Pickup Location</Text>
                  <Text style={styles.dropt}>Pickup Location Name</Text>
                  <Text style={styles.dropt3}>Customer Name</Text>
                  <Text style={styles.dropt}>Print Name</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                      <Image
                        style={styles.droptimg}
                        source={require('../../Images/phone.png')}
                      />
                    </TouchableOpacity>
                    <Text style={styles.dropt3}>9999999999</Text>
                  </View>
                </View>
              </View>
              <View style={styles.delivery}>
                <TouchableOpacity style={styles.last}>
                  <Text style={styles.last2}>Delivery Done</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deliverysub}>
                  <Text style={styles.last1}>Cancel Deliver</Text>
                  <Image
                    style={styles.deimg}
                    source={require('../../Images/dustbin.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}

export default OwnerDeliveryRequests;

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
    paddingLeft: '3.5%',
    paddingRight: '3.2%',
  },
  ntext: {
    color: '#000000',
    marginTop: '1%',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    marginLeft: '2.6%',
  },
  adrow: {
    flexDirection: 'row',
    marginTop: '2.1%',
    marginBottom: '2.5%',
    alignItems: 'center',
  },
  ad: {
    marginRight: '2%',
  },
  add: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
    fontWeight: 'bold',
  },
  searchbox: {
    backgroundColor: '#FFFFFF',
    marginBottom: '2.1%',
    borderWidth: 0.3,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#FFF2E3',
    marginBottom: '1.7%',
    paddingLeft: '2.4%',
    paddingRight: '4.6%',
    justifyContent: 'space-between',
  },
  searchsubrow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '1.5%',
    paddingBottom: '1.1%',
  },
  dimg: {
    width: 25,
    height: 25,
    marginRight: '1.6%',
  },
  searchT: {
    color: '#FF8200',
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
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginRight: '1.6%',
  },
  minus: {
    tintColor: '#FF8200',
    width: 12,
    height: 20,
  },
  weightrow: {
    paddingLeft: '2.4%',
    paddingRight: '3.7%',
  },
  weightsubrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  avail3: {
    color: '#007484',
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0.69,
    fontWeight: 'bold',
  },
  location: {
    flexDirection: 'row',
  },
  locationsub: {
    marginBottom: '2.5%',
    width: '50%',
  },
  dropt3: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginBottom: '1%',
    fontWeight: 'bold',
  },
  dropt: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginBottom: '2%',
  },
  droptimg: {
    marginRight: '1.2%',
    width: 15,
    height: 18,
    padding: '1%',
  },
  delivery: {
    flexDirection: 'row',
    marginBottom: '3%',
    justifyContent: 'space-between',
  },
  deliverysub: {
    flexDirection: 'row',
  },
  last1: {
    color: '#FF8200',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginRight: '1.6%',
  },
  deimg: {
    width: 20,
    height: 20,
    tintColor: '#FF8200',
  },
  last: {
    paddingVertical: '0.6%',
    paddingHorizontal: '3%',
    backgroundColor: '#FF8200',
  },
  last2: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: 'center',
  },
});

