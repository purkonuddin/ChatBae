/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Landing from '../pages/Landing';
import {Login} from '../pages/Login';
import {Register} from '../pages/Register';
import {Splash} from '../pages/Splash';
import {Profile} from '../pages/FriendProfile';
import MyProfile from '../pages/MyProfile';
import Chat from '../pages/Chat';
import App from '../pages/App';
import FindFriends from '../pages/FindFriends';
import {Icon, Image} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const main = () => {
  return (
    <Tab.Navigator
      initialRouteName="App"
      backBehavior="none"
      tabBarOptions={{
        activeTintColor: '#5bcab0',
        keyboardHidesTabBar: 'true',
      }}>
      <Tab.Screen
        name="App"
        component={App}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icon/chat.jpg')}
              style={{height: 25, width: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FindFriends"
        component={FindFriends}
        options={{
          tabBarLabel: `Find Friend's`,
          unmountOnBlur: true,
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icon/search.png')}
              style={{height: 25, width: 25}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="myProfile"
        component={MyProfile}
        options={{
          tabBarLabel: 'Profile',
          unmountOnBlur: true,
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icon/profile.png')}
              style={{height: 25, width: 25}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const AuthNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Splash" backBehavior="none">
      <Tab.Screen
        name="Splash"
        component={Splash}
        options={{
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={main}
        options={{
          tabBarVisible: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarVisible: false,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

const start = () => {
  return (
    <Tab.Navigator initialRouteName="Auth" backBehavior="none">
      <Tab.Screen
        name="Auth"
        component={AuthNavigator}
        options={{
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="start"
          component={start}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="App"
          component={main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen */}
        {/*   name="Maps" */}
        {/*   component={Maps} */}
        {/*   options={{headerShown: false}} */}
        {/* /> */}
        <Stack.Screen
          name="myProfile"
          component={MyProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FriendProfile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
