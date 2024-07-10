import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {ReactElement, useEffect} from 'react';
import {View, Text} from 'react-native';

const LoadingScreen = (): ReactElement => {
  const nav: NavigationProp<ReactNavigation.RootParamList> = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      nav.navigate('Home');
    }, 1000);
  }, []);
  return (
    <View>
      <Text>Hi</Text>
    </View>
  );
};

export default LoadingScreen;
