import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ChatScreen} from '../screens';
import {Image, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

type BottomTabList = {
  Chatbot: undefined;
};

const Tab = createBottomTabNavigator<BottomTabList>();

const BottomNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Chatbot"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          headerShown: false,
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            backgroundColor: 'white',
            height: 70,
            paddingBottom: 10,
          },
          tabBarBadge: '',
        }}>
        <Tab.Screen
          name="Chatbot"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chatbot',
            tabBarIcon: () => {
              return (
                <View>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    source={{
                      uri: 'https://cdn.pixabay.com/photo/2012/04/05/02/04/speech-25916_1280.png',
                    }}
                  />
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;
