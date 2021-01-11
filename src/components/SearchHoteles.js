import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { GET_DESTINOS } from '../services/Routes';
import SelectAjax from './SelectAjax';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import { authContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Huespedes from './Huespedes';

import 'react-dates/lib/css/_datepicker.css';
import '../css/SearchHoteles.css'
import '../css/DatePicker.css'
import { withTranslation } from 'react-i18next';


function SearchHoteles({t, i18n}){
    const {auth} = useContext(authContext)
    const [destino, setDestino] = useState(null)
    const [errorDestino, setErrordestino] = useState(false)
    const [startDate, setStartDate] = useState(moment().add(1, 'days'));
    const [endDate, setEndDate] = useState(moment().add(3, 'days'));
    const [focusedInput, setFocusedInput] = useState(null);
    const [huespedesSend, setHuespedesSend] = useState([{
        "adults": 2,      
        "children": {
            "ages": []
      }
    }])
    const history = useHistory();

    const onFocusChangeRangeHandler = (focusedInput) => {
        setFocusedInput(focusedInput);
    }

    const onHandleClickBuscar = e =>{
        if(destino===null){
            setErrordestino(true)
        }else{
            setErrordestino(false)
            const d ={
                "destiny" : destino===null? null : destino.value,
                "destino_name": destino===null ? null : destino.label,
                "checkIn" : moment(startDate).format("DD-MM-YYYY"),
                "checkOut" : moment(endDate).format("DD-MM-YYYY"),
                "currency" : "USD",
                "language" : `${i18n.language === 'es' ? 'CAS' : 'EN'}`,
                "rooms": huespedesSend
            }
            //console.log(d)
            history.push(`/hotel?search=${encodeURIComponent(JSON.stringify(d))}`)
        }
    }

    return (
        <Container className="form-padding">
            <Row className="align-items-center">
                <Col xs="12" lg="4">
                    <Form.Group>
                        <Form.Label className="text-light">{t('Destino')}</Form.Label>
                        <SelectAjax
                            defaultValue={destino === null || Object.keys(destino).length === 0 ? false : destino}
                            url={`${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${GET_DESTINOS}`}
                            access_token={auth.data.access_token}
                            isMulti={false}
                            handleChange={(value) => {
                                if(value===null){
                                    setErrordestino(true)
                                }else{
                                    setErrordestino(false)
                                }
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
                        <Form.Label className="text-light">{t('Fecha')}</Form.Label>
                        <DateRangePicker
                            minDate={moment()}
                            customArrowIcon="/"
                            displayFormat="DD-MM-YYYY"
                            startDate={startDate} // momentPropTypes.momentObj or null,
                            startDateId="start_date_id" // PropTypes.string.isRequired,
                            endDate={endDate} // momentPropTypes.momentObj or null,
                            endDateId="end_date_id" // PropTypes.string.isRequired,
                            onDatesChange={({ startDate, endDate }) => {
                                if(startDate===null){
                                    setStartDate(moment().add(1, 'days'))
                                }else{
                                    setStartDate(startDate)
                                }
                                if(endDate===null){
                                    setEndDate(moment(startDate).add(2, 'days'))
                                }else{
                                    if(endDate.diff(startDate, 'days') < 30){
                                        setEndDate(endDate)
                                    }else{
                                        setEndDate(moment(startDate).add(30, 'd'))
                                    }

                                    
                                }
                                
                                
                            }} // PropTypes.func.isRequired,
                            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={onFocusChangeRangeHandler} // PropTypes.func.isRequired,
                        />
                    </Form.Group>
                </Col>
                <Col xs="6" lg="3">
                    <Form.Group>
                        <Form.Label className="text-light">{t('Huespedes')}</Form.Label>
                        <Huespedes setHuespedesSend={setHuespedesSend} huespedesSend={huespedesSend}/>
                    </Form.Group>                    
                </Col>
                <Col xs="12" lg="2">
                    <Button block variant="primary" onClick={onHandleClickBuscar} className="font-weight-bold">{t('Buscar')}</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default withTranslation()(SearchHoteles)