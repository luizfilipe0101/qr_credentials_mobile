import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {nv} from '../../../views/qrscreen'

import {change_txt} from '../../../controller/qrcontroller';


export default function Form({pro}){

    
    
    const [codes, setCodes] = useState(null);
    const [texto, setTexto] = useState('Ok');

    //Settar os estados da permissão e do scanner

    const [hasPermition, sethasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          //sethasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
      }, []);

    //O que fazer com o código scaneado
    const qr_code = ({type, data})=>{
        sethasPermission(false)
        setScanned(true);
        change_txt(data, setScanned, nv, sethasPermission);
        
    }
        
    if(hasPermition===false){
        console.log('aqui');
        return(
        <View style={styles.container}>
            <Button
            title="QRcode"
            onPress={()=>{sethasPermission(true)}}
            ></Button>
        </View>
        )
    }else{
        return(
        <View style={styles.barcodebox}>
                <BarCodeScanner 
                    onBarCodeScanned={scanned? undefined : qr_code}
                    style={{ height: 550, width: 400 }}
                >
                </BarCodeScanner>

            </View>
        )
    }

    return(
        <View>
            <Text>Não!!!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center',

      },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    }
  });