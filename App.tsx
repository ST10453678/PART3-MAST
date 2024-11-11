import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './signInscreen';
import Menu from './Menu';
import Description from './Description';
import Payment from './Payment';
import FilterMenu from './FilterMenu';  // Import your FilterMenu screen
import GuestMenu from './GuestMenu';
import ManageMenu from './ManageMenu';


export type RootStackParamList = {
  SignIn: undefined;
  Menu: undefined;
  Description: { cartItems: any[]; totalPrice: number };  // Parameter typing for Description
  Payment: { cartItems: any[]; totalPrice: number };  // Parameter typing for Payment
  ManageMenu: undefined;
  GuestMenu: undefined;
  FilterMenu: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Description" component={Description} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="ManageMenu" component={ManageMenu} />
        <Stack.Screen name="GuestMenu" component={GuestMenu} />
        <Stack.Screen name="FilterMenu" component={FilterMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
