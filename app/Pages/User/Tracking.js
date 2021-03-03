import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions,
  TouchableOpacity, Image, Text } from 'react-native';

import Header from '../../Component/Header';
import AppStatusBar from '../../Component/StatusBar';


export default function Tracking ({ navigation }) {
  const headerData = () => console.log('Header clicked!');

  const onSubmit = () => console.log('button clicked');

  return (
    <View style={styles.container}>
      <Header data={headerData} />
      <MapView style={styles.map}>
      </MapView>
      <View style={styles.but}>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.buttext}>DONE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '79.9%',
  },
  but0: {
    backgroundColor: '#FFA100',
    paddingVertical: '0.6%',
    marginTop: '5%',
    borderRadius: 9,
    width: '55.2%',
    marginLeft: '9%',
    flexDirection: 'row',
  },
  img: {
    width: 25,
    height: 25,
  },
  buttext0: {
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#FFFFFF',
    marginHorizontal: '5.1%',
  },
  but: {
    flex: 1,
    backgroundColor: '#FFA100',
    paddingVertical: '1.5%',
    borderRadius: 4,
    width: '93%',
    alignSelf: 'center',
    height: '5%',
    // marginBottom: '20%',
  },
  buttext: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
