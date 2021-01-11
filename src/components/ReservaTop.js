import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import CarouselTopDetail from './CarouselTopDetail';
import Stars from './Stars';

function ReservaTop({hotel_photos,hotel_name,hotel_stars,hotel_direccion}){

    return(
        <Row>
            <Col xs="12" lg="12">
                <Card className="shadow-sm my-3">
                    <Card.Body className="py-1">
                        <Row>
                            <Col xs="12" lg="3">
                                <CarouselTopDetail photos={hotel_photos} numberCards={1} imgHeight={180}/>                                
                            </Col>
                            <Col xs="12" lg="6">
                                <h2>{hotel_name}</h2>
                                <Stars stars={hotel_stars}/>
                                <p className="text-secondary">
                                    <FaMapMarkerAlt className="mb-1 icon-20 mr-2"/>
                                    {hotel_direccion}
                                </p>           
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ReservaTop