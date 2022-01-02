import React, { Component } from 'react';
import { StyleSheet, TextInput,onChangeText, View, useState,Image} from 'react-native';
import { NativeBaseProvider,  Input, Button,Box, Text, Center, HStack,Avatar,Heading, VStack, TextArea} from 'native-base';
import ImagePickerExample from './imagePicker.js';

//hi kaz
export default class newpost extends Component{
    constructor(props) {
        //test
        super(props);
        this.state = {
            url: 'http://10.6.98.115:3001',
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
            postBody: 'Update Mentors <3',
            tags: ' ',
    };
    
    this.props.navigation.setParams({
        Email: this.props.route.params.Email});
       
        
    }
    

    //handlepress2, for sending images to server and saving them
    

    handlePress = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(this.state.url + '/'+op, params)
            .then((response) => response.text())
            /*.then((responseText) => {
                alert(`
                    Sent:  op=${JSON.stringify(op)}\nparams+method=${
			JSON.stringify(params)}\n
                    Received:  ${responseText}`);
            })*/
            .then((response) =>this.props.navigation.push('Social',this.props.route.params))
            .catch((error) => {
                console.error(error);
            });
    }


  render(){
  return (
    <NativeBaseProvider>
    <View style={{ flex: 1, alignItems: 'center', width:'100%', height:'100%', backgroundColor:'#FFFFFF'}}>
   
          
            <VStack w= "70%" space = {5}>
            <Heading mt= "40%" category='h4'>Post Details</Heading>
            <TextArea  placeholder="Post Update <3"
            onChangeText={(postBody) => this.setState({postBody})}/> 
            <Input placeholder= "TAGS: Sports, Help, etc."
            onChangeText={(tags) => this.setState({tags})}/> 
            <Button style={styles.button} onPress= {() => this.handlePress('update', 'POST', {
                headers: {
               "Content-type": this.state.formContentType
        
            }, 
                body: `postBody=${this.state.postBody},${this.state.tags},${this.props.route.params.Email}`
               }
                  )} 
            > Post
           </Button>   
           <ImagePickerExample></ImagePickerExample>
            </VStack>
            
        
            </View>

    </NativeBaseProvider>
  );
}}

const styles = StyleSheet.create ({
  update:{  },
  inputBio:{ width: 300,
    height: 75,
    borderRadius: 10
  },

    button:{ 
        backgroundColor: '#D32300'}
});