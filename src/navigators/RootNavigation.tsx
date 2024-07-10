import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoadingScreen} from '../screens';
import React from 'react';
import BottomNavigation from './BottomTabNavigator';

type StackParamList = {
  LoadingScreen: undefined;
  Home: undefined;
};

type RootNavigationProps = {};

const Stack = createStackNavigator<StackParamList>();

const RootNavigation: React.FC<RootNavigationProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Home" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
