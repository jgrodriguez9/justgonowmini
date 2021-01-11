import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import '../css/SectionTop.css'

function SectionTopDetail({menu, nombre, direccion}){
    
    return(
        <div className="section-top-detail-bg">
            <Container className="section-top-padding">
                <Row>
                    <Col>
                        <label className="text-white text-top-1">{menu}</label>
                        <h1 className="text-white text-top-2">{nombre}</h1>
                        <span className="text-white">{direccion}</span>
                    </Col>
                </Row>
            </Container>            
        </div>
    )
}

export default SectionTopDetail