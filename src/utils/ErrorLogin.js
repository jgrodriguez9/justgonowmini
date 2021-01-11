import React from 'react'

export const ErrorLogin = (code) =>{
    if(code === ''){
        return ''
    }else  if(code==='WP'){
        return "Contraseña incorrecta";
    }else if(code==='NA'){
        return "Debe renovar su membresía para poder entrar";
    }else{
        return `Error no parseado código ${code}`
    }
}