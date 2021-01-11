import React from 'react';

export const isEmptyPaxes = hotels =>{
    let rooms = hotels[0].rooms;
    let result = false;

    rooms.forEach(elem=>{
        if(elem.paxesInformation.filter(e=>e.name==="").length > 0 || elem.paxesInformation.filter(e=>e.lastName==="").length > 0){
            result = true;
        }
    })
    return result

}