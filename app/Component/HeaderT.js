import React from 'react';
import { StatusBar, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';


function HeaderT ({ data }) {
  const { onSubmit } = data;


  return (
    <View style={styles.header}>
      <StatusBar backgroundColor='#000000' />
      <Image
        style={styles.img}
        source={require('../Images/logowhite.jpg')}
      />
      <View style={styles.col}>
        <Text style={styles.htext}>ULTIMATE</Text>
        <Text style={styles.htext}>DELIVERY</Text>
      </View>
      <TouchableOpacity style={styles.side} onPress={onSubmit}>
        <Image
          style={styles.img2}
          source={require('../Images/profile.jpg')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default HeaderT;

const styles = StyleSheet.create({

  header: {
    height: '11.1%',
    backgroundColor: '#000000',
    flexDirection: 'row',
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
