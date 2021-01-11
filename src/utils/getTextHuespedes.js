import React from 'react';
import { withTranslation } from 'react-i18next';

function GetTextHuespedes({t,guest}){
    return (
        <>
            {t('Para')}
            <span className="text-lowercase">
            {` ${guest.adults} ${guest.adults > 1 ? t('Adultos') : t('Adulto')} ${guest.children > 0 ? ` + ${guest.children} ${guest.children > 1 ? t('Ninos') : t('Nino')}` : ''}`}                
            </span>
        </>
    )
}

export default withTranslation()(GetTextHuespedes)

