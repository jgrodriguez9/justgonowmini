import React from 'react';

export const setIdentificadorTipo = rooms =>{
    let tipo = '';

    rooms.forEach(el=>{
        tipo += el.type
        tipo += '-';
    })
    tipo = tipo.split('(')[0]

    return tipo.substring(0, tipo.length-1);
}