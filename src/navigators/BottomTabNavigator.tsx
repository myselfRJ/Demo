import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {LoadingScreen} from '../screens';
import {Icon} from 'react-native-paper';

type BottomTabList = {
  Lifestyle: undefined;
  Overview: undefined;
};

const Tab = createBottomTabNavigator<BottomTabList>();

const BottomNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Lifestyle"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 70,
          paddingBottom: 10,
        },
      }}>
      <Tab.Screen
        name="Overview"
        component={LoadingScreen}
        options={{
          tabBarLabel: 'BP Overview',
          tabBarIcon: () => {
            return <Icon source={'heart'} size={20} />;
          },
        }}
      />
      <Tab.Screen
        name="Lifestyle"
        component={LoadingScreen}
        options={{
          tabBarLabel: 'Lifestyle',
          tabBarIcon: () => {
            return <Icon source={'walk'} size={20} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
