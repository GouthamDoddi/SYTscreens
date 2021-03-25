import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import OwnerTripRegister from '../Pages/TruckOwner/OwnerTripRegister';
import OwnerDeliveryRequests from '../Pages/TruckOwner/OwnerDeliveryRequests';
import OwnerAddDelivery from '../Pages/TruckOwner/OwnerAddDelivery';
import OwnerCheckList from '../Pages/TruckOwner/OwnerCheckList';

enableScreens();

const Stack = createNativeStackNavigator();

function OwnerStack () {
  return (
    <Stack.Navigator initialRouteName="OwnerTripRegister"
      screenOptions={{
        stackAnimation: 'flip',
        stackPresentation: 'modal',
      }}>
      <Stack.Screen name="OwnerTripRegister" component={OwnerTripRegister}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerDeliveryRequests" component={OwnerDeliveryRequests}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerAddDelivery" component={OwnerAddDelivery}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerCheckList" component={OwnerCheckList}
        options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default OwnerStack;
