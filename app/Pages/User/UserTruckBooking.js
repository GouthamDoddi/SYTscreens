import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet }
  from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'querystring';


import Header from '../../Component/Header';
import { axios, configToken } from '../../utils/axios';
import { packageId } from '../../Redux/actions/packageDetails';

function CustomerTruckBooking ({ navigation }) {
  // vars and selectors
  const dispatch = useDispatch();

  const pickUpPointSelector = useSelector(state => state.PickUp);
  const dropPointSelector = useSelector(state => state.Drop);
  const dateSelector = useSelector(state => state.PickUpDate);
  const entireTruckSelector = useSelector(state => state.EntireTruck);
  const receivingPersonNameSelector = useSelector(state => state.ReceivingPersonName);
  const packageSpaceSelector = useSelector(state => state.PackageSpace);
  const packageWeightSelector = useSelector(state => state.PackageWeight);
  const receivingPersonNumSelector = useSelector(state => state.ReceivingPersonNum);
  const customerTokenSelector = useSelector(state => state.CustomerToken);
  const PackageId = useSelector(state => state.PackageId);

  const SelectedTruckData = useSelector(state => state.SelectedTruckData);

  const onSubmit = async () => {
    const params = `${qs.stringify({
      pickUpPoint: pickUpPointSelector,
      dropPoint: dropPointSelector,
      entireTruck: entireTruckSelector,
      receivingPersonName: receivingPersonNameSelector,
      receivingPersonNo: receivingPersonNumSelector,
      packageSpace: packageSpaceSelector,
      packageWeight: packageWeightSelector,
    })}&date=${dateSelector}`;

    try {
      await axios.post('/addPackage', params, configToken(customerTokenSelector))
        .then(async response => {
          dispatch(packageId(response.data.details[0].package_id));

          console.log(PackageId, SelectedTruckData.truckNo);

          await axios.post('/assignPackage', qs.stringify({ packageId: PackageId,
            truckNo: SelectedTruckData.truckNo }), configToken(customerTokenSelector))
            .then(res => {
              console.log(res.data);
              navigation.navigate('Tracking');
            });
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const headerData = () => console.log('clicked on header');


  return (
    <View style={ styles.container}>
      {/* <View style={{ backgroundColor: '#FFFFFF', borderWidth: 0.3, margintop: '2.1%' }}> */}
      <Header data={ headerData }/>
      <View style={styles.search}>
        <Image
          style={styles.img}
          source={require('../../Images/yellowtruck.jpg')}
        />
        <Text style={styles.searchD}>{ SelectedTruckData.model }</Text>
      </View>
      <View style={{ marginVertical: '1.2%', marginHorizontal: '2.7%', flexDirection: 'row' }}>
        <View style={{ width: '60%' }}>
          <Text style={styles.avail}>Estimated Price <Text style={{ color: '#00FFFF' }}>Rs 99999</Text></Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.img3}
              source={require('../../Images/map.jpg')}
            />
            <View style={styles.bord}/>
          </View>
          <View style={{ marginBottom: '1%' }}>
            <Text style={styles.loctext}> {SelectedTruckData.pickUp} </Text>
            <Text style={styles.loctext}>Miyapur Main Road</Text>
            <Text style={styles.loctext}>3rd May, 8:30 PM</Text>
          </View>
          <Text style={styles.available}>Available Space : <Text style={{ fontWeight: 'bold' }}> { SelectedTruckData.availableSpace } </Text></Text>
          <Text style={styles.available}>Available Weight : <Text style={{ fontWeight: 'bold' }}> { SelectedTruckData.availableWeight } </Text></Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.img2}
              source={require('../../Images/withstar.jpg')}
            />
            <Image
              style={styles.img2}
              source={require('../../Images/withstar.jpg')}
            />
            <Image
              style={styles.img2}
              source={require('../../Images/withstar.jpg')}
            />
            <Image
              style={styles.img2}
              source={require('../../Images/withoutstar.jpg')}
            />
            <Image
              style={styles.img2}
              source={require('../../Images/withoutstar.jpg')}
            />
          </View>
          <Image
            style={styles.img3}
            source={require('../../Images/map.jpg')}
          />
          <View style={{ marginBottom: '1%' }}>
            <Text style={styles.loctext}>{SelectedTruckData.drop}</Text>
            <Text style={styles.loctext}>Barakhamba Road</Text>
            <Text style={styles.loctext}>4th May, 9:30 PM</Text>
          </View>
          <TouchableOpacity style={styles.but} onPress={ onSubmit } >
            <Text style={styles.buttext}>Book Truck</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </View>);
}

export default CustomerTruckBooking;

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

