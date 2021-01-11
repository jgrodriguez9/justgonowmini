import React, { useContext, useState } from 'react';
import moment from 'moment'
import { authContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SelectAjax from './SelectAjax';
import { GET_DESTINOS } from '../services/Routes';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import '../css/DatePicker.css'


function  SearchCondominios(){
    const {auth} = useContext(authContext)
    const [destino, setDestino] = useState(null)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [focusedInput, setFocusedInput] = useState(null);
    const [errorDestino, setErrordestino] = useState(false)
    const history = useHistory();

    const onFocusChangeRangeHandler = (focusedInput) => {
        setFocusedInput(focusedInput);
    }

    const onHandleClickBuscar = e =>{

        if(destino  == null )
            setErrordestino(true);
        else {
            const d ={
                "destiny" : destino===null? null : destino.value,
                "destino_name": destino===null ? null : destino.label,
                "checkIn" : moment(startDate).startOf('month').format("DD-MM-YYYY"),
                "checkOut" : moment(endDate).endOf('month').format("DD-MM-YYYY"),
                "currency" : "USD",
                "language" : "es",
                "rooms":[{
                    "adults":1,
                    "children":{
                        "ages":[]
                    }
                }],
            }
            history.push(`/condos?search=${encodeURIComponent(JSON.stringify(d))}`)
        }
    }

    return (
        <Container className="form-padding">
            <Row className="align-items-center">
                <Col xs="12" lg="4">
                    <Form.Group>
                        <Form.Label className="text-light">Destino</Form.Label>
                        <SelectAjax
                            defaultValue={destino === null || Object.keys(destino).length === 0 ? false : destino}
                            url={`${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${GET_DESTINOS}`}
                            access_token={auth.data.access_token}
                            isMulti={false}
                            handleChange={(value) => {
                                if(value === null) 
                                    setErrordestino(true)
                                else 
                                    setErrordestino(false)
                                
                                setDestino(value)
                            }} 
                            defaultOptions={destino}   
                            valid={true}     
                            isClearable={true}   
                            className="select-hotel-home"                                              
                        />
                        {errorDestino && <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>}
                    </Form.Group>
                </Col>
                <Col xs="6" lg="3">
                    <Form.Group>
                        <Form.Label className="text-light d-block">Desde</Form.Label>
                        <DatePicker
                            selected={startDate}
                            className="form-control-sm input-datepicker"
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="MMMM-yyyy"
                            showMonthYearPicker
                            calendarClassName="calendar-datepicker"
                        />
                    </Form.Group>
                </Col>
                <Col xs="6" lg="3">
                    <Form.Group>
                        <Form.Label className="text-light d-block">Hasta</Form.Label>
                        <DatePicker
                            selected={endDate}
                            className="form-control-sm input-datepicker"
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="MMMM-yyyy"
                            showMonthYearPicker
                            calendarClassName="calendar-datepicker"
                        />
                    </Form.Group>
                </Col>
                <Col xs="12" lg="2">
                    <Button block variant="primary" onClick={onHandleClickBuscar} className="font-weight-bold">Buscar</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchCondominios