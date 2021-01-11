import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Modal, Row } from 'react-bootstrap';
import logoWhite from '../../img/logo-white.png';
import FormLogin from './FormLogin';

function WelcomeSectionTop(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isSubmiting, setIsSubmiting] = useState(false)


    return(
        <>

            <Modal show={show} onHide={handleClose}  backdrop="static" keyboard={!isSubmiting}>
                <Modal.Header closeButton className="border-bottom-0">
                <Modal.Title className="text-center w-100 text-secondary">
                    Bienvenido
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs="12" lg="12">
                                <h6 className="text-secondary text-center">Ingresa tu correo electrónico y contraseña</h6>
                            </Col>
                            <Col xs="12" lg="12">
                                <FormLogin setIsSubmiting={setIsSubmiting}/>
                            </Col>                           
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            <section className="welcome-bg">
                <Container fluid>
                    <Row className="pt-5">
                        <Col xs="6" lg="6">
                            <div className="text-center mb-5">
                                <Image src={logoWhite} fluid className="hp-100"/>
                            </div>
                        </Col>
                        <Col xs="6" lg="6">
                            <div className="text-right m-auto mb-5 w-75">
                                <Button variant="primary" onClick={handleShow} className="btn-purple text-uppercase ft-12">
                                    Iniciar sesión
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="pt-4 align-items-center">
                        <Col xs="6" lg="6">
                            <div>
                                <h1 className="text-uppercase text-center text-white ft-4rem"><span className="color-blue">¡CLICK!</span> y viaja</h1>
                                <hr className="border-white w-25" />
                                <h1 className="text-uppercase text-center text-white ft-4rem"><span className="color-blue">ESTO ES</span> JUST GO NOW</h1>
                            </div>

                        </Col>
                        <Col xs="6" lg="6">
                            <div>
                                <Card className="w-75 m-auto">
                                    <Card.Body>
                                        <h3 className="text-dark mb-4">Acceso ilimitado por 1 mes</h3>

                                        <Row className="align-items-center mb-4">
                                            <Col xs="6" lg="8">
                                            <Form.Check
                                                className="font-weight-bold text-dark"
                                                type="radio"
                                                label="Plan mensual"
                                                name="plan"
                                                />
                                            </Col>
                                            <Col xs="6" lg="4">
                                                <span className="d-block text-right lh-03 font-weight-bold text-dark">$999.00 USD</span>
                                                <span className="d-block text-right font-italic">por mes</span>
                                            </Col>
                                        </Row>
                                        <Row className="align-items-center mb-4">
                                            <Col xs="6" lg="8">
                                                <Form.Check
                                                    className="font-weight-bold text-dark"
                                                    type="radio"
                                                    label="Plan anual"
                                                    name="plan"
                                                />
                                            </Col>
                                            <Col xs="6" lg="4">
                                                <span className="d-block text-right lh-03 font-weight-bold text-dark">$5,999.00 USD</span>
                                                <span className="d-block text-right font-italic">por mes</span>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs="12" lg="12">
                                                <Button variant="primary" block className="btn-purple text-uppercase" onClick={handleShow}>iniciar sesión</Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            

        </>
    );


}

export default WelcomeSectionTop