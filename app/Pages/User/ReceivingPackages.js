import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { selectedTrip } from '../../Redux/actions/tripsAvailable';

function ReceivingPackages({ navigation }) {

  const ReceivingPackages = useSelector(state => state.ReceivingPackages);
  const track = () => navigation.navigate('Tracking');
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Text style={styles.text}>All receiving packages are found below.</Text>
      {
        ReceivingPackages
        ? <View>
          { ReceivingPackages.map( ( data, index) => 
      <View key={index} style={{ backgroundColor: '#FFFFFF', borderWidth: 0.3, marginBottom: '2.1%' }}>
        <View style={styles.search}>
          <View style={{ flexDirection: 'row', width: '60%' }}>
            <Image
              style={styles.img}
              source={require('../../Images/deliverybox.jpg')}
            />
            <Text style={styles.stat}>Status : <Text style={{ color: 'orange' }}>{ data[0] === 'unassigned' ? 'Request Pending' : data[1].reach_date === null ? 'In transist' : 'Delivered' }</Text></Text>
          </View>
          <TouchableOpacity style={styles.but} onPress={track}>
            <Text style={styles.buttext}>Track Delivery</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '0.7%', marginHorizontal: '2.7%' }}>
          <Image
            style={styles.img4}
            source={require('../../Images/call.jpg')}
          />
          <View style={{ marginRight: '0.3%' }}>
            <Text style={styles.availtext}>{ data[0].truck_no }</Text>
            <Text style={styles.availtext}>Person Name</Text>
          </View>
        </View>
        <View style={{ marginBottom: '1.2%', marginHorizontal: '2.7%', flexDirection: 'row' }}>
          <View style={{ width: '60%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.img3}
                source={require('../../Images/map.jpg')}
              />
              <View style={styles.bord}/>
            </View>
            <View style={{ marginBottom: '1%' }}>
              <Text style={styles.loctext}>{ data[1].pickup_point }</Text>
              <Text style={styles.loctext}></Text>
              <Text style={styles.loctext}>{ (data[1].pickup_date).slice(0, 10) }</Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.img3}
              source={require('../../Images/map.jpg')}
            />
            <View style={{ marginBottom: '1%' }}>
              <Text style={styles.loctext}>{ data[1].drop_point }</Text>
              <Text style={styles.loctext}>Barakhamba Road</Text>
              <Text style={styles.loctext}>{ data[1].reach_date 
              ? <TouchableOpacity onPress={() =>{
                dispatch(selectedTrip(data));
                navigation.navigate('Rating');
              } }>
                <Text>Rate your experience</Text>
                </TouchableOpacity> 
              : <TouchableOpacity onPress={() => navigation.navigate('Tracking')}>
                <Text>Track Your delivery</Text>
              </TouchableOpacity> }</Text>
            </View>
          </View>
        </View>
      </View>)
    }
        </View>
        : <View>
          <Text>No Packages to receive</Text>
        </View>
      }
      
    </ScrollView>
  )
}

export default ReceivingPackages

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    height: '100%',
    width: '100%',
    // marginTop: StatusBar.currentHeight,
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
    width: 27,
    height: 27,
    marginTop: '1.4%',
    marginBottom: '1%',
  },
  stat: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginTop: '2%',
    marginBottom: '1.7%',
    marginLeft: '3.7%',
  },
  but: {
    backgroundColor: '#FF9F00',
    borderRadius: 1,
    paddingVertical: '0.6%',
    paddingHorizontal: '3.4%',
    marginTop: '1.5%',
    marginBottom: '1.2%',
  },
  buttext: {
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  img4: {
    width: 25,
    height: 25,
    marginTop: '1.1%',
    marginRight: '2.4%',
  },
  availtext: {
    color: '#000000',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
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
  text: {
    flex:1,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '5.2%',
    marginBottom: '5%',
  },
});
