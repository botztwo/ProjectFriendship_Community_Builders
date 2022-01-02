import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import socials from './library/socials';
import directory from './library/directory';
import HomeScreen from './library/HomeScreen';
import messages from './library/messages';
import newpost from './library/newpost';
import Login from './library/loginpage';
import First from './library/FirstLogin';
import Middle from './library/middle';



const Stack = createStackNavigator();
//hey kaz

export default class ButtonClient extends Component {
    constructor(props) {
        super(props);
        
    }
    render(){
        return(
           <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ProjectFriendship" component={HomeScreen} />
            <Stack.Screen name="Social" component={socials} />
            <Stack.Screen name="Mentor Directory" component={directory} />
            <Stack.Screen name="Messages" component={messages} />
            <Stack.Screen name="New Post" component={newpost} />
            <Stack.Screen name="FirstTime" component={First} />
            <Stack.Screen name="Messaging" component={Middle} />
           
       
           
            </Stack.Navigator>
          </NavigationContainer>
         
      );
  }
}

