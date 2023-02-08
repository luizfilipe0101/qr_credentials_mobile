import { useState, useEffect } from 'react';
import {View, StyleSheet, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {change_txt} from '../../controller/qrcontroller';
import {Show} from '../../models/crud/'


export default function Main({navigation}){


    const [hasPermition, sethasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');

    useEffect(() => {
        Show(setHost, setPort);
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          //sethasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
      }, []);


    navigation.addListener('tabPress', ()=>{Show(setHost, setPort)})


    //O que fazer com o código scaneado
    const qr_code = async ({type, data})=>{
        sethasPermission(false)
        setScanned(true);
        await change_txt(data, setScanned, navigation, host, port);
        
    }

        
    if(hasPermition===false){
        return(
        <View style={styles.container}>
            <Button
            title="QRcode"
            onPress={()=>{sethasPermission(true), Show(setHost, setPort);}}
            ></Button>
        </View>
        )
    }else{
        return(
            <View style={styles.container}>
                <View style={styles.barcodebox}>
                    <BarCodeScanner 
                        onBarCodeScanned={scanned? undefined : qr_code}
                        style={{ height: 550, width: 400 }}
                    >
                    </BarCodeScanner>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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