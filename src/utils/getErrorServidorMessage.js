import React from 'react';
import { withTranslation } from 'react-i18next';

const getErrorServidorMessage = ({t, code}) =>{
    switch(code){
        case 400:
            return <span><strong>{t('ErrorPeticion')}. :(</strong> {t('ErrorPeticionParrafo')}</span>
        case 404:
            return <span><strong>{t('NoEcontrado')}. :(</strong> {t('NoEncontradoParrafo')}.</span>
        case 500:
            return <span><strong>{t('ErrorServidor')}. :(</strong> {t('ErrorServidorParrafo')}.</span>
        default:
            return <span>{t('AlgoMalPetición')}.</span>
    }
}

export default withTranslation()(getErrorServidorMessage)