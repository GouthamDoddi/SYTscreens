import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';


import Welcome from '../Pages/Home/welcomePage';
import CustomerRegister from '../Pages/User/UserRegister';
import CustomerOtp from '../Pages/User/UserOtp';
import CustomerLogin from '../Pages/User/UserLogin';
import Tracking from '../Pages/User/Tracking';

import OwnerRegister from '../Pages/TruckOwner/OwnerRegister';
import OwnerOtp from '../Pages/TruckOwner/OwnerOtp';
import OwnerLogin from '../Pages/TruckOwner/OwnerLogIn';

import TransportRegister from '../Pages/TransportCompany/TransportRegister';
import TransportLogin from '../Pages/TransportCompany/TransportLogin';
import TransportTruckRegister from '../Pages/TransportCompany/TransportTruckRegister';
import TransportOtp from '../Pages/TransportCompany/TransportOtp';
import AddSingleTruck from '../Pages/TransportCompany/AddSingleTruck';
import deleteTruck from '../Pages/TransportCompany/deleteTruck';

import { NavigationContainer } from '@react-navigation/native';
import { TransportDrawer, MyDrawer, CustomerDrawer } from './Drawer';
import HeaderT from '../Component/HeaderT';


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
      {/* <Stack.Screen name="Welcome" component={App}
        options={{ headerShown: false }}/> */}
      <Stack.Screen name="CustomerRegister" component={CustomerRegister}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerLogin" component={CustomerLogin}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerOtp" component={CustomerOtp}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerWelcome" component={CustomerDrawer}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerRegister" component={OwnerRegister}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerOtp" component={OwnerOtp}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerLogin" component={OwnerLogin}
        options={{ headerShown: false }}/>
      <Stack.Screen name="OwnerTripRegister" component={MyDrawer}
        options={{ headerShown: false }}/>
      <Stack.Screen name="TransportRegister" component={TransportRegister}
        options={{ headerShown: false }}/>
      <Stack.Screen name="TransportLogin" component={TransportLogin}
        options={{ headerShown: false }}/>
      <Stack.Screen name="TransportTruckRegister" component={TransportTruckRegister}
        options={{ headerShown: false }}/>
      <Stack.Screen name="TransportOtp" component={TransportOtp}
        options={{ headerShown: false }}/>
      <Stack.Screen name="TransportAddTrip" component={TransportDrawer}
        options={{ headerShown: false }}/>
      <Stack.Screen name="AddSingleTruck" component={AddSingleTruck}
        options={{ headerShown: true }}/>
      <Stack.Screen name="HeaderT" component={HeaderT}
        options={{ headerShown: false }}/>
      <Stack.Screen name="DeleteTruck" component={deleteTruck}
        options={{ headerShown: false }}/>
      <Stack.Screen name="Tracking" component={Tracking}
        options={{ headerShown: false }}/>
      {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}
        options={{ headerShown: false }}/>
      <Stack.Screen name="NotificationScreen" component={NotificationScreen}
        options={{ headerShown: false }}/> */}
    </Stack.Navigator>
  </NavigationContainer>;

export default Routes;
