/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image} from 'react-native';
import Header from '../layouts/Header';
import firebase from 'firebase';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {process} from '../../env';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messageList: [],
      person: this.props.route.params.item,
      userId: AsyncStorage.getItem('userid'),
      userName: AsyncStorage.getItem('user.name'),
      userAvatar: AsyncStorage.getItem('user.photo'),
    };
  }
  onSend = async () => {
    if (this.state.message.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.userId)
        .child(this.state.person.id)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.userId,
          name: this.state.userName,
          avatar: this.state.userAvatar,
        },
      };
      updates[
        'messages/' +
          this.state.userId +
          '/' +
          this.state.person.id +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.person.id +
          '/' +
          this.state.userId +
          '/' +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({message: ''});
    }
  };

  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userName = await AsyncStorage.getItem('user.name');
    const userAvatar = await AsyncStorage.getItem('user.photo');
    this.setState({userId, userName, userAvatar});
    firebase
      .database()
      .ref('messages')
      .child(this.state.userId)
      .child(this.state.person.id)
      .on('child_added', val => {
        this.setState(previousState => ({
          messageList: GiftedChat.append(previousState.messageList, val.val()),
        }));
      });
    this.sendNotification();
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#5bcab0',
          },
        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            marginRight: 30,
            marginBottom: 25,

            width: 35,
            height: 35,
          }}>
          <Image
            source={require('../assets/icon/send.png')}
            resizeMode={'center'}
            width={'40'}
            height={'40'}
          />
        </View>
      </Send>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header title={this.state.person.name} />
        <GiftedChat
          renderSend={this.renderSend}
          renderBubble={this.renderBubble}
          text={this.state.message}
          onInputTextChanged={val => {
            this.setState({message: val});
          }}
          messages={this.state.messageList}
          onSend={() => this.onSend()}
          user={{
            _id: this.state.userId,
          }}
        />
      </View>
    );
  }
}
