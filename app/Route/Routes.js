import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../Pages/Home/welcomePage';

const Stack = createStackNavigator();

const Routes = () =>
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>;

export default Routes;
