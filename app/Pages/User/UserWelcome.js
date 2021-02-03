import React from 'react';
import { StatusBar, Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';


import Header from '../../Component/Header';


export default function CustomerWelcome ({ navigation }) {
  // state vars

  const CustomerFullName = useSelector(state => `${state.CustomerFirstName} ${state.CustomerLastName}`);

  const onSubmit = () => {
    console.log('onSubmit called');
    navigation.navigate('CustomerAddPackage');
  };

  const track = () => {
    console.log('track called');
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
      <Header data={componentData} />
      <View style={styles.block}>
        <Text style={styles.ntext}>Welcome, <Text style={{ fontWeight: 'bold' }}>{CustomerFullName}!</Text></Text>
        <Text style={styles.add}>Your Package is On the Way</Text>
        <View style={{ backgroundColor: '#FFFFFF', borderWidth: 0.3, marginBottom: '2.1%', marginLeft: '-2.6%' }}>
          <View style={styles.search}>
            <View style={{ flexDirection: 'row', width: '60%' }}>
              <Image
                style={styles.img}
                source={require('../../Images/deliverybox.jpg')}
              />
              <Text style={styles.stat}>Status : <Text style={{ color: 'orange' }}>In Transit</Text></Text>
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
              <Text style={styles.availtext}>Tata Ace (Lorry No)</Text>
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
                <Text style={styles.loctext}>Hyderabad</Text>
                <Text style={styles.loctext}>Miyapur Main Road</Text>
                <Text style={styles.loctext}>3rd May, 8:30 PM</Text>
              </View>
            </View>
            <View>
              <Image
                style={styles.img3}
                source={require('../../Images/map.jpg')}
              />
              <View style={{ marginBottom: '1%' }}>
                <Text style={styles.loctext}>Delhi</Text>
                <Text style={styles.loctext}>Barakhamba Road</Text>
                <Text style={styles.loctext}>4th May, 9:30 PM</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.adds}>+</Text>
        </TouchableOpacity>
        <Text style={styles.del}>Deliver a Package</Text>
        <TouchableOpacity>
          <Text style={styles.wan}>Want to Deliver a Package ?</Text>
        </TouchableOpacity>
      </View>
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
});

