import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function DrawerContent (props) {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, backgroundColor: '#FF8200' }}>
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
            label="Pending Delivery Requests"
            onPress={() => console.log('Log Out called')}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
          // icon={({ color, size }) =>
          //   <Icon
          //     name="logOut"
          //     color={color}
          //     size={size}
          //   />}
            label="Notification"
            onPress={() => console.log('Log Out called')}
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

export default DrawerContent;

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
    borderTopColor: '#f4f4f4',
    // borderTopWidth: 1,
  },
});
