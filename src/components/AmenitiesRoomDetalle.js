import React from 'react';
import { useTranslation } from 'react-i18next';
import { getAmenitiesRoom } from '../utils/getAmenitiesRoom';

function AmenitiesRoomDetalle({amenities}){
    //console.log(amenities)
    const {t} = useTranslation()
    return(
        <ul className="list-inline">
            {
                amenities.map((item,i)=>(
                    i < 4 &&
                    <li className="list-inline-item" key={i}>
                        {getAmenitiesRoom(t, item.name)}
                    </li>
                ))
            }
        </ul>
    )


}

export default AmenitiesRoomDetalle