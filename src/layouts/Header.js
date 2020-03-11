/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Text,
  Image,
  View,
} from 'react-native';
// import {withNavigation} from 'react-navigation';

const Header = props => {
  const title = useState(props.title);

  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        alignContent: 'center',
        paddingTop: 40,
        backgroundColor: '#5bcab0',

        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          {title}
        </Text>
      </View>

      <StatusBar translucent backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default Header;
