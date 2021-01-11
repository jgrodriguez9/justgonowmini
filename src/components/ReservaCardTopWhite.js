import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { formatNumber } from '../utils/formatNumber';
import { getNights } from '../utils/getNights';
import { getTotalByNight } from '../utils/getTotalByNight';

function ReservaCardTopWhite({t,item}){
    return(
        <Card className="shadow-none">
            <Card.Body>
                <Row>
                    <Col xs="12" lg="12">
                        <h5 className="text-info">{t('LosDatosReserva')}</h5>
                        <hr className="bg-info"/>
                        <h6>{item.habitacion_name}</h6>                        
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" lg="7">
                        <label>{t('FinalPorNoche')}</label>
                    </Col>
                    <Col xs="6" lg="5">
                        <label>{formatNumber(getTotalByNight(item.total, item.checkIn, item.checkOut))} USD</label>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs="6" lg="7">
                        <label className="text-lowercase">{`${getNights(item.checkIn, item.checkOut)} ${getNights(item.checkIn, item.checkOut) > 1 ? t('Noches') : t('Noche')}, ${item.huespedes} ${item.huespedes > 1 ? t('huespedes') : t('huesped')}`}</label>
                    </Col>
                    <Col xs="6" lg="5">
                        <label>{formatNumber(item.total)} USD</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" lg="7">
                        <label className="lh-1">{t('ImpuestosTasasCargos')}</label>
                    </Col>
                    <Col xs="6" lg="5">
                        <label>{formatNumber(0)} USD</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" lg="7">
                        <label className="text-info">{t('Descuento')}</label>
                    </Col>
                    <Col xs="6" lg="5">
                        <label className="text-info">{formatNumber(0)} USD</label>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs="6" lg="7">
                        <h6 className="text-success">{t('Total')}</h6>
                    </Col>
                    <Col xs="6" lg="5">
                        <h6 className="text-success">{formatNumber(item.total)} USD</h6>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default withTranslation()(ReservaCardTopWhite)