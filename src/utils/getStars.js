import React from 'react';

export const getStars = star =>{
    if(star===null){
        return "0"
    }else{
        return star;
    }
}