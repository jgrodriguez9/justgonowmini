import React, { useState } from 'react';
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import SelectAjax from '../SelectAjax';
import { GET_DESTINOS } from '../../services/Routes';
import DatePicker from 'react-datepicker';
import '../../css/FormSidebar.css'

function CondosFormSideBar({auth, searching}){
    const [destino, setDestino] = useState({
        value: searching.destiny, label: searching.destino_name
    })
    const [startDate, setStartDate] = useState(new Date(moment(searching.checkIn,"DD/MM/YYYY")));
    const [endDate, setEndDate] = useState(new Date(moment(searching.checkOut,"DD/MM/YYYY")));
    const [errorDestino,setErrorDestino]= useState(false);
    const history = useHistory();

    const onHandleClickBuscar = e =>{
        if(destino === null)
            setErrorDestino(true);
        else {
            const data ={
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

            console.log("DATA ",data);

            history.push(`/condos?search=${encodeURIComponent(JSON.stringify(data))}`)
        }
    }

    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs="12" lg="10">
                    <Card className="form-sidebar-card">
                        <Card.Body>
                            <Row className="mb-2">
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                    <SelectAjax
                                        defaultValue={destino === null || Object.keys(destino).length === 0 ? false : destino}
                                        url={`${process.env.REACT_APP_SUNAPI_ENDPOINT_VERSION}${GET_DESTINOS}`}
                                        access_token={auth.data.access_token}
                                        isMulti={false}
                                        handleChange={(value) => {
                                            if(value === null)
                                                setErrorDestino(true);
                                            else
                                                setErrorDestino(false);
                                                
                                            setDestino(value);
                                        }} 
                                        defaultOptions={destino}   
                                        valid={true}     
                                        isClearable={true}   
                                        className="select-hotel-home"                                              
                                    />
                                    {errorDestino && <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>}
                                </Col>
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
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
                                </Col>
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
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
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
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

export default CondosFormSideBar