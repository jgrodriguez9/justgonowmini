import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { formatNumber } from '../utils/formatNumber';
import '../css/CardExperienciasHorizontal.css';
import noImage from '../img/no-image.png'
import { Markup } from 'interweave';

function CardExperienciasHorizontal({item,fechaStart,onHandleClickCard}){
    //var uint8array = TextEncoder(encoding).encode(string);
    return(
        <Card className="shadow-sm mb-3 card-hover card-tours" onClick={e=>onHandleClickCard(item.id, item.source)}>
            <Card.Body className="py-1">
                <Row className="align-items-center">
                    <Col xs="12" lg="3">
                        <div className="text-center">
                            <Image src={item.mainPhoto && item.source==='Viator' ? item.mainPhoto.urlPhoto : noImage} fluid className="card-img-max-height"/>
                        </div>
                    </Col>
                    <Col xs="12" lg="9">
                        <div className="card-horizontal"> 
                        <Row>
                            <div className="card-content">
                                <span className="card-title-experience">{item.name}</span>
                            </div>
                                {
                                    item.description && 
                                    <label className="lh-1-1">{
                                        item.description.length > 180 ? 
                                        <Markup content={`${item.description.substr(0,170)}...`} /> : 
                                        <Markup content={item.description} />
                                        }
                                    </label>
                                }    
                          </Row>
                        <Row>
                        <Col xs="6" lg="6">
                            <span className="text-price price-adult">{formatNumber(item.minRates.adult)} USD <small className="text-dark" style={{ fontSize: `45%` }} >Precio adulto</small></span>
                         </Col>
                            <Col xs="6" lg="6">   
                            <div className="text-right">
                            <span className="text-price price-minors" style={{float:'right'}}>{formatNumber(item.minRates.child)} USD <small className="text-dark" style={{ fontSize: `45%` }} >Precio menor</small></span>
                            </div>
                            </Col>
                        </Row>
                        </div>                
                        
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CardExperienciasHorizontal

