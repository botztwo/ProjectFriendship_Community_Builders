import { StyleSheet, TextInput,onChangeText} from 'react-native';
import { NativeBaseProvider,  Input, Button,Box, Text, Center } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useCallback, useEffect,Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'


export default class Example extends Component{
    constructor(props) {
        super(props);
        const [messages, setMessages] = useState([]);
        this.state = {
            url: 'http://10.42.254.239:3002',
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
            postBody: 'Messages'
    };

    useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
    }


/*
    handlePress = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(this.state.url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
                alert(`Posted :)`);
            })
            .then((response) =>this.props.navigation.navigate('Social'))
            .catch((error) => {
                console.error(error);
            });
    }
*/

  render(){
  return (
     <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}}

