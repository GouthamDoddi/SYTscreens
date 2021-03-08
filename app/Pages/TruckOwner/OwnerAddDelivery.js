import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HeaderU from '../../Component/HeaderU';
import TripComponent from '../../Component/TripComponent';
import { pickUpDate, drop, pickUp } from '../../Redux/actions/packageDetails';
import { localAxiosToken } from '../../utils/axios';
import axios from 'axios';
import qs from 'querystring';

import { packageWeight,
  packageSpace, entireTruck, receivingPersonName,
  receivingPersonNum, dropPersonName, dropPersonNum } from '../../Redux/actions/packageDetails';
import { allTripIdsNTruckNos, noOfTripsFound, allTruckDetails, allTruckSpaceNWeight } from '../../Redux/actions/tripsAvailable';
import { getListOfTruckIds } from '../../utils/formData';
import { configToken } from '../../utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import { tripHistory } from '../../Redux/actions/ownerTruckInfo';
import DropDown from '../../Component/DropDown';
import DatePicker2 from '../../Component/DatePicker2';
import Input2 from '../../Component/Input2';

function OwnerAddDelivery ({ navigation }) {
  // vars and selectors
  const [ success, setSuccess ] = useState('');
  const dispatch = useDispatch();
  const onClick = console.log('button clicked!');
  const OwnerFullName = useSelector(state => state.OwnerFullName);
  const OwnerToken = useSelector(state => state.OwnerToken);
  const TruckNo = useSelector(state => state.TruckNo);

  const pickUpPointSelector = useSelector(state => state.PickUp);
  const dropPointSelector = useSelector(state => state.Drop);
  const dateSelector = useSelector(state => state.PickUpDate);
  const entireTruckSelector = useSelector(state => state.EntireTruck);
  const receivingPersonNameSelector = useSelector(state => state.ReceivingPersonName);
  const packageSpaceSelector = useSelector(state => state.PackageSpace);
  const packageWeightSelector = useSelector(state => state.PackageWeight);
  const receivingPersonNumSelector = useSelector(state => state.ReceivingPersonNum);
  const DropPersonName = useSelector(state => state.DropPersonName);
  const DropPersonNum = useSelector(state => state.DropPersonNum);
  const TripDetails = useSelector(state => state.TripDetails);

  // intigrating API

  const params = `${qs.stringify({
    pickUpPoint: pickUpPointSelector,
    dropPoint: dropPointSelector,
    entireTruck: entireTruckSelector,
    receivingPersonName: receivingPersonNameSelector,
    receivingPersonNo: receivingPersonNumSelector,
    packageSpace: packageSpaceSelector,
    packageWeight: packageWeightSelector,
    customerName: DropPersonName,
    mobileNum: DropPersonNum,
  })}&date=${TripDetails.startDate}`;

  const params2 = packageId => `${qs.stringify({
    truckNo: TripDetails.truckNo,
    tripId: TripDetails.tripId,
    packageId,
    status: 'Accepted',
  })}&date=${TripDetails.startDate}`;

  const onSubmit = () => {
    axios(localAxiosToken('/addPackage', params, OwnerToken))
      .then(res => {
        console.log(params);
        console.log(res);
        axios(localAxiosToken('/assignPackage', params2(res.data.details[0].package_id), OwnerToken))
          .then(response => {
            console.log(response.data);
            setSuccess('Yes');
          })
          .catch(error => {
            console.log(error);
            setSuccess('No');
          });
      })
      .catch(err => {
        console.log(err);
        setSuccess('No');
      });
  };

  // form data

  const pickUpDispatch = data => dispatch(pickUp(data));
  const dropDispatch = data => dispatch(drop(data));
  const PackageWeightInput = {
    label: '',
    placeholder: 'Package Weight (.KG)',
    onChangeText (e) {
      dispatch(packageWeight(e));
    },
  };
  const dropCustomer = {
    label: '',
    placeholder: 'Drop Customer Name',
    onChangeText (e) {
      dispatch(dropPersonName(e));
    },
  };
  const mobileNumber = {
    label: '',
    placeholder: 'Mobile Number',
    onChangeText (e) {
      dispatch(dropPersonNum(e));
    },
  };
  const PackageSpaceInput = {
    label: '',
    placeholder: 'Package Space (.Ft)',
    onChangeText (e) {
      dispatch(packageSpace(e));
    },
  };
  const ReceivingPersonNameInput = {
    label: '',
    placeholder: 'Package receiving Person Name',
    onChangeText (e) {
      dispatch(receivingPersonName(e));
    },
  };
  const ReceivingPersonNumInput = {
    label: '',
    placeholder: 'Receiving Person Mobile Number',
    onChangeText (e) {
      dispatch(receivingPersonNum(e));
    },
  };

  // function
  const lastPage = () => navigation.navigate('OwnerTripRegister');

  return (
    // <View style={styles.responsiveBox}>
    <View style={styles.container}>
      <HeaderU data={onSubmit}/>
      <View style={styles.block}>
        <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>{OwnerFullName} !</Text></Text>
        <View style={styles.delrow}>
          <TouchableOpacity onPress={lastPage}>
            <Image
              style={styles.leftarrowimg}
              source={require('../../Images/left-arrow.png')}
            />
          </TouchableOpacity>
          <Text style={styles.adddel}><Text style={{ fontWeight: 'bold' }}>Add Deliveries </Text>(Trip-30 30-052020)</Text>
        </View>
        <View style={{ backgroundColor: '#FFFFFF', borderWidth: 0.3, marginBottom: '2.1%', paddingBottom: '2.5%' }}>
          <View style={styles.search}>
            <Image
              style={styles.img}
              source={require('../../Images/deliverybox.jpg')}
            />
            <Text style={styles.searchT}>Package 33</Text>
          </View>
          <View style={styles.searchin}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: '2.7%' }}>
              <View style={{ width: '49%', marginRight: '1%' }}>
                <Input2 data={ PackageWeightInput } />
              </View>
              <View style={{ width: '49%', marginLeft: '1%' }}>
                <Input2 data={ PackageSpaceInput } />
              </View>
            </View>
            <DropDown action={pickUpDispatch} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: '4.4%' }}>
              <View style={{ width: '59%', marginRight: '1%' }}>
                <Input2 data={ dropCustomer } />
              </View>
              <View style={{ width: '39%', marginLeft: '1%' }}>
                <Input2 data={ mobileNumber } />
              </View>
            </View>
            <DropDown action={dropDispatch}/>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: '2.6%' }}>
              <View style={{ width: '59%', marginRight: '1%' }}>
                <Input2 data={ReceivingPersonNameInput} />
              </View>
              <View style={{ width: '39%', marginLeft: '1%' }}>
                <Input2 data={ReceivingPersonNumInput} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.cancelrow}>
                <Text style={styles.canceltext}>Cancel Delivery</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.deleteimg}
                    source={require('../../Images/dustbin.png')}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={onSubmit} style={styles.searchtruck}>
                <Text style={styles.searchtruckt}>Accept Delivery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.addanother}>Add another Delivery request +.</Text>
        </TouchableOpacity>
        {
          success === 'Yes'
            ? <Text>Delivery sucessfully added.</Text>
            : success === 'No'
              ? <Text>Delivery failed. Try again</Text>
              : <View></View>
        }
      </View>
    </View>
    // {/* // </View> */}
  );
}

export default OwnerAddDelivery;

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
  block: {
    paddingHorizontal: '3.5%',
  },
  ntext: {
    color: '#000000',
    marginTop: '1%',
    marginLeft: '2.6%',
    marginBottom: '2.1%',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  delrow: {
    flexDirection: 'row',
    marginBottom: '2.6%',
  },
  leftarrowimg: {
    tintColor: '#000000',
    width: 25,
    height: 18,
  },
  adddel: {
    color: '#000000',
    marginLeft: '3.2%',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#FFF2E4',
  },
  img: {
    width: 25,
    height: 25,
    marginTop: '1.4%',
    marginBottom: '1.2%',
    marginLeft: '2.4%',
    marginRight: '1.6%',
  },
  searchT: {
    color: '#FF8200',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginTop: '2%',
    marginBottom: '1.7%',
  },
  searchin: {
    paddingLeft: '2.7%',
    paddingRight: '2.1%',
    paddingVertical: '1.6%',
  },
  available: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.4,
  },
  cancelrow: {
    flexDirection: 'row',
  },
  canceltext: {
    color: '#FF8200',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginRight: '1.6%',

  },
  deleteimg: {
    width: 15,
    height: 14,
    tintColor: '#FF8200',
  },
  searchtruck: {
    backgroundColor: '#FF8200',
    alignSelf: 'flex-end',
    paddingVertical: '0.6%',
    paddingHorizontal: '3%',
    marginRight: '1.4%',
  },
  searchtruckt: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    textAlign: 'center',
  },
  addanother: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
    marginTop: '2.5%',
    marginLeft: '4.5%',
  },
});
