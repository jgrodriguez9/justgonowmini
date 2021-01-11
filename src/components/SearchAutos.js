import React, { useContext, useState } from 'react'
import { authContext } from '../context/AuthContext';
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SelectAjax from './SelectAjax';
import { GET_DESTINOS } from '../services/Routes';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import '../css/SearchHoteles.css'
import '../css/DatePicker.css'
import { withTranslation } from 'react-i18next';


function SearchAutos({t}){
    const {auth} = useContext(authContext)
    const [origen, setOrigen] = useState(null)
    const [destino, setDestino] = useState(null)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const history = useHistory();

    const onHandleClickBuscar = e =>{
        const d ={
            "pickupLocation" : origen===null? null : origen.value,
            "pickupLocation_name" : origen===null? null : origen.label,
            "dropoffLocation" : destino===null? null : destino.value,
            "dropoffLocation_name": destino===null ? null : destino.label,
            "pickupDate" : moment(startDate).format("DD-MM-YYYY HH:mm"),
            "dropoffDate" : moment(endDate).format("DD-MM-YYYY HH:mm"),
            "currency" : "USD",
            "language" : "ES",
        }
        console.log(d)
        //history.push(`/hotel?search=${encodeURIComponent(JSON.stringify(d))}`)
    }

    return (
        <Container className="form-padding">
            <Row className="align-items-center">
                <Col xs="12" lg="3">
                    <Form.Group>
                        <Form.Label className="text-light">{t('DondeRecojes')}</Form.Label>
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
                        <Form.Label className="text-light">{t('DondeEntregas')}</Form.Label>
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
                <Col xs="6" lg="2">
                    <Form.Group>
                        <Form.Label className="text-light d-block">{t('FechaRecogida')}</Form.Label>
                        <DatePicker
                            selected={startDate}
                            className="form-control-sm input-datepicker"
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd-MM-yyyy HH:mm"
                            calendarClassName="calendar-datepicker"
                            showTimeInput
                        />
                    </Form.Group>
                </Col>
                <Col xs="6" lg="2">
                    <Form.Group>
                        <Form.Label className="text-light d-block">{t('FechaEntrega')}</Form.Label>
                        <DatePicker
                            selected={endDate}
                            className="form-control-sm input-datepicker"
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd-MM-yyyy HH:mm"
                            calendarClassName="calendar-datepicker"
                            showTimeInput
                        />
                    </Form.Group>
                </Col>
                <Col xs="12" lg="2">
                    <Button block variant="primary" onClick={onHandleClickBuscar} className="font-weight-bold px-1">{t('Buscar')}</Button>
                </Col>
            </Row>            
        </Container>
    )
}

export default withTranslation()(SearchAutos)