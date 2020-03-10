/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Text,
  Image,
  View,
} from 'react-native';
// import {withNavigation} from 'react-navigation';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: '',
    };
  }

  render() {
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
            ChatBae
          </Text>
        </View>

        <StatusBar translucent backgroundColor="transparent" />
      </SafeAreaView>
    );
  }
}

export default Header;
