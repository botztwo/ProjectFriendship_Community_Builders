import React, { Component, useState } from 'react';
import { ScrollView, StyleSheet, RefreshControl,} from 'react-native';
import { Text, NativeBaseProvider, Box, Fab, Icon, VStack,Heading, Divider, Input,  Modal, FormControl, Spacer, HStack, IconButton} from 'native-base';
import { AntDesign } from "@expo/vector-icons"
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dimension from './displayPost.js';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//import { response } from '../button-server-db2/app.js';
//import { response } from '../button-server-db2/app.js';

function FetchUserData({  onUpdate }) {
  useFocusEffect(
    React.useCallback(() => {
      onUpdate();
      return undefined;
    }, [ ])
  );

  return null;
}



//hi kaz :p
export default class socials extends Component{
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://10.6.98.115:3001',
      postBody: [],
      search:" ",
      refreshing: false,
      formContentType: "application/x-www-form-urlencoded;charset=UTF-8"
};

this.props.navigation.setParams({
  Email: this.props.route.params.Email});
}


_onRefresh() {
  this.setState({refreshing: true});
  this.handlePress('allposts', 'GET', {
    headers: {
 "Content-type": this.state.formContentType
}
  }).then(() => {
    this.setState({refreshing: false});
  });
}

/*componentDidMount() {
  this.handlePress('allposts', 'GET', {
    headers: {
 "Content-type": this.state.formContentType
}
  })
  
}*/

handlePress = (op, method = '', params = {}) => {
  if (method != '')
  params.method = method;
  const responseBody = fetch(this.state.url + '/'+ op, params)
  .then((response) => response.json())
   //.then((response) =>response.replace(/[" \[\ \]\ ]/g, ' ').split("X"))
  //.then(response.map(post =>( this.state.postBody.push(post)) ))
  //.then((response) =>console.log(response))
  //.then((response)=> console.log(typeof response))
  .then(response=> {
  //console.log("Response From Server, Mentor posted:  " + response)
  //console.log(response[0]);
  this.setState({
  postBody: response
  });
  })
  .catch((error) => {
  console.error(error);
  });
  return responseBody;
  }



  render(){
    /*let tmpApp =[];
    this.state.postBody.map(post=>(
      tmpApp.push(post)))
      console.log(tmpApp);*/
  return (
    <NativeBaseProvider>
    <Box w= '100%' h='100%' backgroundColor='#FFFFFF'>
    <FetchUserData
    userId= "heyyyy"
    onUpdate= {() => this.handlePress('allposts', 'GET', {
      headers: {
   "Content-type": this.state.formContentType
  }
    })}
  />
  <VStack width="100%" space={5} alignItems="center" >
        <Heading fontSize="lg">Mentor Community</Heading>
        <Input
          placeholder="Search"
          variant="filled"
          width="90%"
          bg="gray.300"
          borderRadius="10"
          py="1"
          px="2"
          placeholderTextColor="gray.900"
          _hover={{ bg: 'gray.500', borderWidth: 0 }}
          borderWidth="0"
          _web={{
            _focus: { style: { boxShadow: 'none' } },
          }}

          onChangeText={(searchInfo) => this.handlePress('search', 'POST', {
            headers: {
           "Content-type": this.state.formContentType
        },
        body: `postBody=${searchInfo}`
           } 
              )}

          InputLeftElement={
            <Icon
              ml="2"
              size="5"
              color="gray.900"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>
      <ScrollView>

      {this.state.postBody.map((postArr, index)  => (
      
      <Box key={index} position="relative" h={160} w="100%">
      
      <Dimension name ={postArr[0]} label={postArr[1]} date={postArr[2]} tags={postArr[3]}/>
      
      </Box>
      
      )
      
      )}
      
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      
      
      </ScrollView>

    
   
   
  
  <Fab
      onPress={() => this.props.navigation.push('New Post',this.props.route.params)}
      position="absolute"
      bg="#6024BE"
      size="lg"
      icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
    />
    
    


    </Box>
    </NativeBaseProvider>
  );
}}
const styles = StyleSheet.create ({
  button:{ width: 300,
      height: 75,
      backgroundColor: '#89BF24',
      margin: 5,
      elevation: 20,
      borderRadius: 10}
  
})
