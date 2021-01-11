import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import PromoCondos from '../components/PromoCondos';
import ReservaCardTop from '../components/ReservaCardTop';
import ReservaInformacion from '../components/ReservaInformacion';
import ReservaTop from '../components/ReservaTop';
import SectionTopDetail from '../components/SectionTopDetail';
import { authContext } from '../context/AuthContext';
import useQuery from '../hook/useQuery';
import ReservaCardTopWhite from '../components/ReservaCardTopWhite';
import { buildPaxesInformationRerverva } from '../utils/buildPaxesInformationRerverva';

import dataError from '../data/respuestaErrorJGN.json'
import dataSuccess from '../data/respuestaReservaJGN.json'

import '../css/HotelReserva.css'
import Switch from 'react-bootstrap/esm/Switch';
import HotelVoucher from './HotelVoucher';
import LoaderReservar from '../loader/LoaderReservar';
import { isEmptyPaxes } from '../utils/isEmptyPaxes';
import { withTranslation } from 'react-i18next';
import { HOTEL_RESERVATION } from '../services/Routes';
import Post from '../services/Post';
import ReservacionConcluida from '../components/ReservacionConcluida';

function HotelReserva({t}){    
    const {auth} = useContext(authContext)
    let { path, url } = useRouteMatch();
    const history = useHistory()
    const query = useQuery()
    const data = query.get('search')
    const [item, setItem] = useState(JSON.parse(window.localStorage.getItem(data)))
    const [roomsHuespedes, setRoomsHuespedes] = useState([])
    const [client, setClient] = useState({
        name: '',
        sName: '',
        lName: '',
        telClient: '',
        eClient: ''
    })
    const [hasItem, setHasItem] = useState(true)
    const [payment, setPayment] = useState(null)
    const [sendindReserva, setSendingReserva] = useState(false)
    const [infoReserva, setInfoReserva] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(()=>{
        window.scrollTo(0, 0)
        //console.log('vista reservacion')
        //console.log(item)
        if(item!==null){
            setPayment({
                currency: "USD",
                source: item ? item.apiName: '',
                amount: item ? item.total : 0,
                paymentType: "CREDIT_CARD",
                creditCard: {
                    number: "",
                    expireMonth: "01",
                    expireYear: "2020",
                    type: {
                        name: "VI"
                    }
                }
            })
            
            let arrroomHuespedes = []
            item.rooms.forEach(elem=>{
                let obj = {
                    id: item.habitacion_id,
                    roomType: "", //fijo
                    planId: "", //fijo
                    price: item.total,
                    paxes: {
                        adults: elem.guest.adults,
                        children: elem.guest.children,
                        infant: 0//fijo
                    },
                }
                arrroomHuespedes.push(obj)
            })
    
            arrroomHuespedes.forEach((elem, index)=>{
                let paxesInformation = buildPaxesInformationRerverva(elem)
                arrroomHuespedes[index]['paxesInformation'] = paxesInformation
            })
            setRoomsHuespedes(arrroomHuespedes)
        }else{
            setHasItem(false)
        }
        

    },[])

    const [textoError, setTextoError] = useState([])
    const [checkReserva, setCheckReserva] = useState(true)
    const [checkRJustG, setCheckRJustG] = useState(true)

    const onHandleClickReservacion = e =>{
        //console.log('reservado')
        setTextoError([])
        const reservaBooking = {
            currency: "USD",
            total: item.total,
            source: item.apiName,
            reference: "CMOM",//fijo
            company: "JustGo",//fij
            client: {
                country: "OT",//fijo
                phone: {
                    number: client.telClient,
                    type: "HOME"//fijo
                },
                name: `${client.name}${client.sName==='' ? '' : ' '+client.sName }`,
                hotel: {
                    name: item.hotel_name,
                    id: 2//fijo por el momento
                },
                email: client.eClient,
                lastname: client.lName
            },
            activities: [],//fijo
            hotels: [{
                id: item.hotel_id,
                source: item.apiName,
                name: item.hotel_name,
                checkin: item.checkIn,
                checkout: item.checkOut,
                destination: item.destino_id,
                rooms: roomsHuespedes,
                paxes: {
                    adults: item.huespedes_adults,
                    children: item.huespedes_children,
                    infant: 0
                }
            }],
            payment: payment
        }

        //vemos si tiene error el formulario
        //1.cliente principal
        let arr = [];
        if(reservaBooking.client.name==="" || reservaBooking.client.lastname === "" || reservaBooking.client.email === "" || reservaBooking.client.phone.number === ""){
            let txt = t('ValidacionHuespedPrincipal')
            arr.push(txt)
        }
        if(isEmptyPaxes(reservaBooking.hotels)){
            let txt = t('ValidacionHuespedes')
            arr.push(txt)
        }
        if(reservaBooking.payment.creditCard.number===""){
            let txt = t('ValidacionPayment')
            arr.push(txt)
        }
        if(!checkReserva || !checkRJustG){
            let txt = t('OkPolitica')
            arr.push(txt)
        }
        setTextoError(arr)

        

        if(arr.length === 0){
            //console.log('ok')
            //console.log(reservaBooking)
            //test que devuelve error en la reserva
            //loader mientras reserva
            // setSendingReserva(true)
            // setInterval(()=>{
            //     //setInfoReserva(dataError)
            //     //setShow(true)
            //     setInfoReserva(dataSuccess)
            //     setSendingReserva(false)
            //     history.push(`${url}/voucher`)
            // },5000)

            setSendingReserva(true)
            const urlHotelReservation = `${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${HOTEL_RESERVATION}?sources=${process.env.REACT_APP_SUNAPI_APINAMEHOTEL}`
            Post({url:urlHotelReservation, data: reservaBooking, access_token: auth.data.access_token, header: true})
            .then(response=>{
                setSendingReserva(false)
                console.log(response)
                setInfoReserva(response.data)
                if(response.httpStatusCode === 'INTERNAL_SERVER_ERROR'){
                    setShow(true)
                }else{
                    history.push(`${url}/voucher`)
                }
                
            })
            .catch(error=>{                
                console.log(error)
                setSendingReserva(false)
                setShow(true)
                setInfoReserva(error)
            })
        }

        
    
    
    }

    return(
        <Switch>
            <Route exact path={path}>
                {
                    item &&
                    <>
                    {sendindReserva && <LoaderReservar />}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col xs="12" lg="12">
                                    <h6>{t('LoSentimos')}!!!</h6>
                                    <label>{t('NoEfectuarReservación')}</label>
                                </Col>                                
                            </Row>
                            {
                                (infoReserva && infoReserva.httpStatusCode) && 
                                <Row>
                                    <Col xs="12" lg="12">
                                        <Alert variant="primary">
                                            {`${infoReserva.httpStatusCode}`}
                                            <br />
                                            {infoReserva.message}
                                        </Alert>
                                    </Col>
                                </Row>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                {t('Aceptar')}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <SectionTopDetail menu={t('Hotel')} nombre={t('DatosReserva')} direccion={item.hotel_name} />
                    <Container fluid>
                        <Row>
                            <Col xs="12" lg="3" className="my-3">
                                <Row className="justify-content-center">
                                    <Col xs="12" lg="12"><ReservaCardTop item={item}/></Col>
                                    <Col xs="12" lg="12"><ReservaCardTopWhite item={item}/></Col>
                                    <Col xs="12" lg="10"><h1 className="text-go text-right ft-6em">GO!</h1></Col>
                                    <Col xs="12" lg="12">
                                        <PromoCondos />                               
                                    </Col>
                                </Row>
                                
                            </Col>
                            <Col xs="12" lg="9">
                                <ReservaTop 
                                    hotel_photos={item.hotel_photos} 
                                    hotel_name={item.hotel_name} 
                                    hotel_stars={item.stars}
                                    hotel_direccion={item.direccion}
                                />

                                <ReservaInformacion 
                                    onHandleClickReservacion={onHandleClickReservacion} 
                                    roomsHuespedes={roomsHuespedes}
                                    setRoomsHuespedes={setRoomsHuespedes}
                                    client={client}
                                    setClient={setClient}
                                    payment={payment}
                                    setPayment={setPayment}
                                    textoError={textoError}
                                    checkReserva={checkReserva}
                                    setCheckReserva={setCheckReserva}
                                    checkRJustG={checkRJustG}
                                    setCheckRJustG={setCheckRJustG}
                                />
                            </Col>
                        </Row>
                    </Container>
                </>
                }
            </Route>
            <Route path={`${path}/voucher`}>
                {
                    item ? <HotelVoucher infoReserva={infoReserva} /> : <ReservacionConcluida />
                }
                
            </Route>
            

        </Switch>
        
        
    )
}

export default withTranslation()(HotelReserva)