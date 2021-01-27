import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';


import Welcome from '../Pages/Home/welcomePage';
import CustomerRegister from '../Pages/User/UserRegister';
import CustomerOtp from '../Pages/User/UserOtp';
import CustomerWelcome from '../Pages/User/UserWelcome';
import CustomerAddPackage from '../Pages/User/UserAddPackage';


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
      <Stack.Screen name="CustomerOtp" component={CustomerOtp}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerWelcome" component={CustomerWelcome}
        options={{ headerShown: false }}/>
      <Stack.Screen name="CustomerAddPackage" component={CustomerAddPackage}
        options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>;

export default Routes;
