import React from 'react';
import { Accordion, Button, Card, Col, Container, Row } from 'react-bootstrap';

function WelcomePreguntasFrecuentes(){
    return(
        <Container className="py-5">
            <Row className="mb-4">
                <Col className="text-center">
                    <h1>Preguntas Frecuentes</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="12" lg="5">
                    <Accordion>
                        <Card className="border-0 accordion-preguntas mb-4">
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="light" className="btn-block" eventKey="0">
                                    Acerca de
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className="text-center">
                                    <ul className="list-unstyled">
                                        <li><a href="!#">¿Que es Just go Now?</a></li>
                                        <li><a href="!#">¿Que beneficios me ofrece?</a></li>
                                        <li><a href="!#">¿Cuánto cuesta Just go Now?</a></li>
                                        <li><a href="!#">¿Cómo cancelo?</a></li>
                                    </ul>
                                </div>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="border-0 accordion-preguntas mb-4">
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="light" className="btn-block" eventKey="1">
                                Condominios
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div className="text-center">
                                    <ul className="list-unstyled">
                                        <li><a href="!#">¿Que es un "Condominio"?</a></li>
                                        <li><a href="!#">¿Cuál es la diferencia entre un Condominio y un Hotel ?</a></li>
                                        <li><a href="!#">¿Cuánto cuesta Just go Now?</a></li>
                                        <li><a href="!#">¿Que destinos puedo encontrar en la seccion de "Condominios"?</a></li>
                                    </ul>
                                </div>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="border-0 accordion-preguntas mb-4">
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="light" className="btn-block" eventKey="2">
                                Período de prueba
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <div className="text-center">
                                    <ul className="list-unstyled">
                                        <li><a href="!#">Período de prueba</a></li>
                                    </ul>
                                </div>    
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="border-0 accordion-preguntas mb-4">
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="light" className="btn-block" eventKey="3">
                                Tu cuenta
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <div className="text-center">
                                    <ul className="list-unstyled">
                                        <li><a href="!#">Tu cuenta</a></li>
                                    </ul>
                                </div> 
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    )
}

export default WelcomePreguntasFrecuentes