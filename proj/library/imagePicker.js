import React, { useState, useEffect } from 'react';
import { Image, View, Platform} from 'react-native';
import { NativeBaseProvider, Box, Button, Spacer } from 'native-base';
import * as ImagePicker from 'expo-image-picker';



export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);
  const [uri, setUri] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.25,
  
    });

    //console.log(result.base64);

    console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
      //setUri(result.uri);
    }
      //props.onPhotoChosen(result.base64);
      /*fetch('http://10.42.253.209:3001/savePhoto', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					// send our base64 string as POST request
					body: JSON.stringify({
					imgsource: result.base64,
					}),
				})*/
      /*setImage(result.uri);
      setUri(result.uri);*/
    
    //console.log(uri);
  };

  

  
  


  return (
    <NativeBaseProvider>
   
    <Button
    mt= "1"
    h= "10"
    w= "100%"
    onPress={pickImage}>
    Add an image
   </Button>
  <Box mt= "5">
   {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
   </Box>
     
    </NativeBaseProvider>
  );
}