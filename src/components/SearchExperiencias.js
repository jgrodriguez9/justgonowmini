import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { DateRangePicker, SingleDatePicker } from 'react-dates'
import { authContext } from '../context/AuthContext'
import { GET_DESTINOS } from '../services/Routes'
import SelectAjax from './SelectAjax'
import moment from 'moment'

import 'react-dates/lib/css/_datepicker.css';
import '../css/DatePicker.css'
import SelectPerson from './SelectPerson'
import { useHistory } from 'react-router-dom'

function SearchExperiencias(){
    const {auth} = useContext(authContext)
    const [destino, setDestino] = useState(null)
    const [startDate, setStartDate] = useState(moment().add(1, 'days'));
    const [focusedInput, setFocusedInput] = useState(false);
    const history = useHistory();
    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(0)

    const onHandleClickBuscar = e =>{
        const d ={
            "destiny" : destino===null? null : destino.value,
            "destino_name": destino===null ? null : destino.label,
            "checkIn" : moment(startDate).format("DD-MM-YYYY"),
            "currency" : "USD",
            "language" : "ES",
            "apiName": "Viator",
            "paxes": {
                "adults": adult,
                "children": child,
                "infant": 0,
                "junior": 0,
                "paxes": adult+child
            }
        }
        console.log(d)
        history.push(`/experience?search=${encodeURIComponent(JSON.stringify(d))}`)
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
                                setDestino(value)
                            }} 
                            defaultOptions={destino}   
                            valid={true}     
                            isClearable={true}   
                            className="select-hotel-home"                                              
                        />
                    </Form.Group>                    
                </Col>
                <Col xs="4" lg="2">
                    <Form.Group>
                        <Form.Label className="text-light">Fecha</Form.Label>
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
                    </Form.Group>
                </Col>
                <Col xs="4" lg="2">
                    <Form.Group>
                        <Form.Label className="text-light">Adultos</Form.Label>
                        <SelectPerson adult={true} child={false} setAdult={setAdult}/>
                    </Form.Group>
                </Col>
                <Col xs="4" lg="2">
                    <Form.Group>
                        <Form.Label className="text-light">Niños</Form.Label>
                        <SelectPerson adult={false} child={true} setChild={setChild}/>
                    </Form.Group>
                </Col>
                <Col xs="12" lg="2">
                    <Button block variant="primary" onClick={onHandleClickBuscar} className="font-weight-bold">Buscar</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchExperiencias