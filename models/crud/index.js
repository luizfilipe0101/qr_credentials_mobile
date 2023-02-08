import {db} from '../connectionModel/';


const create = "CREATE TABLE IF NOT EXISTS network(\
                id   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
                host TEXT NOT NULL,\
                port TEXT NOT NULL)"

const show = "SELECT * FROM network;"

const set_main_network = "INSERT INTO network (host, port) VALUES ('000.000.0.00', '0000');"

const delete_query = "DELETE FROM  network;"


export function DELETE_DATABASE(){
    db.closeAsync('storage.db')
    db.deleteAsync('storage.db')
}

export function Init_database(){
    db.transaction(tx=>{
        tx.executeSql(create, null, ()=>{}, (txObj, err)=>{
            console.log(err)
        })
    })
}


// Retorna para os parâmetros o HOST e o PORT
export function Show(setH, setP){
    db.transaction(tx => {
        tx.executeSql(show, null, (txObj, result)=>{

            if(result.rows._array.length === 0){
                console.log('Database vazio')
                
            }else{
                setH(result.rows._array[0]['host']);
                setP(result.rows._array[0]['port']);
                console.log('Resultado: ', result.rows._array)
            }},
        (txObj, err)=>console.log('Errado: ',err))
    });
}


export function Delete_rows(){
    db.transaction(tx => {
        tx.executeSql(delete_query, null, ()=>{}, (txObj, err)=>{console.log(err)})
    })

}

export function Set_main(){
    db.transaction(tx => {
        tx.executeSql(set_main_network, null, ()=>{}, (txObj, err)=>{console.log(err)})
    })
}

/*
    Procura no banco de dados se existe algum registro
    na tabela Network, se não existir, cria-se um registros com
    os campos digitados, caso já tenha um registro, atualiza-se
    o registro.
*/
export function Save_network(network){
    db.transaction(tx => {
        tx.executeSql(show, null, (txObj, res)=>{
            if(res.rows._array.length === 0){
                txObj.executeSql(`INSERT INTO network (host, port) \
                                  VALUES ('${network[0]}', '${network[1]}');`)
            }else{
                tx.executeSql(`UPDATE network \
                               SET host = '${network[0]}',
                                   port = '${network[1]}'\
                               WHERE id = 1;`)
            }
        }, (txObj, err)=>{
            console.log(err)
        })
    })
}


export function Save(network){
    db.transaction(tx => {
        tx.executeSql(`INSERT INTO network (host, port) VALUES(${network[0]},${network[1]});`,
        null, ()=>{}, (txObj, err)=>{console.log(err)})
    })
}