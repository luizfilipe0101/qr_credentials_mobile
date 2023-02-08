import {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, ToastAndroid} from 'react-native';
import {Show,DELETE_DATABASE, Save_network} from '../../models/crud/';
import {Edit_fields} from '../../controller/settingscontroller/'
import { useIsFocused } from '@react-navigation/native';


export default function Settings(props){
    
    const [edit, setEdit] = useState(false);
    const [btn_ok, setBtnOK] = useState(true);
    const [btn_edt, setBtnEDT] = useState(false);
    const [HOST, setHost] = useState('');
    const [PORT, setPort] = useState('');
    let network = [HOST, PORT];
    let data = [];


    useEffect(()=>{
        try{
            Show(setHost, setPort);

        }catch(err){
            console.log(err)
        }
    },[useIsFocused()])

   
    return(
        <View style={styles.container}>
            <Text> Network </Text>
            <Text style={styles.text_form}> Host </Text>
            <View>
                <TextInput
                    style={styles.text_form}
                    keyboardType='decimal-pad'
                    placeholder='000.000.0.00'
                    value={HOST}
                    onChangeText={setHost}
                    editable={edit}
                ></TextInput>
            </View>

            <View>
                <Text style={styles.text_form}> Port </Text>
                <TextInput
                    style={styles.text_form}
                    keyboardType='numeric'
                    placeholder='0000'
                    value={PORT}
                    onChangeText={setPort}
                    editable={edit}
                ></TextInput>
            </View>

            <View style={styles.buttons}>
                <Button
                title='Confirmar'
                onPress={()=>{Save_network(network),
                              Edit_fields(edit, setEdit, setBtnOK, setBtnEDT)}}
                disabled={btn_ok}
                ></Button>

                <Button
                title='Editar'
                onPress={()=>{Edit_fields(edit,setEdit, setBtnOK, setBtnEDT)}}
                disabled={btn_edt}
                ></Button>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        justifyContent:'center',
        alignItems:'center',
        flex: 1,

    },

    buttons: {
        paddingTop: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    text_form:{
        fontSize: 26,
    }
})

