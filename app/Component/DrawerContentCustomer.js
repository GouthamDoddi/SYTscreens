import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import axios from 'axios';
import qs from 'querystring';

import { localAxiosToken } from '../utils/axios';
import { receivingPackages } from '../Redux/actions/customerInfo';


function DrawerContentCustomer (props) {
  const { navigation } = props;

  const dispatch = useDispatch();
  const CustomerMobileNum = useSelector(state => state.CustomerMobileNum)
  const CustomerToken = useSelector(state => state.CustomerToken)
  
  const getReceivingPackages = () => {
    axios(localAxiosToken('/getReceivingPackages', qs.stringify({mobileNum: CustomerMobileNum}), CustomerToken))
    .then(res => {
      console.log(res.data);

      if (res.data.statusCode === 200){
        dispatch(receivingPackages(res.data.packageDetails));
        navigation.navigate('ReceivingPackages');
      } else {
        navigation.navigate('ReceivingPackages');
      }
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <DrawerContentScrollView { ...props}>
        <View style={styles.drawerContent}>
          <View style={styles.title}>
            <Image
              style={styles.img2}
              source={require('../Images/profile.jpg')}
            />
            <Text style={styles.userName}>
              Welcome,                                               <Text style={styles.userName2}>User Name</Text>
            </Text>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.drawerContent2}>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Notification"
            onPress={() => console.log('Log Out called')}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Receiving Packages"
            onPress={getReceivingPackages}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Ultimate Delivery App Share"
            onPress={() => console.log('Log Out called')}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Feedback"
            onPress={() => console.log('Log Out called')}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Privacy Policy"
            onPress={() => console.log('Log Out called')}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Contact Us"
            onPress={() => console.log('Log Out called')}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Sign Out"
            onPress={() => navigation.navigate('Welcome')}
          />
        </Drawer.Section>
      </View>
    </View>
  );
}

export default DrawerContentCustomer;

const styles = StyleSheet.create({
  img2: {
    marginLeft: '10%',
  },
  drawerContent: {
    flex: 1,
    // marginBottom: 50,
    borderBottomWidth: 0.5,
  },
  drawerContent2: {
    flex: 1,
    marginTop: '-190%',
  },
  userName: {
    fontSize: 25,
    marginTop: '-18%',
    marginLeft: '30%',
    marginBottom: '3%',
  },
  userName2: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '25%',
    // marginTop: '40%',
  },
  title: {
    fontSize: 30,
    marginTop: '18%',
    fontWeight: 'bold',
  },
  bottomDrawerSection: {
    borderTopColor: '#FFFFFF',
    // borderTopWidth: 1,
  },
});
