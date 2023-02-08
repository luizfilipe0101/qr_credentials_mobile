import {Alert, ToastAndroid} from 'react-native';
//import AsyncStorage  from '@react-native-async-storage/async-storage'


export function clr_all(lst){
    for(let i of lst[0]){
        i(null)
    }

    for(let j of lst[1]){
        j(true)
    } 
    
}

export function Limpar(lst){
    Alert.alert('Atenção', 'Tem certeza que deseja limpar todos os campos?',[
        {
            text:'Limpar',
            onPress:(()=>{
                clr_all(lst);
            }),
        },

        {
            text: 'Cancelar',
            onPress:(()=>{}),
        }
    ])
    
}


export async function Confirmar(p_code, host, port){

    try{
        const res = await fetch(`http://${host}:${port}/checkin`,{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "code_num":`${p_code}`
            })
        })


        const json = await res.json()
        

        if(json.length != 0){
            console.log(json)
            ToastAndroid.show('Presença de participante confirmada!', ToastAndroid.LONG)
        }

        return 0;
        

    }catch(err){
        Alert.alert('Erro', 'Não foi possível se comunicar com o banco de dados',
        [
            {
                text:'Ok',
                onPress:(()=>{})
            }
        ])
        return err;
    }

}