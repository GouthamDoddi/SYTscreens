import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from '../Component/DrawerContent';
import DrawerContentCustomer from '../Component/DrawerContentCustomer';
import DrawerContentTransport from '../Component/DrawerContentTransport';


import OwnerStack from './OwnerStack';
import CustomerStack from './CustomerStack';
import TransportStack from './TransportStack';


const Drawer = createDrawerNavigator();


export function MyDrawer () {
  return (
    <Drawer.Navigator drawerPosition={'right'} drawerContent={props => <DrawerContent { ...props } />} >
      <Drawer.Screen name='addTrip' component={OwnerStack} />
    </Drawer.Navigator>
  );
}

export function CustomerDrawer () {
  return (
    <Drawer.Navigator drawerPosition={'right'} drawerContent={props => <DrawerContentCustomer { ...props } />} >
      <Drawer.Screen name='addTrip' component={CustomerStack} />
    </Drawer.Navigator>
  );
}

export function TransportDrawer () {
  return (
    <Drawer.Navigator drawerPosition={'right'} drawerContentOptions={{ labelStyle: { color: 'white' } }} drawerContent={props => <DrawerContentTransport { ...props } />} >
      <Drawer.Screen name='addTrip' component={TransportStack} />
    </Drawer.Navigator>
  );
}
