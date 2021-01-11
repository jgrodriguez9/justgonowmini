import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment'
import { withTranslation } from 'react-i18next';

function ReservaCardTop({t,item}){
    const f1 = moment(item.checkIn, "DD-MM-YYYY")
    const f2 = moment(item.checkOut, "DD-MM-YYYY")

    return(
        <Card className="form-sidebar-card text-light mb-2">
            <Card.Body>
                <Row>
                    <Col xs="12" lg="12">
                    <h4>{t('LosDatosReserva')}</h4>
                        <div className="d-flex justify-content-between">
                            <div>
                                <label className='d-block mb-0'><FaCalendarAlt className="icon-14 mb-1 mr-2" />{t('Entrada')}</label>
                                <label className='d-block ft-08rem mb-0'>{moment(f1).format("dd, DD MMM, YYYY")}</label>
                                {/* <label className='d-block ft-08rem'>15:00</label> */}
                            </div>
                            <div>
                                <label className='d-block mb-0'><FaCalendarAlt className="icon-14 mb-1 mr-2" />{t('SalidaCheckout')}</label>
                                <label className='d-block ft-08rem mb-0'>{moment(f2).format("dd, DD MMM, YYYY")}</label>
                                {/* <label className='d-block ft-08rem'>15:00</label> */}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <label className='d-block mb-0'>{t('DuracionEstancia')}</label>
                        <label className='d-block ft-08rem mb-0'>{`${moment.duration(f2.diff(f1)).asDays()} ${moment.duration(f2.diff(f1)).asDays() > 1 ? t('Noches') : t('Noche')}`}</label>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <label className='d-block mb-0'>{t('TuHabitacion')}</label>
                        <label className='d-block ft-08rem mb-0'>{item.habitacion_name}</label>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default  withTranslation()(ReservaCardTop)