import React from 'react'

export const buildList = (arr) =>{
    let arrayAux = [];
    Object.keys(arr).forEach(item=>{
        //console.log(item)
        arrayAux.push({
            nombre: item,
            detail:  arr[item],
        })
        //console.log(arr[item])
    })
    return  arrayAux
}