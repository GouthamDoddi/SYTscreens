import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';


import Welcome from '../Pages/Home/welcomePage';
import CustomerRegister from '../Pages/User/UserRegister';
import CustomerOtp from '../Pages/User/UserOtp';
import CustomerWelcome from '../Pages/User/UserWelcome';
import CustomerAddPackage from '../Pages/User/UserAddPackage';
import CustomerTruckAvailable from '../Pages/User/UserTruckAvailable';
import CustomerTruckBooking from '../Pages/User/UserTruckBooking';
import CustomerLogin from '../Pages/User/UserLogin';
import Tracking from '../Pages/User/Tracking';

import OwnerRegister from '../Pages/TruckOwner/OwnerRegister';
import OwnerOtp from '../Pages/TruckOwner/OwnerOtp';
import OwnerLogin from '../Pages/TruckOwner/OwnerLogIn';
import OwnerTripRegister from '../Pages/TruckOwner/OwnerTripRegister';


enableScreens();

const Stack = createNativeStackNavigator();

const Routes = () =>
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome"
      screenOptions={{
        stackAnimation: 'flip',
        stackPresentation: 'modal',
      }}>
      <Stack.Screen name="Welcome" component={Welcome}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerRegister" component={CustomerRegister}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerLogin" component={CustomerLogin}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerOtp" component={CustomerOtp}
        options={{ headerShown: false }}/>
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
      <Stack.Screen name="OwnerRegister" component={OwnerRegister}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerOtp" component={OwnerOtp}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerLogin" component={OwnerLogin}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerTripRegister" component={OwnerTripRegister}
        options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>;

export default Routes;
