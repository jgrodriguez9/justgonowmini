import React from 'react';
import { withTranslation } from 'react-i18next';

function GetInfoReservaPaxes({t, rooms, tipo}){
    let adults = rooms.reduce(function (accumulator, item) {
        return accumulator + item.paxes.adults
    },0)

    let children = rooms.reduce(function (accumulator, item) {
        return accumulator + item.paxes.children
    },0) 

    if(tipo==='info'){
        return `${t('ReservacionPara')} ${adults} ${adults> 1 ? t('adultos') : t('adulto')}${children > 0 ? `, ${children} ${children>1 ? t('ninos') : t('nino')}` : ''}. ${t('ReservacionPara1')}`
    }
    else if(tipo==='reservaPara'){
        return `${adults} ${adults> 1 ? t('adultos') : t('adulto')} ${children > 0 ? `, ${children} ${children>1 ? t('ninos') : t('nino')}` : ''}`
    }
}

export default withTranslation()(GetInfoReservaPaxes)