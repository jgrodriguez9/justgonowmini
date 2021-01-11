import React, { useContext, useState } from 'react';
import { authContext } from '../context/AuthContext';
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import { Badge, Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import SelectAjax from './SelectAjax';
import { GET_DESTINOS } from '../services/Routes';
import { DateRangePicker } from 'react-dates';
import Paxes from './Paxes';

import 'react-dates/lib/css/_datepicker.css';
import '../css/SearchHoteles.css'
import '../css/DatePicker.css'
import { withTranslation } from 'react-i18next';

function  SearchVuelos({t}){
    const {auth} = useContext(authContext)
    const [origen, setOrigen] = useState(null)
    const [destino, setDestino] = useState(null)
    const [startDate, setStartDate] = useState(moment().add(1, 'days'));
    const [endDate, setEndDate] = useState(moment().add(3, 'days'));
    const [focusedInput, setFocusedInput] = useState(null);
    const [pasajeros, setPasajeros] = useState({
        adults: 1,      
        children: 0,
        infant: 0,
        junior: 0,
        paxes: 1
    })
    const [oneWay, setOneWay] = useState(true)

    const history = useHistory();

    const onFocusChangeRangeHandler = (focusedInput) => {
        setFocusedInput(focusedInput);
    }

    const onHandleClickBuscar = e =>{
        const d ={
            "origin" : origen===null? null : origen.value,
            "origin_name" : origen===null? null : origen.label,
            "destiny" : destino===null? null : destino.value,
            "destino_name": destino===null ? null : destino.label,
            "checkIn" : moment(startDate).format("DD-MM-YYYY"),
            "returnDate" : moment(endDate).format("DD-MM-YYYY"),
            "currency" : "USD",
            "language" : "ES",
            "paxes": pasajeros,
            "oneWay": oneWay
        }
        console.log(d)
        //history.push(`/hotel?search=${encodeURIComponent(JSON.stringify(d))}`)
    }

    return (
        <Container className="form-padding">
            <Row className="align-items-center">
                <Col xs="12" lg="3">
                    <Form.Group>
                        <Form.Label className="text-light">{t('Origen')}</Form.Label>
                        <SelectAjax
                            defaultValue={origen === null || Object.keys(origen).length === 0 ? false : origen}
                            url={`${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${GET_DESTINOS}`}
                            access_token={auth.data.access_token}
                            isMulti={false}
                            handleChange={(value) => {
                                setOrigen(value)
                            }} 
                            defaultOptions={origen}   
                            valid={true}     
                            isClearable={true}   
                            className="select-hotel-home"                                              
                        />
                    </Form.Group>
                </Col>
                <Col xs="12" lg="3">
                    <Form.Group>
                        <Form.Label className="text-light">{t('Destino')}</Form.Label>
                        <SelectAjax
                            defaultValue={destino === null || Object.keys(destino).length === 0 ? false : destino}
                            url={`${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${GET_DESTINOS}`}
                            access_token={auth.data.access_token}
                            isMulti={false}
                            handleChange={(value) => {
                                setDestino(value)
                            }} 
                            defaultOptions={destino}   
                            valid={true}     
                            isClearable={true}   
                            className="select-hotel-home"                                              
                        />
                    </Form.Group>
                </Col>
                <Col xs="6" lg="3">
                    <Form.Group>
                        <Form.Label className="text-light">{t('Salida')} / {t('Regreso')}</Form.Label>
                        <DateRangePicker
                            customArrowIcon="/"
                            displayFormat="DD-MM-YYYY"
                            startDate={startDate}
                            minimumNights={0}
                            startDateId="start_date_flight_id"
                            endDate={endDate}
                            endDateId="end_date_flight_id"
                            onDatesChange={({ startDate, endDate }) => {
                                if(startDate===null){
                                    setStartDate(moment().add(1, 'days'))
                                }else{
                                    setStartDate(startDate)
                                }
                                if(endDate===null){
                                    setEndDate(moment(startDate).add(2, 'days'))
                                }else{
                                    setEndDate(endDate)
                                }
                                
                                
                            }} // PropTypes.func.isRequired,
                            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={onFocusChangeRangeHandler} // PropTypes.func.isRequired,
                        />
                    </Form.Group>
                </Col>
                <Col xs="6" lg="2">
                    <Form.Group>
                        <Form.Label className="text-light">{t('Personas')}</Form.Label>
                        <Paxes setPasajeros={setPasajeros} pasajeros={pasajeros}/>
                    </Form.Group>                    
                </Col>
                <Col xs="12" lg="1">
                    <Button block variant="primary" onClick={onHandleClickBuscar} className="font-weight-bold px-1">{t('Buscar')}</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                <Nav variant="pills" defaultActiveKey="oneWay" className="flight-type">
                    <Nav.Item onClick={e=>setOneWay(true)} className="mr-3">
                        <Nav.Link eventKey="oneWay">
                            {t('ViajeSencillo')}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={e=>setOneWay(false)}>
                        <Nav.Link eventKey="roundTrip">
                            {t('ViajeRedondo')}
                        </Nav.Link>                        
                    </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

export default withTranslation()(SearchVuelos)