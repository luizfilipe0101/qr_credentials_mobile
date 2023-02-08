import {ToastAndroid} from 'react-native'



export async function Num_parts(host, port, Itens, presence){
   
    try{
        const res = await fetch(`http://${host}:${port}/presence`,{
            method:'GET',
            headers:{}
        })

        const json = await res.json();

        Itens(json)
        presence(json.length)

    } catch(err){
        console.log('Aqui: ',err)
        ToastAndroid.show('Não foi possível se conectar com o servidor', ToastAndroid.LONG)
        return 1;
    }

}

export async function Get_all(host, port, total){
    try{
        const res = await fetch(`http://${host}:${port}/`,{
            method:'GET',
            headers:{}
        })

        const json = await res.json();

        total(json.length)

    } catch(err){
        console.log('Aqui: ',err);
        ToastAndroid.show('Não foi possível se conectar com o servidor', ToastAndroid.LONG)
        return 1;
    }
}

