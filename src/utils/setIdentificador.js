import React from 'react';
import { setIdentificadorTipo } from './setIdentificadorTipo';

export const setIdentificador = items =>{
    let arr = [];

    items.forEach(el => {
        let obj = el
        obj['identificador'] = setIdentificadorTipo(el.roomDescription)
        arr.push(obj)
    })

    return arr;
}