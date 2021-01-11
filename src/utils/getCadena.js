import React from 'react';

export const getCadena = cadena =>{
    if(cadena===null){
        return "";
    }else{
        return cadena.toLowerCase()
    }
}