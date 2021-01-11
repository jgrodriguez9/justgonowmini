import React from 'react';

export const calcTotalHuespedes = (obj, tipo) =>{
    let total = 0;
    if(tipo==="adult"){
      total= obj.reduce(function (accumulator, item) {
        return accumulator + item.adults;
      }, 0);
    }else if(tipo==="child"){
      total= obj.reduce(function (accumulator, item) {
        return accumulator + item.children.ages.length;
      }, 0);
    }else if(tipo==="hab"){
      total= obj.length;
    }
    return total
}