import React, { Component } from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { NativeBaseProvider, Box, Heading, Text, theme, Avatar, ScrollView, HStack, Spacer, VStack, Button, Pressable} from 'native-base';

class Mentor extends Component{
   
  render(){
return(
    <NativeBaseProvider>
 <Pressable>
    <VStack>
<Box h={175} margin="2" p="5" rounded="20" bg="#6024BE">

<HStack space={3}>
   <Avatar ml="1" mt= "1" bg="cyan.500" size="md" source={{uri: "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg",}}/>
   <VStack>
   <Text color="white" fontWeight="medium" fontSize={20}>
{this.props.name} <Text fontSize={10}>({this.props.pronouns})</Text>
   </Text>
<Text color="white"> {this.props.email} </Text>
<Text color="white"> {this.props.school} - {this.props.class_year}</Text>

</VStack>
       
        </HStack>
        <Text mt="2" fontSize={14} color="white">
   {this.props.bio}
        </Text>

    </Box>
    </VStack>
    </Pressable>

    </NativeBaseProvider>
)}}

export default Mentor
