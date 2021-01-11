import React from 'react';
import moment from 'moment'

export const getTotalByNight = (total, fi, ff) =>{
    const f1 = moment(fi, "DD-MM-YYYY")
    const f2 = moment(ff, "DD-MM-YYYY")
    const d = moment.duration(f2.diff(f1)).asDays();

    return total/d;
}