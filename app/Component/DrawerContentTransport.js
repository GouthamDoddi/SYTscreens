import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import AddSingleTruck from '../Pages/TransportCompany/AddSingleTruck';


function DrawerContentTransport (props) {
  const { navigation } = props;

  const singleTruck = () => navigation.navigate('AddSingleTruck');
  const deleteTruck = () => navigation.navigate('DeleteTruck');


  return (
    <View style={{ flex: 1 }}>
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
            lableStyle={ styles.lable }
            label="Add New Truck"
            onPress={singleTruck}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Delete Truck"
            onPress={deleteTruck}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Delivery Requests"
            onPress={() => console.log('Log Out called')}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Notifications"
            onPress={() => console.log('Log Out called')}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Ultimate Delivery App"
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
            label="Privcay Policy"
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
            onPress={() => console.log('Log Out called')}
          />
        </Drawer.Section>
      </View>
    </View>
  );
}

export default DrawerContentTransport;

const styles = StyleSheet.create({
  img2: {
    marginLeft: '10%',
  },
  drawerContent: {
    flex: 1,
    // marginBottom: 50,
    borderBottomWidth: 0.5,
    backgroundColor: '#000000',
    marginTop: '-2%',
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
    color: 'white',
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
});
