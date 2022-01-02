import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Center, NativeBaseProvider, VStack, ScrollView, Fab, Icon, AntDesign, Box, Image} from "native-base"


export default class HomeScreen extends Component {
    constructor(props){
    super(props);
    this.state = { title: "Navigation Example",
                 url: 'http://10.6.98.115:3001',
                formContentType: "application/x-www-form-urlencoded;charset=UTF-8",
                Name: '',
                Mid: null}; 

                


    this.props.navigation.setParams({
        Email: this.props.route.params.Email});
    }

    /*componentDidMount() {
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
        }*/



      
    
   

    render() {
    
        console.log(this.props.route.params.Email + " Is Logged In")
      
       
	return (
    
        <NativeBaseProvider>
        <Box  w= '100%' h='100%' backgroundColor='#FFFFFF' alignItems="center" >
        <Image
      style={{
        resizeMode: "cover",
        height: 110,
        width: 415
        
      }}
      source={{uri:"https://static.wixstatic.com/media/44aaba_1314ca8679f3431697c1ed46902facb2.jpg/v1/fill/w_352,h_101,al_c,q_80,usm_0.66_1.00_0.01/44aaba_1314ca8679f3431697c1ed46902facb2.webp"}}
    />
                         
            <VStack mt= "20%" space={4} alignItems="center">
            <Button style= {styles.button1} _text={{color: "white",}} colorScheme='purple' onPress={() => this.props.navigation.push('Social',this.props.route.params)}>Socials</Button>
            <Button style= {styles.button2} _text={{color: "white",}} colorScheme='purple' onPress={() => this.props.navigation.navigate('Mentor Directory')}>Mentor Directory</Button>
            <Button style= {styles.button3} _text={{color: "white",}} colorScheme='purple' onPress={() => this.props.navigation.push('Messaging',this.props.route.params)}>Messaging</Button>
            </VStack>
            </Box>
            </NativeBaseProvider>
            
        );
    }
}

const styles = StyleSheet.create ({
    button1:{ width: 300,
        height: 75,
        backgroundColor: '#6024BE',
        margin: 5,
        elevation: 20,
        borderRadius: 10}
        ,
        button2:{ width: 300,
            height: 75,
            backgroundColor: '#F08C1D',
            margin: 5,
            elevation: 20,
            borderRadius: 10}
            ,
            button3:{ width: 300,
                height: 75,
                backgroundColor: '#D32300',
                margin: 5,
                elevation: 20,
                borderRadius: 10}
                ,
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    }
})
