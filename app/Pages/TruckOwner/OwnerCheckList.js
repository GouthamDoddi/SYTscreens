import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

import HeaderU from '../../Component/HeaderU';
import { localAxiosToken } from '../../utils/axios';
import { useSelector } from 'react-redux';
import qs from 'querystring';

function OwnerCheckList ({ navigation }) {
  // functions
  const onClick = () => console.log('header clicked');
  const AllTripIdsNTruckNos = useSelector(state => state.AllTripIdsNTruckNos);
  const DeliveryRequests = useSelector(state => state.DeliveryRequests);

  console.log(AllTripIdsNTruckNos);


  return (
    // <View style={styles.responsiveBox}>
    <View style={styles.container}>
      <HeaderU data={onClick} />
      <ScrollView>
        <View style={styles.block}>
          <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>Vehicle Owner Name !</Text></Text>
          <View style={styles.adrow}>
            <View style={styles.adrow2}>
              <TouchableOpacity>
                <Image
                  style={styles.ad}
                  source={require('../../Images/left-arrow.png')}
                />
              </TouchableOpacity>
              <Text style={styles.add}>Delivery Request</Text>
            </View>
            <View>
              <Text style={styles.add}>Total - 38</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.subrow}>
              <Image
                style={styles.rowimagered}
                source={require('../../Images/circle.png')}
              />
              <Text style={styles.rowtext1}>Need to Deliver</Text>
            </View>
            <View style={styles.subrow}>
              <Image
                style={styles.rowimagegreen}
                source={require('../../Images/circle.png')}
              />
              <Text style={styles.rowtext1}>Delivered</Text>
            </View>
            <View style={styles.subrow}>
              <Text style={styles.rowtext2}>Check List - <Text style={{ color: 'green' }}>4</Text></Text>
            </View>
          </View>
          <View style={styles.row2}>
            <View style={styles.subrow2}>
              <Text style={styles.rowtext3}>Names</Text>
            </View>
            <View style={styles.subrow3}>
              <Text style={styles.rowtext3}>Location</Text>
            </View>
            <View style={styles.subrow4}>
              <Text style={styles.rowtext3}>Status</Text>
            </View>
          </View>
          { DeliveryRequests
            ? DeliveryRequests.map(data =>
              <View key={data.package_id}>
                <View style={styles.row2}>
                  <View style={styles.subrow2}>
                    <View style={styles.subrow5}>
                      <View style={styles.rowimagebox}>
                        <Image
                          style={styles.rowimage}
                          source={require('../../Images/phone.png')}
                        />
                      </View>
                      <View>
                        <Text style={styles.rowtext4}>{ data.package_receiving_person }</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.subrow3}>
                    <Text style={styles.rowtext4}>{ data.pickup_point }</Text>
                    <Text style={styles.rowtext4}>{ data.drop_point }</Text>
                  </View>
                  <View style={styles.subrow4}>
                    <View style={styles.subrow6}>
                      {
                        data.status === 'Delivered'
                          ? <Image
                            style={styles.rowimagegreen}
                            source={require('../../Images/circle.png')} />
                          : <Image
                            style={styles.rowimagered}
                            source={require('../../Images/circle.png')}
                          />

                      }
                      <TouchableOpacity>
                        <Image
                          style={styles.rowimagedown}
                          source={require('../../Images/down-arrow.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.bar}></View>
              </View>)
            : <View>
              <Text> No packages in the trip.</Text>
            </View>
          }
        </View>
      </ScrollView>
    </View>
    // {/* // </View> */}
  );
}

export default OwnerCheckList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  block: {
    paddingLeft: '0%',
    paddingRight: '0%',
  },
  ntext: {
    color: '#000000',
    marginTop: '1%',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    marginLeft: '2.6%',
    paddingLeft: '4.8%',
    paddingRight: '4.3%',
  },
  adrow: {
    flexDirection: 'row',
    marginTop: '2.1%',
    marginBottom: '2.5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '4.8%',
    paddingRight: '4.3%',
  },
  adrow2: {
    flexDirection: 'row',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
    paddingLeft: '4.8%',
    paddingRight: '4.3%',
  },
  subrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  rowimagered: {
    tintColor: '#FF0000',
    width: 8,
    height: 8,
    marginRight: '1.1%',
  },
  rowimagegreen: {
    tintColor: '#08B400',
    width: 8,
    height: 8,
  },
  rowtext1: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  rowtext2: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '1.7%',
    paddingLeft: '4.8%',
    paddingRight: '4.3%',
  },
  subrow2: {
    width: '40%',
  },
  subrow3: {
    width: '40%',
  },
  subrow4: {
    width: '20%',
  },
  rowtext3: {
    color: '#000000',
    fontSize: 17,
    lineHeight: 19,
    letterSpacing: 0,
    fontWeight: 'bold',
    marginBottom: '1.7%',
  },
  subrow5: {
    flexDirection: 'row',
  },
  subrow6: {
    flexDirection: 'row',
    height: 30,
    width: 50,
    borderColor: '#979797',
    borderWidth: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rowimagebox: {
    backgroundColor: '#ff8200',
    borderRadius: 15,
    marginRight: '2.7%',
  },
  rowimage: {
    width: 14.8,
    height: 18,
    tintColor: '#FFFFFF',
    margin: 6,
  },
  rowimagedown: {
    width: 8,
    height: 11,
  },
  rowtext4: {
    color: '#000000',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.34,
  },
  bar: {
    borderWidth: 0.5,
    borderColor: '#666666',
    marginBottom: '1%',
  },
});
