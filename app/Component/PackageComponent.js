import React, {useState} from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import StarRating from 'react-native-star-rating'; 
import axios from 'axios';
import qs from 'querystring';
import { useSelector } from 'react-redux';

import { localAxiosToken } from '../utils/axios'

function PackageComponent({ packages, track }) {
  const [ driverInfo,  setDriverInfo] = useState(false);
  const CustomerToken = useSelector(state => state.CustomerToken)

  // api call

  const getDriverInfo = data => {
    console.log(data);
    const details = []
    axios(localAxiosToken('/getTruckRating', qs.stringify({ truckNo: data.truck_no }), CustomerToken))
    .then(res => {
      if (res.data.statusCode === 200) {
        // console.log(res.data)
        details.push(res.data.AverageRating)
      } else {
        console.log(res.data)
        details.push(0)
      }
      axios(localAxiosToken('/getTrip', qs.stringify({tripId: data.trip_id}), CustomerToken))
      .then(resp => {
        console.log(resp.data)
        if (resp.data.statusCode === 200) {
          details.push(resp.data.message.tripDetails[0].truck_driver)
        }
      })
      setDriverInfo(details)
    })
  }


  if (packages.length)
  return (
    <ScrollView>
      { packages.map( ( data, index) => 
      <View key={index} style={{ backgroundColor: '#FFFFFF', borderWidth: 0.3, marginBottom: '2.1%' }}>
        <View style={styles.search}>
          <View style={{ flexDirection: 'row', width: '60%' }}>
            <Image
              style={styles.img}
              source={require('../Images/deliverybox.jpg')}
            />
            <Text style={styles.index}>
             Package { index+1 }</Text>
            { data[0] === 'unassigned'
            ? 
            <TouchableOpacity>
              <Text style={styles.stat}>Draft. Search again?</Text>
            </TouchableOpacity>
            : <View>
            <Text style={styles.stat}>Status : 
            <Text style={{ color: 'orange' }}>{ data[0].status === null ? 'Request Pending' : data[1].status === 'Accep' ? 'In transist' : 'Delivered' }</Text>
            </Text>
            </View>
            }
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '0.7%', marginHorizontal: '2.7%' }}>
          {/* { driverInfo
            ? <View>
              <Text>{ driverInfo[1] }</Text>
              <View style={styles.stars}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={driverInfo[0]}
                  selectedStar={e =>{
                    setStarRating(e)
                    dispatch(rating(e))
                  }}
                  fullStarColor={'orange'}
                />
              </View>
            </View> */}
            <View> 
                <Image
                  style={styles.img4}
                  source={require('../Images/yellowtruck.jpg')}
                />
                <View style={styles.but2}>
                  <TouchableOpacity onPress={() => getDriverInfo(data[0])}>
                    <Text style={styles.availtext}>{data[0].truck_no}</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.but} onPress={track}>
              <Text style={styles.buttext}>Track Delivery</Text>
            </TouchableOpacity>
        </View>
        <View style={{ marginBottom: '1.2%', marginHorizontal: '2.7%', flexDirection: 'row' }}>
          <View style={{ width: '60%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.img3}
                source={require('../Images/map.jpg')}
              />
              <View style={styles.bord}/>
            </View>
            <View style={{ marginBottom: '1%' }}>
              <Text style={styles.loctext}>{ data[1].pickup_point }</Text>
              <Text style={styles.loctext}>Rk Beach</Text>
              <Text style={styles.loctext}>{ (data[1].pickup_date).slice(0, 10) }</Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.img3}
              source={require('../Images/map.jpg')}
            />
            <View style={{ marginBottom: '1%' }}>
              <Text style={styles.loctext}>{ data[1].drop_point }</Text>
              <Text style={styles.loctext}>Barakhamba Road</Text>
              <Text style={styles.loctext}>{ data[1].reach_date ? data[1].reach_date : 'Updates on delivery' }</Text>
            </View>
          </View>
        </View>
      </View>)
    }
    </ScrollView>
  )
  else
    return(<View>
      <Text>Booked packages will be displayed here.</Text>
    </View>)
}

export default PackageComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    height: '100%',
    width: '100%',
  },
  block: {
    marginLeft: '6.1%',
  },
  ntext: {
    color: '#000000',
    marginTop: '1%',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  index: {
    marginLeft: '5%',
    marginRight: '18%',
    fontSize: 20,
    padding: '2%',
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
    paddingHorizontal: '2.4%',
  },
  img: {
    width: 30,
    height: 30,
    marginTop: '1.4%',
    marginBottom: '1%',
  },
  stat: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    padding: '4%',
    marginLeft: '1.7%',
  },
  but: {
    backgroundColor: '#FF9F00',
    borderRadius: 1,
    paddingVertical: '0.6%',
    paddingHorizontal: '3.4%',
    marginTop: '2%',
    marginBottom: '6.2%',
    marginLeft: '10%',
  },
  but2: {
    backgroundColor: '#FF9F00',
    borderRadius: 1,
    paddingVertical: '0.6%',
    paddingHorizontal: '3.4%',
    marginTop: '-11.5%',
    marginBottom: '10.2%',
    marginRight: '5%',
    marginLeft: '25%',
  },
  buttext: {
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  img4: {
    width: 30,
    height: 25,
    marginTop: '1.1%',
    marginRight: '2.4%',
  },
  availtext: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    alignSelf: 'center'
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
  adds: {
    color: '#000000',
    fontSize: 66,
    lineHeight: 74,
    letterSpacing: 1.89,
    textAlign: 'center',
    marginTop: '30.2%',
    marginBottom: '0.1%',
  },
  del: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1.1%',
  },
  wan: {
    color: '#FF9F00',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '1.1%',
    textDecorationLine: 'underline',
  },
  // stars :{
  //   width: '30%',
  // }
});
