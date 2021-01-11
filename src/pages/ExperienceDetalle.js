import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import useQuery from '../hook/useQuery';
import dataTest from '../data/hotelDetail.json'
import SectionTopDetail from '../components/SectionTopDetail';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CarouselExperienceTopDetail from '../components/CarouselExperienceTopDetail';
import DescripcionDetail from '../components/DescripcionDetail';


import '../css/HotelDetalle.css'
import FormSidebar from '../components/FormSidebar';
import MapSidebar from '../components/MapSidebar';
import { BsHouseFill } from 'react-icons/bs';

import { TOUR_DETAIL } from '../services/Routes';
import Post from '../services/Post';
import CargandoDetail from '../loader/CargandoDetail';
import FormExperienceSidebar from '../components/FormExperienceSidebar';
import TourDetail from '../components/TourDetail';

function HotelDetalle(){
    const {auth} = useContext(authContext);
    const history = useHistory()
    const query = useQuery()
    const [data, setData] = useState(JSON.parse(query.get('search')))
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true)
    const [positions, setPositions] = useState([])
    const [errorServer, setErrorServer] = useState(false)
    const [errorData, setErrorData] = useState(null)


    useEffect(()=>{
        window.scrollTo(0, 0)
        //console.log(data)
        setErrorServer(false)
        setLoading(true)
        const urlHotelList = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${TOUR_DETAIL}?sources=${process.env.REACT_APP_SUNAPI_APINAMETOUR}`
        Post({url: urlHotelList, data: data, access_token: auth.data.access_token, header: true})
        .then(response=>{
            //console.log(response.data)
            if(response.data.errors !==null && response.data.error !== undefined && response.data.errors.length > 0 ){
                setErrorData(response.data.errors)
                setErrorServer(true)
            }else{
                setItem(response.data)
                //maps
                if(response.data.address!=null && response.data.address.geolocation!=null){
                    let arrP = [
                        {
                            latitude: response.data.address.geolocation.latitude,
                            longitude: response.data.address.geolocation.longitude
                        }
                    ]
                    setPositions(arrP)   
                }
                
            }
            setLoading(false)  
        })
        .catch(error=>{
            console.log(error)
            setErrorServer(true)
            setLoading(false)
        })


    },[])

    const sendData = (d) =>{
        //console.log(d)
        d['apiName'] = data.apiName;
        d['chain'] = '';
        d['id'] = data.id;
        setData(d)
        window.scrollTo(0, 0)
        setLoading(true)
        const urlExpDe = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${TOUR_DETAIL}?sources=${process.env.REACT_APP_SUNAPI_APINAMEHOTEL}`
        Post({url: urlExpDe, data: d, access_token: auth.data.access_token, header: true})
        .then(response=>{
            console.log(response.data)
            if(response.data.errors !==null && response.data.error !== undefined && response.data.errors.length > 0 ){
                setErrorData(response.data.errors)
                setErrorServer(true)
            }else{
                setItem(response.data)
                //maps
                if(response.data.address!=null && response.data.address.geolocation!=null){
                    let arrP = [
                        {
                            latitude: response.data.address.geolocation.latitude,
                            longitude: response.data.address.geolocation.longitude
                        }
                    ]
                    setPositions(arrP)   
                } 
            }
            setLoading(false)  
        })
        .catch(error=>{
            console.log(error)
            setErrorServer(true)
            setLoading(false)
        })
    }


    return (
        <>
            {!loading && <SectionTopDetail menu='Experiencias' destino={data.destino_name} nombre={item.name} direccion={item.address.addressName}/>}

            {
                loading ? <CargandoDetail /> : 
                <Container fluid className="mt-3">
                    <Row>
                        <Col xs="12" lg="3">
                            <Row>
                                <Col xs="12" lg="12" className="justify-content-center"><FormExperienceSidebar auth={auth} searching={data} sendData={sendData} showDestiny={false}/></Col>
                                <Col xs="12" lg="12">
                                    <Row className="justify-content-center my-4">
                                        <Col xs="12" lg="10">
                                            <MapSidebar positionsList={positions}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="12" lg="10">
                                    <h1 className="text-go text-right ft-6em">GO!</h1>
                                </Col>
                                <Col xs="12" lg="12">
                                    <Row className="justify-content-center">
                                        <Col xs="12" lg="10">
                                            <h2 className="display-4 ft-2-5rem line-before">Vive una mejor experiencia <strong>¡Renta Condominios!</strong></h2>
                                            <Button variant="primary" className="text-uppercase font-weight-bold mt-4" block>
                                                <BsHouseFill className="mb-1" /> Ver semanas disponibles
                                            </Button>
                                        </Col>
                                    </Row>                                
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col xs="12" lg="9">
                            <CarouselExperienceTopDetail photos={item.photos} />
                            <DescripcionDetail description={item.description}/>
                            <TourDetail rates={item.rateServices} data={data}/>
                            
                        </Col>
                    </Row>
                </Container>
            }            
        </>
    )

}

export default HotelDetalle