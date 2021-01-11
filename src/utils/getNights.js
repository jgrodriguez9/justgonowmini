import React from 'react';
import moment from 'moment'

export const getNights = (fi, ff) =>{
    const f1 = moment(fi, "DD-MM-YYYY")
    const f2 = moment(ff, "DD-MM-YYYY")
    return moment.duration(f2.diff(f1)).asDays();
}