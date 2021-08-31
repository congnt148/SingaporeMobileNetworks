import React from 'react';
import RootNavigator from './RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
