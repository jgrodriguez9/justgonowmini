import React, { useState } from 'react';
import { Button, Card, Col, Row,Form,Container } from 'react-bootstrap';

import moment from 'moment'

import '../css/FormSidebar.css'
import SelectAjax from './SelectAjax';
import { GET_DESTINOS } from '../services/Routes';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import SelectPerson from './SelectPerson'
import { useHistory } from 'react-router-dom';

function FormExperienceSidebar({auth, searching, sendData, showDestiny}){
    const [destino, setDestino] = useState({
        value: searching.destiny, label: searching.destino_name
    })
    const [startDate, setStartDate] = useState(moment(searching.checkIn, "DD-MM-YYYY"));
    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(0)
    const [focusedInput, setFocusedInput] = useState(null);
    const [huespedesSend, setHuespedesSend] = useState(searching.rooms)
    const history = useHistory();

    const onFocusChangeRangeHandler = (focusedInput) => {
        setFocusedInput(focusedInput);
    }
    const onHandleClickBuscar = e =>{
        console.log('buscar')
        const d ={
            "destiny" : destino===null? null : destino.value,
            "destino_name": destino===null ? null : destino.label,
            "checkIn" : moment(startDate).format("DD-MM-YYYY"),
            "apiName": "Viator",
            "currency" : "USD",
            "language" : "ES",
            "paxes": {
                "adults": adult,
                "children": child,
                "infant": 0,
                "junior": 0,
                "paxes": adult+child
            }
        }
        sendData(d)
        history.push(`/experience/detail?search=${encodeURIComponent(JSON.stringify(d))}`)
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
                                            setDestino(value)
                                        }} 
                                        defaultOptions={destino}   
                                        valid={true}     
                                        isClearable={true}   
                                        className="select-hotel-home"                                              
                                    />
                                </Col>
                            </Row>
                            }
                            
                            <Row className="mb-2">
                                <Col xs="12" lg="12">
                                    <SingleDatePicker
                                        date={startDate}
                                        numberOfMonths={1}
                                        onDateChange={date => {
                                            console.log(date)
                                            if(date===null){
                                                setStartDate(moment().add(1, 'days'))
                                            }else{
                                                setStartDate(date)
                                            }
                                        }}
                                        focused={focusedInput}
                                        onFocusChange={({ focused }) => setFocusedInput(focused)}
                                        displayFormat="DD-MM-YYYY"
                                        id="start_date_exp_id"
                                        hideKeyboardShortcutsPanel
                                    />     
                                </Col>
                            </Row>
                            <Row className="mb-4">
                            <Col xs="4" lg="6">
                                <Form.Group>
                                    <Form.Label className="text-light">Adultos</Form.Label>
                                    <SelectPerson adult={true} child={false} setAdult={setAdult}/>
                                </Form.Group>
                            </Col>
                            <Col xs="4" lg="6">
                                <Form.Group>
                                    <Form.Label className="text-light">Niños</Form.Label>
                                    <SelectPerson adult={false} child={true} setChild={setChild}/>
                                </Form.Group>
                            </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs="12" lg="12">
                                    <Button block variant="light" onClick={onHandleClickBuscar} className="font-weight-bold">Buscar</Button>
                                </Col>                        
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
        
    )
}

export default FormExperienceSidebar