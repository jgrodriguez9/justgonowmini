import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { formatNumber } from '../../utils/formatNumber';
import noImage from '../../img/no-image.png'
import DetalleReserva from '../../utils/detalleReserva';


function CardCondos({item,huespedesGet,fechaStar,fechaEnd,onHandleClickCard}){
    

    return(
        <Card className="shadow-sm mb-3 card-hover" onClick={e=>onHandleClickCard(item.id, item.source)}>
            <Card.Body className="py-1">
                <Row className="align-items-center">
                    <Col xs="12" lg="3">
                        <div className="text-center">
                            <Image src={item.urlPhoto ? item.urlPhoto : noImage} fluid className="card-img-max-height"/>
                        </div>
                    </Col>
                    <Col xs="12" lg="6">
                        <h2>{item.name}</h2>
                        <label className="lh-1-1">{(item.description != null && item.description.length > 180) ? `${item.description.substr(0,180)}...` : item.description}</label>
                    </Col>
                    <Col xs="12" lg="3">
                        <div className="text-right">
                            <div><span className="text-price">{formatNumber(item.total)} USD <small className="text-dark ft-1rem"></small></span></div>
                            <label className="lh-1 my-2">
                                <DetalleReserva rooms={huespedesGet} fechaStar={fechaStar} fechaEnd={fechaEnd}/>
                            </label>
                            <label>impuestos incluidos</label>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CardCondos