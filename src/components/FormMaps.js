import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const FormMaps = withScriptjs(withGoogleMap((props) =>  
  <GoogleMap
    defaultZoom={10}
    defaultCenter={ { lat: parseFloat(props.positions[0].latitude), lng: parseFloat(props.positions[0].longitude) } }
    onClick={props.onClick}
  >
    {
        props.positions.map((item,i)=>(
            <Marker key={i} position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }} />
        ))
    }
  </GoogleMap>
))

export default FormMaps