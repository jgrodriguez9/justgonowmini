import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function WelcomeIniciarPrueba(){
    return(
        <section className="py-5 bg-subscription">
            <Container>
                <Row className="mb-4">
                    <Col className="text-center">
                        <h1 className="text-white letter-4">INICIAR PRUEBA GRATIS</h1>
                        <label className="d-block text-white ft-1-5rem">¿Quieres reservar ya? Ingresa tu correo electrónico para crear una cuenta</label>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="12" lg="4">
                        <Form.Control 
                            type="text"
                            className="input-subscription"
                            placeholder="Ingresa tu correo electrónico"
                        />
                    </Col>
                    <Col xs="12" lg="2">
                        <Button variant="light" className="btn-subscription" block>enviar</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default WelcomeIniciarPrueba