import React from 'react';
import { StatusBar, Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';
import TruckComponent from '../../Component/truckComponet';

import Header from '../../Component/Header';
import TruckComponet from '../../Component/truckComponet';
import PackageComponent from '../../Component/PackageComponent';
import { ScrollView } from 'react-native-gesture-handler';


export default function CustomerWelcome ({ navigation }) {
  // state vars

  const CustomerFullName = useSelector(state => `${state.CustomerFirstName} ${state.CustomerLastName}`);
  const CustomerPackages = useSelector(state => state.CustomerPackages);

  console.log(CustomerPackages)

  const onSubmit = () => {
    console.log('onSubmit called');
    navigation.navigate('CustomerAddPackage');
  };

  const track = () => {
    navigation.navigate('Tracking')
  };

  // component data

  const componentData = {
    onSubmit () {
      console.log('onSubmit called!');
    },
  };

  // loading fonts
  const [ isLoaded ] = useFonts({
    Poppins_400Regular,
  }); 

  if (!isLoaded)
    return <AppLoading />;

  return (
  // <View style={styles.responsiveBox}>
    <SafeAreaView style={styles.container}>
      <Header openDrawer={() => navigation.openDrawer()} />
      <ScrollView>
      <View style={styles.block}>
        <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>{CustomerFullName}!</Text></Text>
        <TouchableOpacity onPress={onSubmit} >
          <Text style={styles.addanother}>Add Delivery request </Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.adds}>+</Text>
        </TouchableOpacity>
        <PackageComponent packages={CustomerPackages} track={track} />
        <Text style={styles.del}>Deliver a Package</Text>
        <TouchableOpacity>
          <Text style={styles.wan}>Want to Deliver a Package ?</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    height: '100%',
    width: '100%',
    // marginTop: StatusBar.currentHeight,
  },
  block: {
    marginLeft: '5%',
    marginRight: '5%',
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
    marginTop: '5.1%',
    marginBottom: '2.2%',
  },
  addanother:{
    marginTop: '5%',
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
    marginTop: '-11%',
    marginBottom: '0.1%',
    marginLeft: '-5%',
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
});

