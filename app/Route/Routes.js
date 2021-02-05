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
        options={{ headerShown: true }}/>
      <Stack.Screen name="CustomerRegister" component={CustomerRegister}
        options={{ headerShown: true }}/>
      <Stack.Screen name="CustomerLogin" component={CustomerLogin}
        options={{ headerShown: true }}/>
      <Stack.Screen name="CustomerOtp" component={CustomerOtp}
        options={{ headerShown: true }}/>
      <Stack.Screen name="CustomerWelcome" component={CustomerWelcome}
        options={{ headerShown: true }}/>
      <Stack.Screen name="CustomerAddPackage" component={CustomerAddPackage}
        options={{ headerShown: true }}/>
      <Stack.Screen name="CustomerTruckAvailable" component={CustomerTruckAvailable}
        options={{ headerShown: true }}/>
      <Stack.Screen name="CustomerTruckBooking" component={CustomerTruckBooking}
        options={{ headerShown: true }}/>
      <Stack.Screen name="Tracking" component={Tracking}
        options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>;

export default Routes;
