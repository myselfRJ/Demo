import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {ReactElement, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {AppImages} from '../../images';
import {ScrollView} from 'react-native-gesture-handler';
const text1 =
  'Our analysis shows your BP is related to your daily number of steps. This week, focus on increasing your daily step count.';
const LoadingScreen = (): ReactElement => {
  const nav: NavigationProp<ReactNavigation.RootParamList> = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>
          Personalized Impact of Lifestyle factors
        </Text>
        <View style={styles.subcontainer}>
          <Text style={styles.subheader}>Recommendation</Text>
          <Text style={styles.body}> {text1}</Text>
          <Image
            style={styles.tinyLogo}
            source={AppImages.Screen}
            resizeMode={'contain'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: '100%',
    height: 700,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 15,
  },
  subheader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
  },
  subcontainer: {
    backgroundColor: 'lightblue',
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
export default LoadingScreen;
