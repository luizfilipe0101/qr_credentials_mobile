import {Vibration, ToastAndroid} from 'react-native';

//cd = code
//nv = navigation

export async function change_txt(cd, scan_state, nv, host, port){

    Vibration.vibrate(100|10);

    try{
        const res = await fetch(`http://${host}:${port}/check`,{
        method:'POST',

        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

        body: JSON.stringify({
            "qr_value": `${cd}`
        })
    })


    const json = await res.json();

    
        switch(json[1]['codigo']){

            case 0:{
                console.log(json[0][0])
                nv.setOptions(scan_state(false))
                nv.navigate("Buscar", {parts: json[0][0], _host:host, _port:port})
                break;

            }
            case 1:{
                scan_state(false);
                ToastAndroid.show(json[0]['msg'], ToastAndroid.LONG);
                break;
            }

        }

    }catch(err){
        scan_state(false)
        ToastAndroid.show('Não foi possível se conectar com o servidor', ToastAndroid.LONG);

    }

}
