import React from 'react';
import { withTranslation } from 'react-i18next';

function ErrorSunApi({t, error}){
    if(error.typeError==="DATA"){
        return `${t('SunAPiDATA')}`
    }else{
        return `${t('SunAPiError')}`
    }
}

export default withTranslation()(ErrorSunApi)