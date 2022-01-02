import React, { Component } from 'react';
import { StyleSheet, View,Image, FlatList, Pressable} from 'react-native';
import { NativeBaseProvider,  VStack, Text, Spacer, Box, Avatar,HStack} from 'native-base';

import Constants from 'expo-constants';

const profileImg = "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg"
 class Dimension extends Component{
  render(){
    /*<Image
    style={{
      resizeMode: "cover",
      height: 50,
      width: 200
      
    }}
    source= {{uri: "https://static.wixstatic.com/media/44aaba_1314ca8679f3431697c1ed46902facb2.jpg/v1/fill/w_352,h_101,al_c,q_80,usm_0.66_1.00_0.01/44aaba_1314ca8679f3431697c1ed46902facb2.webp"}}
  />*/
  return (

    <NativeBaseProvider>
    <Pressable>
    <VStack>
    <Box h={145}  margin="3" p="5" rounded="2" bg='#00B9E8'>
    <HStack alignItems="flex-start">
    <Text fontSize={10} color="white">
  {this.props.date}
</Text> 
    
  <Spacer />
  <Text mr= "20" fontSize={12} color="white" fontWeight="medium">
    TAGS: {this.props.tags}
  </Text>
    
</HStack>
<HStack>
<Text color="white" mt="1" fontWeight="medium" fontSize={20}>
{this.props.name}
        </Text>
        <Spacer />
        
        </HStack>
        <HStack>
        <Text mt="2" fontSize={14} color="white">
        {this.props.label}
        </Text>
        </HStack>
    </Box>
    </VStack>
    </Pressable>
    
  </NativeBaseProvider>
  
    
  );
}}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:"center"
  },
  card:{
    height:150,
    width:"95%",
    backgroundColor:"white",
    borderRadius:15,
    elevation:10,
    padding:10,
    marginTop:20
  },
  profileImg:{
    width:30,
    height:30,
    borderRadius:50,marginRight:10,
  },
  header: {
    flexDirection:"row",
  }
});
export default Dimension;
