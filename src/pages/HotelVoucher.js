import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import GetInfoReservaPaxes from '../utils/getInfoReservaPaxes';
import moment from 'moment';
import GetSuReserva from '../utils/getSuReserva';
import { formatNumber } from '../utils/formatNumber';
import cels from '../img/voucher/cels.jpg'
import { FiCheckSquare } from "react-icons/fi";
import appStore from '../img/voucher/appstore.png'
import googlePlay from '../img/voucher/googleplay.png'
import { BsInfoCircle } from 'react-icons/bs';
import { GoCreditCard } from "react-icons/go";
import { BiCalendarEdit, BiMessageRoundedError } from 'react-icons/bi';
import { withTranslation } from 'react-i18next';


function HotelVoucher({t,infoReserva}){   

    useEffect(()=>{
        window.scrollTo(0, 0)
        console.log(infoReserva)
    },[])


    return (
        <Container>
            <Row className="justify-content-center mt-load">
                <Col xs="12" lg="10">
                    <Card className="rounded-0">
                        <Card.Header className="bg-primary text-light rounded-0">
                            <h4 className="display-4 ft-2-5rem">
                                {`${t('Gracias')} ${infoReserva.client.name} ${infoReserva.client.lastname} ${t('TuReserva')} ${infoReserva.client.hotel.name} ${t('EstaConfirmada')}`}
                            </h4>
                            <h4>{`${t('CodigoReservacion')} ${infoReserva.reservationCode}`}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs="12" lg="12"><h4>{infoReserva.client.hotel.name}</h4></Col>
                                <Col xs="9" lg="8">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="font-weight-bold px-0">{t('DetalleReservacion')}</ListGroup.Item>
                                        <ListGroup.Item className="font-weight-bold px-0">{`${t('NombreCliente')}: ${infoReserva.client.name} ${infoReserva.client.lastname}`}</ListGroup.Item>
                                        <ListGroup.Item className="font-weight-bold px-0"><GetInfoReservaPaxes rooms={infoReserva.hotels[0].rooms} tipo="info"/></ListGroup.Item>
                                        <ListGroup.Item className="px-0"><strong>{t('Telefono')}:</strong> {infoReserva.client.phone.number}</ListGroup.Item>
                                        <ListGroup.Item className="px-0"><strong>{t('CorreoElectronico')}:</strong> {infoReserva.client.email}</ListGroup.Item>
                                        <ListGroup.Item className="px-0"><strong>{t('Entrada')}:</strong> {moment(infoReserva.hotels[0].checkin, "DD-MM-YYYY").format('dddd DD MMMM YYYY')}</ListGroup.Item>
                                        <ListGroup.Item className="px-0"><strong>{t('SalidaCheckout')}:</strong> {moment(infoReserva.hotels[0].checkout, "DD-MM-YYYY").format('dddd DD MMMM YYYY')}</ListGroup.Item>                                        
                                        <ListGroup.Item className="px-0"><strong>{t('SuReservacionPara')}:</strong> <GetInfoReservaPaxes rooms={infoReserva.hotels[0].rooms} tipo="reservaPara"/></ListGroup.Item>                                        
                                    </ListGroup>
                                </Col>
                                <Col xs="3" lg="4"></Col>
                                <Col xs="12" lg="12">
                                    <Row>
                                        <Col xs="9" lg="8">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="px-0"><strong>{t('SuReservacion')}: </strong> 
                                                <span className="text-lowercase">
                                                    <GetSuReserva 
                                                        rooms={infoReserva.hotels[0].rooms} 
                                                        fechaStar={infoReserva.hotels[0].checkin} 
                                                        fechaEnd={infoReserva.hotels[0].checkout}
                                                    />
                                                </span>                                                
                                            </ListGroup.Item>
                                        </ListGroup>
                                        </Col>
                                        <Col xs="3" lg="4">
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className="border-0"><h6 className="text-info text-right">{formatNumber(infoReserva.total)} {infoReserva.currency}</h6></ListGroup.Item>
                                            </ListGroup>
                                            
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr />
                            <Row className="my-5">
                                <Col xs="12" lg="6">
                                    <Image src={cels} fluid />
                                </Col>
                                <Col xs="12" lg="6">
                                    <h4 className="display-4 ft-2-5rem">{t('Nuestra')} APP</h4>
                                    <p>
                                        <FiCheckSquare className="icon-24 mr-2" />  
                                        <strong className="text-secondary">{t('HazViajeNuestraApp')}</strong>
                                        <br />
                                        {t('CambieCanceleReservas')}
                                    </p>
                                    <div className="text-center">
                                        <Image src={appStore} fluid/>
                                    </div>
                                    <div className="text-center"><Image src={googlePlay} fluid/></div>                                    
                                </Col>
                            </Row>
                            <hr />
                            <Row className="my-5 justify-content-center">
                                <Col xs="12" lg="10">
                                    <h4 className="display-4 ft-1-5rem text-secondary">
                                        <BsInfoCircle className="mr-2  icon-24" />
                                        {t('DetallesImportantes')}
                                    </h4>
                                    <ul className="text-secondary">
                                        <li>{t('DetallesImportantes1')}</li>
                                        <li>{t('DetallesImportantes2')}</li>
                                        <li>{t('DetallesImportantes3')}</li>
                                        <li>{t('DetallesImportantes4')}</li>
                                        <li>{t('DetallesImportantes5')}</li>
                                        <li>{t('DetallesImportantes6')}</li>
                                        <li>{t('DetallesImportantes7')}</li>
                                        <li>{t('DetallesImportantes8')}</li>
                                    </ul>
                                    <a href="!#" className="px-4"><small>{t('DescargueAplicacion')} >></small></a>
                                </Col>
                            </Row>
                            <Row className="my-5 justify-content-center">
                                <Col xs="12" lg="10">
                                    <h4 className="display-4 ft-1-5rem text-secondary">
                                        <GoCreditCard className="mr-2 icon-24" />
                                        {t('Pago')}
                                    </h4>
                                    <ul className="text-secondary">
                                        <li>{t('Pago1')}</li>
                                        <li>{t('Pago2')}</li>
                                    </ul>
                                    <a href="!#" className="px-4"><small>{t('DescargueAplicacion')} >></small></a>
                                </Col>
                            </Row>
                            <Row className="my-5 justify-content-center">
                                <Col xs="12" lg="10">
                                    <h4 className="display-4 ft-1-5rem text-secondary">
                                        <BiCalendarEdit className="mr-2 icon-24" />
                                        {t('RealiceCambiosReserva')}
                                    </h4>
                                    <ul className="text-secondary">
                                        <li>{t('RealiceCambiosReserva1')}</li>
                                    </ul>
                                    <a href="!#" className="px-4"><small>{t('DescargueAplicacion')} >></small></a>
                                </Col>
                            </Row>
                            <Row className="my-5 justify-content-center">
                                <Col xs="12" lg="10">
                                    <h4 className="display-4 ft-1-5rem text-secondary">
                                        <BiMessageRoundedError className="mr-2 icon-24" />
                                        {t('PongaseContactoPropiedad')}
                                    </h4>
                                    <ul className="text-secondary">
                                        <li>{t('PongaseContactoPropiedad1')}</li>
                                    </ul>
                                    <a href="!#" className="px-4"><small>{t('DescargueAplicacion')} >></small></a>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Row className="py-5">
                                <Col>   
                                    <h5 className="">{t('AtencionCliente')}</h5>
                                    <span className="d-block text-secondary">
                                    203 Fake St. Mountain View, San Francisco, California, USA
                                    </span>
                                    <span className="d-block text-secondary">+2 392 3929 210</span>

                                    <div className='mt-4'>
                                        <Image src={appStore} fluid/>
                                        <Image src={googlePlay} fluid/>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}

export default withTranslation()(HotelVoucher)