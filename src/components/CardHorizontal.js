import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import Amenities from './Amenities';
import { formatNumber } from '../utils/formatNumber';
import Stars from './Stars';
import noImage from '../img/no-image.png'
import { Markup } from 'interweave';
import { withTranslation } from 'react-i18next';
import GetIsRefundable from '../utils/getIsRefundable';
import DetalleReserva from '../utils/detalleReserva';

function CardHorizontal({t,item,huespedesGet,fechaStar,fechaEnd,onHandleClickCard,onHandleClickAmenities}){
    //var uint8array = TextEncoder(encoding).encode(string);


    return(
        <Card className="shadow-sm mb-3">
            <Card.Body className="py-1">
                <Row className="align-items-center">
                    <Col xs="12" lg="3">
                        <div className="text-center">
                            <Image src={item.urlPhotoExtend ? item.urlPhotoExtend : noImage} fluid className="card-img-max-height cursor-pointer" onClick={e=>onHandleClickCard(item.id, item.source, item.chain)}/>
                        </div>
                    </Col>
                    <Col xs="12" lg="6">
                        <h2 onClick={e=>onHandleClickCard(item.id, item.source, item.chain)} className="hover-underline cursor-pointer">{item.name}</h2>
                        <Stars stars={item.stars}/>                        
                        {
                            item.description && 
                            <label className="lh-1-1">
                                {
                                    item.description.length > 180 ?
                                    <Markup content={`${item.description.substr(0,170)}...`} /> :
                                    <Markup content={item.description} />
                                }
                            </label>
                        }                        
                        <Amenities onHandleClickAmenities={onHandleClickAmenities} amenities={item.amenities}/>
                        {GetIsRefundable(item.isRefundable)}
                    </Col>
                    <Col xs="12" lg="3">
                        <div className="text-right">
                            <div><span className="text-price">{formatNumber(item.totalByNight)} USD <small className="text-dark ft-1rem text-lowercase">{t('PorNoche')}</small></span></div>
                            <label className="lh-1 my-2">
                                <DetalleReserva rooms={huespedesGet} fechaStar={fechaStar} fechaEnd={fechaEnd}/>
                                {/* {DetalleReserva(huespedesGet,fechaStar,fechaEnd)} */}
                            </label>
                            <label className="text-lowercase">{t('ImpuestosIncluidos')}</label>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default withTranslation()(CardHorizontal)

