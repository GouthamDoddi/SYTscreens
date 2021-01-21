import React from 'react';
import { Text, SafeAreaView, Image, TouchableOpacity, ScrollView, View } from 'react-native';
import styles from './welcomePageStyles';


const WelcomePage = () => {
  const onUser = () => { /* navigate to userRegister page} */ };
  const onTruck = () => { /* navigate to truck owner page */ };
  const onTransport = () => { /* navigate to transport company page */ };


  return (
    <SafeAreaView styles={styles.container}>

      {/* package owner part */}
      <View style={styles.part1}>
        <Text style={styles.mainText}>Package Owner</Text>
        <TouchableOpacity onPress={onUser}>
          <Image style={styles.arrowing}
            source={require('../../Images/right-arrow.png')} />
        </TouchableOpacity>
      </View>

      {/* truck owner part */}
      <View style={styles.part2}>
        <Text style={styles.mainText2}>Truck Owner</Text>
        <TouchableOpacity onPress={onTruck}>
          <Image style={styles.arrowing}
            source={require('../../Images/right-arrow.png')} />
        </TouchableOpacity>
      </View>

      {/* Transport Company part */}
      <View style={styles.part3}>
        <Text style={styles.mainText3}>Transport Company</Text>
        <TouchableOpacity onPress={onTransport}>
          <Image style={styles.arrowing}
            source={require('../../Images/right-arrow.png')} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default WelcomePage;
