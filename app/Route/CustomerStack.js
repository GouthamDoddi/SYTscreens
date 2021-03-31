import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import CustomerWelcome from '../Pages/User/UserWelcome';
import CustomerAddPackage from '../Pages/User/UserAddPackage';
import CustomerTruckAvailable from '../Pages/User/UserTruckAvailable';
import CustomerTruckBooking from '../Pages/User/UserTruckBooking';
import Tracking from '../Pages/User/Tracking';
import ReceivingPackages from '../Pages/User/ReceivingPackages';
import rating from '../Pages/User/ratings';


enableScreens();

const Stack = createNativeStackNavigator();

function CustomerStack () {
  return (
    <Stack.Navigator initialRouteName="CustomerWelcome"
      screenOptions={{
        stackAnimation: 'flip',
        stackPresentation: 'modal',
      }}>
      <Stack.Screen name="CustomerWelcome" component={CustomerWelcome}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerAddPackage" component={CustomerAddPackage}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerTruckAvailable" component={CustomerTruckAvailable}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerTruckBooking" component={CustomerTruckBooking}
        options={{ headerShown: false }}/>
      <Stack.Screen name="Tracking" component={Tracking}
        options={{ headerShown: false }}/>
      <Stack.Screen name="ReceivingPackages" component={ReceivingPackages}
        options={{ headerShown: false }}/>
      <Stack.Screen name="Rating" component={rating} />
    </Stack.Navigator>
  );
}

export default CustomerStack;
