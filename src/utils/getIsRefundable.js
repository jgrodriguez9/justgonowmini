import React from 'react';
import { useTranslation } from 'react-i18next';

function GetIsRefundable (isRefundable){
    const { t } = useTranslation();
    if(isRefundable === "true"){
        return <span className="badge badge-pill badge-info">{t('PropiedadCancelarReservacion')}</span>
    }else if(isRefundable === "false"){
        return <span className="badge badge-pill badge-danger">{t('PropiedadNoCancelarReservacion')}</span>
    }else{
        return <span className="badge badge-pill badge-light">{t('NoInformacionCancelacion')}</span>
    }
}

export default GetIsRefundable