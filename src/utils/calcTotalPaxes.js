import React from 'react'

export const calcTotalPaxes = paxes =>{
    return paxes.adults+paxes.children+paxes.infant+paxes.junior;
}