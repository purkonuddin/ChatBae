import {MainNavigator} from './src/routes/index';
import {Provider} from 'react-redux';

import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {process} from './env';

export default class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init(`${process.env_ONE_SIGNAL_ID}`, {
      kOSSettingsKeyAutoPrompt: true,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  render() {
    return <MainNavigator />;
  }
}
