import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../Component/Header';
import DropDown from '../../Component/DropDown';
import Input2 from '../../Component/Input2';
import Date from '../../Component/DataPicker';

import { pickUp, drop, pickUpDate, packageWeight,
  packageSpace, entireTruck, receivingPersonName,
  receivingPersonNum } from '../../Redux/actions/packageDetails';
import { CustomerFirstName, CustomerLastName } from '../../Redux/reducers/customerInfo';


const UserAddPackage = () => {
  // vars and redux
  const dispatch = useDispatch();

  const CustomerFullName = useSelector(state => `${state.CustomerFirstName} ${state.CustomerLastName}`);

  // functions
  const onSubmit = () => console.log('onSubmit called');

  const fulltruck = () => console.log('full truck called');

  // form data
  const PackageWeightInput = {
    label: '',
    placeholder: 'Package Weight (.KG)',
    onChangeText (e) {
      dispatch(packageWeight(e));
    },
  };
  const PackageSpacetInput = {
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

  const HeaderData = {
    onSubmit () {
      console.log('onSubmit called');
    },
  };

  return (
    <View style={styles.container}>
      <Header data = {HeaderData}/>
      <View style={styles.block}>
        <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>{CustomerFullName} !</Text></Text>
        <TouchableOpacity>
          <Text style={styles.add}>Add a Package +</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#FFFFFF', borderWidth: 0.3, marginBottom: '2.1%', paddingBottom: '2.5%' }}>
          <View style={styles.search}>
            <Text style={styles.searchT}>Search for the Truck</Text>
            <Image
              style={styles.img}
              source={require('../../Images/yellowtruck.jpg')}
            />
          </View>
          <View style={{ marginVertical: '1.2%', marginHorizontal: '2.7%' }}>
            <DropDown />
            <DropDown />
            <Date />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '10%' }}>
              <View style={{ width: '48.8%', marginRight: '1.2%' }}>
                <Input2 data={PackageSpacetInput} />
              </View>
              <View style={{ width: '48.8%', marginLeft: '1.2%' }}>
                <Input2 data={PackageWeightInput} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '2.1%', marginLeft: '2.7%' }}>
              <View style={styles.box}/>
              <TouchableOpacity onPress={fulltruck}>
                <Text style={styles.book}>Book Entire Truck</Text>
              </TouchableOpacity>
            </View>
            <Input2 data={ReceivingPersonNameInput} />
            <Input2 data={ReceivingPersonNumInput} />
            <TouchableOpacity onPress={onSubmit} style={styles.searchtruck}>
              <Text style={styles.searchtruckt}>Search Truck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>);
};


export default UserAddPackage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    marginTop: StatusBar.currentHeight,

  },
  //   responsiveBox: {
  //     width: wp('100%'),
  //     height: hp('100%'),
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
    marginTop: '2.1%',
    marginBottom: '2.2%',
  },
  search: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,159,0,0.10)',
    marginBottom: '1.1%',
  },
  searchT: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.46,
    marginTop: '1.7%',
    marginBottom: '1.8%',
    marginLeft: '4.3%',
    width: '75%',

  },
  img: {
    width: 45,
    height: 26.7,
    marginTop: '1.7%',
    marginBottom: '1.3%',
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
  calender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#979797',
    marginBottom: '1.2%',
  },
  calimg: {
    height: 22.9,
    width: 25,
  },
  box: {
    height: 22,
    width: 22,
    color: '#979797',
    borderWidth: 1,
    borderRadius: 2,
  },
  book: {
    marginTop: '0.4%',
    color: '#141414',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    marginLeft: '2.4%',
  },
  searchtruck: {
    backgroundColor: '#FF8200',
    // backgroundColor:'#DFDFDF',
    height: 24,
    width: '30.3%',
    alignSelf: 'flex-end',
    paddingVertical: '1.2%',
    marginTop: '1.6%',
  },
  searchtruckt: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginTop: '0.6%',
    textAlign: 'center',
  },
});

