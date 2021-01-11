import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import '../css/SectionTop.css'

function SectionTop({menu, destino, total,product}){


    return(
        <div className="section-top-bg">
            <Container className="section-top-padding">
                <Row>
                    <Col>
                        <label className="text-white text-top-1">{menu}</label>
                        <h1 className="text-white text-top-2">{destino}</h1>
                        <span className="text-white text-top-3">{total} {product}</span>
                    </Col>
                </Row>
            </Container>            
        </div>
    )
}

export default SectionTop