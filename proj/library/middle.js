import React, { Component } from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { NativeBaseProvider, Box, Heading, Text, theme, Avatar, ScrollView, HStack, Button, VStack} from 'native-base';
import Messages from './messages.js';

export default class Middle extends Component{
  constructor(props) {
    super(props);
    this.state = {
        url: 'http://10.6.98.115:3001',
        formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
        Name: '',
        Mid: null
       
    };
    this.props.navigation.setParams({
        Email: this.props.route.params.Email});
    }

componentDidMount() {
    this.handlePress('Curr_name', 'POST', {
      headers: {
   "Content-type": this.state.formContentType}, 
   //body: JSON.stringify(`email:${this.state.Email} password:${this.state.Password}`)
   body: `postBody=${this.props.route.params.Email}`

    })
    
  }
  handlePress = (op, method = '', params = {}) => {
    if (method != '')
    params.method = method;
    const responseBody = fetch(this.state.url + '/'+ op, params)
    .then((response) => response.json())
    //.then((response)=> console.log(response))
     .then(response=> {
    //console.log("Response From Server, Mentor posted:  " + response)
    //console.log(response[0]);
    this.setState({
    Name: response[0],
    Mid: response[1]
    });
    })
    .catch((error) => {
    console.error(error);
    });
    return responseBody;
    }

   
  render(){
    // <Messages name= {this.state.Name} mid ={this.state.Mid}></Messages>
return(
  <NativeBaseProvider>
   
    <Messages name= {this.state.Name} mid ={this.state.Mid}></Messages>
    </NativeBaseProvider>
)}}