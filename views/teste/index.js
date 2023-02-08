import {React, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Camera, CameraType} from 'expo-camera';


export default function Teste(){

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType(){
    
  }

  return(
    <View style={styles.container}>
      <Text>Teste</Text>
        <View style={styles.container}>
          <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </Camera>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    flex: 1,
    alignItems:'center'
  }
})
