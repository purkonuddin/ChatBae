/* eslint-disable react-native/no-inline-styles */
import React, {Component, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
// import SafeAreaView from 'react-native-safe-area-view';
import {Auth} from '../constant/config';
import {process} from '../../env';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';

export const Splash = props => {
  useEffect(() => {
    const _unsubscribe = props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('userid', (err, id) => {
        if (id) {
          setTimeout(() => {
            props.navigation.navigate('Home');
          }, 1500);
        } else {
          setTimeout(() => {
            props.navigation.navigate('Landing');
          }, 1500);
        }
      });
    });
    return () => {
      _unsubscribe;
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/backgrund/landing.png')}
        style={{resizeMode: 'cover', height: '100%', width: '100%'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flex: 1,
          }}>
          <Image
            source={require('../assets/icon/chatbae.png')}
            style={{width: '60%', height: '60%', resizeMode: 'contain'}}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
// export default Splash;
