import React from 'react';
import { StatusBar, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';


function Header ({ openDrawer }) {


  return (
    <View style={styles.header}>
      <StatusBar backgroundColor='#FF9F00' />
      <Image
        style={styles.img}
        source={require('../Images/logowhite.jpg')}
      />
      <View style={styles.col}>
        <Text style={styles.htext}>ULTIMATE</Text>
        <Text style={styles.htext}>DELIVERY</Text>
      </View>
      <TouchableOpacity style={styles.side} onPress={() => openDrawer()}>
        <Image
          style={styles.img2}
          source={require('../Images/profile.jpg')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  //   responsiveBox: {
  //     width: wp('100%'),
  //     height: hp('100%'),
  //   },

  header: {
    height: '11.1%',
    backgroundColor: '#FF9F00',
    flexDirection: 'row',
    width: '100%',
  },
  img: {
    width: 25.7,
    height: 32.8,
    marginTop: '4.8%',
    marginLeft: '6.1%',
    marginBottom: 0,
  },
  col: {
    flexDirection: 'column',
    marginTop: '5.4%',
    marginLeft: '1.1%',
  },
  htext: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 1.4,
  },
  side: {
    marginTop: '5.5%',
    marginLeft: '52.5%',
    marginRight: '3.7%',
  },
  img2: {
    width: 28,
    height: 28,
  },
});

