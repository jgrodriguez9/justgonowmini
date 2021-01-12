import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import useQuery from '../hook/useQuery';
import dataTest from '../data/hotelDetail.json'
import SectionTopDetail from '../components/SectionTopDetail';
import { Col, Container, Row } from 'react-bootstrap';
import CarouselTopDetail from '../components/CarouselTopDetail';
import DescripcionDetail from '../components/DescripcionDetail';
import HabitacionesDetail from '../components/HabitacionesDetail';

import '../css/HotelDetalle.css'
import FormSidebar from '../components/FormSidebar';
import MapSidebar from '../components/MapSidebar';
import AmenitiesDetail from '../components/AmenitiesDetail';
import { HOTEL_DETAIL } from '../services/Routes';
import Post from '../services/Post';
import CargandoDetail from '../loader/CargandoDetail';
import { calcTotalHuespedes } from '../utils/calcTotalHuespedes';
import PromoCondos from '../components/PromoCondos';
import ErrorServer from '../components/ErrorServer';
import EmptyData from '../components/EmptyData';
import { withTranslation } from 'react-i18next';
import ExtraInformation from '../components/ExtraInformation';

function HotelDetalle({t, i18n}){
    const {auth} = useContext(authContext);
    const history = useHistory()
    const query = useQuery()
    const [data, setData] = useState(JSON.parse(query.get('search')))
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true)
    const [positions, setPositions] = useState([])
    const [errorServer, setErrorServer] = useState(false)
    const [errorData, setErrorData] = useState(null)
    const [errorStatus, setErrorStatus] = useState(null)
    const [emptyData, setEmptyData] = useState(false)

    useEffect(()=>{
        //console.log(data)
        let lng = data['language']
        //console.log(lng)
        lng = lng ==='CAS' ? 'es' : 'en'
        //console.log(lng)
        i18n.changeLanguage(lng)
    },[])

    useEffect(()=>{        
        data['language'] = `${i18n.language === 'es' ? 'CAS' : 'EN'}`
        window.scrollTo(0, 0)
        //console.log(item)
        //setLoading(false)
        setErrorServer(false)
        setEmptyData(false)
        setLoading(true)
        const urlHotelList = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${HOTEL_DETAIL}?sources=${process.env.REACT_APP_SUNAPI_APINAMEHOTEL}`
        Post({url: urlHotelList, data: data, access_token: auth.data.access_token, header: true})
        .then(response=>{
            //console.log(response)
            if(response.data===""){
                setEmptyData(true)
            }else{
                if(response.data.errors !==null && response.data.error !== undefined && response.data.errors.length > 0 ){
                    setErrorData(response.data.errors)
                    setErrorServer(true)
                }else{
                    setItem(response.data)
                    //maps
                    if(response.data.address != null && response.data.address.geolocation!=null){
                        let arrP = [
                            {
                                latitude: response.data.address.geolocation.latitude,
                                longitude: response.data.address.geolocation.longitude
                            }
                        ]
                        setPositions(arrP)   
                    }
                    
                }
            }            
            setLoading(false)  
        })
        .catch(error=>{
            console.log(error)
            setErrorStatus(error.response)
            setErrorServer(true)            
            setLoading(false)
        })


    },[i18n.language])

    const sendData = (d) =>{
        //console.log(d)
        data['language'] = `${i18n.language === 'es' ? 'CAS' : 'EN'}`
        d['apiName'] = process.env.REACT_APP_SUNAPI_APINAMEHOTEL;
        d['chain'] = '';
        d['id'] = data.id;
        setData(d)
        window.scrollTo(0, 0)
        setErrorServer(false)
        setEmptyData(false)
        setLoading(true)
        const urlHotelDet = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${HOTEL_DETAIL}?sources=${process.env.REACT_APP_SUNAPI_APINAMEHOTEL}`
        Post({url: urlHotelDet, data: d, access_token: auth.data.access_token, header: true})
        .then(response=>{
            console.log(response.data)
            if(response.data.errors !==null && response.data.error !== undefined && response.data.errors.length > 0 ){
                setErrorData(response.data.errors)
                setErrorServer(true)
            }else{
                setItem(response.data)
                //maps
                let arrP = [
                    {
                        latitude: response.data.address.geolocation.latitude,
                        longitude: response.data.address.geolocation.longitude
                    }
                ]
                setPositions(arrP)   
            }
            setLoading(false)  
        })
        .catch(error=>{
            console.log(error)
            setErrorStatus(error.response)
            setErrorServer(true)
            setLoading(false)
        })
    }

    const onHandleClickReservar = rate =>{
        window.open('http://104.131.92.59:3000/', '_blank')


        //console.log('reservar')
        //console.log(data)
        //console.log(item)
        //console.log(rate)

        // const d = {
        //     apiName: data.apiName,
        //     checkIn: item.checking,
        //     checkOut: item.checkout,
        //     destino_id: data.destiny,
        //     destino_name: data.destino_name,
        //     hotel_id: item.id,
        //     hotel_name: item.name,
        //     hotel_photos: item.photos,
        //     stars: item.stars,
        //     direccion: item.address.addressName,
        //     habitacion_name: rate.identificador,
        //     habitacion_id: rate.rateKey,
        //     total: rate.amountDetail.total,
        //     mealPlan: rate.mealPlan,
        //     rooms: rate.roomDescription,
        //     huespedes: calcTotalHuespedes(data.rooms, "adult")+calcTotalHuespedes(data.rooms, "child"),
        //     huespedes_adults: calcTotalHuespedes(data.rooms, "adult"),
        //     huespedes_children: calcTotalHuespedes(data.rooms, "child")
        // }
        // console.log("data a resrvar")
        // console.log(d)
        // let cacheKey = `${d.hotel_id}${d.destino_id}${d.habitacion_id}${d.checkIn}${d.checkOut}${d.total}` 
        // let cacheValue = JSON.stringify(d) 
        // //salvo en el localStorage para reservar
        // //console.log(window.localStorage.getItem(cacheKey))
        // if(window.localStorage.getItem(cacheKey) === null){
        //     window.localStorage.setItem(cacheKey, cacheValue)
        // }
        // history.push(`/hotel/reservation?search=${encodeURIComponent(cacheKey)}`)
        
    }


    return (
        <>
            {!loading && <SectionTopDetail menu={t('Hotel')} destino={data.destino_name} nombre={item.name} direccion={item.address ? item.address.addressName : ''}/>}

            {
                loading ? <CargandoDetail /> : 
                emptyData ? <EmptyData /> :
                <Container fluid className="my-3">
                    <Row>
                        <Col xs="12" lg="3">
                            <Row>
                                <Col xs="12" lg="12" className="justify-content-center"><FormSidebar auth={auth} searching={data} sendData={sendData} showDestiny={false}/></Col>
                                <Col xs="12" lg="12">
                                    <Row className="justify-content-center my-4">
                                        <Col xs="12" lg="10">
                                            {item && <MapSidebar positionsList={positions}/>}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="12" lg="10">
                                    <h1 className="text-go text-right ft-6em">GO!</h1>
                                </Col>
                                <Col xs="12" lg="12">
                                    <PromoCondos />                                
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col xs="12" lg="9">
                            {
                                errorServer ? <ErrorServer errorData={errorData} errorStatus={errorStatus}/> : 
                                <>
                                    <CarouselTopDetail photos={item.photos} numberCards={5} imgHeight={260}/>
                                    <DescripcionDetail description={item.description}/>
                                    <HabitacionesDetail habitaciones={item.rates} onHandleClickReservar={onHandleClickReservar}/>
                                    <ExtraInformation extraInformation={item.extraInformation} />
                                    <AmenitiesDetail amenities={item.amenities}/>
                                </>
                            }
                            
                        </Col>
                    </Row>
                </Container>
            }            
        </>
    )

}

export default withTranslation()(HotelDetalle)