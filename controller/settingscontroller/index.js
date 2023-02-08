

export function Edit_fields(edt_fields, set_edt, bt_ok, bt_ed){
    
    if(edt_fields === false){
        set_edt(true)
        bt_ed(true);
        bt_ok(false);
    
    }else{
        bt_ed(false);
        bt_ok(true);
        set_edt(false)
    }
    
}