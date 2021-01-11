import React from 'react';
import { Image } from 'react-bootstrap';
import doubleImg from '../img/amenities/doble.svg'
import noSmoking from '../img/amenities/nonSmoking.svg'
import privateBathroom from '../img/amenities/privateBathroom.svg'
import ventana from '../img/amenities/ventana.svg'

export const getAmenitiesRoom = (t, amenity) =>{
    switch(amenity){
        case 'double':
            return <span><Image src={doubleImg} fluid className="icon-20"/> {t('Doble')}</span>
        case 'non-smoking':
            return <span><Image src={noSmoking} fluid className="icon-20"/> {t('NoFumar')}</span>
        case 'private-bathroom':
            return <span><Image src={privateBathroom} fluid className="icon-20"/> {t('BanoPrivado')}</span>
        case 'window':
            return <span><Image src={ventana} fluid className="icon-20"/> {t('Ventana')}</span>
        default:
            return amenity;
    }
}