import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import wordCircle from '../../img/word-circle.png'

function OfertasUMinuto(){
    return(
        <section className="py-5 bg-welcome-u-minuto">
            <Container>
                <Row className="align-items-start">
                    <Col xs="5" lg="4">
                        <Image src={wordCircle} fluid/>
                    </Col>
                    <Col xs="7" lg={{ span: 7, offset: 1 }}>
                        <h1 className="text-white text-uppercase letter-4">OFERTAS DE ÚLTIMO MINUTO</h1>
                        <label className="text-white ft-1-5rem">Reserva con menos tiempo de anticipación y disfruta de precios increíbles.</label>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OfertasUMinuto