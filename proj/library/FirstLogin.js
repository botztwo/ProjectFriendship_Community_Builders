import React, { Component } from 'react';
import {  StyleSheet} from 'react-native';
import { NativeBaseProvider, Box, Button, TextArea } from 'native-base';
import {Heading,VStack,FormControl,Input,Center} from "native-base"


export default class First extends Component{
  constructor(props) {
    super(props);
    this.state = {
        url: 'http://10.6.98.115:3001',
        formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
        Name: ' ',
        Pronouns: ' ',
        Email: ' ',
        Password: ' ',
        College: ' ',
        Class_Year: ' ',
        Bio: ' '
};
}
handlePress = (op, method = '', params = {}) => {
  if (method != '')
      params.method = method;
  fetch(this.state.url + '/'+op, params)
      .then((response) => response.text())
      .then((response) =>
      alert ("Access Confirmed For Project Friendship Mobile App, Please Login "))
      .then((response) =>this.props.navigation.navigate('Login'))
      .catch((error) => {
          console.error(error);
      });
}

  render(){
  return (
    <NativeBaseProvider>
    <Box w= '100%' h='100%' backgroundColor='#FFFFFF' alignItems="center"  /*safeArea p="2" w="90%" maxW="290" py="8**/ >
    <Heading
    mt={10}
      size="md"
      color="coolGray.800"
      _dark={{
        color: "warmGray.50",
      }}
      fontWeight="semibold"
    >
      ProjectFriendship Mobile App
    </Heading>
    <Heading
      mt="1"
      color="coolGray.600"
      _dark={{
        color: "warmGray.200",
      }}
      fontWeight="medium"
      size="xs"
    >
      Sign up to continue!
    </Heading>
    <VStack space={3} mt="5">
     
        <Input onChangeText={(Name) => this.setState({Name})} placeholder= "Name"></Input>
        <Input onChangeText={(Pronouns) => this.setState({Pronouns})} placeholder= "Pronouns"></Input>
        <Input onChangeText={(Email) => this.setState({Email})} placeholder= "Email"></Input>
        <Input onChangeText={(Password) => this.setState({Password})} placeholder= "Password" type="password" ></Input>
        <Input onChangeText={(College) => this.setState({College})} placeholder= "College Affiliation"></Input>
        <Input onChangeText={(Class_Year) => this.setState({Class_Year})} placeholder= "Class Year"></Input>
        <TextArea onChangeText={(Bio) => this.setState({Bio})} style={styles.inputBio} placeholder= "Small Bio"></TextArea>
       
        
      
    
      
      <Button mt="2" style ={styles.button}
      onPress= {() => this.handlePress('new', 'POST', {
        headers: {
       "Content-type":this.state.formContentType
    }, 
        //body: JSON.stringify(`email:${this.state.Email} password:${this.state.Password}`)
        body: `postBody=${this.state.Name},${this.state.Pronouns},${this.state.Email},${this.state.College},${this.state.Class_Year},${this.state.Bio},${this.state.Password}`

      
          })}
      >
        Sign up
      </Button>
    </VStack>
  </Box>
    </NativeBaseProvider>
  );
}}
const styles = StyleSheet.create ({
  inputBio:{ width: 300,
      height: 75,
      borderRadius: 10
    },
    button: {
      backgroundColor: '#00B9E8',
    }

     
})