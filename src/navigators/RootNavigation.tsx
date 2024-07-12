import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoadingScreen} from '../screens';
import React from 'react';
import BottomNavigation from './BottomTabNavigator';
import LoginScreen from '../screens/Login/Login';

type StackParamList = {
  LoadingScreen: undefined;
  Login: undefined;
  Home: undefined;
};

type RootNavigationProps = {};

const Stack = createStackNavigator<StackParamList>();

const RootNavigation: React.FC<RootNavigationProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
