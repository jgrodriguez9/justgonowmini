import React from 'react';
import { calcTotalHuespedes }
 from './calcTotalHuespedes';
 import moment from 'moment'
import { withTranslation } from 'react-i18next';

function DetalleReserva({t, rooms, fechaStar, fechaEnd}){
    let f1 = moment(fechaStar, "DD-MM-YYYY")
    let f2 = moment(fechaEnd, "DD-MM-YYYY")
    let night = moment.duration(f2.diff(f1)).asDays();
    let hab = rooms.length;
    let adult = calcTotalHuespedes(rooms, "adult")
    let child = calcTotalHuespedes(rooms, "child")
   return <span className="text-lowercase">
       {`${night} ${night > 1 ? t('Noches') : t('Noche')}, ${hab} ${hab > 1 ? t('Habitaciones') : t('Habitacion')}, ${adult+child} ${adult+child > 1 ? t('Huespedes') : t('Huesped')}`}
   </span>
}

export default withTranslation()(DetalleReserva)