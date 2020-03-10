/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {Database, Auth} from '../constant/config';
import Geolocation from 'react-native-geolocation-service';
export const Register = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErr] = useState(null);

  useEffect(() => {
    getLocation();
    return () => {
      getLocation();
    };
  }, []);

  const getLocation = async () => {
    await hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    } else {
      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          setErr(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 8000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    }
  };

  const hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  const submitForm = async () => {
    if (name.length < 1) {
      ToastAndroid.show('Please input your fullname', ToastAndroid.LONG);
    } else if (email.length < 6) {
      ToastAndroid.show(
        'Please input a valid email address',
        ToastAndroid.LONG,
      );
    } else if (password.length < 6) {
      ToastAndroid.show(
        'Password must be at least 6 characters',
        ToastAndroid.LONG,
      );
    } else {
      Auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
          console.warn(response);
          Database.ref('/user/' + response.user.uid)
            .set({
              name: name,
              status: 'Offline',
              email: email,
              photo: 'https://i.imgur.com/1KoMPoK.png',
              latitude: latitude,
              longitude: longitude,
              id: response.user.uid,
            })
            .catch(error => {
              ToastAndroid.show(error.message, ToastAndroid.LONG);
              setName('');
              setEmail('');
              setPassword('');
            });
          ToastAndroid.show(
            'Your account is successfully registered!',
            ToastAndroid.LONG,
          );

          props.navigation.navigate('Login');
        })
        .catch(error => {
          setErr(error);
          setName('');
          setPassword('');
          setEmail('');
          ToastAndroid.show(errorMessage.message, ToastAndroid.LONG);
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/backgrund/landing.png')}
        style={{
          resizeMode: 'container',
          height: '100%',
          width: '100%',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: 'black',
            marginTop: 100,
            marginBottom: 30,
          }}>
          Sign Up
        </Text>
        <View style={{alignItems: 'center'}}>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={txt => setName(txt)}
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={txt => setEmail(txt)}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={txt => setPassword(txt)}
          />
        </View>
        <TouchableOpacity style={styles.signInBtn} onPress={() => submitForm()}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => props.navigation.navigate('Login')}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#091B37',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingLeft: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(242, 243, 244, 0.8)',
  },
  signInBtn: {
    width: '80%',
    height: 50,
    borderRadius: 35,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#091B37',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 3,
    elevation: 5,
  },
  signUpBtn: {
    width: '80%',
    height: 50,
    borderRadius: 35,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: '#ffffff', // invisible color
  },
});
