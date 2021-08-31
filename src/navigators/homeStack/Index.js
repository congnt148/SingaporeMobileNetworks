import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/homeScreen/Index';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator headerMode="">
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
