import {View, Text, StyleSheet, Button, FlatList, StatusBar} from 'react-native';
import {useState, useEffect} from 'react';
import {Num_parts, Get_all} from '../../controller/homecontroller';
import {Show} from '../../models/crud/'
import { useIsFocused } from '@react-navigation/native';


export default function Home({navigation}){

    const [get_items, setItens] = useState(null);
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [total, setTotal] = useState('');
    const [presente, setPresen] = useState('');

    const ative = navigation.isFocused();

    async function Pegar(){
        Show(setHost, setPort);
        console.log('Net: ',host, port);
        await Num_parts(host, port, setItens, setPresen);
        Get_all(host, port, setTotal);
    }
    
    useEffect(()=>{
        Pegar()
    },[useIsFocused()])

    // Insere o nome dos participantes conferidos no credenciamento
    const plot = (nome) => {
        return(
            <View style={styles.plot}>
                <Text style={styles.text_plot}> {nome} </Text>
            </View>
        )
    }

    return(
        <View style={styles.container}>                   
            <View>

                <View style={styles.brief}>
                    <Text> Participantes </Text>
                    <Text> {presente}/{total} </Text>
                </View>

                <FlatList
                    data={get_items}
                    renderItem={({item})=>plot(item.nome)}
                ></FlatList>

                <Button
                    title='Atualizar'
                    onPress={()=>{Pegar()}}
                ></Button>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 15,
        justifyContent:'center',
        alignContent:'center',
        alignItems: 'center',
        backgroundColor: '#dce5fc',
        flex: 1
    },

    texto:{
    },

    plot:{
        borderRadius: 30,
        backgroundColor: '#cbd8f7',
        marginTop: 10,
    },

    text_plot:{
        fontSize: 20,
    },

    brief:{
        flexDirection: 'row',
        width: '70%',
        alignItems: 'center',
        paddingVertical:20,
    }
})