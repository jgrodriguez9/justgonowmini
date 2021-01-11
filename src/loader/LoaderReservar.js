import React from "react";
import { withTranslation } from "react-i18next";
import { WaveLoading } from 'react-loadingg';
import './LoaderReserva.css'

const commonStyle = {
    margin: 'auto',
    position: 'initial',
    left: 0,
    right: 0,
    top:10,
    bottom:10
};

function LoaderReservar({t}){
    return  (
        <div className="react-loader-overlay">
            <div className="react-confirm-alert">
                <div className="custom-ui">
                        <h2>{t('ProcesandoReservacion')}...</h2>
                        <WaveLoading style={commonStyle} color={"#6586FF"} />
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(LoaderReservar)