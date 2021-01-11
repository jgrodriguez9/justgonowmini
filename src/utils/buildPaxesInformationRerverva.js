import React from 'react';

export const buildPaxesInformationRerverva = elem =>{
    let arr = [];

    //console.log(elem)

    //contruimos los adultos
    for(let i=0;i<elem.paxes.adults; i++){
        let obj = {
            name: "",
            lastName: "",
            type: "ADULT"
        }
        arr.push(obj)
    }

    //construimos los ninos
    for(let i=0;i<elem.paxes.children; i++){
        let obj = {
            name: "",
            lastName: "",
            type: "CHILD",
            age: 12
        }
        arr.push(obj)
    }

    return arr;
}