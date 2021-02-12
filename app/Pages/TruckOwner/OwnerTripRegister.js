import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';


import HeaderU from '../../Component/HeaderU';

function OwnerTripRegister ({ navigation }) {
  // form data

  const onSubmit = () => console.log('header clicked!');

  const onClick = () => console.log('Submit called');

  return (
    <View style={styles.container}>
      {/* <AppStatusBarU /> */}
      <HeaderU data={ onSubmit }/>
      <View style={styles.block}>
        <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>Vehicle Owner Name !</Text></Text>
        <Text style={styles.ntext}><Text style={{ fontWeight: 'bold' }}>Driver Name : </Text>Arjun Rampa</Text>
        <TouchableOpacity>
          <Text style={styles.add}>Add Trip +</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#FFFFFF', marginBottom: '2.1%', borderWidth: 0.3 }}>
          <View style={styles.search}>
            <Text style={styles.searchT}>Trip 2</Text>
            <Text style={styles.searchD}>Status : </Text>
            <Text style={styles.searchDs}>In Transit</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '2.1%' }}>
            <View style={{ marginBottom: '3.1%' }}>
              <View style={styles.d}>
                <Text style={styles.dropt3}>Delivery Start Point</Text>
                <Text style={styles.dropt}>Delivery Name</Text>
              </View>
              <View style={styles.d}>
                <Text style={styles.dropt3}>Delivery End Point</Text>
                <Text style={styles.dropt}>Delivery Name</Text>
              </View>
              <View style={styles.d}>
                <Text style={styles.dropt3}>Date &#x26; Time</Text>
                <Text style={styles.dropt}>Print Time</Text>
              </View>
            </View>
            <View style={styles.s}>
              <Text style={styles.sea}>Packages</Text>
              <Text style={styles.number}>38</Text>
              <Text style={styles.seas}>Drop Done - <Text style={{ color: 'green' }}>4</Text></Text>
              <Text style={styles.seaund}>Check List</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: '2.2%' }}>
            <Text style={styles.last1}>+ Add Delivery</Text>
            <TouchableOpacity onPress={onClick}>
              <Text style={styles.last1}>Delevery Requests &#62;</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.search}>
          <Text style={styles.searchT}>Trip 1</Text>
          <Text style={styles.searchD}>Maximise</Text>
          <Text style={styles.searchM}>+</Text>
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
    marginTop: '2.1%',
    marginBottom: '2.2%',
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
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
    marginRight: '48.3%',
  },
  searchD: {
    color: '#000000',
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
    marginTop: '1.7%',
    marginBottom: '1.8%',
    marginRight: '1.9%',
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
    alignSelf: 'center',
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
});

