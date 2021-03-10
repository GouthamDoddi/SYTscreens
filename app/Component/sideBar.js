import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen ({ navigation, home }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function WelcomeScreen ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Welcome')}
        title="LogOut"
      />
    </View>
  );
}

function NotificationsScreen ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App ({ module }) {
  const home = module === 'User'
    ? 'UserWelcome'
    : module === 'TruckDriver'
      ? 'OwnerAddDelivery'
      : 'TransportWelcome';

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={home}>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Ultimate Delivery App Share" component={HomeScreen} />
        <Drawer.Screen name="Feedback" component={HomeScreen} />
        <Drawer.Screen name="Contact Us" component={HomeScreen} />
        <Drawer.Screen name="Sign Out" component={WelcomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
