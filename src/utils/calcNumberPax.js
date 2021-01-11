import React from 'react'

export const calcNumberPax = (paxes, PI, paxesInformation) =>{
    let index = PI;
    if(paxes.type==='ADULT'){
        index++;
        //setCont(index)
    }else if(paxes.type === 'CHILD'){
        let longi = paxesInformation.filter(ele=>ele.type==='ADULT').length
        index = PI-longi+1;
    }
    return index
}