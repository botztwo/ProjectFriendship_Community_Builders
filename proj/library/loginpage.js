import React, { Component,useState } from 'react';
import { StyleSheet,Image} from 'react-native';
import {NativeBaseProvider, Box, theme, Heading, VStack, Input, HStack, Link, Text,Button, Center } from 'native-base';

 


export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
        url: 'http://10.6.98.115:3001',
        formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
        Email:' ',
        Password: ' ' };

//if (typeof this.props.route.params === 'undefined') DOESNT WORK WITH IT?????????
this.props.route.params = {
   // title: this.state.title, // a title for this app
    Email: this.state.Email};
    this.params = this.props.route.params;  // for convenience*/
}

  handlePress = (op, method = '', params = {}) => {
    if (method != '')
        params.method = method;
    fetch(this.state.url + '/'+op, params)
        .then((response) => response.text())
        .then((responseText) => {
                let login= `${responseText}`
                if(login == '{"count":"0"}'){
                  console.log("incorrect")
                  alert(
                    "Incorrect Credentials. Please Check Email or Password"
                  )}
                else if(login == '{"count":"1"}') {
                  console.log(this.state.Email)
                  this.params.Email = this.state.Email;
                  this.props.navigation.push('ProjectFriendship', this.params) //newstuff
                }

                })
              
        .catch((error) => {
            console.error(error);
        });
}

  render(){
  return (
    <NativeBaseProvider >
      <Box w= '100%' h='100%' style = {styles.container}>
      <Image
      style={{
        resizeMode: "cover",
        height: 110,
        width: 415
        
      }}
      source={{uri:"https://static.wixstatic.com/media/44aaba_1314ca8679f3431697c1ed46902facb2.jpg/v1/fill/w_352,h_101,al_c,q_80,usm_0.66_1.00_0.01/44aaba_1314ca8679f3431697c1ed46902facb2.webp"}}
    />
     
<Center>
      <Heading
      size="lg"
      fontWeight="600"
      color="coolGray.800"
      _dark={{
        color: "warmGray.50",
      }}
      mt= "15%"
    >
    Welcome!
      
    </Heading>

    <Heading
      mt="1"
      _dark={{
        color: "warmGray.200",
      }}
      color="coolGray.600"
      fontWeight="medium"
      size="xs"
    >
      Sign in to continue!
    </Heading>
    </Center>

    <VStack space={1} mt="15" w= "100%" alignItems="center">

     
      <Input  w= {{base: "75%",md: "25%"}} style= {styles.input} size ="md" placeholder= "Email" onChangeText={(Email) => this.setState({Email})} />
      <Input w= {{base: "75%",md: "25%"}} style= {styles.input} size ="md" placeholder= "Password"  onChangeText={(Password) => this.setState({Password})} type="password" />
      

      <Button style={styles.button} onPress= {() => this.handlePress('login', 'POST', {
        headers: {
       "Content-type":this.state.formContentType
    }, 
        //body: JSON.stringify(`email:${this.state.Email} password:${this.state.Password}`)
        body: `postBody=${this.state.Email},${this.state.Password}`

      
          })}
          >Login</Button>

          

      <HStack mt="6" justifyContent="center">

      

      
      <Button
      style = {styles.button2}
          _text={{
          color: "white",
          fontWeight: "medium",
          fontSize: "sm",
          }}
          //href="#"
          onPress={() => this.props.navigation.navigate('FirstTime')}
          >
          First Time on App? 
          </Button>

    
    </HStack>
      </VStack>
   

      </Box>
    </NativeBaseProvider>
  );
}}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: '#FFFFFF',
    
},
  button:{ width: 300,
      height: 75,
      backgroundColor: '#D32300',
      margin: 5,
      elevation: 20,
      borderRadius: 10,
       alignItems: "center",
      
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      button2: {
        backgroundColor: '#00B9E8',
      }
})
