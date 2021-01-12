import React, { useState } from 'react';
import { Modal, Card, Col, OverlayTrigger, Row, Tooltip,Button } from 'react-bootstrap';
import { formatNumber } from '../utils/formatNumber';
import '../css/TourDetail.css';
import { Markup } from 'interweave';
import moment from 'moment'

function TourDetail({rates, data}) {
    const [tours, setTours] = useState(rates)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const [politicas, setPoliticas] = useState('')
    const onHandleClickPolitica = item =>{
        //console.log(item)
        setPoliticas(item.rateDetail.cancellationPolicy)
        setShow(true)
    }
    
    return(
        <Row className="mt-4">
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Política de Cancelación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Markup content={politicas.description} />
                </Modal.Body>
            </Modal>
            <Col xs="12" lg="12">
                <h2>Mira las opciones de esta experiencia y ¡elige la tuya!</h2>
            </Col>
            <Col>
                {
                    tours.map((item,i)=>(
                        <Card key={i} className="my-4">
                            <Card.Body>
                                <Row>
                                    <Col xs="12" lg="8">
                                        <span className="title-tour-rate d-block bg-primary">{item.name}</span>
                                        <label><Markup content={item.description} /></label>
                                        <Row>
                                            <Col xs="12" lg="6">
                                                <label className="text-info">¿Qué incluye?</label>
                                                <ul className="tour-list">
                                                    {
                                                       item.includes.map((item,i) =>{
                                                           return (
                                                               <li key={i}> {item.name}</li>
                                                           )
                                                       }) 
                                                    }
                                                </ul>
                                            </Col>
                                            <Col xs="12" lg="6">
                                                <label className="text-danger">¿Qué no incluye?</label>
                                                <ul className="tour-list">
                                                    {
                                                       item.notIncludes.map((item,i) =>{
                                                           return (
                                                               <li key={i}> {item.name}</li>
                                                           )
                                                       }) 
                                                    }
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <div className="line-price line-tour-price border-primary"></div>
                                    <Col xs="12" lg="4">
                                        <div className="text-right mb-4">
                                            <span className="text-secondary ft-12 font-weight-bold d-block lh-03">{moment(data.checkIn, 'DD-MM-YYYY').format('DD MMMM YYYY')}</span>
                                            <span className="text-secondary ft-12 font-weight-bold">{`${data.paxes.paxes} personas`}</span>
                                        </div>
                                        {
                                            item.rateDetail.paxAmounts.map((rate,i)=>(
                                                <Row className="text-center" key={i}>
                                                    <Col>
                                                    <span style={{textTransform:'capitalize'}}>{rate.paxType}</span> {"  "}
                                                    <span className="text-success price-card">
                                                        <label>{formatNumber(rate.amount)} USD</label>
                                                    </span>
                                                    
                                                    </Col>
                                                    
                                                </Row>
                                            ))
                                        }
                                        <Row className="justify-content-center">
                                            <Col xs="10" lg="8">
                                            <Button block variant="primary"  className="my-3" onClick={e=>window.open('http://104.131.92.59:3000/', '_blank')}>Reservar</Button>
                                            <Button variant="danger" size="sm" block onClick={e=>onHandleClickPolitica(item)}>Política de cancelación</Button>     
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                }
                
            </Col>
        </Row>
    )

}

export default TourDetail;