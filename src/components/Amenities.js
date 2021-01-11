import React from 'react';
import carAir from '../img/amenities/car-air.svg';
import parking from '../img/amenities/car-doors.svg';
import concierge from '../img/amenities/car-pasajeros.svg';
import wifi from '../img/amenities/wifi.svg';
import carRental from '../img/amenities/car.svg';
import gym from '../img/amenities/pesas.svg';
import { Image } from 'react-bootstrap';
import { BiLinkExternal } from 'react-icons/bi';

function Amenities({onHandleClickAmenities,amenities}){
    return(
        <ul className="list-inline mb-1">
            <li className="list-inline-item"><Image src={carAir} fluid className="icon-width-1-3rem"/></li>
            <li className="list-inline-item"><Image src={concierge} fluid className="icon-width-1rem"/></li>
            <li className="list-inline-item"><Image src={wifi} fluid className="icon-width-1rem"/> </li>
            <li className="list-inline-item"><Image src={carRental} fluid className="icon-width-1rem"/> </li>
            <li className="list-inline-item"><Image src={parking} fluid className="icon-width-1rem"/> </li>
            <li className="list-inline-item"><Image src={gym} fluid className="icon-width-1rem"/> </li>
            <li className="list-inline-item"><BiLinkExternal className="icon-width-1-2rem text-secondary cursor-pointer" onClick={e=>onHandleClickAmenities(amenities)}/> </li>
        </ul>
    );
}

export default Amenities