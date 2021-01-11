import React, { useState } from 'react';
import { Badge, Card, Col, Jumbotron, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { FaUser } from 'react-icons/fa';
import { buildList } from '../utils/buildList';
import { getHuespedesNumber } from '../utils/getAdultsDetail';
import GetTextHuespedes from '../utils/getTextHuespedes';
import { groupBy } from '../utils/groupBy';
import { setIdentificador } from '../utils/setIdentificador';
import TableHabitaciones from './TableHabitaciones';


function HabitacionesDetail({t, habitaciones, onHandleClickReservar}){
    const [rooms, setRooms] = useState(setIdentificador(habitaciones))

    let arrGroupBy = groupBy(rooms, "identificador");
    let items = buildList(arrGroupBy)

    return(
        <Row className="mt-4">
            <Col xs="12" lg="12">
                <h2 className="text-capitalize">{t('Habitaciones')}</h2>
            </Col>
            <Col>
                {
                    items.length === 0 ? 
                    <Jumbotron>
                        <h4>{t('LoSentimos')}</h4>
                        <p>
                            {t('NoHabitacionesDisponibles')}
                        </p>
                    </Jumbotron> :
                    items.map((item,i)=>(
                        <Card key={i} className="mb-4">
                            <Card.Body>
                                <Row>
                                    <Col xs="12" lg="12" className="mb-2">
                                        <span className="text-detail-room bg-dark text-light rounded">{item.nombre}</span>
                                    </Col>
                                    <Col xs="12" lg="12">
                                        {
                                            item.detail[0].roomDescription.map((room, roomI)=>(
                                                <Badge variant="light" key={roomI}>
                                                    <OverlayTrigger
                                                        key={'top'}
                                                        placement={'top'}
                                                        overlay={<Tooltip id={`tooltip-top`}><GetTextHuespedes guest={room.guest} /></Tooltip>}
                                                        >
                                                        <div>
                                                            {
                                                                getHuespedesNumber(room.guest.adults, 'icon-16').map((cla, clI)=>(
                                                                    <FaUser className={cla} key={clI}/>
                                                                ))
                                                            }
                                                            {
                                                                room.guest.children > 0 ? '+':''
                                                            }
                                                            {
                                                                getHuespedesNumber(room.guest.children, 'icon-12').map((cla, clI)=>(
                                                                    <FaUser className={cla} key={clI}/>
                                                                ))
                                                            }
                                                        </div>
                                                        </OverlayTrigger>                                                    
                                                </Badge>
                                            ))
                                        }                                        
                                    </Col>
                                    <Col xs="12" lg="12">
                                        <TableHabitaciones rates={item.detail} onHandleClickReservar={onHandleClickReservar}/>
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

export default withTranslation()(HabitacionesDetail)