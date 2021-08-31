import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeStack from './homeStack/Index';
const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Dashboard" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
