import React, { Component } from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { NativeBaseProvider, Box, Heading, Text, theme, Input, ScrollView, Button,  VStack, Spacer, Avatar, HStack,Icon,Ionicons } from 'native-base';
import Mentor from './getmentor.js';

export default class directory extends Component{
  constructor(props) {
    super(props);
    this.state = {
        url: 'http://10.6.98.115:3001',
        formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
        mentorInfo: [ ]
       
    };
}
componentDidMount() {
  this.handlePress('names', 'GET', {
    headers: {
"Content-type": this.state.formContentType
    }
  })
}

handlePress = (op, method = '', params = {}) => {
    if (method != '')
        params.method = method;
    const responseBody = fetch(this.state.url + '/'+op, params)
          .then((response) => response.json())
        .then(response=> {
          console.log(response)
          this.setState({
              mentorInfo: response
          });
        })
        .catch((error) => {
            console.error(error);
        });
        return responseBody;
}

   
  render(){
    console.log("MentorInfo")
      console.log(this.state.mentorInfo)

     
      return (
 <NativeBaseProvider>
      <ScrollView>
      
{this.state.mentorInfo.map((postArr, index)  => (

    <Box key={index} position="relative" h={190} w="100%">

<Mentor name ={postArr[0]} pronouns={postArr[1]} email={postArr[2]} school={postArr[3]} class_year={postArr[4]} bio={postArr[5]}/>

    </Box>

)

)}


    </ScrollView>
 
    </NativeBaseProvider>
     
  );
}
}
