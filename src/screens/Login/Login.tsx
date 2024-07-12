import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  TextInput,
  Button,
  HelperText,
  IconButton,
  Icon,
  Text,
} from 'react-native-paper';
import {AppImages} from '../../images';
import {loginApi} from '../../utils/loginApi';
import {HttpStatus} from '../../utils/fetchApi';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const nav: NavigationProp<ReactNavigation.RootParamList> = useNavigation();
  const handleLogin = async () => {
    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    } else {
      setEmailError('');
      const {data, status} = await loginApi(email, password);
      if (status === HttpStatus.OK) {
        nav.navigate('Home');
      }
    }

    console.log(`Email: ${email}, Password: ${password}`);
  };

  const validateEmail = (email: string) => {
    // Regular expression for basic email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  const isDisable = !(email && password);
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={AppImages.Logo}
        resizeMode={'contain'}
      />
      <Text style={styles.header}>Sign In</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          source={email ? 'account' : 'account-outline'}
          size={20}
          color="black"
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="grey"
          activeUnderlineColor={'transparent'}
          cursorColor={'black'}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
      </View>
      <HelperText type="error" visible={!!emailError}>
        {emailError}
      </HelperText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          source={password ? 'key' : 'key-outline'}
          size={20}
          color="black"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="grey"
          cursorColor={'black'}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={hidePassword}
          style={styles.input}
          activeUnderlineColor={'transparent'}
          right={
            <TextInput.Icon
              icon={() => (
                <IconButton
                  icon={() => (
                    <Icon
                      source={hidePassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="grey"
                    />
                  )}
                  onPress={togglePasswordVisibility}
                />
              )}
            />
          }
          place
        />
      </View>
      <Button
        disabled={isDisable}
        mode="contained"
        onPress={handleLogin}
        style={styles.button}>
        Sign In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 5,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4A46A6',
    borderRadius: 5,
    color: 'white',
  },
  tinyLogo: {
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 50,
  },
});

export default LoginScreen;
