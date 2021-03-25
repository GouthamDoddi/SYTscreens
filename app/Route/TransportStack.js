import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import TransportAddDelivery from '../Pages/TransportCompany/TransportAddDelivery';
import TransportAddTrip from '../Pages/TransportCompany/TransportAddTrip';
import TransportDeliveryRequests from '../Pages/TransportCompany/TransportDeliveryRequests';
import TransportCheckList from '../Pages/TransportCompany/TransportCheckList';

enableScreens();

const Stack = createNativeStackNavigator();

function TransportStack () {
  return (
    <Stack.Navigator initialRouteName="TransportAddTrip"
      screenOptions={{
        stackAnimation: 'flip',
        stackPresentation: 'modal',
      }}>
      <Stack.Screen name="TransportAddDelivery" component={TransportAddDelivery}
        options={{ headerShown: false }}/>
      <Stack.Screen name="TransportAddTrip" component={TransportAddTrip}
        options={{ headerShown: false }}/>
      <Stack.Screen name="TransportDeliveryRequests" component={TransportDeliveryRequests}
        options={{ headerShown: false }}/>
      <Stack.Screen name="TransportCheckList" component={TransportCheckList}
        options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default TransportStack;
