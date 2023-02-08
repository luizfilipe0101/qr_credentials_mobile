import {View, Text, TextInput, Button, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Limpar, Confirmar, clr_all} from '../../controller/confirmacontroller/'
import {Show} from '../../models/crud/'

export default function Search({route, navigation}){

    const [cpf_value, setCPFvalue] = useState(null);
    const [g_id, setID] = useState(null);
    const [name, setName] = useState(null);
    const [cpf, setCPF] = useState(null);
    const [email, setEmal] = useState(null);
    const [pagamento, setPagamento] = useState(null);
    const [check_p, setCheck] = useState(null);
    const [codes, setCode] = useState(0);
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');

    const [btn, setBtn] = useState(true);
    const [btn_clr, setClr] = useState(true);
    const [btn_detales, setDetalhes] = useState(true);

    const lst = [[setID, setName, setCPF, setEmal, setPagamento, setCheck],
                [setBtn, setClr, setDetalhes]];

    navigation.addListener('tabPress', ()=>{Show(setHost, setPort)})

    useEffect(()=>{
            try{
                setID(route.params.parts['id'])
                setName(route.params.parts['nome'])
                setCPF(route.params.parts['cpf'])
                setEmal(route.params.parts['email'])
                setPagamento(route.params.parts['pagamento'])
                setCheck(route.params.parts['checked'])

                setCode(route.params.parts['code'])
                setHost(route.params._host)
                setPort(route.params._port)

                setBtn(false)
            }catch(err){
                console.log('Sem parametros')
            }

    },[route])

    useEffect(()=>{

        if(check_p === 'Presente'){
            setBtn(true)
            setDetalhes(false)
        }

        if(g_id != null){
            setClr(false)
        }

    },[name])


    function check(){
        Confirmar(codes, host, port);
        clr_all(lst)
       
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.search}>
                    <Text style={styles.labels}> CPF </Text>

                    <TextInput
                        style={styles.text_result}
                        onChangeText={setCPFvalue}
                        value={cpf_value}
                        placeholder="0123456789"
                        keyboardType='numeric'
                    
                    ></TextInput>

                    <Button
                        title='Buscar'
                        onPress={()=>{}}
                    ></Button>
                </View>

                <View style={styles.result}>

                    <View style={styles.container_result}>
                        <Text style={styles.labels}>ID</Text>
                        <Text style={styles.text_result}>{g_id}</Text>
                    </View>

                    <View style={styles.container_result}>
                        <Text style={styles.labels}>Nome</Text>
                        <Text style={styles.text_result}>{name}</Text>
                    </View>

                    <View style={styles.container_result}> 
                        <Text style={styles.labels}>CPF</Text>
                        <Text style={styles.text_result}>{cpf}</Text>
                    </View>

                    <View style={styles.container_result}>
                        <Text style={styles.labels}>E-mail</Text>
                        <Text style={styles.text_result}>{email}</Text>
                    </View>

                    <View style={styles.container_result}>
                        <Text style={styles.labels}>Pagamento</Text>
                        <Text style={styles.text_result}>{pagamento}</Text>
                    </View>

                    <View style={styles.container_result}>
                        <Text style={styles.labels}>Confirmação</Text>
                        <Text style={styles.text_result}>{check_p}</Text>
                    </View>

                </View>

                <View style={styles.chk_btns}>
                    <Button
                        title='Confirmar'
                        onPress={()=>{check()}}
                        disabled = {btn}
                    ></Button>

                    <Button
                        title='Detalhes'
                        onPress={()=>{}}
                        disabled = {btn_detales}
                    ></Button>

                    <Button
                        title='Limpar'
                        onPress={()=>{Limpar(lst)}}
                        disabled = {btn_clr}
                    ></Button>
                </View>
            </View>
        </ScrollView>

);
}

const styles = StyleSheet.create({
    labels: {
        fontWeight: 'bold',
        fontSize: 18
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },

    container_result: {
        paddingVertical: 3
    },

    search: {
        width:'100%',
        flexDirection:'row',
        paddingVertical:50,
        justifyContent: 'space-around',
        
    },

    result: {
        borderRadius: 20,
        backgroundColor: '#e6eaf5',
        width:'100%',
        paddingHorizontal: 25,
        paddingVertical: 15,
    
    },

    text_result: {
        fontSize: 16,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingStart:10,
        paddingEnd: 10,
    },

    chk_btns: {
        width:'100%',
        flexDirection:'row',
        paddingVertical:50,
        justifyContent: 'space-evenly',

    },

    tst_bts: {
        borderRadius: 50
    }
})