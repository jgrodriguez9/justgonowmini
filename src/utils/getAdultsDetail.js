import React from 'react';
import { FaUser } from 'react-icons/fa';

export const getHuespedesNumber = (number, className) =>{
    let h = []
    for(let i = 0; i< number; i++){
        h.push(className)
    }

    return h;
}