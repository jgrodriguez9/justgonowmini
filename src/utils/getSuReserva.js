import React from 'react';
import moment from 'moment'
import { withTranslation } from 'react-i18next';

function GetSuReserva({t, rooms, fechaStar, fechaEnd}){
    let f1 = moment(fechaStar, "DD-MM-YYYY")
    let f2 = moment(fechaEnd, "DD-MM-YYYY")
    let night = moment.duration(f2.diff(f1)).asDays();

    return `${night} ${night > 1 ? t('Noches') : t('Noche')}, ${rooms.length} ${rooms.length > 1 ? t('Habitaciones') : t('Habitacion')} `
}

export default withTranslation()(GetSuReserva)