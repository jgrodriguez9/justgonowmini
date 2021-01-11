import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import FormMaps from './FormMaps';

function MapSidebar({t,positionsList}){
    return (
        <>
        {
            positionsList.length > 0 ?
            <FormMaps
                positions={positionsList}
                isMarkerShown={true}
                onClick={()=>{}}
                onMarkerClick={null}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6jPmbF7m0sMTbGzqQg8ypu_TRmyzrJOg&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            /> :
            <div className="jumbotron">
                <p className="lead text-center">{t('NoDisponibleVistaMapa')}</p>
            </div>
        }
            
        </>
    )
}

export default withTranslation()(MapSidebar)