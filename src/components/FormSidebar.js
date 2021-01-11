import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import moment from 'moment'

import '../css/FormSidebar.css'
import SelectAjax from './SelectAjax';
import { GET_DESTINOS } from '../services/Routes';
import { DateRangePicker } from 'react-dates';
import Huespedes from './Huespedes';
import { useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function FormSidebar({t,i18n,auth, searching, sendData,showDestiny}){
    console.log(searching.rooms)
    const [destino, setDestino] = useState({
        value: searching.destiny, label: searching.destino_name
    })
    const [startDate, setStartDate] = useState(moment(searching.checkIn, "DD-MM-YYYY"));
    const [endDate, setEndDate] = useState(moment(searching.checkOut, "DD-MM-YYYY"));
    const [focusedInput, setFocusedInput] = useState(null);
    const [huespedesSend, setHuespedesSend] = useState(searching.rooms)
    const history = useHistory();
    const [errorDestino, setErrorDestino] = useState(false)

    const onFocusChangeRangeHandler = (focusedInput) => {
        setFocusedInput(focusedInput);
    }
    const onHandleClickBuscar = e =>{
        //console.log('buscar')
        if(destino===null){
            setErrorDestino(true)
        }else{
            setErrorDestino(false)
            const d ={
                "destiny" : destino===null? null : destino.value,
                "destino_name": destino===null ? null : destino.label,
                "checkIn" : moment(startDate).format("DD-MM-YYYY"),
                "checkOut" : moment(endDate).format("DD-MM-YYYY"),
                "currency" : "USD",
                "language" : `${i18n.language === 'es' ? 'CAS' : "EN"}`,
                "rooms": huespedesSend
            }
            sendData(d)
            if(showDestiny){
                history.push(`/hotel?search=${encodeURIComponent(JSON.stringify(d))}`)
            }else{
                history.push(`/hotel/detail?search=${encodeURIComponent(JSON.stringify(d))}`)
            }
        }        
        
    }

    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs="12" lg="10">
                    <Card className="form-sidebar-card">
                        <Card.Body>
                            {showDestiny && 
                            <Row className="mb-2">
                                <Col xs="12" lg="12">
                                    <SelectAjax
                                        defaultValue={destino === null || Object.keys(destino).length === 0 ? false : destino}
                                        url={`${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${GET_DESTINOS}`}
                                        access_token={auth.data.access_token}
                                        isMulti={false}
                                        handleChange={(value) => {
                                            if(value===null){
                                                setErrorDestino(true)
                                            }else{
                                                setErrorDestino(false)
                                            }
                                            setDestino(value)
                                        }} 
                                        defaultOptions={destino}   
                                        valid={true}     
                                        isClearable={true}   
                                        className="select-hotel-home"                                              
                                    />
                                    {errorDestino && <Form.Control.Feedback type="invalid">{t('CampoRequerido')}</Form.Control.Feedback>}
                                </Col>
                            </Row>
                            }
                            
                            <Row className="mb-2">
                                <Col xs="12" lg="12">
                                    <DateRangePicker
                                        customArrowIcon="/"
                                        displayFormat="DD-MM-YYYY"
                                        startDate={startDate}
                                        startDateId="form_start_date_id"
                                        endDate={endDate}
                                        endDateId="form_end_date_id"
                                        onDatesChange={({ startDate, endDate }) => {
                                            setStartDate(startDate)
                                            setEndDate(endDate)
                                        }}
                                        focusedInput={focusedInput}
                                        onFocusChange={onFocusChangeRangeHandler}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col xs="12" lg="12">
                                    <Huespedes setHuespedesSend={setHuespedesSend} huespedesSend={huespedesSend}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="12" lg="12">
                                    <Button block variant="light" onClick={onHandleClickBuscar} className="font-weight-bold">{t('Buscar')}</Button>
                                </Col>                        
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
        
    )
}

export default withTranslation()(FormSidebar)